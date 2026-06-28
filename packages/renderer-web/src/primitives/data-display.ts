import { injectStyle } from '../core/style';
import { attr, csv, escapeHtml, intAttr } from '../core/dom';
import { icon } from '../core/icons';

// data display: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const dataDisplayStyle = `
table-el, table-el { display:table; border-collapse:collapse; width:fit-content; min-width:720px; max-width:980px; background:var(--rp-c-white); border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
.table-row { display:table-row; }
.table-el-cell { display:table-cell; padding:11px 12px; border-bottom:1px solid var(--rp-border); font-size:13px; vertical-align:middle; white-space:nowrap; }
.table-el-head .table-el-cell { background:var(--rp-c-gray-50); color:var(--rp-c-gray-500); font-size:12px; font-weight:750; }
.table-row:last-child .table-el-cell { border-bottom:0; }
table-list-row, table-list-row { display:grid; grid-template-columns:44px 150px 240px 90px 90px; align-items:center; width:100%; max-width:100%; min-width:0; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:var(--rp-c-white); }
table-list-row > span, table-list-row > span { padding:10px 12px; font-size:13px; }
table-list-row[state="unread"], table-list-row[state="unread"] { background:var(--rp-c-zinc-100); font-weight:700; }
table-list-row[state="selected"], table-list-row[state="selected"] { outline:2px solid var(--rp-a-black-12); background:var(--rp-c-zinc-50); }
table-list-row[state="highlighted"], table-list-row[state="highlighted"] { background:var(--rp-c-amber-50); }
table-list-row[state="disabled"], table-list-row[state="disabled"] { opacity:.5; }
bulk-action-bar, bulk-action-bar { display:flex; align-items:center; gap:8px; width:fit-content; padding:8px 10px; margin:0 0 10px; border:1px solid var(--rp-c-zinc-200); background:var(--rp-c-zinc-100); border-radius:8px; color:var(--rp-c-zinc-950); font-size:13px; font-weight:650; }
empty-el, empty-el { display:grid; justify-items:center; gap:8px; width:100%; max-width:100%; min-width:0; padding:24px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:var(--rp-c-white); color:var(--rp-c-gray-500); text-align:center; }
.empty-el-title { color:var(--rp-c-gray-900); font-weight:700; }
.empty-el-desc { font-size:13px; }
loading-el, loading-el { display:grid; gap:8px; min-width:260px; color:var(--rp-primary); }
.skeleton-el-line { height:14px; border-radius:999px; background:linear-gradient(90deg,var(--rp-c-gray-100),var(--rp-c-gray-200),var(--rp-c-gray-100)); }
.rp-spinner { display:inline-grid; place-items:center; width:32px; height:32px; }
alert-el, alert-el, toast-el, toast-el { display:flex; align-items:flex-start; gap:8px; width:fit-content; max-width:420px; padding:10px 12px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); font-size:13px; }
alert-el[type="info"], alert-el[type="info"], toast-el[type="info"], toast-el[type="info"] { border-color:var(--rp-c-zinc-200); background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); }
alert-el[type="success"], alert-el[type="success"], toast-el[type="success"], toast-el[type="success"] { border-color:var(--rp-c-green-200); background:var(--rp-c-green-50); color:var(--rp-c-green-800); }
alert-el[type="warning"], alert-el[type="warning"], toast-el[type="warning"], toast-el[type="warning"] { border-color:var(--rp-c-amber-200); background:var(--rp-c-amber-50); color:var(--rp-c-amber-800); }
alert-el[type="error"], alert-el[type="error"], toast-el[type="error"], toast-el[type="error"] { border-color:var(--rp-c-red-200); background:var(--rp-c-red-50); color:var(--rp-c-red-800); }
dropdown-el, dropdown-el, popover-el, popover-el { display:block; width:var(--snap-width,300px); padding:8px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); box-shadow:0 12px 24px var(--rp-a-slate-10); }
tooltip-el, tooltip-el { display:inline-block; width:fit-content; max-width:240px; padding:6px 8px; border-radius:6px; background:var(--rp-c-gray-900); color:var(--rp-c-white); font-size:12px; }
.rp-overlay-title { margin:0 0 8px; color:var(--rp-c-gray-900); font-size:14px; font-weight:750; }
modal-el, modal-el { display:block; width:min(var(--snap-width,480px), 100%); border:1px solid var(--rp-border); border-radius:12px; background:var(--rp-c-white); box-shadow:0 24px 48px var(--rp-a-slate-18); overflow:hidden; }
drawer-el, drawer-el { display:block; width:min(var(--snap-width,360px), 100%); min-height:320px; border:1px solid var(--rp-border); background:var(--rp-c-white); box-shadow:0 18px 40px var(--rp-a-slate-14); }
.modal-el-head, .drawer-el-head { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--rp-border); font-weight:750; }
.modal-el-body, .drawer-el-body { padding:16px; }
.modal-el-footer { display:flex; justify-content:flex-end; gap:8px; padding:12px 16px; border-top:1px solid var(--rp-border); background:var(--rp-c-gray-50); }
card-el, card-el { display:block; width:100%; max-width:100%; min-width:0; padding:14px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); }
.card-el-image { display:grid; place-items:center; height:120px; margin:-14px -14px 12px; border-radius:10px 10px 0 0; background:var(--rp-c-gray-100); color:var(--rp-c-gray-500); }
.card-el-title { display:block; color:var(--rp-c-gray-900); font-weight:750; }
.card-el-subtitle { display:block; margin-top:4px; color:var(--rp-c-gray-500); font-size:13px; }
.card-el-footer { display:block; margin:12px -14px -14px; padding:10px 14px; border-top:1px solid var(--rp-border); background:var(--rp-c-gray-50); }
stat-card, stat-card { display:grid; gap:6px; width:auto; min-width:0; padding:16px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); }
.rp-stat-label { color:var(--rp-c-gray-500); font-size:12px; font-weight:650; }
.rp-stat-value { color:var(--rp-c-gray-900); font-size:26px; font-weight:800; }
.rp-stat-change { font-size:12px; font-weight:700; }
stat-card[trend="up"] .rp-stat-change, stat-card[trend="up"] .rp-stat-change { color:var(--rp-success); }
stat-card[trend="down"] .rp-stat-change, stat-card[trend="down"] .rp-stat-change { color:var(--rp-danger); }
tag-el, tag-el { display:inline-flex; align-items:center; gap:5px; height:24px; padding:0 8px; border-radius:999px; background:var(--rp-c-zinc-100); color:var(--rp-c-gray-700); font-size:12px; font-weight:650; }
tag-el[color="green"], tag-el[color="green"] { background:var(--rp-c-green-100); color:var(--rp-c-green-800); }
tag-el[color="orange"], tag-el[color="orange"] { background:var(--rp-c-orange-100); color:var(--rp-c-orange-800); }
tag-el[color="red"], tag-el[color="red"] { background:var(--rp-c-red-100); color:var(--rp-c-red-800); }

