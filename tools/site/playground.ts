import type { Ctx } from "../build-site.ts";

/** Playground page — the former demo/viewer.html, folded into the site portal.
 *
 *  Idle state shows the site chrome + a dropzone and example links. Loading a
 *  document (via ?rpml=, file picker, or single-file drop) or a folder
 *  (folder drop → gallery) takes over the full viewport — the chrome is
 *  removed so the prototype canvas / gallery owns the whole page. This keeps
 *  the examples-page iframe thumbnails (which load playground.html?rpml=…)
 *  rendering a clean scaled canvas. */
export function buildPlayground(ctx: Ctx): string {
  const examples: [string, string][] = [
    ["01-minimal", "01 最小示例"],
    ["02-form-page", "02 注册表单"],
    ["03-list-with-filter", "03 商品列表"],
    ["04-ticket-desk", "04 工单服务台"],
    ["05-dashboard", "05 数据看板"],
    ["06-multi-step-wizard", "06 多步骤向导"],
    ["07-task-management", "07 任务管理看板"],
    ["08-mobile-chat", "08 移动端即时消息"],
    ["09-checkout-flow/index", "09 结算流程（anchor + diagram）"],
  ];
  const exLinks = examples
    .map(
      ([file, label]) =>
        `<li><a href="?rpml=examples/${file}.rpml">${label}</a></li>`,
    )
    .join("\n      ");

  const body = `
<div id="pg-drop">松开以加载 .rpml 文件或文件夹</div>

<div class="page-intro" id="pg-hint">
  <h1>Playground</h1>
  <p>拖拽单个 <code>.rpml</code> 文件查看，或拖拽<strong>文件夹</strong>构建带侧边栏的文档集；也可用 URL 参数 <code>?rpml=examples/04-ticket-desk.rpml</code>。</p>
  <div class="pg-zone" id="pg-picker">点击选择 <code>.rpml</code> 文件，或拖拽文件 / 文件夹到此处</div>
  <input type="file" id="pg-file" accept=".rpml,.xml,text/plain" style="display:none" />
  <p class="pg-eyebrow">从示例开始</p>
  <ul class="pg-examples">
      ${exLinks}
  </ul>
  <div class="pg-err" id="pg-err"></div>
</div>`;

  const head = `<style>
  #pg-drop{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;
    background:var(--brand-wash);border:3px dashed var(--brand);color:var(--brand-ink);font-size:22px;font-weight:600;pointer-events:none}
  #pg-drop.over{display:flex}
  .pg-zone{margin-top:24px;padding:44px;border:2px dashed var(--line);border-radius:var(--radius);text-align:center;
    color:var(--ink-2);background:var(--surface-warm);cursor:pointer;transition:border-color .15s,color .15s}
  .pg-zone:hover{border-color:var(--brand);color:var(--brand-ink)}
  .pg-eyebrow{margin:32px 0 12px;font-size:13px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
  .pg-examples{margin:0;padding:0;list-style:none;columns:2;column-gap:24px}
  .pg-examples li{margin-bottom:8px}
  .pg-examples a{font-size:15px;color:var(--ink-2)}
  .pg-examples a:hover{color:var(--brand-ink)}
  .pg-err{color:#dc2626;margin-top:16px;font-family:ui-monospace,Menlo,monospace}
</style>`;

  const script = `<script type="module">
  import { parseToPage } from './dist/rpml-loader.js';
  import { mountGallery } from './dist/gallery.js';

  const errEl = document.getElementById('pg-err');
  const drop = document.getElementById('pg-drop');
  const fileInput = document.getElementById('pg-file');
  const picker = document.getElementById('pg-picker');

  // Strip the site chrome and hand the whole document to a rendered prototype / gallery.
  function takeOver() { document.body.innerHTML = ''; }

  function renderOne(source) {
    let page;
    try { page = parseToPage(source); }
    catch (e) { errEl.textContent = 'RPML 解析错误：' + e.message; return; }
    takeOver();
    document.body.appendChild(page);
  }

  function loadFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => renderOne(String(reader.result));
    reader.onerror = () => { errEl.textContent = '文件读取失败'; };
    reader.readAsText(file);
  }

  // ── folder → gallery ──
  function readEntryFile(entry) {
    return new Promise((res, rej) => entry.file(f => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = rej;
      r.readAsText(f);
    }, rej));
  }

  function readDir(dirEntry) {
    const reader = dirEntry.createReader();
    return new Promise((resolve, reject) => {
      const all = [];
      const pump = () => reader.readEntries(batch => {
        if (!batch.length) return resolve(all);
        all.push(...batch);
        pump();
      }, reject);
      pump();
    });
  }

  // Walk a directory entry recursively, collecting { path, source } for .rpml files.
  async function collectRpml(entry, prefix, out) {
    if (entry.isFile) {
      if (/\\.rpml$/i.test(entry.name)) out.push({ path: prefix + entry.name, source: await readEntryFile(entry) });
      return;
    }
    const children = await readDir(entry);
    for (const child of children) await collectRpml(child, prefix + entry.name + '/', out);
  }

  async function loadFolder(rootEntry) {
    const docs = [];
    const children = await readDir(rootEntry);
    for (const child of children) await collectRpml(child, '', docs);
    if (!docs.length) { errEl.textContent = '文件夹内没有 .rpml 文件'; return; }
    docs.sort((a, b) => a.path.localeCompare(b.path));
    takeOver();
    mountGallery(docs);
  }

  // ── URL param ──
  const src = new URLSearchParams(location.search).get('rpml');
  if (src) {
    takeOver();
    fetch(src).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(renderOne)
      .catch(e => { document.body.innerHTML = '<div class="pg-err" style="padding:40px">加载失败：' + e.message + '</div>'; });
  }

  picker?.addEventListener('click', () => fileInput.click());
  fileInput?.addEventListener('change', () => loadFile(fileInput.files[0]));

  // ── drag and drop (file or folder) ──
  let depth = 0;
  window.addEventListener('dragenter', e => { e.preventDefault(); depth++; drop.classList.add('over'); });
  window.addEventListener('dragover', e => e.preventDefault());
  window.addEventListener('dragleave', e => { e.preventDefault(); if (--depth <= 0) drop.classList.remove('over'); });
  window.addEventListener('drop', e => {
    e.preventDefault(); depth = 0; drop.classList.remove('over');
    const item = e.dataTransfer?.items?.[0];
    const entry = item?.webkitGetAsEntry?.();
    if (entry?.isDirectory) { loadFolder(entry); return; }
    const file = e.dataTransfer?.files?.[0];
    if (file) loadFile(file);
  });
</script>`;

  return ctx.page(
    {
      title: "Playground — RPUI",
      active: "playground",
      version: ctx.VERSION,
      path: "playground.html",
      description:
        "在线 RPML Playground — 拖拽 .rpml 文件即时渲染，支持文件夹画廊模式。",
      head,
      bodyEnd: script,
    },
    body,
  );
}
