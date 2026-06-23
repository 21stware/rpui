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

<div class="pg-layout">
  <div class="pg-sidebar" id="pg-sidebar">
    <h1>Playground</h1>
    <p class="pg-intro">拖拽 <code>.rpml</code> 文件或文件夹到预览区，或点击选择文件。</p>
    <input type="file" id="pg-file" accept=".rpml,.xml,text/plain" style="display:none" />
    <button class="pg-open-btn" id="pg-picker">选择文件…</button>
    <p class="pg-eyebrow">示例</p>
    <ul class="pg-examples" id="pg-examples">
      ${exLinks}
    </ul>
    <div class="pg-err" id="pg-err"></div>
  </div>
  <div class="pg-stage" id="pg-stage">
    <div class="pg-stage-hint" id="pg-stage-hint">拖拽 .rpml 文件到此处，或从左侧选择示例</div>
  </div>
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

  /* ── Playground layout: sidebar + stage ── */
  .pg-layout{display:grid;grid-template-columns:280px 1fr;height:calc(100vh - 60px)}
  .pg-sidebar{padding:24px 20px;overflow-y:auto;border-right:1px solid var(--line);background:var(--surface)}
  .pg-sidebar h1{font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 8px}
  .pg-intro{font-size:14px;color:var(--ink-2);margin:0 0 16px;line-height:1.5}
  .pg-open-btn{display:inline-block;padding:8px 16px;border:1px solid var(--line);border-radius:8px;
    background:var(--surface-warm);color:var(--ink);font-size:14px;cursor:pointer;margin-bottom:16px}
  .pg-open-btn:hover{border-color:var(--brand);color:var(--brand-ink)}
  .pg-examples{margin:0;padding:0;list-style:none}
  .pg-examples li{margin-bottom:6px}
  .pg-examples a{font-size:14px;color:var(--ink-2);cursor:pointer;text-decoration:none}
  .pg-examples a:hover{color:var(--brand-ink)}
  .pg-examples a.active{color:var(--brand-ink);font-weight:600}

  /* ── Stage: Figma-style preview area ── */
  .pg-stage{position:relative;background:#1e1e2e;overflow:hidden;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  .pg-stage-hint{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    color:#6b7280;font-size:15px;pointer-events:none}
  .pg-viewport{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:auto}
  .pg-frame{flex:none;transform-origin:center center;line-height:0;will-change:transform}
  .pg-frame > *{display:block}
  .pg-err-inline{padding:40px;color:#dc2626;font-family:ui-monospace,Menlo,monospace;background:#fff;border-radius:8px}

  /* ── Bottom-left page switcher (inside stage) ── */
  .pg-switcher{position:absolute;bottom:16px;left:16px;z-index:10;display:flex;align-items:center;gap:6px;
    padding:6px 11px;border:1px solid rgba(255,255,255,.12);border-radius:7px;
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:12px;
    box-shadow:0 2px 12px rgba(0,0,0,.4);cursor:pointer;user-select:none;transition:border-color .15s}
  .pg-switcher:hover{border-color:rgba(255,255,255,.28)}
  .pg-sw-label{max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pg-sw-arrow{opacity:.5;font-size:9px}

  .pg-dropdown{position:absolute;bottom:50px;left:16px;z-index:11;display:none;flex-direction:column;
    width:240px;max-height:320px;overflow-y:auto;
    border:1px solid rgba(255,255,255,.12);border-radius:9px;
    background:rgba(24,24,32,.96);backdrop-filter:blur(12px);
    box-shadow:0 8px 32px rgba(0,0,0,.5);padding:4px}
  .pg-dropdown.open{display:flex}
  .pg-dd-item{padding:7px 11px;border-radius:6px;color:#cbd5e1;font-size:12px;
    cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .pg-dd-item:hover{background:rgba(255,255,255,.08)}
  .pg-dd-item.active{background:rgba(99,102,241,.2);color:#a5b4fc;font-weight:600}
  .pg-dd-group{padding:8px 11px 3px;font-size:10px;font-weight:700;color:#6b7280;
    text-transform:uppercase;letter-spacing:.05em}

  /* ── Bottom-right zoom controls (inside stage) ── */
  .pg-zoom{position:absolute;bottom:16px;right:16px;z-index:10;display:flex;align-items:center;gap:2px}
  .pg-zoom-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;
    border:1px solid rgba(255,255,255,.12);border-radius:6px;
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:14px;cursor:pointer;transition:border-color .12s}
  .pg-zoom-btn:hover{border-color:rgba(255,255,255,.28)}
  .pg-zoom-val{min-width:44px;text-align:center;height:28px;line-height:28px;
    border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#94a3b8;font-size:11px;font-weight:500;user-select:none}

  /* ── Top-right toolbar (inside stage) ── */
  .pg-toolbar{position:absolute;top:16px;right:16px;z-index:10;display:flex;gap:5px}
  .pg-tb-btn{display:flex;align-items:center;justify-content:center;width:30px;height:30px;
    border:1px solid rgba(255,255,255,.12);border-radius:7px;
    background:rgba(24,24,32,.88);backdrop-filter:blur(12px);
    color:#e2e8f0;font-size:14px;cursor:pointer;
    transition:border-color .12s,background .12s}
  .pg-tb-btn:hover{border-color:rgba(255,255,255,.28)}
</style>`;

  const script = `<script type="module">
  import { parseToPage } from './dist/rpml-loader.js';
  import { initTheme, currentTheme, setTheme } from './dist/rpui.js';

  const fileInput = document.getElementById('pg-file');
  const picker = document.getElementById('pg-picker');
  const stage = document.getElementById('pg-stage');
  const stageHint = document.getElementById('pg-stage-hint');
  const errEl = document.getElementById('pg-err');

  // ── State ──
  let docs = [];
  let currentIdx = 0;
  let zoom = 1;
  let stageBuilt = false;

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
    if (!stage) return;
    const frame = document.getElementById('pg-frame');
    if (!frame) return;
    const child = frame.firstElementChild;
    if (!child) return;
    frame.style.transform = 'none';
    const natW = child.offsetWidth || 1440;
    const natH = child.offsetHeight || 900;
    const availW = stage.clientWidth - 60;
    const availH = stage.clientHeight - 60;
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

  // ── Build preview UI inside #pg-stage (no body clearing) ──
  function buildStage() {
    if (stageBuilt || !stage) return;
    stageBuilt = true;
    stage.innerHTML = '';

    const viewport = document.createElement('div');
    viewport.className = 'pg-viewport'; viewport.id = 'pg-viewport';
    const frame = document.createElement('div');
    frame.className = 'pg-frame'; frame.id = 'pg-frame';
    viewport.appendChild(frame);
    stage.appendChild(viewport);

    // Top-right toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'pg-toolbar';
    const themeBtn = makeBtn('\\u25D1', '切换亮色/暗色');
    const openBtn  = makeBtn('\\u2295', '打开文件');
    toolbar.append(themeBtn, openBtn);
    stage.appendChild(toolbar);

    // Bottom-left page switcher
    const switcher = document.createElement('div');
    switcher.className = 'pg-switcher'; switcher.id = 'pg-switcher'; switcher.style.display = 'none';
    switcher.innerHTML = '<span class="pg-sw-label" id="pg-sw-label">Page</span><span class="pg-sw-arrow">\\u25B2</span>';
    const dropdown = document.createElement('div');
    dropdown.className = 'pg-dropdown'; dropdown.id = 'pg-dropdown';
    stage.append(switcher, dropdown);

    // Bottom-right zoom bar
    const zoomBar = document.createElement('div');
    zoomBar.className = 'pg-zoom';
    const zOutBtn = makeZBtn('\\u2212', '缩小');
    const zVal    = document.createElement('span');
    zVal.className = 'pg-zoom-val'; zVal.id = 'pg-zoom-val'; zVal.textContent = '100%';
    const zInBtn  = makeZBtn('+', '放大');
    const zFitBtn = makeZBtn('\\u2922', '适应窗口');
    zoomBar.append(zOutBtn, zVal, zInBtn, zFitBtn);
    stage.appendChild(zoomBar);

    initTheme();
    themeBtn.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
    openBtn.addEventListener('click', () => fileInput?.click());
    zOutBtn.addEventListener('click', zoomOut);
    zInBtn.addEventListener('click',  zoomIn);
    zFitBtn.addEventListener('click', fitZoom);
    switcher.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.toggle('open'); });
    document.addEventListener('click', () => dropdown.classList.remove('open'));

    window.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === '=') { e.preventDefault(); zoomIn(); }
      if ((e.metaKey || e.ctrlKey) && e.key === '-') { e.preventDefault(); zoomOut(); }
      if ((e.metaKey || e.ctrlKey) && e.key === '0') { e.preventDefault(); fitZoom(); }
    });
    window.addEventListener('resize', () => { if (frame.firstElementChild) fitZoom(); });
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
    buildStage();
    if (stageHint) stageHint.style.display = 'none';
    renderFrame(source);
    const sw = document.getElementById('pg-switcher');
    if (sw) sw.style.display = 'none';
  }

  function renderMulti(docList) {
    docs = docList;
    currentIdx = 0;
    buildStage();
    if (stageHint) stageHint.style.display = 'none';
    showPage(0);
  }

  function showPage(idx) {
    if (idx < 0 || idx >= docs.length) return;
    currentIdx = idx;
    renderFrame(docs[idx].source);
    updateSwitcher();
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
    if (lb) lb.textContent = docTitle(docs[currentIdx].source, basename(docs[currentIdx].path).replace(/\\.rpml$/i, ''));
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
    if (!collected.length) { if (errEl) errEl.textContent = '文件夹内没有 .rpml 文件'; return; }
    collected.sort((a, b) => a.path.localeCompare(b.path));
    renderMulti(collected);
  }

  // ── Example links: intercept clicks, load inline ──
  document.querySelectorAll('#pg-examples a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const url = a.getAttribute('href');
      if (!url) return;
      document.querySelectorAll('#pg-examples a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      const rpml = new URLSearchParams(url.split('?')[1]).get('rpml');
      if (rpml) {
        fetch(rpml).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
          .then(renderOne)
          .catch(e => { if (errEl) errEl.textContent = '加载失败：' + e.message; });
      }
    });
  });

  // ── URL param: load but stay on page ──
  const src = new URLSearchParams(location.search).get('rpml');
  if (src) {
    fetch(src).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(renderOne)
      .catch(e => { if (errEl) errEl.textContent = '加载失败：' + e.message; });
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
