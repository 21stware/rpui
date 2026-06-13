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

import { registerAll } from './rpui';
import { liveRender } from './core/live-render';
import { injectThemeStyle, initTheme, currentTheme, setTheme } from './core/theme';

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
.rpml-gallery.collapsed { grid-template-columns:1fr; }
.rpml-gallery.collapsed .rpml-gx-side { display:none; }
.rpml-gx-side { display:flex; flex-direction:column; border-right:1px solid var(--rpml-gx-border,#e5e7eb); background:var(--rpml-gx-side-bg,#fff); min-height:0; }
.rpml-gx-head { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; padding:16px; border-bottom:1px solid var(--rpml-gx-border,#e5e7eb); font-size:14px; font-weight:700; color:var(--rpml-gx-fg,#111827); }
.rpml-gx-head small { display:block; margin-top:3px; font-size:11px; font-weight:400; color:var(--rpml-gx-muted,#6b7280); }
.rpml-gx-head-actions { flex:none; display:flex; gap:6px; margin:-3px -3px 0 0; }
.rpml-gx-btn { display:flex; align-items:center; justify-content:center; width:26px; height:26px; padding:0; border:1px solid var(--rpml-gx-border,#e5e7eb); border-radius:7px; background:var(--rpml-gx-side-bg,#fff); color:var(--rpml-gx-muted,#6b7280); font-size:15px; line-height:1; cursor:pointer; }
.rpml-gx-btn:hover { background:var(--rpml-gx-hover,#f3f4f6); color:var(--rpml-gx-fg,#111827); }
.rpml-gx-fab { position:fixed; top:12px; left:12px; z-index:50; display:none; align-items:center; justify-content:center; width:34px; height:34px; padding:0; border:1px solid var(--rpml-gx-border,#e5e7eb); border-radius:9px; background:var(--rpml-gx-side-bg,#fff); color:var(--rpml-gx-fg,#374151); font-size:17px; line-height:1; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,.12); }
.rpml-gx-fab:hover { background:var(--rpml-gx-hover,#f3f4f6); }
.rpml-gallery.collapsed .rpml-gx-fab { display:flex; }
.rpml-gx-nav { flex:1; overflow-y:auto; padding:8px; }
.rpml-gx-group { padding:10px 8px 3px; font-size:11px; font-weight:700; color:var(--rpml-gx-group,#9ca3af); text-transform:uppercase; letter-spacing:.04em; }
.rpml-gx-row { display:flex; align-items:center; border-radius:7px; }
.rpml-gx-row:hover { background:var(--rpml-gx-hover,#f3f4f6); }
.rpml-gx-row.active { background:var(--rpml-gx-active-bg,#eff6ff); }
.rpml-gx-item { flex:1; min-width:0; display:block; padding:6px 10px; font-size:13px; color:var(--rpml-gx-item,#374151); text-decoration:none; cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.rpml-gx-row.active .rpml-gx-item { color:var(--rpml-gx-active-fg,#1d4ed8); font-weight:650; }
.rpml-gx-indent .rpml-gx-item { padding-left:22px; }
.rpml-gx-copy { flex:none; margin-right:6px; padding:3px 7px; border:1px solid var(--rpml-gx-border,#e5e7eb); border-radius:6px; background:transparent; color:var(--rpml-gx-muted,#9ca3af); font-size:11px; line-height:1.4; cursor:pointer; opacity:0; transition:opacity .12s; }
.rpml-gx-row:hover .rpml-gx-copy { opacity:1; }
.rpml-gx-copy:hover { background:var(--rpml-gx-copy-hover,#e5e7eb); color:var(--rpml-gx-fg,#111827); }
.rpml-gx-copy.copied { opacity:1; color:var(--rpml-gx-ok,#059669); border-color:var(--rpml-gx-ok,#059669); }
.rpml-gx-main { overflow:auto; min-height:0; background:var(--rpml-gx-main-bg,#f4f6f8); }
.rpml-gx-err { padding:40px; color:#dc2626; font-family:ui-monospace,Menlo,monospace; }
`;

function injectChrome() {
  injectThemeStyle();
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

/** Resolve an anchor's `to` (which may be relative to `fromPath`'s directory,
 *  or a bare basename) against the known doc paths. Returns the exact doc path
 *  or null if nothing matches. */
function resolveAnchorTarget(to: string, fromPath: string, paths: Set<string>): string | null {
  const clean = to.replace(/^\.?\//, '').replace(/^#/, '');
  if (paths.has(clean)) return clean;
  // Relative to the current doc's directory.
  const dir = fromPath.includes('/') ? fromPath.slice(0, fromPath.lastIndexOf('/') + 1) : '';
  const parts = (dir + clean).split('/');
  const stack: string[] = [];
  for (const p of parts) {
    if (p === '..') stack.pop();
    else if (p && p !== '.') stack.push(p);
  }
  const joined = stack.join('/');
  if (paths.has(joined)) return joined;
  // Fallback: unique basename match.
  const base = basename(clean);
  const matches = [...paths].filter(p => basename(p) === base);
  return matches.length === 1 ? matches[0] : null;
}

export interface GalleryController {
  /** Hot-update the doc set in place — re-renders current doc if its source changed. */
  update(newDocs: RpmlDoc[]): void;
}

/** Mount a gallery into `host` (defaults to document.body). */
export function mountGallery(docs: RpmlDoc[], host: HTMLElement = document.body): GalleryController {
  injectChrome();
  let byPath = new Map(docs.map(d => [d.path, d]));
  let tree = buildTree(docs);

  const root = document.createElement('div');
  root.className = 'rpml-gallery';
  const side = document.createElement('aside');
  side.className = 'rpml-gx-side';
  side.innerHTML = `<div class="rpml-gx-head"><span>RPML 文档<small>${docs.length} 个文件</small></span><div class="rpml-gx-head-actions"><button class="rpml-gx-btn rpml-gx-theme" type="button" title="切换亮色/暗色" aria-label="切换亮色/暗色">◑</button><button class="rpml-gx-btn rpml-gx-toggle" type="button" title="收起侧边栏" aria-label="收起侧边栏">«</button></div></div>`;
  const nav = document.createElement('nav');
  nav.className = 'rpml-gx-nav';
  side.appendChild(nav);
  const main = document.createElement('div');
  main.className = 'rpml-gx-main';
  const fab = document.createElement('button');
  fab.className = 'rpml-gx-fab';
  fab.type = 'button';
  fab.title = '展开侧边栏';
  fab.setAttribute('aria-label', '展开侧边栏');
  fab.textContent = '☰';
  root.append(side, main, fab);
  host.innerHTML = '';
  host.appendChild(root);

  // Sidebar collapse → floating top-left button (session-only, no persistence).
  side.querySelector('.rpml-gx-toggle')!.addEventListener('click', () => root.classList.add('collapsed'));
  fab.addEventListener('click', () => root.classList.remove('collapsed'));

  // Light/dark theme toggle. Seeds from the `theme` URL param (or OS preference)
  // and writes the choice back to the URL so it survives reloads.
  initTheme();
  side.querySelector('.rpml-gx-theme')!.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  const links = new Map<string, HTMLElement>();

  function renderNav(node: TreeNode, depth: number) {
    // Render leaf children first, then folders — folders as group labels.
    const entries = [...node.children.values()];
    const leaves = entries.filter(e => e.path).sort((a, b) => a.name.localeCompare(b.name));
    const folders = entries.filter(e => !e.path).sort((a, b) => a.name.localeCompare(b.name));
    for (const leaf of leaves) {
      const row = document.createElement('div');
      row.className = depth > 0 ? 'rpml-gx-row rpml-gx-indent' : 'rpml-gx-row';
      const a = document.createElement('a');
      a.className = 'rpml-gx-item';
      a.textContent = leaf.title || leaf.name;
      a.href = `#${leaf.path}`;
      const copy = document.createElement('button');
      copy.className = 'rpml-gx-copy';
      copy.type = 'button';
      copy.title = '复制此页全部内容';
      copy.setAttribute('aria-label', '复制此页全部内容');
      copy.dataset.copyPath = leaf.path!;
      copy.textContent = 'copy';
      row.append(a, copy);
      links.set(leaf.path!, row);
      nav.appendChild(row);
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

  function rebuildNav(newDocs: RpmlDoc[]) {
    nav.innerHTML = '';
    links.clear();
    tree = buildTree(newDocs);
    renderNav(tree, 0);
    side.querySelector<HTMLElement>('.rpml-gx-head small')!.textContent = `${newDocs.length} 个文件`;
  }

  function pickDefault(): string {
    const cur = [...byPath.values()];
    const idx = cur.find(d => basename(d.path).replace(/\.rpml$/i, '').toLowerCase() === 'index');
    return (idx ?? cur[0]).path;
  }

  let currentPath = '';

  function show(path: string, section?: string, preserve = false) {
    const doc = byPath.get(path);
    if (!doc) { main.innerHTML = `<div class="rpml-gx-err">未找到文档：${path}</div>`; return; }
    liveRender(main, doc.source, {
      scroller: main,
      preserve,
      onError: (msg) => { if (msg) main.innerHTML = `<div class="rpml-gx-err">RPML 解析错误：${msg}</div>`; }
    });
    currentPath = path;
    links.forEach((row, p) => row.classList.toggle('active', p === path));
    if (section) {
      // The freshly mounted page wires its own rp-section listener on connect;
      // dispatch on the next frame so it is ready to focus the target.
      requestAnimationFrame(() => requestAnimationFrame(() =>
        window.dispatchEvent(new CustomEvent('rp-section', { detail: section }))));
    }
  }

  function route() {
    const path = decodeURIComponent(location.hash.slice(1)) || pickDefault();
    show(path);
  }

  // Cross-page navigation from <anchor>: resolve the target doc, route to it,
  // and optionally deep-link a section. Preventing the event tells the anchor a
  // gallery handled it (so it skips its standalone reload fallback).
  window.addEventListener('rp-anchor', (e) => {
    const { to, section } = (e as CustomEvent).detail as { to: string; section?: string };
    const target = resolveAnchorTarget(to, currentPath, new Set(byPath.keys()));
    if (!target) return; // unknown target → let the fallback try
    e.preventDefault();
    history.pushState(null, '', `#${target}`);
    show(target, section);
  });

  nav.addEventListener('click', e => {
    const el = e.target as HTMLElement;
    const copyBtn = el.closest('.rpml-gx-copy') as HTMLButtonElement | null;
    if (copyBtn) {
      e.preventDefault();
      const doc = byPath.get(copyBtn.dataset.copyPath!);
      if (!doc) return;
      void navigator.clipboard?.writeText(doc.source).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.textContent = '已复制';
        setTimeout(() => { copyBtn.classList.remove('copied'); copyBtn.textContent = 'copy'; }, 1500);
      });
      return;
    }
    const a = el.closest('a.rpml-gx-item') as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    const path = decodeURIComponent(a.hash.slice(1));
    history.pushState(null, '', a.hash);
    show(path);
  });
  window.addEventListener('popstate', route);
  route();

  const controller: GalleryController = {
    update(newDocs: RpmlDoc[]) {
      const prevSource = byPath.get(currentPath)?.source;
      byPath = new Map(newDocs.map(d => [d.path, d]));
      // Rebuild nav only when the path set changes.
      const newPaths = newDocs.map(d => d.path).sort().join('\0');
      const oldPaths = [...links.keys()].sort().join('\0');
      if (newPaths !== oldPaths) rebuildNav(newDocs);
      // Re-render current doc if its source changed; else navigate to default.
      const curr = byPath.get(currentPath);
      if (curr) {
        if (curr.source !== prevSource) show(currentPath, undefined, true);
        else links.forEach((row, p) => row.classList.toggle('active', p === currentPath));
      } else if (newDocs.length) {
        const def = pickDefault();
        history.replaceState(null, '', `#${def}`);
        show(def);
      }
    }
  };
  (globalThis as { __RPML_GALLERY__?: GalleryController }).__RPML_GALLERY__ = controller;
  return controller;
}

// Auto-mount for compiled single-file output: the compiler inlines docs as
// globalThis.__RPML_DOCS__ before this bundle runs.
const inlined = (globalThis as { __RPML_DOCS__?: RpmlDoc[] }).__RPML_DOCS__;
if (inlined && Array.isArray(inlined) && inlined.length) {
  const mount = () => {
    mountGallery(inlined);
    // Live mode: connect to the serve SSE endpoint and push updates into the gallery.
    if ((globalThis as { __RPML_LIVE__?: boolean }).__RPML_LIVE__) {
      const es = new EventSource('/~live');
      es.onmessage = (ev) => {
        try {
          const docs: RpmlDoc[] = JSON.parse(ev.data);
          (globalThis as { __RPML_GALLERY__?: GalleryController }).__RPML_GALLERY__?.update(docs);
        } catch { /* ignore malformed push */ }
      };
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
}
