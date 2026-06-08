import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNode, type RpmlNode } from 'rpml-parser';
import { validate } from 'rpml-validator';

export interface RpmlDoc { path: string; source: string; }

const __dirname = dirname(fileURLToPath(import.meta.url));
// gallery.js is the fully self-contained bundle (runtime + parser + gallery chrome).
const GALLERY_JS = join(__dirname, '../../renderer-web/dist/gallery.js');

/** Recursively collect every .rpml file under `dir`, with paths relative to it. */
export function collectRpml(dir: string): RpmlDoc[] {
  const out: RpmlDoc[] = [];
  const walk = (d: string) => {
    for (const name of readdirSync(d)) {
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

export interface CompileResult { html: string; docs: RpmlDoc[]; warnings: string[]; }

/** Compile a list of docs into one self-contained HTML string. */
export function compileDocs(docs: RpmlDoc[], opts: { title?: string } = {}): CompileResult {
  if (!docs.length) throw new Error('no .rpml files found');

  const warnings: string[] = [];
  for (const doc of docs) {
    let ast: RpmlNode;
    try { ast = parseNode(doc.source); }
    catch (e) { throw new Error(`${doc.path}: ${(e as Error).message}`); }
    for (const v of validate(ast)) {
      if (v.severity === 'error') throw new Error(`${doc.path}: ${v.path}: ${v.message}`);
      warnings.push(`${doc.path}: ${v.path}: ${v.message}`);
    }
  }

  const galleryJs = readFileSync(GALLERY_JS, 'utf8');
  const title = opts.title ?? 'RPML Documentation';
  // JSON.stringify is safe to embed in a <script> as long as we escape </script
  // and the unicode line separators that break JS string literals.
  const data = JSON.stringify(docs)
    .replace(/<\/script/gi, '<\\/script')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

  const html = `<!doctype html>
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
  return { html, docs, warnings };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
}