/* --- data display additions --- */
chip-el, chip-el { display:inline-flex; align-items:center; gap:5px; height:26px; padding:0 9px; border-radius:999px; border:1px solid var(--rp-border); background:var(--rp-c-gray-50); color:var(--rp-c-gray-700); font-size:12px; }
tree-el, tree-el { display:flex; flex-direction:column; gap:1px; width:fit-content; min-width:240px; }
.tree-el-row { display:flex; align-items:center; gap:6px; padding:5px 8px; border-radius:6px; color:var(--rp-c-gray-700); font-size:13px; padding-left:calc(8px + var(--tree-level,0) * 18px); }
.tree-el-row.selected { background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); font-weight:650; }
.tree-el-spacer { display:inline-block; width:12px; }
.tree-el-label { flex:1; }
timeline-el, timeline-el { display:flex; flex-direction:column; width:fit-content; min-width:260px; }
timeline-item, timeline-item { display:flex; gap:12px; padding-bottom:16px; position:relative; }
timeline-item:not(:last-child)::before, timeline-item:not(:last-child)::before { content:''; position:absolute; left:6px; top:16px; bottom:0; width:2px; background:var(--rp-border); }
.timeline-el-dot { flex:0 0 auto; width:14px; height:14px; margin-top:2px; border-radius:50%; background:var(--rp-c-white); border:2px solid var(--rp-border-strong); z-index:1; }
.timeline-el-dot.active { border-color:var(--rp-primary); background:var(--rp-primary); }
.timeline-el-dot.done { border-color:var(--rp-success); background:var(--rp-success); }
.timeline-el-dot.error { border-color:var(--rp-danger); background:var(--rp-danger); }
.timeline-el-main { flex:1; }
.timeline-el-head { display:flex; align-items:baseline; gap:8px; }
.timeline-el-label { font-weight:650; color:var(--rp-c-gray-900); font-size:13px; }
.timeline-el-time { font-size:12px; color:var(--rp-c-gray-400); }
.timeline-el-content { font-size:13px; color:var(--rp-c-gray-500); margin-top:2px; }
calendar-el, calendar-el { display:inline-block; width:280px; padding:12px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); }
.rp-cal-head { text-align:center; font-weight:700; font-size:14px; margin-bottom:10px; }
.rp-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
.rp-cal-dow { display:grid; place-items:center; height:24px; font-size:11px; color:var(--rp-c-gray-400); }
.rp-cal-cell { display:grid; place-items:center; height:32px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-700); }
.rp-cal-cell.selected { background:var(--rp-primary); color:var(--rp-c-white); font-weight:700; }
.rp-cal-cell.muted { color:transparent; }
kanban-el, kanban-el { display:flex; gap:12px; width:fit-content; align-items:flex-start; }
kanban-column, kanban-column { display:flex; flex-direction:column; width:200px; padding:10px; border-radius:10px; background:var(--rp-c-gray-100); }
.kanban-el-head { display:flex; align-items:center; justify-content:space-between; font-weight:650; font-size:13px; margin-bottom:8px; color:var(--rp-c-gray-700); }
.kanban-el-count { display:grid; place-items:center; min-width:18px; height:18px; padding:0 5px; border-radius:999px; background:var(--rp-c-gray-200); font-size:11px; }
.kanban-el-body { display:flex; flex-direction:column; gap:8px; }
kanban-card, kanban-card { display:block; padding:10px; border-radius:8px; background:var(--rp-c-white); border:1px solid var(--rp-border); }
.kanban-card-title { display:block; font-size:13px; color:var(--rp-c-gray-900); }
.kanban-card-tag { display:inline-block; margin-top:6px; padding:1px 7px; border-radius:999px; background:var(--rp-c-zinc-100); color:var(--rp-c-gray-700); font-size:11px; }
code-block, code-block { display:block; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:var(--rp-c-slate-900); }
.rp-code-head { padding:6px 12px; font-family:ui-monospace,Menlo,monospace; font-size:11px; color:var(--rp-c-slate-400); background:var(--rp-c-slate-800); }
.rp-code-body { padding:10px 0; }
.rp-code-line { display:flex; align-items:center; gap:12px; padding:1px 12px; }
.rp-code-ln { width:20px; text-align:right; color:var(--rp-c-slate-600); font-family:ui-monospace,Menlo,monospace; font-size:11px; }
.rp-code-bar { height:8px; border-radius:3px; background:var(--rp-c-slate-700); }
diff-el, diff-el { display:block; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; font-family:ui-monospace,Menlo,monospace; }
.diff-el-line { display:flex; align-items:center; gap:10px; padding:2px 10px; }
.diff-el-line.add { background:var(--rp-c-green-100); }
.diff-el-line.del { background:var(--rp-c-red-100); }
.diff-el-sign { width:10px; color:var(--rp-c-gray-500); }
.diff-el-line.add .rp-code-bar { background:var(--rp-c-green-300); }
.diff-el-line.del .rp-code-bar { background:var(--rp-c-red-300); }
.diff-el-line.ctx .rp-code-bar { background:var(--rp-c-gray-200); }
image-grid, image-grid { display:grid; grid-template-columns:repeat(var(--grid-cols,3),1fr); gap:8px; width:fit-content; }
.rp-grid-cell { display:grid; place-items:center; width:80px; height:80px; border-radius:8px; background:var(--rp-c-gray-100); color:var(--rp-c-gray-400); }
key-value, key-value { display:flex; flex-direction:column; width:fit-content; min-width:240px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
kv-row, kv-row { display:flex; border-bottom:1px solid var(--rp-border); }
kv-row:last-child, kv-row:last-child { border-bottom:0; }
.rp-kv-key { width:120px; padding:8px 12px; background:var(--rp-c-gray-50); color:var(--rp-c-gray-500); font-size:13px; }
.rp-kv-val { flex:1; padding:8px 12px; color:var(--rp-c-gray-900); font-size:13px; }
accordion-el, accordion-el { display:flex; flex-direction:column; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
accordion-item, accordion-item { display:block; border-bottom:1px solid var(--rp-border); }
accordion-item:last-child, accordion-item:last-child { border-bottom:0; }
.accordion-el-head { display:flex; align-items:center; gap:8px; padding:11px 14px; font-weight:650; font-size:13px; color:var(--rp-c-gray-900); }
.accordion-el-body { padding:0 14px 14px 36px; font-size:13px; color:var(--rp-c-gray-500); }
banner-el, banner-el { display:flex; align-items:center; gap:10px; width:fit-content; min-width:480px; padding:12px 16px; border-radius:8px; font-size:13px; background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); border:1px solid var(--rp-c-zinc-200); }
banner-el[type="success"], banner-el[type="success"] { background:var(--rp-c-green-50); color:var(--rp-c-green-800); border-color:var(--rp-c-green-200); }
banner-el[type="warning"], banner-el[type="warning"] { background:var(--rp-c-amber-50); color:var(--rp-c-amber-800); border-color:var(--rp-c-amber-200); }
banner-el[type="error"], banner-el[type="error"] { background:var(--rp-c-red-50); color:var(--rp-c-red-800); border-color:var(--rp-c-red-200); }
.banner-el-text { flex:1; }
skeleton-el, skeleton-el { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:240px; }
.rp-skel { border-radius:8px; background:linear-gradient(90deg,var(--rp-c-gray-100),var(--rp-c-gray-200),var(--rp-c-gray-100)); }
.rp-skel-block { height:120px; }
.rp-skel-avatar { width:40px; height:40px; border-radius:50%; }
.rp-skel-avatar.sm { width:28px; height:28px; }
.rp-skel-row { display:flex; align-items:center; gap:10px; }
countdown-el, countdown-el { display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:999px; background:var(--rp-c-red-50); color:var(--rp-c-red-800); font-size:12px; font-weight:650; font-variant-numeric:tabular-nums; }
result-el, result-el { display:grid; justify-items:center; gap:8px; width:100%; max-width:100%; min-width:0; padding:32px; text-align:center; }
.result-el-icon.success { color:var(--rp-success); }
.result-el-icon.error { color:var(--rp-danger); }
.result-el-icon.empty { color:var(--rp-c-gray-400); }
.result-el-title { font-size:16px; font-weight:700; color:var(--rp-c-gray-900); }
.result-el-desc { font-size:13px; color:var(--rp-c-gray-500); }
permission-gate, permission-gate { display:block; position:relative; width:fit-content; }
.rp-gate-content { opacity:.4; filter:grayscale(1); pointer-events:none; }
.rp-gate-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:6px; background:var(--rp-a-white-60); color:var(--rp-c-gray-500); font-size:12px; font-weight:650; border-radius:8px; }
quota-bar, quota-bar { display:block; width:fit-content; min-width:240px; }
.rp-quota-head { display:flex; justify-content:space-between; font-size:12px; color:var(--rp-c-gray-700); margin-bottom:5px; }
.rp-quota-num.danger { color:var(--rp-danger); font-weight:700; }
.rp-quota-track { display:block; height:8px; border-radius:999px; background:var(--rp-c-gray-200); overflow:hidden; }
.rp-quota-fill { display:block; height:100%; background:var(--rp-primary); }
.rp-quota-fill.danger { background:var(--rp-danger); }
api-key, api-key { display:inline-flex; align-items:center; gap:8px; padding:6px 8px 6px 12px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-gray-50); }
.rp-apikey-val { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:var(--rp-c-gray-700); }
.rp-apikey-copy { display:grid; place-items:center; width:26px; height:26px; border-radius:6px; color:var(--rp-c-gray-500); }
audit-row, audit-row { display:flex; align-items:baseline; gap:8px; padding:8px 0; border-bottom:1px solid var(--rp-border); width:fit-content; min-width:320px; font-size:13px; }
.rp-audit-actor { font-weight:650; color:var(--rp-c-gray-900); }
.rp-audit-action { flex:1; color:var(--rp-c-gray-500); }
.rp-audit-time { color:var(--rp-c-gray-400); font-size:12px; }
workflow-node, workflow-node { display:inline-flex; align-items:center; gap:7px; padding:7px 12px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); font-size:13px; }
.rp-wf-icon.done { color:var(--rp-success); }
.rp-wf-icon.active { color:var(--rp-primary); }
.rp-wf-icon.error { color:var(--rp-danger); }
.rp-wf-icon.default { color:var(--rp-c-gray-400); }
comment-el, comment-el { display:block; width:fit-content; max-width:100%; }
.comment-el-head { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.comment-el-author { font-weight:650; font-size:13px; color:var(--rp-text); }
.comment-el-time { font-size:12px; color:var(--rp-muted); }
.comment-el-body { font-size:13px; line-height:1.6; color:var(--rp-c-gray-700); padding-left:36px; }
comment-el comment-el { margin:12px 0 0; padding-left:14px; border-left:2px solid var(--rp-border); }
comment-el.comment-el-me .comment-el-author { color:var(--rp-primary); }
file-list, file-list { display:flex; flex-direction:column; gap:8px; width:100%; max-width:100%; min-width:0; }
file-item, file-item { display:flex; align-items:center; gap:10px; padding:9px 12px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); font-size:13px; }
file-item[state="error"], file-item[state="error"] { border-color:var(--rp-c-red-200); background:var(--rp-c-red-50); }
.rp-file-ic { display:inline-grid; place-items:center; color:var(--rp-primary); flex:0 0 auto; }
.rp-file-ic.error { color:var(--rp-danger); }
.rp-file-ic.uploading { color:var(--rp-primary); }
.rp-file-name { flex:1 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--rp-text); }
.rp-file-size { color:var(--rp-muted); font-size:12px; flex:0 0 auto; }
.rp-file-err { color:var(--rp-danger); font-size:12px; flex:0 0 auto; }
.rp-file-progress { width:80px; height:6px; border-radius:999px; background:var(--rp-c-gray-100); overflow:hidden; flex:0 0 auto; }
.rp-file-bar { display:block; height:100%; background:var(--rp-primary); border-radius:999px; }
`;

const CELL_SAMPLES = {
  name: ['张三','李四','王五','赵六','陈七','周八'],
  preview: ['请确认新的项目评审时间','本周周报已发送','你的账号存在新的登录','活动报名已通过审核','附件已更新','安全策略变更提醒'],
  time: ['09:12','昨天','周二','5月30日','5月28日','5月20日'],
  status: ['进行中','已完成','已取消','待审核','处理中','失败'],
  num: ['128','256','64','1,024','512','89'],
  cat: ['高','中','低','P0','P1','P2'],
};
export function sampleCell(c:string, _j:number, i:number) {
  const s = c.toLowerCase();
  const has = (...k:string[]) => k.some(x => c.includes(x) || s.includes(x));
  if (has('发件','name','名称','姓名','负责人','用户','账号','标题','商品','任务','功能模块','工作区','分配给','编号','sku')) return CELL_SAMPLES.name[i%6];
  if (has('预览','内容','消息','描述','preview')) return CELL_SAMPLES.preview[i%6];
  if (has('时间','日期','time')) return CELL_SAMPLES.time[i%6];
  if (has('状态','status')) return CELL_SAMPLES.status[i%6];
  if (has('价格','小计','SLA','环比','请求','次数','数','量','库存')) return CELL_SAMPLES.num[i%6];
  if (has('分类','级别','类型','渠道','优先级','套餐','范围','kind','type')) return CELL_SAMPLES.cat[i%6];
  return `Data ${i+1}-${_j+1}`;
}
export class TableElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const cols = csv(this,'columns','Name,Preview,Time,Status'); const hasCheckbox = this.hasAttribute('has-checkbox'); const hasAction = this.hasAttribute('has-action'); const finalCols = hasAction ? [...cols, '操作'] : cols; const headCells = `${hasCheckbox ? '<span class="table-el-cell">✓</span>' : ''}${finalCols.map(c=>`<span class="table-el-cell">${escapeHtml(c)}</span>`).join('')}`; const rowEls = Array.from(this.querySelectorAll(':scope > table-row')) as HTMLElement[]; const rowHtml = (cells: string[], checked: boolean) => `${hasCheckbox ? `<span class="table-el-cell"><span class="rp-box">${checked ? icon('check',12) : ''}</span></span>` : ''}${cells.map(c=>`<span class="table-el-cell">${escapeHtml(c)}</span>`).join('')}${hasAction ? `<span class="table-el-cell"><button-el label="查看" variant="link"></button-el></span>` : ''}`; let body: string; if (rowEls.length) { body = rowEls.map(row => `<div class="table-row">${rowHtml(csv(row,'content',''), row.hasAttribute('checked') || attr(row,'state')==='selected')}</div>`).join(''); } else { const rows = intAttr(this,'rows',4); body = Array.from({length: rows}, (_,i) => `<div class="table-row">${rowHtml(finalCols.filter(c=>c!=='操作').map((c,j)=>sampleCell(c,j,i)), i===1)}</div>`).join(''); } this.innerHTML = `<div class="table-row table-el-head">${headCells}</div>${body}`; } }
export class TableRowElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; if (this.closest('table-el')) return; const items = csv(this,'content',''); this.style.display='grid'; this.style.alignItems='center'; this.style.gridTemplateColumns = items.map(() => 'minmax(120px,1fr)').join(' '); this.innerHTML = items.map(c => `<span>${escapeHtml(c)}</span>`).join(''); } }
export class TableListRowElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const state = attr(this,'state','default'); const items = csv(this,'content',''); const cells = items.length ? items : ['张三','消息内容预览文本','09:12', state]; const selected = state === 'selected'; this.style.gridTemplateColumns = `44px ${cells.map(() => 'minmax(120px,1fr)').join(' ')}`; this.innerHTML = `<span><span class="rp-box">${selected ? icon('check',12) : ''}</span></span>${cells.map(c => `<span>${escapeHtml(c)}</span>`).join('')}`; } }
export class BulkActionBarElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const count = attr(this,'count','1'); const actions = csv(this,'actions','确认,取消'); this.innerHTML = `${icon('check')}<span>已选 ${escapeHtml(count)} 项</span>${actions.map(a=>`<button-el label="${escapeHtml(a)}" variant="ghost"></button-el>`).join('')}`; } }
export class EmptyElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `${icon('empty',28)}<span class="empty-el-title">${escapeHtml(attr(this,'label','暂无数据'))}</span><span class="empty-el-desc">${escapeHtml(attr(this,'description',''))}</span>${this.hasAttribute('has-action') ? '<button-el label="新建" variant="primary" icon="plus"></button-el>' : ''}`; } }
export class LoadingElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const rows = intAttr(this,'rows',3); this.innerHTML = attr(this,'kind') === 'spinner' || attr(this,'style') === 'spinner' ? `<span class="rp-spinner">${icon('loader',24)}</span>` : Array.from({length: rows}, (_,i)=>`<span class="skeleton-el-line" style="width:${220 - i*24}px"></span>`).join(''); } }
export class AlertElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const type = attr(this,'type','info'); const title = attr(this,'title', type === 'error' ? '错误' : '提示'); const message = attr(this,'message',''); const ic = type === 'error' ? 'circle-alert' : type === 'warning' ? 'alert-triangle' : type === 'success' ? 'circle-check' : 'info'; this.innerHTML = `${icon(ic)}<span><strong>${escapeHtml(title)}</strong>${message ? `<br>${escapeHtml(message)}` : ''}</span>${this.hasAttribute('closable') ? icon('x',14) : ''}`; } }
export class OverlayElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; const children = Array.from(this.childNodes); const title = attr(this,'title'); if (!title) return; const head = document.createElement('div'); head.className = 'rp-overlay-title'; head.textContent = title; this.prepend(head); children.forEach(n => this.appendChild(n)); } }
export class TooltipElement extends HTMLElement { connectedCallback() { injectStyle(); if (!this.textContent?.trim()) this.textContent = attr(this,'text','提示内容'); } }
export class ModalElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; this.style.setProperty('--snap-width', `${attr(this,'width','480')}px`); const children = Array.from(this.childNodes); const body = document.createElement('div'); body.className = 'modal-el-body'; children.forEach(n => body.appendChild(n)); this.innerHTML = `<div class="modal-el-head"><span>${escapeHtml(attr(this,'title','标题'))}</span>${icon('x',14)}</div>`; this.appendChild(body); if (this.hasAttribute('has-footer')) this.insertAdjacentHTML('beforeend', '<div class="modal-el-footer"><button-el label="取消"></button-el><button-el label="确认" variant="primary"></button-el></div>'); } }
export class DrawerElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; this.style.setProperty('--snap-width', `${attr(this,'width','360')}px`); const children = Array.from(this.childNodes); const body = document.createElement('div'); body.className = 'drawer-el-body'; children.forEach(n => body.appendChild(n)); this.innerHTML = `<div class="drawer-el-head"><span>${escapeHtml(attr(this,'title','抽屉'))}</span>${icon('x',14)}</div>`; this.appendChild(body); } }
export class CardElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; const children = Array.from(this.childNodes); const title = attr(this,'title'); const subtitle = attr(this,'subtitle'); this.innerHTML = `${this.hasAttribute('has-image') ? `<span class="card-el-image">${icon('image')} Image</span>` : ''}${title ? `<span class="card-el-title">${escapeHtml(title)}</span>` : ''}${subtitle ? `<span class="card-el-subtitle">${escapeHtml(subtitle)}</span>` : ''}`; children.forEach(n => this.appendChild(n)); if (this.hasAttribute('has-footer')) this.insertAdjacentHTML('beforeend', '<span class="card-el-footer"><button-el label="查看" variant="secondary"></button-el></span>'); } }
export class StatCardElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; this.innerHTML = `<span class="rp-stat-label">${escapeHtml(attr(this,'label','指标'))}</span><span class="rp-stat-value">${escapeHtml(attr(this,'value','128'))}</span><span class="rp-stat-change">${escapeHtml(attr(this,'change','0%'))}</span>`; } }
export class TagElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; const label = attr(this,'label', this.textContent?.trim() || 'Tag'); this.innerHTML = `<span>${escapeHtml(label)}</span>${this.hasAttribute('closable') ? icon('x',12) : ''}`; } }

export class ChipElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label', this.textContent?.trim() || 'Chip'); const ic = attr(this,'icon'); this.innerHTML = `${ic ? icon(ic,12) : ''}<span>${escapeHtml(label)}</span>${this.hasAttribute('closable') ? icon('x',11) : ''}`; } }
export class TreeElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class TreeItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const level = intAttr(this,'level',0); const label = attr(this,'label','Node'); const ic = attr(this,'icon'); const expandable = this.hasAttribute('expanded') || this.hasAttribute('collapsed'); const expanded = this.hasAttribute('expanded'); const caret = expandable ? icon(expanded ? 'chevron-down' : 'chevron-right',12) : '<span class="tree-el-spacer"></span>'; this.style.setProperty('--tree-level', String(level)); this.innerHTML = `<span class="tree-el-row${attr(this,'state')==='selected' ? ' selected' : ''}">${caret}${icon(ic || (expandable ? 'folder' : 'file'),14)}<span class="tree-el-label">${escapeHtml(label)}</span></span>`; } }
export class TimelineElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class TimelineItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const label = attr(this,'label'); const time = attr(this,'time'); const state = attr(this,'state','default'); const dot = `<span class="timeline-el-dot ${state}"></span>`; const head = `<div class="timeline-el-head"><span class="timeline-el-label">${escapeHtml(label)}</span>${time ? `<span class="timeline-el-time">${escapeHtml(time)}</span>` : ''}</div>`; const body = document.createElement('div'); body.className = 'timeline-el-content'; children.forEach(n=>body.appendChild(n)); this.innerHTML = `${dot}<div class="timeline-el-main">${head}</div>`; this.querySelector('.timeline-el-main')!.appendChild(body); } }
export class CalendarElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const month = attr(this,'month','2026 年 6 月'); const selected = intAttr(this,'selected',15); const dows = ['一','二','三','四','五','六','日']; const cells = Array.from({length:35},(_,i)=>{ const day = i - 1; const valid = day >= 1 && day <= 30; return `<span class="rp-cal-cell${valid && day===selected ? ' selected' : ''}${valid ? '' : ' muted'}">${valid ? day : ''}</span>`; }).join(''); this.innerHTML = `<div class="rp-cal-head"><span>${escapeHtml(month)}</span></div><div class="rp-cal-grid">${dows.map(d=>`<span class="rp-cal-dow">${d}</span>`).join('')}${cells}</div>`; } }
export class KanbanElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class KanbanColumnElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const title = attr(this,'title','列'); const count = attr(this,'count'); const head = document.createElement('div'); head.className = 'kanban-el-head'; head.innerHTML = `<span>${escapeHtml(title)}</span>${count ? `<span class="kanban-el-count">${escapeHtml(count)}</span>` : ''}`; const body = document.createElement('div'); body.className = 'kanban-el-body'; children.forEach(n=>body.appendChild(n)); this.append(head, body); } }
export class KanbanCardElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label','卡片'); const tag = attr(this,'tag'); this.innerHTML = `<span class="kanban-card-title">${escapeHtml(label)}</span>${tag ? `<span class="kanban-card-tag">${escapeHtml(tag)}</span>` : ''}`; } }
export class CodeBlockElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const lines = intAttr(this,'lines',5); const lang = attr(this,'lang','ts'); const body = Array.from({length:lines},(_,i)=>`<span class="rp-code-line"><span class="rp-code-ln">${i+1}</span><span class="rp-code-bar" style="width:${40 + ((i*37)%50)}%"></span></span>`).join(''); this.innerHTML = `<div class="rp-code-head">${escapeHtml(lang)}</div><div class="rp-code-body">${body}</div>`; } }
export class DiffElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const rows = intAttr(this,'rows',4); const body = Array.from({length:rows},(_,i)=>{ const kind = i%3===0 ? 'add' : i%3===1 ? 'del' : 'ctx'; const sign = kind==='add'?'+':kind==='del'?'-':' '; return `<span class="diff-el-line ${kind}"><span class="diff-el-sign">${sign}</span><span class="rp-code-bar" style="width:${45+((i*29)%45)}%"></span></span>`; }).join(''); this.innerHTML = body; } }
export class ImageGridElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const count = intAttr(this,'count',6); const cols = intAttr(this,'columns',3); this.style.setProperty('--grid-cols', String(cols)); this.innerHTML = Array.from({length:count},()=>`<span class="rp-grid-cell">${icon('image',20)}</span>`).join(''); } }
export class KeyValueElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class KvRowElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `<span class="rp-kv-key">${escapeHtml(attr(this,'label','键'))}</span><span class="rp-kv-val">${escapeHtml(attr(this,'value','值'))}</span>`; } }
export class AccordionElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class AccordionItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const label = attr(this,'label','分节'); const expanded = this.hasAttribute('expanded'); const head = document.createElement('div'); head.className = 'accordion-el-head'; head.innerHTML = `${icon(expanded ? 'chevron-down' : 'chevron-right',14)}<span>${escapeHtml(label)}</span>`; this.appendChild(head); if (expanded) { const body = document.createElement('div'); body.className = 'accordion-el-body'; children.forEach(n=>body.appendChild(n)); this.appendChild(body); } } }
export class BannerElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const type = attr(this,'type','info'); const ic = type==='error'?'circle-alert':type==='warning'?'alert-triangle':type==='success'?'circle-check':'info'; this.innerHTML = `${icon(ic)}<span class="banner-el-text"><strong>${escapeHtml(attr(this,'title','通知'))}</strong>${attr(this,'message') ? ` ${escapeHtml(attr(this,'message'))}` : ''}</span>${this.hasAttribute('has-action') ? '<button-el label="查看" variant="link"></button-el>' : ''}${this.hasAttribute('closable') ? icon('x',14) : ''}`; } }
export class SkeletonElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const shape = attr(this,'shape','line'); if (shape==='avatar') this.innerHTML = '<span class="rp-skel rp-skel-avatar"></span>'; else if (shape==='card') this.innerHTML = '<span class="rp-skel rp-skel-block"></span><span class="skeleton-el-line" style="width:70%"></span><span class="skeleton-el-line" style="width:50%"></span>'; else if (shape==='list') this.innerHTML = Array.from({length:3},()=>'<span class="rp-skel-row"><span class="rp-skel rp-skel-avatar sm"></span><span class="skeleton-el-line" style="width:60%"></span></span>').join(''); else this.innerHTML = '<span class="skeleton-el-line"></span>'; } }
export class CountdownElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `${icon('clock',13)}<span>${escapeHtml(attr(this,'value','02:45:18'))}</span>`; } }
export class ResultElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const status = attr(this,'status','success'); const ic = status==='error'?'circle-x':status==='empty'?'empty':'circle-check'; this.innerHTML = `<span class="result-el-icon ${status}">${icon(ic,40)}</span><span class="result-el-title">${escapeHtml(attr(this,'title','操作成功'))}</span><span class="result-el-desc">${escapeHtml(attr(this,'description',''))}</span>${this.hasAttribute('has-action') ? '<button-el label="返回" variant="primary"></button-el>' : ''}`; } }
export class PermissionGateElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const wrap = document.createElement('div'); wrap.className = 'rp-gate-content'; children.forEach(n=>wrap.appendChild(n)); const overlay = document.createElement('div'); overlay.className = 'rp-gate-overlay'; overlay.innerHTML = `${icon('lock',16)}<span>${escapeHtml(attr(this,'reason','无权限'))}</span>`; this.append(wrap, overlay); } }
export class QuotaBarElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const used = intAttr(this,'used',70); const limit = intAttr(this,'limit',100); const pct = limit ? Math.min(100,(used/limit)*100) : 0; const danger = pct >= 90; this.innerHTML = `<div class="rp-quota-head"><span>${escapeHtml(attr(this,'label','用量'))}</span><span class="rp-quota-num${danger ? ' danger' : ''}">${used} / ${limit}</span></div><span class="rp-quota-track"><span class="rp-quota-fill${danger ? ' danger' : ''}" style="width:${pct}%"></span></span>`; } }
export class ApiKeyElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const value = attr(this,'value','sk_live_••••••••••••3f9a'); this.innerHTML = `<span class="rp-apikey-val">${escapeHtml(value)}</span><span class="rp-apikey-copy">${icon('copy',14)}</span>`; } }
export class AuditRowElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `<span class="rp-audit-actor">${escapeHtml(attr(this,'actor','用户'))}</span><span class="rp-audit-action">${escapeHtml(attr(this,'action','执行了操作'))}</span><span class="rp-audit-time">${escapeHtml(attr(this,'time','刚刚'))}</span>`; } }
export class WorkflowNodeElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const state = attr(this,'state','default'); const ic = state==='done'?'circle-check':state==='active'?'circle':state==='error'?'circle-x':'circle'; this.innerHTML = `<span class="rp-wf-icon ${state}">${icon(ic,16)}</span><span class="rp-wf-label">${escapeHtml(attr(this,'label','节点'))}</span>`; } }

export class AvatarGroupElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const size = attr(this,'size','32'); this.style.setProperty('--snap-size', `${size}px`); const hasChildren = this.querySelector(':scope > avatar-el'); let html = ''; if (!hasChildren) { const items = intAttr(this,'items',3); const initials = ['A','B','C','D','E','F']; html = Array.from({length: items}, (_,i) => `<avatar-el initials="${initials[i%6]}" size="${size}"></avatar-el>`).join(''); } const overflow = intAttr(this,'overflow',0); if (overflow > 0) html += `<span class="rp-avatar-overflow">+${overflow}</span>`; if (html) this.insertAdjacentHTML('beforeend', html); } }
export class CommentElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const author = attr(this,'author','用户'); const initials = attr(this,'avatar', author.slice(0,1).toUpperCase() || 'U'); const time = attr(this,'time'); const isMe = attr(this,'state')==='me'; this.innerHTML = `<div class="comment-el-head"><avatar-el size="28" initials="${escapeHtml(initials)}"></avatar-el><span class="comment-el-author">${escapeHtml(author)}</span>${time ? `<span class="comment-el-time">${escapeHtml(time)}</span>` : ''}</div>`; const body = document.createElement('div'); body.className = 'comment-el-body'; children.forEach(n => body.appendChild(n)); this.appendChild(body); if (isMe) this.classList.add('comment-el-me'); } }
export class FileListElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady || this.children.length) return; this.dataset.rpReady='true'; const n = intAttr(this,'items',0); if (n > 0) { const names = ['方案.pdf','截图.png','数据.xlsx','README.md','合同.docx']; this.innerHTML = Array.from({length: n}, (_,i) => `<file-item name="${names[i%names.length]}" size="${200 + i*120} KB"></file-item>`).join(''); } } }
export class FileItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const name = attr(this,'name','document.pdf'); const size = attr(this,'size'); const state = attr(this,'state','uploaded'); const ext = name.split('.').pop()?.toLowerCase() || ''; const ic = ['png','jpg','jpeg','gif','svg','webp'].includes(ext) ? 'image' : 'file'; const glyph = state==='error' ? icon('circle-x',16) : state==='uploading' ? icon('loader',15) : icon(ic,16); const right = state==='uploading' ? `<span class="rp-file-progress"><span class="rp-file-bar" style="width:${escapeHtml(attr(this,'progress','60'))}%"></span></span>` : state==='error' ? `<span class="rp-file-err">失败</span>` : size ? `<span class="rp-file-size">${escapeHtml(size)}</span>` : ''; this.innerHTML = `<span class="rp-file-ic ${state}">${glyph}</span><span class="rp-file-name">${escapeHtml(name)}</span>${right}`; } }

