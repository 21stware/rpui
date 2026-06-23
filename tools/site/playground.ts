import type { Ctx } from "../build-site.ts";

/** Playground page — Figma-style preview with a centered canvas window and a
 *  bottom-left page switcher. Single .rpml files render in the canvas; folders
 *  render as a switchable list with the page selector at the bottom-left corner. */
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
  <p>拖拽单个 <code>.rpml</code> 文件查看，或拖拽<strong>文件夹</strong>在预览窗中切换页面；也可用 URL 参数 <code>?rpml=examples/04-ticket-desk.rpml</code>。</p>
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

  /* ── Figma-style preview shell ── */
  .pg-shell{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;
    background:#1e1e2e;overflow:hidden}
  .pg-canvas{position:relative;flex:none;display:flex;align-items:center;justify-content:center;
    width:min(1280px,calc(100vw - 96px));height:calc(100vh - 96px);
    background:#fff;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,.35);overflow:auto}
  .pg-canvas > page-el{display:block;width:fit-content;max-width:none;margin:0 auto}
  .pg-canvas > .pg-err-inline{padding:40px;color:#dc2626;font-family:ui-monospace,Menlo,monospace}

  /* ── Bottom-left page switcher ── */
  .pg-switcher{position:fixed;bottom:20px;left:20px;z-index:200;display:flex;align-items:center;gap:8px;
    padding:8px 14px;border:1px solid rgba(255,255,255,.12);border-radius:10px;
    background:rgba(30,30,38,.92);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:13px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    box-shadow:0 4px 16px rgba(0,0,0,.3);cursor:pointer;user-select:none;transition:border-color .15s}
  .pg-switcher:hover{border-color:rgba(255,255,255,.25)}
  .pg-switcher-icon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;opacity:.7}
  .pg-switcher-label{max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pg-switcher-count{font-size:11px;color:#6b7280;font-weight:600}

  .pg-dropdown{position:fixed;bottom:60px;left:20px;z-index:201;display:none;flex-direction:column;
    width:260px;max-height:360px;overflow-y:auto;
    border:1px solid rgba(255,255,255,.12);border-radius:10px;
    background:rgba(30,30,38,.96);backdrop-filter:blur(12px);
    box-shadow:0 8px 32px rgba(0,0,0,.4);padding:4px}
  .pg-dropdown.open{display:flex}
  .pg-dd-item{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:7px;
    color:#cbd5e1;font-size:13px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .pg-dd-item:hover{background:rgba(255,255,255,.08)}
  .pg-dd-item.active{background:rgba(99,102,241,.2);color:#a5b4fc;font-weight:600}
  .pg-dd-group{padding:10px 12px 4px;font-size:10px;font-weight:700;color:#6b7280;
    text-transform:uppercase;letter-spacing:.05em}

  /* ── Top-right toolbar ── */
  .pg-toolbar{position:fixed;top:20px;right:20px;z-index:200;display:flex;gap:8px}
  .pg-tb-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;
    border:1px solid rgba(255,255,255,.12);border-radius:9px;
    background:rgba(30,30,38,.92);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:16px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.3);
    transition:border-color .15s,background .15s}
  .pg-tb-btn:hover{border-color:rgba(255,255,255,.25);background:rgba(40,40,52,.92)}
</style>`;

  const script = `<script type="module">
  import { parseToPage } from './dist/rpml-loader.js';
  import { liveRender } from './dist/rpui.js';
  import { initTheme, currentTheme, setTheme } from './dist/rpui.js';

  const errEl = document.getElementById('pg-err');
  const drop = document.getElementById('pg-drop');
  const fileInput = document.getElementById('pg-file');
  const picker = document.getElementById('pg-picker');

  // ── State ──
  let docs = [];          // [{ path, source }] for multi-file; empty for single file
  let currentIdx = 0;
  let singleSource = null; // string for single-file mode

  // ── Figma-style preview shell ──
  function takeOver() {
    document.body.innerHTML = '';
    const shell = document.createElement('div');
    shell.className = 'pg-shell';
    shell.id = 'pg-shell';

    const canvas = document.createElement('div');
    canvas.className = 'pg-canvas';
    canvas.id = 'pg-canvas';
    shell.appendChild(canvas);

    // Toolbar (top-right): theme toggle + open file + close
    const toolbar = document.createElement('div');
    toolbar.className = 'pg-toolbar';
    const themeBtn = document.createElement('button');
    themeBtn.className = 'pg-tb-btn'; themeBtn.type = 'button'; themeBtn.title = '切换亮色/暗色'; themeBtn.textContent = '◑';
    const openBtn = document.createElement('button');
    openBtn.className = 'pg-tb-btn'; openBtn.type = 'button'; openBtn.title = '打开文件'; openBtn.textContent = '⌄';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'pg-tb-btn'; closeBtn.type = 'button'; closeBtn.title = '返回'; closeBtn.textContent = '×';
    toolbar.append(themeBtn, openBtn, closeBtn);
    shell.appendChild(toolbar);

    // Page switcher (bottom-left) — hidden for single file
    const switcher = document.createElement('div');
    switcher.className = 'pg-switcher'; switcher.id = 'pg-switcher';
    switcher.style.display = 'none';
    switcher.innerHTML = '<span class="pg-switcher-icon">▤</span><span class="pg-switcher-label" id="pg-sw-label"></span><span class="pg-switcher-count" id="pg-sw-count"></span>';
    shell.appendChild(switcher);

    const dropdown = document.createElement('div');
    dropdown.className = 'pg-dropdown'; dropdown.id = 'pg-dropdown';
    shell.appendChild(dropdown);

    document.body.appendChild(shell);

    // Wire toolbar
    initTheme();
    themeBtn.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
    openBtn.addEventListener('click', () => fileInput.click());
    closeBtn.addEventListener('click', () => location.href = 'playground.html');

    // Wire switcher
    switcher.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }

  function renderCanvas(source) {
    const canvas = document.getElementById('pg-canvas');
    if (!canvas) return;
    try {
      const page = parseToPage(source);
      canvas.innerHTML = '';
      canvas.appendChild(page);
    } catch (e) {
      canvas.innerHTML = '<div class="pg-err-inline">RPML 解析错误：' + e.message + '</div>';
    }
  }

  function renderOne(source) {
    singleSource = source;
    docs = [];
    takeOver();
    renderCanvas(source);
  }

  function renderMulti(docList) {
    docs = docList;
    currentIdx = 0;
    singleSource = null;
    takeOver();
    showPage(0);
    updateSwitcher();
  }

  function showPage(idx) {
    if (idx < 0 || idx >= docs.length) return;
    currentIdx = idx;
    renderCanvas(docs[idx].source);
    updateSwitcher();
    // Update URL hash without reload
    history.replaceState(null, '', '#' + docs[idx].path);
  }

  function docTitle(source, fallback) {
    const m = source.match(/<page\\b[^>]*\\btitle="([^"]*)"/i);
    return m?.[1] || fallback;
  }

  function basename(path) { return path.split('/').pop() || path; }

  function updateSwitcher() {
    const switcher = document.getElementById('pg-switcher');
    const dropdown = document.getElementById('pg-dropdown');
    if (!switcher || !dropdown) return;
    if (docs.length <= 1) { switcher.style.display = 'none'; return; }
    switcher.style.display = 'flex';
    const label = document.getElementById('pg-sw-label');
    const count = document.getElementById('pg-sw-count');
    if (label) label.textContent = docTitle(docs[currentIdx].source, basename(docs[currentIdx].path).replace(/\\.rpml$/i, ''));
    if (count) count.textContent = (currentIdx + 1) + ' / ' + docs.length;

    // Build dropdown items
    let html = '';
    let lastGroup = null;
    for (let i = 0; i < docs.length; i++) {
      const d = docs[i];
      const parts = d.path.split('/');
      const group = parts.length > 1 ? parts.slice(0, -1).join('/') : null;
      if (group && group !== lastGroup) { html += '<div class="pg-dd-group">' + group + '</div>'; lastGroup = group; }
      const title = docTitle(d.source, basename(d.path).replace(/\\.rpml$/i, ''));
      html += '<div class="pg-dd-item' + (i === currentIdx ? ' active' : '') + '" data-idx="' + i + '">' + title + '</div>';
    }
    dropdown.innerHTML = html;
    dropdown.querySelectorAll('.pg-dd-item').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        const idx = parseInt(el.dataset.idx, 10);
        showPage(idx);
        dropdown.classList.remove('open');
      });
    });
  }

  function loadFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => renderOne(String(reader.result));
    reader.onerror = () => { if (errEl) errEl.textContent = '文件读取失败'; };
    reader.readAsText(file);
  }

  // ── folder → multi-page preview ──
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
    if (!docs.length) { if (errEl) errEl.textContent = '文件夹内没有 .rpml 文件'; return; }
    docs.sort((a, b) => a.path.localeCompare(b.path));
    renderMulti(docs);
  }

  // ── URL param ──
  const src = new URLSearchParams(location.search).get('rpml');
  if (src) {
    fetch(src).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(renderOne)
      .catch(e => {
        document.body.innerHTML = '<div class="pg-err" style="padding:40px">加载失败：' + e.message + '</div>';
      });
  }

  picker?.addEventListener('click', () => fileInput.click());
  fileInput?.addEventListener('change', () => loadFile(fileInput.files[0]));

  // ── drag and drop (file or folder) ──
  let depth = 0;
  window.addEventListener('dragenter', e => { e.preventDefault(); depth++; if (drop) drop.classList.add('over'); });
  window.addEventListener('dragover', e => e.preventDefault());
  window.addEventListener('dragleave', e => { e.preventDefault(); if (--depth <= 0 && drop) drop.classList.remove('over'); });
  window.addEventListener('drop', e => {
    e.preventDefault(); depth = 0; if (drop) drop.classList.remove('over');
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
        "在线 RPML Playground — Figma 风格预览窗，拖拽 .rpml 文件即时渲染，文件夹多页切换。",
      head,
      bodyEnd: script,
    },
    body,
  );
}
