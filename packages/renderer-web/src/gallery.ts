/**
 * RPML gallery — renders a collection of .rpml documents with a sidebar nav.
 *
 * Used by:
 *  - playground.html   (folder drag-and-drop → in-memory gallery)
 *  - rpml-compiler     (compiled single-file HTML; docs inlined as a global)
 *
 * A "doc" is { path, source }. The sidebar tree is derived from the slash-
 * separated paths. Routing is hash-based (#<path>); switching updates the URL
 * via history.pushState. No localStorage. The doc whose basename is `index`
 * (or the first doc) is the default home.
 */

import { parseToPage } from 'rpml-parser';
import { registerAll } from './rpui';

registerAll();

export interface RpmlDoc {
  path: string;     // e.g. "flows/checkout.rpml"
  source: string;   // raw .rpml text
}

interface TreeNode {
  name: string;
  path?: string;            // set on leaf nodes (the doc path)
  title?: string;           // doc title for leaves
  children: Map<string, TreeNode>;
}

const CHROME_CSS = `
.rpml-gallery { display:grid; grid-template-columns:260px 1fr; height:100vh; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
.rpml-gx-side { display:flex; flex-direction:column; border-right:1px solid #e5e7eb; background:#fff; min-height:0; }
.rpml-gx-head { padding:16px; border-bottom:1px solid #e5e7eb; font-size:14px; font-weight:700; color:#111827; }
.rpml-gx-head small { display:block; margin-top:3px; font-size:11px; font-weight:400; color:#6b7280; }
.rpml-gx-nav { flex:1; overflow-y:auto; padding:8px; }
.rpml-gx-group { padding:10px 8px 3px; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:.04em; }
.rpml-gx-item { display:block; padding:6px 10px; border-radius:7px; font-size:13px; color:#374151; text-decoration:none; cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.rpml-gx-item:hover { background:#f3f4f6; }
.rpml-gx-item.active { background:#eff6ff; color:#1d4ed8; font-weight:650; }
.rpml-gx-indent { padding-left:22px; }
.rpml-gx-main { overflow:auto; min-height:0; background:#f4f6f8; }
.rpml-gx-err { padding:40px; color:#dc2626; font-family:ui-monospace,Menlo,monospace; }
`;

function injectChrome() {
  if (document.getElementById('rpml-gallery-style')) return;
  const s = document.createElement('style');
  s.id = 'rpml-gallery-style';
  s.textContent = CHROME_CSS;
  document.head.appendChild(s);
}

/** Pull the `title` attribute off the root <page ...> without full parsing. */
function docTitle(source: string, fallback: string): string {
  const m = source.match(/<page\b[^>]*\btitle="([^"]*)"/i);
  return m?.[1] || fallback;
}

function buildTree(docs: RpmlDoc[]): TreeNode {
  const root: TreeNode = { name: '', children: new Map() };
  for (const doc of docs) {
    const parts = doc.path.split('/').filter(Boolean);
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLeaf = i === parts.length - 1;
      if (!node.children.has(part)) node.children.set(part, { name: part, children: new Map() });
      node = node.children.get(part)!;
      if (isLeaf) { node.path = doc.path; node.title = docTitle(doc.source, part.replace(/\.rpml$/i, '')); }
    }
  }
  return root;
}

function basename(path: string): string {
  return path.split('/').pop() || path;
}

/** Mount a gallery into `host` (defaults to document.body). */
export function mountGallery(docs: RpmlDoc[], host: HTMLElement = document.body): void {
  injectChrome();
  const byPath = new Map(docs.map(d => [d.path, d]));
  const tree = buildTree(docs);

  const root = document.createElement('div');
  root.className = 'rpml-gallery';
  const side = document.createElement('aside');
  side.className = 'rpml-gx-side';
  const count = docs.length;
  side.innerHTML = `<div class="rpml-gx-head">RPML 文档<small>${count} 个文件</small></div>`;
  const nav = document.createElement('nav');
  nav.className = 'rpml-gx-nav';
  side.appendChild(nav);
  const main = document.createElement('div');
  main.className = 'rpml-gx-main';
  root.append(side, main);
  host.innerHTML = '';
  host.appendChild(root);

  const links = new Map<string, HTMLAnchorElement>();

  function renderNav(node: TreeNode, depth: number) {
    // Render leaf children first, then folders — folders as group labels.
    const entries = [...node.children.values()];
    const leaves = entries.filter(e => e.path).sort((a, b) => a.name.localeCompare(b.name));
    const folders = entries.filter(e => !e.path).sort((a, b) => a.name.localeCompare(b.name));
    for (const leaf of leaves) {
      const a = document.createElement('a');
      a.className = depth > 0 ? 'rpml-gx-item rpml-gx-indent' : 'rpml-gx-item';
      a.textContent = leaf.title || leaf.name;
      a.href = `#${leaf.path}`;
      links.set(leaf.path!, a);
      nav.appendChild(a);
    }
    for (const folder of folders) {
      const g = document.createElement('div');
      g.className = 'rpml-gx-group';
      g.textContent = folder.name;
      nav.appendChild(g);
      renderNav(folder, depth + 1);
    }
  }
  renderNav(tree, 0);

  function pickDefault(): string {
    const idx = docs.find(d => basename(d.path).replace(/\.rpml$/i, '').toLowerCase() === 'index');
    return (idx ?? docs[0]).path;
  }

  function show(path: string) {
    const doc = byPath.get(path);
    if (!doc) { main.innerHTML = `<div class="rpml-gx-err">未找到文档：${path}</div>`; return; }
    try {
      main.innerHTML = '';
      main.appendChild(parseToPage(doc.source));
    } catch (e) {
      main.innerHTML = `<div class="rpml-gx-err">RPML 解析错误：${(e as Error).message}</div>`;
    }
    links.forEach((a, p) => a.classList.toggle('active', p === path));
  }

  function route() {
    const path = decodeURIComponent(location.hash.slice(1)) || pickDefault();
    show(path);
  }

  nav.addEventListener('click', e => {
    const a = (e.target as HTMLElement).closest('a.rpml-gx-item') as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    const path = decodeURIComponent(a.hash.slice(1));
    history.pushState(null, '', a.hash);
    show(path);
  });
  window.addEventListener('popstate', route);
  route();
}

// Auto-mount for compiled single-file output: the compiler inlines docs as
// globalThis.__RPML_DOCS__ before this bundle runs.
const inlined = (globalThis as { __RPML_DOCS__?: RpmlDoc[] }).__RPML_DOCS__;
if (inlined && Array.isArray(inlined) && inlined.length) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountGallery(inlined));
  else mountGallery(inlined);
}
