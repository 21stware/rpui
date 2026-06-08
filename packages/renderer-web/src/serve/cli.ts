/**
 * `rpui serve [dir]` — host a directory of .rpml files as one navigable gallery.
 *
 * Published as the `rpui` bin of @21stware/rpui, so:
 *   npx @21stware/rpui serve .
 *
 * Zero runtime dependencies (node: builtins only). The page reuses the same
 * shape as the compiler output: it inlines `globalThis.__RPML_DOCS__` plus the
 * self-contained `gallery.js` bundle (which sits next to this file in dist/).
 * The directory is re-scanned on every page request, so refreshing the browser
 * after an edit shows the change — no watcher / websocket.
 */
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

/** Build the gallery HTML for the current state of `dir`. */
function buildHtml(dir: string, title: string, galleryJs: string): string {
  const docs = collectRpml(dir);
  // JSON.stringify is safe to embed in a <script> as long as we escape </script
  // and the unicode line separators that break JS string literals.
  const data = JSON.stringify(docs)
    .replace(/<\/script/gi, '<\\/script')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<style>html,body{margin:0;height:100%}</style>
</head>
<body>
<script>globalThis.__RPML_DOCS__ = ${data};</script>
<script type="module">
${galleryJs}
</script>
</body>
</html>
`;
}

interface Opts { dir: string; port: number; host: string; }

function parseArgs(argv: string[]): Opts {
  let dir = '.';
  let port = 3000;
  let host = 'localhost';
  let sawPositional = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-p' || a === '--port') port = Number(argv[++i]) || port;
    else if (a === '--host') host = argv[++i] || host;
    else if (a === '-h' || a === '--help') usage();
    else if (!a.startsWith('-') && !sawPositional) { dir = a; sawPositional = true; }
  }
  return { dir, port, host };
}

function usage(): never {
  console.error(`Usage: rpui serve [dir] [--port 3000] [--host localhost]

Host a directory of .rpml files as one navigable gallery.

  dir            directory to serve (default: current directory)
  -p, --port     port (default 3000; auto-increments if busy)
      --host     host (default localhost)`);
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
  const { dir, port, host } = parseArgs(argv);
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

  const server = createServer((req, res) => {
    const url = (req.url || '/').split('?')[0];
    try {
      if (url === '/' || !url.endsWith('.rpml')) {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(buildHtml(root, title, galleryJs));
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

  const actualPort = await listen(server, port, host);
  const count = collectRpml(root).length;
  const addr = `http://${host}:${actualPort}`;
  console.log(``);
  console.log(`  RPUI serving ${count} .rpml file${count === 1 ? '' : 's'} from ${root}`);
  console.log(``);
  console.log(`  Local:  ${addr}`);
  console.log(``);
  console.log(`  Press Ctrl+C to stop`);
}

const [sub, ...rest] = process.argv.slice(2);
if (sub === 'serve') {
  serve(rest);
} else if (sub === '-h' || sub === '--help' || sub === undefined) {
  usage();
} else {
  console.error(`Unknown command: ${sub}\n`);
  usage();
}
