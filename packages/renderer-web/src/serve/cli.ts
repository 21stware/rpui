/**
 * `rpui` CLI — the published bin of @21stware/rpui:
 *   npx @21stware/rpui serve .   host a directory of .rpml as one gallery (opens the browser)
 *   npx @21stware/rpui build .   compile a directory of .rpml into one self-contained HTML
 *
 * Zero runtime dependencies (node: builtins only). Both commands reuse the same
 * shape as the compiler output: an HTML page that inlines `globalThis.__RPML_DOCS__`
 * plus the self-contained `gallery.js` bundle (which sits next to this file in dist/).
 * `serve` watches the directory and pushes updated docs over Server-Sent Events
 * (`/~live`); the gallery applies them in place, so edits appear without a reload.
 */
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, watch } from 'node:fs';
import { join, relative, sep, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

interface RpmlDoc { path: string; source: string; }

const __dirname = dirname(fileURLToPath(import.meta.url));
const GALLERY_JS = join(__dirname, 'gallery.js');

/** Recursively collect every .rpml file under `dir`, paths relative to it. */
function collectRpml(dir: string): RpmlDoc[] {
  const out: RpmlDoc[] = [];
  const walk = (d: string) => {
    for (const name of readdirSync(d)) {
      if (name.startsWith('.') || name === 'node_modules') continue;
      const full = join(d, name);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.rpml$/i.test(name)) {
        out.push({ path: relative(dir, full).split(sep).join('/'), source: readFileSync(full, 'utf8') });
      }
    }
  };
  walk(dir);
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
}

