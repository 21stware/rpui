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
  .pg-shell{position:fixed;inset:0;z-index:100;background:#1e1e2e;overflow:hidden;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  /* Scrollable canvas pan area */
  .pg-viewport{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:auto}
  /* Frame holds the RPML page at natural size, then scaled via transform */
  .pg-frame{flex:none;transform-origin:center center;line-height:0}
  .pg-frame > *{display:block}
  .pg-err-inline{padding:40px;color:#dc2626;font-family:ui-monospace,Menlo,monospace;background:#fff;border-radius:8px}

  /* ── Bottom-left page switcher ── */
  .pg-switcher{position:fixed;bottom:20px;left:20px;z-index:200;display:flex;align-items:center;gap:6px;
    padding:7px 12px;border:1px solid rgba(255,255,255,.12);border-radius:8px;
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:13px;
    box-shadow:0 2px 12px rgba(0,0,0,.4);cursor:pointer;user-select:none;transition:border-color .15s}
  .pg-switcher:hover{border-color:rgba(255,255,255,.28)}
  .pg-sw-label{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pg-sw-arrow{opacity:.5;font-size:10px}

  .pg-dropdown{position:fixed;bottom:56px;left:20px;z-index:201;display:none;flex-direction:column;
    width:260px;max-height:360px;overflow-y:auto;
    border:1px solid rgba(255,255,255,.12);border-radius:10px;
    background:rgba(24,24,32,.96);backdrop-filter:blur(12px);
    box-shadow:0 8px 32px rgba(0,0,0,.5);padding:4px}
  .pg-dropdown.open{display:flex}
  .pg-dd-item{padding:8px 12px;border-radius:7px;color:#cbd5e1;font-size:13px;
    cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .pg-dd-item:hover{background:rgba(255,255,255,.08)}
  .pg-dd-item.active{background:rgba(99,102,241,.2);color:#a5b4fc;font-weight:600}
  .pg-dd-group{padding:10px 12px 4px;font-size:10px;font-weight:700;color:#6b7280;
    text-transform:uppercase;letter-spacing:.05em}

  /* ── Bottom-right zoom controls ── */
  .pg-zoom{position:fixed;bottom:20px;right:20px;z-index:200;display:flex;align-items:center;gap:2px}
  .pg-zoom-btn{display:flex;align-items:center;justify-content:center;width:30px;height:30px;
    border:1px solid rgba(255,255,255,.12);border-radius:7px;
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:15px;cursor:pointer;transition:border-color .12s}
  .pg-zoom-btn:hover{border-color:rgba(255,255,255,.28)}
  .pg-zoom-val{min-width:48px;text-align:center;height:30px;line-height:30px;
    border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#94a3b8;font-size:12px;font-weight:500;user-select:none}

  /* ── Top-right toolbar ── */
  .pg-toolbar{position:fixed;top:20px;right:20px;z-index:200;display:flex;gap:6px}
  .pg-tb-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;
    border:1px solid rgba(255,255,255,.12);border-radius:8px;
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:15px;cursor:pointer;
    transition:border-color .12s,background .12s}
  .pg-tb-btn:hover{border-color:rgba(255,255,255,.28)}
</style>`;

  const script = `<script type="module">
  import { parseToPage } from './dist/rpml-loader.js';
  import { initTheme, currentTheme, setTheme } from './dist/rpui.js';

  let fileInput = document.getElementById('pg-file');
  let picker = document.getElementById('pg-picker');

  // ── State ──
  let docs = [];
  let currentIdx = 0;
  let zoom = 1;

  // ── Zoom helpers ──
  const STEPS = [.1,.15,.2,.25,.33,.5,.67,.75,1,1.25,1.5,2];
  function applyZoom() {
    const frame = document.getElementById('pg-frame');
    if (!frame) return;
    frame.style.transform = 'scale(' + zoom + ')';
    const v = document.getElementById('pg-zoom-val');
    if (v) v.textContent = Math.round(zoom * 100) + '%';
  }
  function fitZoom() {
    const shell = document.getElementById('pg-shell');
    const frame = document.getElementById('pg-frame');
    if (!shell || !frame) return;
    const child = frame.firstElementChild;
    if (!child) return;
    frame.style.transform = 'none';
    const natW = child.offsetWidth || 1440;
    const natH = child.offsetHeight || 900;
    const availW = shell.clientWidth - 80;
    const availH = shell.clientHeight - 80;
    zoom = Math.max(Math.min(availW / natW, availH / natH, 1), 0.05);
    applyZoom();
  }
  function zoomIn() {
    const next = STEPS.find(s => s > zoom + 0.001);
    zoom = next ?? STEPS[STEPS.length - 1];
    applyZoom();
  }
  function zoomOut() {
    const prev = [...STEPS].reverse().find(s => s < zoom - 0.001);
    zoom = prev ?? STEPS[0];
    applyZoom();
  }

  // ── Shell builder ──
  function takeOver() {
    document.body.innerHTML = '';

    const shell = document.createElement('div');
    shell.className = 'pg-shell'; shell.id = 'pg-shell';

    const viewport = document.createElement('div');
    viewport.className = 'pg-viewport'; viewport.id = 'pg-viewport';
    const frame = document.createElement('div');
    frame.className = 'pg-frame'; frame.id = 'pg-frame';
    viewport.appendChild(frame);
    shell.appendChild(viewport);

    // Hidden file input
    const fi = document.createElement('input');
    fi.type = 'file'; fi.accept = '.rpml,.xml,text/plain'; fi.style.display = 'none';
    shell.appendChild(fi);
    fileInput = fi;
    fi.addEventListener('change', () => { if (fi.files[0]) loadFile(fi.files[0]); fi.value = ''; });

    // Top-right toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'pg-toolbar';
    const themeBtn = makeBtn('◑', '切换亮色/暗色');
    const openBtn  = makeBtn('⊕', '打开文件');
    const closeBtn = makeBtn('✕', '返回');
    toolbar.append(themeBtn, openBtn, closeBtn);
    shell.appendChild(toolbar);

    // Bottom-left page switcher (hidden when single file)
    const switcher = document.createElement('div');
    switcher.className = 'pg-switcher'; switcher.id = 'pg-switcher'; switcher.style.display = 'none';
    switcher.innerHTML = '<span class="pg-sw-label" id="pg-sw-label">Page</span><span class="pg-sw-arrow">▲</span>';
    const dropdown = document.createElement('div');
    dropdown.className = 'pg-dropdown'; dropdown.id = 'pg-dropdown';
    shell.append(switcher, dropdown);

    // Bottom-right zoom bar
    const zoomBar = document.createElement('div');
    zoomBar.className = 'pg-zoom';
    const zOutBtn = makeZBtn('−', '缩小');
    const zVal    = document.createElement('span');
    zVal.className = 'pg-zoom-val'; zVal.id = 'pg-zoom-val'; zVal.textContent = '100%';
    const zInBtn  = makeZBtn('+', '放大');
    const zFitBtn = makeZBtn('⤢', '适应窗口');
    zoomBar.append(zOutBtn, zVal, zInBtn, zFitBtn);
    shell.appendChild(zoomBar);

    document.body.appendChild(shell);

    initTheme();
    themeBtn.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
    openBtn.addEventListener('click', () => fi.click());
    closeBtn.addEventListener('click', () => location.href = 'playground.html');
    zOutBtn.addEventListener('click', zoomOut);
    zInBtn.addEventListener('click',  zoomIn);
    zFitBtn.addEventListener('click', fitZoom);
    window.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === '=') { e.preventDefault(); zoomIn(); }
      if ((e.metaKey || e.ctrlKey) && e.key === '-') { e.preventDefault(); zoomOut(); }
      if ((e.metaKey || e.ctrlKey) && e.key === '0') { e.preventDefault(); fitZoom(); }
    });
    switcher.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.toggle('open'); });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }

  function makeBtn(txt, title) {
    const b = document.createElement('button');
    b.className = 'pg-tb-btn'; b.type = 'button'; b.title = title; b.textContent = txt;
    return b;
  }
  function makeZBtn(txt, title) {
    const b = document.createElement('button');
    b.className = 'pg-zoom-btn'; b.type = 'button'; b.title = title; b.textContent = txt;
    return b;
  }

  // ── Render ──
  function renderFrame(source) {
    const frame = document.getElementById('pg-frame');
    if (!frame) return;
    frame.style.transform = 'none';
    try {
      frame.replaceChildren(parseToPage(source));
    } catch (e) {
      frame.innerHTML = '<div class="pg-err-inline">RPML 解析错误：' + e.message + '</div>';
    }
    requestAnimationFrame(() => requestAnimationFrame(fitZoom));
  }

  function renderOne(source) {
    docs = [];
    takeOver();
    renderFrame(source);
  }

  function renderMulti(docList) {
    docs = docList;
    currentIdx = 0;
    takeOver();
    showPage(0);
  }

  function showPage(idx) {
    if (idx < 0 || idx >= docs.length) return;
    currentIdx = idx;
    renderFrame(docs[idx].source);
    updateSwitcher();
    history.replaceState(null, '', '#' + docs[idx].path);
  }

  function docTitle(source, fallback) {
    const m = source.match(/<page\\b[^>]*\\btitle="([^"]*)"/i);
    return m?.[1] || fallback;
  }
  function basename(p) { return p.split('/').pop() || p; }

  function updateSwitcher() {
    const sw = document.getElementById('pg-switcher');
    const dd = document.getElementById('pg-dropdown');
    const lb = document.getElementById('pg-sw-label');
    if (!sw || !dd) return;
    if (docs.length <= 1) { sw.style.display = 'none'; return; }
    sw.style.display = 'flex';
    if (lb) lb.textContent = 'Page: ' + docTitle(docs[currentIdx].source, basename(docs[currentIdx].path).replace(/\\.rpml$/i, ''));
    let html = '';
    let lastGroup = null;
    for (let i = 0; i < docs.length; i++) {
      const d = docs[i];
      const parts = d.path.split('/');
      const group = parts.length > 1 ? parts.slice(0, -1).join('/') : null;
      if (group && group !== lastGroup) { html += '<div class="pg-dd-group">' + group + '</div>'; lastGroup = group; }
      html += '<div class="pg-dd-item' + (i === currentIdx ? ' active' : '') + '" data-idx="' + i + '">'
            + docTitle(d.source, basename(d.path).replace(/\\.rpml$/i, '')) + '</div>';
    }
    dd.innerHTML = html;
    dd.querySelectorAll('.pg-dd-item').forEach(el => el.addEventListener('click', e => {
      e.stopPropagation();
      showPage(parseInt(el.dataset.idx, 10));
      dd.classList.remove('open');
    }));
  }

  // ── File loading ──
  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => renderOne(String(reader.result));
    reader.readAsText(file);
  }
  function readEntryFile(entry) {
    return new Promise((res, rej) => entry.file(f => {
      const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsText(f);
    }, rej));
  }
  function readDir(de) {
    const reader = de.createReader();
    return new Promise((resolve, reject) => {
      const all = [];
      const pump = () => reader.readEntries(batch => { if (!batch.length) return resolve(all); all.push(...batch); pump(); }, reject);
      pump();
    });
  }
  async function collectRpml(entry, prefix, out) {
    if (entry.isFile) {
      if (/\\.rpml$/i.test(entry.name)) out.push({ path: prefix + entry.name, source: await readEntryFile(entry) });
      return;
    }
    for (const child of await readDir(entry)) await collectRpml(child, prefix + entry.name + '/', out);
  }
  async function loadFolder(rootEntry) {
    const collected = [];
    for (const child of await readDir(rootEntry)) await collectRpml(child, '', collected);
    if (!collected.length) return;
    collected.sort((a, b) => a.path.localeCompare(b.path));
    renderMulti(collected);
  }

  // ── URL param ──
  const src = new URLSearchParams(location.search).get('rpml');
  if (src) {
    fetch(src).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(renderOne)
      .catch(e => { document.body.innerHTML = '<p style="padding:40px;color:#dc2626">加载失败：' + e.message + '</p>'; });
  }

  picker?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', () => { if (fileInput?.files[0]) loadFile(fileInput.files[0]); });

  // ── Drag and drop ──
  let depth = 0;
  window.addEventListener('dragenter', e => { e.preventDefault(); depth++; document.getElementById('pg-drop')?.classList.add('over'); });
  window.addEventListener('dragover',  e => e.preventDefault());
  window.addEventListener('dragleave', e => { e.preventDefault(); if (--depth <= 0) document.getElementById('pg-drop')?.classList.remove('over'); });
  window.addEventListener('drop', e => {
    e.preventDefault(); depth = 0; document.getElementById('pg-drop')?.classList.remove('over');
    const entry = e.dataTransfer?.items?.[0]?.webkitGetAsEntry?.();
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