function safeJson(docs: RpmlDoc[]): string {
  return JSON.stringify(docs)
    .replace(/<\/script/gi, '<\\/script')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/** Build the initial gallery HTML. Pass `live: true` in serve mode to enable SSE hot-reload. */
function buildHtml(docs: RpmlDoc[], title: string, galleryJs: string, live = false): string {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<style>html,body{margin:0;height:100%}</style>
</head>
<body>
<script>globalThis.__RPML_DOCS__ = ${safeJson(docs)};${live ? 'globalThis.__RPML_LIVE__ = true;' : ''}</script>
<script type="module">
${galleryJs}
</script>
</body>
</html>
`;
}

/** Open `url` in the system default browser, best-effort (never throws). */
function openBrowser(url: string): void {
  const cmd = process.platform === 'darwin' ? 'open'
    : process.platform === 'win32' ? 'cmd'
    : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  try {
    const child = spawn(cmd, args, { stdio: 'ignore', detached: true });
    child.on('error', () => {}); // opener missing (e.g. headless) — ignore
    child.unref();
  } catch { /* ignore */ }
}

interface Opts { dir: string; port: number; host: string; open: boolean; }

function parseArgs(argv: string[]): Opts {
  let dir = '.';
  let port = 3000;
  let host = 'localhost';
  let open = true;
  let sawPositional = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-p' || a === '--port') port = Number(argv[++i]) || port;
    else if (a === '--host') host = argv[++i] || host;
    else if (a === '--no-open') open = false;
    else if (a === '--open') open = true;
    else if (a === '-h' || a === '--help') usage();
    else if (!a.startsWith('-') && !sawPositional) { dir = a; sawPositional = true; }
  }
  return { dir, port, host, open };
}

function usage(): never {
  console.error(`Usage:
  rpui serve [dir] [--port 3000] [--host localhost] [--no-open]
  rpui build [dir] [-o out.html] [--title "..."]

serve  — host a directory of .rpml files as one navigable gallery (opens the browser).
build  — compile a directory of .rpml files into one self-contained HTML.

  dir            directory (default: current directory)
  -p, --port     serve: port (default 3000; auto-increments if busy)
      --host     serve: host (default localhost)
      --no-open  serve: do not open the browser
  -o, --out      build: output HTML path (default: <dir>.html)
      --title    build: gallery title (default: directory name)`);
  process.exit(1);
}

function listen(server: ReturnType<typeof createServer>, port: number, host: string): Promise<number> {
  return new Promise((res, rej) => {
    const onError = (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE' && port < 65535) {
        server.listen(++port, host); // try the next port
      } else { rej(err); }
    };
    server.on('error', onError);
    server.listen(port, host, () => { server.off('error', onError); res(port); });
  });
}

async function serve(argv: string[]) {
  const { dir, port, host, open } = parseArgs(argv);
  const root = resolve(dir);
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`✗ Not a directory: ${dir}`);
    process.exit(1);
  }
  if (!existsSync(GALLERY_JS)) {
    console.error(`✗ Missing runtime bundle (gallery.js). Reinstall @21stware/rpui or run the build.`);
    process.exit(1);
  }
  const galleryJs = readFileSync(GALLERY_JS, 'utf8');
  const title = root.split(sep).pop() || 'RPML';

  // Live clients: each open SSE connection gets pushed the fresh doc set on change.
  const clients = new Set<ServerResponse>();

  const server = createServer((req, res) => {
    const url = (req.url || '/').split('?')[0];
    try {
      // Server-Sent Events stream: holds the connection open and pushes the
      // current docs whenever a watched .rpml file changes.
      if (url === '/~live') {
        res.writeHead(200, {
          'content-type': 'text/event-stream; charset=utf-8',
          'cache-control': 'no-cache, no-transform',
          connection: 'keep-alive'
        });
        res.write('retry: 1000\n\n');
        clients.add(res);
        req.on('close', () => clients.delete(res));
        return;
      }
      if (url === '/' || !url.endsWith('.rpml')) {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(buildHtml(collectRpml(root), title, galleryJs, true));
        return;
      }
      // Convenience: serve raw .rpml source on its own path.
      const file = join(root, decodeURIComponent(url.replace(/^\/+/, '')));
      if (file.startsWith(root) && existsSync(file)) {
        res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
        res.end(readFileSync(file));
      } else {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Not found');
      }
    } catch (e) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Error: ' + (e as Error).message);
    }
  });

  // Watch the tree and push fresh docs to every live client (debounced). fs.watch
  // is recursive on macOS/Windows; on Linux it isn't, so we fall back to polling.
  let lastJson = '';
  const pushUpdate = () => {
    let docs: RpmlDoc[];
    try { docs = collectRpml(root); } catch { return; } // mid-write race — skip
    const json = safeJson(docs);
    if (json === lastJson) return; // nothing actually changed
    lastJson = json;
    const frame = `data: ${json}\n\n`;
    for (const res of clients) res.write(frame);
  };
  let debounce: ReturnType<typeof setTimeout> | undefined;
  const onChange = () => { clearTimeout(debounce); debounce = setTimeout(pushUpdate, 80); };
  try {
    watch(root, { recursive: true }, onChange);
  } catch {
    // recursive watch unsupported (older Linux) — poll the serialized doc set.
    setInterval(pushUpdate, 700);
  }

  const actualPort = await listen(server, port, host);
  const count = collectRpml(root).length;
  lastJson = safeJson(collectRpml(root));
  const addr = `http://${host}:${actualPort}`;
  console.log(``);
  console.log(`  RPUI serving ${count} .rpml file${count === 1 ? '' : 's'} from ${root}`);
  console.log(``);
  console.log(`  Local:  ${addr}`);
  console.log(``);
  console.log(`  Live reload on — edits render in place. Press Ctrl+C to stop`);
  if (open) openBrowser(addr);
}

/** `rpui build [dir] [-o out.html] [--title "..."]` — compile to one HTML file. */
function build(argv: string[]) {
  let dir = '.';
  let out = '';
  let title = '';
  let sawPositional = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-o' || a === '--out') out = argv[++i] || out;
    else if (a === '--title') title = argv[++i] || title;
    else if (a === '-h' || a === '--help') usage();
    else if (!a.startsWith('-') && !sawPositional) { dir = a; sawPositional = true; }
  }

  const root = resolve(dir);
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`✗ Not a directory: ${dir}`);
    process.exit(1);
  }
  if (!existsSync(GALLERY_JS)) {
    console.error(`✗ Missing runtime bundle (gallery.js). Reinstall @21stware/rpui or run the build.`);
    process.exit(1);
  }
  const name = basename(root) || 'RPML';
  if (!out) out = `${name}.html`;
  if (!title) title = name;

  const galleryJs = readFileSync(GALLERY_JS, 'utf8');
  const count = collectRpml(root).length;
  if (!count) {
    console.error(`✗ No .rpml files found in ${root}`);
    process.exit(1);
  }
  writeFileSync(out, buildHtml(collectRpml(root), title, galleryJs));
  console.log(`✓ compiled ${count} .rpml file${count === 1 ? '' : 's'} → ${out}`);
}

const [sub, ...rest] = process.argv.slice(2);
if (sub === 'serve') {
  serve(rest);
} else if (sub === 'build') {
  build(rest);
} else if (sub === '-h' || sub === '--help' || sub === undefined) {
  usage();
} else {
  console.error(`Unknown command: ${sub}\n`);
  usage();
}
