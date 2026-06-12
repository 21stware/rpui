export const RPUI_STYLE_ID = "rpui-runtime-style";

export const style = `
:root { --rp-bg:#f0f2f5; --rp-surface:#fff; --rp-surface-soft:#f9fafb; --rp-text:#111827; --rp-muted:#6b7280; --rp-border:#e5e7eb; --rp-border-strong:#d1d5db; --rp-primary:#2563eb; --rp-success:#059669; --rp-warning:#d97706; --rp-danger:#dc2626; --rp-purple:#7c3aed; --rp-radius-sm:4px; --rp-radius-md:8px; --rp-radius-lg:12px; --rp-shadow:0 8px 28px rgba(15,23,42,.08); --rp-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
* { box-sizing:border-box; }
body { margin:0; font-family:var(--rp-font); color:var(--rp-text); background:var(--rp-bg); }
.rp-icon { display:inline-block; flex:0 0 auto; vertical-align:-0.16em; }
page-el, page-el { display:block; min-height:100vh; padding:32px 40px; overflow:auto; }
.page-el-shell { display:grid; grid-template-columns:max-content max-content; gap:24px; min-height:100vh; align-items:start; }
.page-el-main { display:flex; flex-direction:column; min-width:0; overflow:visible; }
.page-el-header { flex:0 0 auto; width:fit-content; max-width:none; margin:0 0 22px; }
.page-el-title-row { display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; }
.page-el-title { margin:0; font-size:28px; line-height:1.2; letter-spacing:-.02em; }
.page-el-route { font-size:13px; color:var(--rp-muted); font-family:ui-monospace,SFMono-Regular,Menlo,monospace; background:rgba(255,255,255,.7); border:1px solid var(--rp-border); border-radius:999px; padding:3px 9px; }
.page-el-description { margin:10px 0 0; color:#374151; line-height:1.6; font-size:14px; }
.page-el-body { flex:0 1 auto; display:block; width:fit-content; max-width:100%; min-height:0; overflow:visible; }
.annotation-el-pane { min-width:380px; max-width:680px; position:sticky; top:0; height:100vh; overflow-y:auto; overflow-x:auto; padding:0 0 48px 0; align-self:start; }
.annotation-el-pane-inner { padding:4px 12px 24px 6px; }
main-view, main-view { display:block; width:fit-content; margin:0 0 28px; position:relative; }
.rp-main-shell { position:relative; overflow:visible; border:1px solid var(--rp-border-strong); border-radius:var(--rp-radius-md); background:var(--rp-surface); box-shadow:var(--rp-shadow); }
.rp-main-stage-clip { overflow:hidden; border-radius:var(--rp-radius-md); }
.rp-main-stage { position:relative; transform-origin:top left; background:var(--rp-surface); }
.rp-pin { position:absolute; z-index:20; display:grid; place-items:center; width:24px; height:24px; color:#fff; font-size:11px; font-weight:700; background:var(--rp-primary); border-radius:50% 50% 50% 0; transform:translate(-6px,-6px) rotate(-45deg); box-shadow:0 2px 8px rgba(37,99,235,.25); cursor:pointer; }
.rp-pin > span { transform:rotate(45deg); }
.rp-pin:hover { opacity:0.85; }
annotation-el, annotation-el { display:block; width:fit-content; max-width:980px; margin:14px 0; line-height:1.65; color:#1f2937; font-size:14px; }
annotation-el annotation-el, annotation-el annotation-el, annotation-el annotation-el, annotation-el annotation-el { margin:10px 0 8px 22px; }
.annotation-el-head { display:flex; align-items:center; gap:8px; margin:0 0 4px; width:fit-content; }
.annotation-el-title { font-weight:700; color:#111827; }
.annotation-el-marker { display:inline-grid; place-items:center; flex:0 0 auto; color:#fff; font-size:10px; font-weight:700; line-height:1; }
.annotation-el-marker.drop { width:22px; height:22px; background:var(--rp-primary); border-radius:50% 50% 50% 0; transform:rotate(-45deg); }
.annotation-el-marker.drop > span { transform:rotate(45deg); }
.annotation-el-marker.circle { width:16px; height:16px; background:var(--rp-purple); border-radius:50%; }
.annotation-el-marker.triangle { width:18px; height:16px; background:var(--rp-success); clip-path:polygon(50% 0, 100% 100%, 0 100%); }
.annotation-el-marker.triangle > span { transform:translateY(2px); font-size:9px; }
.annotation-el-marker.global { width:20px; height:20px; background:#0f172a; border-radius:6px; font-size:11px; }
annotation-global-el, annotation-global-el { display:block; width:fit-content; max-width:980px; margin:0 0 18px; padding:10px 12px 12px; line-height:1.65; color:#1f2937; font-size:14px; background:linear-gradient(180deg,#f8fafc,#fff); border:1px solid var(--rp-border); border-left:3px solid #0f172a; border-radius:var(--rp-radius-md); }
.annotation-el-pane annotation-global-el, .annotation-el-pane annotation-global-el { max-width:none; }
.annotation-el-pane annotation-global-el .annotation-el-body { max-width:none; }
.annotation-el-body { display:block; position:relative; width:fit-content; max-width:920px; }
.rp-pin-slice { width:18px; height:18px; font-size:10px; box-shadow:0 1px 5px rgba(37,99,235,.3); }
.annotation-el-body > :not(annotation-el):not(annotation-el):not(enum-el):not(enum-el) { max-width:820px; }
.annotation-el-pane annotation-el, .annotation-el-pane annotation-el { max-width:none; }
.annotation-el-pane .annotation-el-body { max-width:none; }
.annotation-el-pane .annotation-el-body > :not(annotation-el):not(annotation-el):not(enum-el):not(enum-el) { max-width:420px; }
.annotation-el-body p { margin:0 0 8px; }
enum-el, enum-el { display:flex; align-items:flex-start; flex-wrap:wrap; gap:10px; width:fit-content; margin:8px 0 12px; }
.annotation-el-pane enum-el, .annotation-el-pane enum-el { flex-wrap:wrap; }
enum-item, enum-item { display:block; flex:0 0 auto; width:fit-content; min-width:180px; max-width:600px; border:1px solid #f0f0f0; border-radius:var(--rp-radius-md); background:#fff; overflow:hidden; }
.enum-el-label { display:flex; align-items:flex-start; gap:6px; padding:5px 9px 4px; font-size:12px; font-weight:650; color:#374151; }
.enum-el-index { display:inline-grid; place-items:center; min-width:16px; height:16px; padding:0 4px; background:#111827; color:#fff; font-size:10px; font-weight:750; border-radius:3px; flex:0 0 auto; margin-top:1px; }
.enum-el-label-text { display:block; }
.enum-el-description { display:block; margin-top:2px; font-size:11px; line-height:1.35; font-weight:400; color:var(--rp-muted); }
.enum-el-content { display:block; width:fit-content; padding:8px; }
.annotation-el-title { font-weight:700; color:#111827; cursor:pointer; }
.annotation-el-title:hover { color:var(--rp-primary); }
.rp-section-focus { outline:2px dashed var(--rp-primary); outline-offset:4px; border-radius:4px; }
viewport-el, viewport-el { display:flex; flex-direction:column; width:var(--snap-width,1440px); height:var(--snap-height,900px); background:#f8fafc; overflow:hidden; color:#111827; }
layout-el, layout-el { display:grid; grid-template-columns:var(--snap-columns,1fr); grid-template-rows:var(--snap-rows,auto); gap:var(--snap-gap,0); align-content:start; width:fit-content; max-width:100%; min-width:0; }
layout-el > *, layout-el > * { min-width:0; }
viewport-el layout-el, viewport-el layout-el { width:100%; }
viewport-el > layout-el, viewport-el > layout-el { flex:1 1 auto; min-height:0; }
viewport-el > navbar-el, viewport-el > navbar-el { flex:0 0 auto; }
panel-el, panel-el { display:block; width:fit-content; max-width:100%; background:#fff; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); padding:var(--snap-padding,16px); }
viewport-el panel-el, viewport-el panel-el { width:auto; min-width:0; }
panel-el[elevation="1"], panel-el[elevation="1"] { box-shadow:0 4px 16px rgba(15,23,42,.06); }
panel-el[elevation="2"], panel-el[elevation="2"] { box-shadow:var(--rp-shadow); }
navbar-el, navbar-el { display:flex; align-items:center; gap:14px; height:var(--snap-height,64px); padding:0 24px; background:#fff; border-bottom:1px solid var(--rp-border); }
sidebar-el, sidebar-el { display:block; width:var(--snap-width,260px); min-height:0; background:#fff; border-right:1px solid var(--rp-border); padding:14px; }
viewport-el sidebar-el, viewport-el sidebar-el { min-height:100%; }
sidebar-el[collapsed], sidebar-el[collapsed] { width:72px; }
logo-el, logo-el { display:inline-grid; place-items:center; width:var(--snap-size,82px); height:32px; border-radius:8px; background:#111827; color:#fff; font-size:12px; font-weight:800; letter-spacing:.08em; }
search-el, search-el, input-el, input-el, date-picker, date-picker { display:inline-flex; align-items:center; gap:8px; width:280px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; }
textarea-el, textarea-el { display:block; width:320px; min-height:calc(var(--snap-rows,3) * 24px + 22px); padding:9px 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; white-space:pre-wrap; }
search-el[state="focus"], search-el[state="focus"], input-el[state="focus"], input-el[state="focus"], textarea-el[state="focus"], textarea-el[state="focus"], date-picker[state="focus"], date-picker[state="focus"] { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
search-el[state="filled"], search-el[state="filled"], input-el[state="filled"], input-el[state="filled"], textarea-el[state="filled"], textarea-el[state="filled"], date-picker[state="filled"], date-picker[state="filled"] { border-color:#93c5fd; background:#f8fbff; }
search-el[state="error"], search-el[state="error"], input-el[state="error"], input-el[state="error"], textarea-el[state="error"], textarea-el[state="error"], date-picker[state="error"], date-picker[state="error"] { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
search-el[state="disabled"], search-el[state="disabled"], input-el[state="disabled"], input-el[state="disabled"], textarea-el[state="disabled"], textarea-el[state="disabled"], date-picker[state="disabled"], date-picker[state="disabled"] { opacity:.55; background:#f3f4f6; }
input-el[label], input-el[label], date-picker[label], date-picker[label] { display:inline-grid; align-items:start; gap:6px; width:280px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
input-el[label][state="focus"], input-el[label][state="focus"], input-el[label][state="filled"], input-el[label][state="filled"], input-el[label][state="error"], input-el[label][state="error"], date-picker[label][state="focus"], date-picker[label][state="focus"], date-picker[label][state="filled"], date-picker[label][state="filled"], date-picker[label][state="error"], date-picker[label][state="error"] { border:0; background:transparent; box-shadow:none; }
.rp-field-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; }
input-el[state="focus"] .rp-field-control, input-el[state="focus"] .rp-field-control, date-picker[state="focus"] .rp-field-control, date-picker[state="focus"] .rp-field-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
input-el[state="filled"] .rp-field-control, input-el[state="filled"] .rp-field-control, date-picker[state="filled"] .rp-field-control, date-picker[state="filled"] .rp-field-control { border-color:#93c5fd; background:#f8fbff; }
input-el[state="error"] .rp-field-control, input-el[state="error"] .rp-field-control, date-picker[state="error"] .rp-field-control, date-picker[state="error"] .rp-field-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
.rp-field-label { display:block; margin:0 0 6px; color:#374151; font-size:12px; font-weight:650; }
.rp-placeholder { color:#9ca3af; }
.rp-value { color:#111827; }
.rp-error-text { color:var(--rp-danger); font-size:12px; }
select-el, select-el { display:inline-block; width:280px; max-width:100%; }
.select-el-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; }
select-el[state="expanded"] .select-el-control, select-el[state="expanded"] .select-el-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
select-el[state="disabled"], select-el[state="disabled"] { opacity:.55; }
.select-el-value { flex:1 1 auto; min-width:0; }
.select-el-options { display:none; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; box-shadow:0 10px 18px rgba(15,23,42,.08); }
select-el[state="expanded"] .select-el-options, select-el[state="expanded"] .select-el-options { display:grid; gap:2px; }
.select-el-option { padding:7px 8px; border-radius:6px; font-size:13px; color:#374151; }
.select-el-option.selected { background:#eff6ff; color:#1d4ed8; font-weight:700; }
badge-el, badge-el { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 6px; border-radius:999px; background:#ef4444; color:#fff; font-size:11px; font-weight:750; }
avatar-el, avatar-el { display:inline-grid; place-items:center; width:var(--snap-size,32px); height:var(--snap-size,32px); border-radius:999px; background:#e0e7ff; color:#3730a3; font-size:12px; font-weight:800; }
list-el, list-el { display:flex; flex-direction:column; gap:4px; width:100%; }
list-item, list-item { display:flex; align-items:center; gap:8px; width:100%; min-width:180px; height:36px; padding:0 10px; border-radius:8px; color:#374151; }
list-item[state="selected"], list-item[state="selected"] { background:#eff6ff; color:#1d4ed8; font-weight:700; }
list-item[state="disabled"], list-item[state="disabled"] { opacity:.5; }
.list-el-label { flex:1 1 auto; }
.list-el-badge { margin-left:auto; min-width:18px; height:18px; border-radius:999px; display:grid; place-items:center; padding:0 6px; background:#e5e7eb; color:#374151; font-size:11px; font-weight:700; }
tabs-el, tabs-el { display:flex; gap:6px; border-bottom:1px solid var(--rp-border); margin-bottom:12px; width:fit-content; }
tab-el, tab-el { display:inline-flex; align-items:center; gap:6px; padding:9px 13px; border-bottom:2px solid transparent; color:#6b7280; font-size:14px; }
tab-el.tab-el-active, tab-el.tab-el-active { color:var(--rp-primary); border-bottom-color:var(--rp-primary); font-weight:700; }
button-el, button-el { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:34px; padding:0 12px; border-radius:8px; border:1px solid var(--rp-border); background:#fff; color:#374151; font-size:13px; font-weight:650; }
button-el[size="sm"], button-el[size="sm"] { min-height:28px; padding:0 9px; font-size:12px; border-radius:6px; }
button-el[size="lg"], button-el[size="lg"] { min-height:40px; padding:0 16px; font-size:14px; }
button-el[variant="primary"], button-el[variant="primary"] { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; }
button-el[variant="secondary"], button-el[variant="secondary"] { border-color:#bfdbfe; background:#eff6ff; color:#1d4ed8; }
button-el[variant="danger"], button-el[variant="danger"] { border-color:var(--rp-danger); color:var(--rp-danger); }
button-el[variant="link"], button-el[variant="link"] { border-color:transparent; background:transparent; color:var(--rp-primary); padding-inline:2px; }
button-el[variant="ghost"], button-el[variant="ghost"] { border-color:transparent; background:transparent; }
button-el[state="disabled"], button-el[state="disabled"], button-el[disabled], button-el[disabled] { opacity:.5; }
button-group, button-group { display:inline-flex; gap:0; width:fit-content; }
button-group > button-el, button-group > button-el { border-radius:0; margin-left:-1px; }
button-group > :first-child { border-radius:8px 0 0 8px; margin-left:0; }
button-group > :last-child { border-radius:0 8px 8px 0; }
table-el, table-el { display:table; border-collapse:collapse; width:fit-content; min-width:720px; max-width:980px; background:#fff; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
viewport-el table-el, viewport-el table-el { width:100%; max-width:none; }
.table-row { display:table-row; }
.table-el-cell { display:table-cell; padding:11px 12px; border-bottom:1px solid var(--rp-border); font-size:13px; vertical-align:middle; white-space:nowrap; }
.table-el-head .table-el-cell { background:#f9fafb; color:#6b7280; font-size:12px; font-weight:750; }
.table-row:last-child .table-el-cell { border-bottom:0; }
table-row, table-row { display:grid; grid-template-columns:44px 150px 240px 90px 90px; align-items:center; min-width:560px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#fff; }
table-row > span, table-row > span { padding:10px 12px; font-size:13px; }
table-row[state="unread"], table-row[state="unread"] { background:#eff6ff; font-weight:700; }
table-row[state="selected"], table-row[state="selected"] { outline:2px solid rgba(37,99,235,.35); background:#f8fbff; }
table-row[state="highlighted"], table-row[state="highlighted"] { background:#fffbeb; }
table-row[state="disabled"], table-row[state="disabled"] { opacity:.5; }
bulk-action-bar, bulk-action-bar { display:flex; align-items:center; gap:8px; width:fit-content; padding:8px 10px; margin:0 0 10px; border:1px solid #bfdbfe; background:#eff6ff; border-radius:8px; color:#1e40af; font-size:13px; font-weight:650; }
empty-el, empty-el { display:grid; justify-items:center; gap:8px; width:fit-content; min-width:240px; padding:24px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:#fff; color:#6b7280; text-align:center; }
.empty-el-title { color:#111827; font-weight:700; }
.empty-el-desc { font-size:13px; }
loading-el, loading-el { display:grid; gap:8px; min-width:260px; color:var(--rp-primary); }
.skeleton-el-line { height:14px; border-radius:999px; background:linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6); }
.rp-spinner { display:inline-grid; place-items:center; width:32px; height:32px; }
alert-el, alert-el, toast-el, toast-el { display:flex; align-items:flex-start; gap:8px; width:fit-content; max-width:420px; padding:10px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; font-size:13px; }
alert-el[type="info"], alert-el[type="info"], toast-el[type="info"], toast-el[type="info"] { border-color:#bfdbfe; background:#eff6ff; color:#1e40af; }
alert-el[type="success"], alert-el[type="success"], toast-el[type="success"], toast-el[type="success"] { border-color:#bbf7d0; background:#f0fdf4; color:#166534; }
alert-el[type="warning"], alert-el[type="warning"], toast-el[type="warning"], toast-el[type="warning"] { border-color:#fde68a; background:#fffbeb; color:#92400e; }
alert-el[type="error"], alert-el[type="error"], toast-el[type="error"], toast-el[type="error"] { border-color:#fecaca; background:#fef2f2; color:#991b1b; }
dropdown-el, dropdown-el, popover-el, popover-el { display:block; width:var(--snap-width,300px); padding:8px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; box-shadow:0 12px 24px rgba(15,23,42,.1); }
tooltip-el, tooltip-el { display:inline-block; width:fit-content; max-width:240px; padding:6px 8px; border-radius:6px; background:#111827; color:#fff; font-size:12px; }
.rp-overlay-title { margin:0 0 8px; color:#111827; font-size:14px; font-weight:750; }
modal-el, modal-el { display:block; width:min(var(--snap-width,480px), 100%); border:1px solid var(--rp-border); border-radius:12px; background:#fff; box-shadow:0 24px 48px rgba(15,23,42,.18); overflow:hidden; }
drawer-el, drawer-el { display:block; width:min(var(--snap-width,360px), 100%); min-height:320px; border:1px solid var(--rp-border); background:#fff; box-shadow:0 18px 40px rgba(15,23,42,.14); }
.modal-el-head, .drawer-el-head { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--rp-border); font-weight:750; }
.modal-el-body, .drawer-el-body { padding:16px; }
.modal-el-footer { display:flex; justify-content:flex-end; gap:8px; padding:12px 16px; border-top:1px solid var(--rp-border); background:#f9fafb; }
card-el, card-el { display:block; width:auto; min-width:220px; padding:14px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.card-el-image { display:grid; place-items:center; height:120px; margin:-14px -14px 12px; border-radius:10px 10px 0 0; background:#f3f4f6; color:#6b7280; }
.card-el-title { display:block; color:#111827; font-weight:750; }
.card-el-subtitle { display:block; margin-top:4px; color:#6b7280; font-size:13px; }
.card-el-footer { display:block; margin:12px -14px -14px; padding:10px 14px; border-top:1px solid var(--rp-border); background:#f9fafb; }
stat-card, stat-card { display:grid; gap:6px; width:auto; min-width:0; padding:16px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.rp-stat-label { color:#6b7280; font-size:12px; font-weight:650; }
.rp-stat-value { color:#111827; font-size:26px; font-weight:800; }
.rp-stat-change { font-size:12px; font-weight:700; }
stat-card[trend="up"] .rp-stat-change, stat-card[trend="up"] .rp-stat-change { color:var(--rp-success); }
stat-card[trend="down"] .rp-stat-change, stat-card[trend="down"] .rp-stat-change { color:var(--rp-danger); }
tag-el, tag-el { display:inline-flex; align-items:center; gap:5px; height:24px; padding:0 8px; border-radius:999px; background:#eef2ff; color:#3730a3; font-size:12px; font-weight:650; }
tag-el[color="green"], tag-el[color="green"] { background:#dcfce7; color:#166534; }
tag-el[color="orange"], tag-el[color="orange"] { background:#ffedd5; color:#9a3412; }
tag-el[color="red"], tag-el[color="red"] { background:#fee2e2; color:#991b1b; }
checkbox-el, checkbox-el, radio-el, radio-el { display:inline-flex; align-items:center; gap:8px; font-size:13px; }
.rp-box { display:inline-grid; place-items:center; width:16px; height:16px; border:1px solid var(--rp-border-strong); border-radius:4px; color:#fff; }
checkbox-el[state="checked"] .rp-box, checkbox-el[state="checked"] .rp-box, radio-el[state="checked"] .rp-box, radio-el[state="checked"] .rp-box, checkbox-el[state="indeterminate"] .rp-box, checkbox-el[state="indeterminate"] .rp-box { background:var(--rp-primary); border-color:var(--rp-primary); }
checkbox-el[state="disabled"], checkbox-el[state="disabled"], radio-el[state="disabled"], radio-el[state="disabled"] { opacity:.5; }
radio-el .rp-box, radio-el .rp-box { border-radius:999px; }
toggle-el, toggle-el { display:inline-flex; align-items:center; gap:8px; font-size:13px; }
.toggle-el-track { display:flex; align-items:center; width:34px; height:20px; border-radius:999px; background:#d1d5db; padding:2px; }
.toggle-el-dot { display:block; width:16px; height:16px; border-radius:999px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.2); transition:none; }
toggle-el[state="on"] .toggle-el-track, toggle-el[state="on"] .toggle-el-track { background:var(--rp-primary); }
toggle-el[state="on"] .toggle-el-dot, toggle-el[state="on"] .toggle-el-dot { margin-left:14px; }
toggle-el[state="disabled"], toggle-el[state="disabled"] { opacity:.5; }
form-el, form-el { display:grid; gap:12px; width:fit-content; max-width:100%; }
form-el[layout="horizontal"], form-el[layout="horizontal"] { grid-template-columns:max-content 1fr; align-items:start; }
form-item, form-item { display:grid; gap:6px; width:fit-content; max-width:100%; }
form-item > *, form-item > * { max-width:100%; }
.form-el-label { color:#374151; font-size:12px; font-weight:700; }
.form-el-label.required::after { content:" *"; color:var(--rp-danger); }
.form-el-error { color:var(--rp-danger); font-size:12px; }
upload-el, upload-el { display:grid; justify-items:center; gap:8px; width:280px; padding:18px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:#fff; color:#6b7280; text-align:center; font-size:13px; }
upload-el[state="has-file"], upload-el[state="has-file"] { justify-items:start; border-style:solid; color:#374151; }
upload-el[state="uploading"], upload-el[state="uploading"] { border-color:#bfdbfe; background:#eff6ff; color:#1e40af; }
image-placeholder, image-placeholder { display:grid; place-items:center; width:var(--snap-width,160px); height:var(--snap-height,100px); background:#f3f4f6; border:1px dashed var(--rp-border-strong); border-radius:8px; color:#6b7280; font-size:12px; }
progress-el, progress-el { display:block; width:180px; height:8px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
progress-el[kind="circle"], progress-el[kind="circle"], progress-el[style="circle"], progress-el[style="circle"] { display:grid; place-items:center; width:52px; height:52px; border-radius:999px; background:conic-gradient(var(--rp-primary) var(--progress,40%), #e5e7eb 0); font-size:12px; font-weight:750; }
.progress-el-bar { display:block; height:100%; width:var(--progress,40%); background:var(--rp-primary); }
progress-el[status="success"] .progress-el-bar, progress-el[status="success"] .progress-el-bar { background:var(--rp-success); }
progress-el[status="error"] .progress-el-bar, progress-el[status="error"] .progress-el-bar { background:var(--rp-danger); }
pagination-el, pagination-el { display:inline-flex; align-items:center; gap:6px; width:fit-content; font-size:13px; }
.page-el-btn { display:inline-grid; place-items:center; min-width:30px; height:30px; padding:0 8px; border:1px solid var(--rp-border); border-radius:6px; background:#fff; color:#374151; }
.page-el-btn.active { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; font-weight:750; }
steps-el, steps-el { display:flex; align-items:center; gap:8px; width:fit-content; }
.rp-step { display:inline-flex; align-items:center; gap:6px; color:#6b7280; font-size:13px; }
.rp-step-dot { display:inline-grid; place-items:center; width:22px; height:22px; border-radius:999px; border:1px solid var(--rp-border-strong); background:#fff; color:#6b7280; font-size:11px; font-weight:750; }
.rp-step.active { color:var(--rp-primary); font-weight:750; }
.rp-step.active .rp-step-dot { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; }
.rp-step.done .rp-step-dot { border-color:var(--rp-success); background:var(--rp-success); color:#fff; }
.rp-step-sep { width:28px; height:1px; background:var(--rp-border); }
breadcrumb-el, breadcrumb-el { display:inline-flex; align-items:center; gap:6px; color:#6b7280; font-size:13px; }
.breadcrumb-el-current { color:#111827; font-weight:650; }

/* --- data input --- */
slider-el, slider-el { display:inline-flex; align-items:center; gap:10px; width:220px; }
.slider-el-track { position:relative; flex:1; height:4px; border-radius:999px; background:#e5e7eb; }
.slider-el-fill { position:absolute; height:100%; border-radius:999px; background:var(--rp-primary); }
.slider-el-thumb { position:absolute; top:50%; width:16px; height:16px; margin-left:-8px; transform:translateY(-50%); border-radius:50%; background:#fff; border:1px solid var(--rp-border-strong); }
.slider-el-value { font-size:12px; color:#374151; min-width:24px; }
range-el, range-el { display:inline-flex; align-items:center; width:220px; }
number-input, number-input { display:inline-flex; align-items:center; gap:6px; min-height:34px; padding:0 4px 0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; width:120px; }
.rp-num-value { flex:1; font-size:13px; }
.rp-num-steppers { display:flex; flex-direction:column; }
.rp-num-step { display:grid; place-items:center; width:20px; height:15px; color:#6b7280; cursor:pointer; }
rating-el, rating-el { display:inline-flex; gap:2px; color:#d1d5db; }
.rp-star.filled { color:#f59e0b; }
pin-input, pin-input { display:inline-flex; gap:8px; }
.rp-pin-cell { display:grid; place-items:center; width:40px; height:46px; border:1px solid var(--rp-border-strong); border-radius:8px; font-size:18px; font-weight:700; background:#fff; }
.rp-pin-cell.active { border-color:var(--rp-primary); }
color-swatch, color-swatch { display:inline-flex; align-items:center; gap:8px; padding:4px 10px 4px 4px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; }
.rp-swatch-chip { width:24px; height:24px; border-radius:6px; border:1px solid rgba(0,0,0,.1); }
.rp-swatch-hex { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:#374151; }
autocomplete-el, autocomplete-el { display:inline-block; width:280px; }
.rp-ac-options { display:grid; gap:1px; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; }
.rp-ac-option { padding:7px 8px; border-radius:6px; font-size:13px; color:#374151; }
.rp-ac-option:first-child { background:#eff6ff; color:#1d4ed8; }

/* --- data display additions --- */
chip-el, chip-el { display:inline-flex; align-items:center; gap:5px; height:26px; padding:0 9px; border-radius:999px; border:1px solid var(--rp-border); background:#f9fafb; color:#374151; font-size:12px; }
tree-el, tree-el { display:flex; flex-direction:column; gap:1px; width:fit-content; min-width:240px; }
.tree-el-row { display:flex; align-items:center; gap:6px; padding:5px 8px; border-radius:6px; color:#374151; font-size:13px; padding-left:calc(8px + var(--tree-level,0) * 18px); }
.tree-el-row.selected { background:#eff6ff; color:#1d4ed8; font-weight:650; }
.tree-el-spacer { display:inline-block; width:12px; }
.tree-el-label { flex:1; }
timeline-el, timeline-el { display:flex; flex-direction:column; width:fit-content; min-width:260px; }
timeline-item, timeline-item { display:flex; gap:12px; padding-bottom:16px; position:relative; }
timeline-item:not(:last-child)::before, timeline-item:not(:last-child)::before { content:''; position:absolute; left:6px; top:16px; bottom:0; width:2px; background:var(--rp-border); }
.timeline-el-dot { flex:0 0 auto; width:14px; height:14px; margin-top:2px; border-radius:50%; background:#fff; border:2px solid var(--rp-border-strong); z-index:1; }
.timeline-el-dot.active { border-color:var(--rp-primary); background:var(--rp-primary); }
.timeline-el-dot.done { border-color:var(--rp-success); background:var(--rp-success); }
.timeline-el-dot.error { border-color:var(--rp-danger); background:var(--rp-danger); }
.timeline-el-main { flex:1; }
.timeline-el-head { display:flex; align-items:baseline; gap:8px; }
.timeline-el-label { font-weight:650; color:#111827; font-size:13px; }
.timeline-el-time { font-size:12px; color:#9ca3af; }
.timeline-el-content { font-size:13px; color:#6b7280; margin-top:2px; }
calendar-el, calendar-el { display:inline-block; width:280px; padding:12px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.rp-cal-head { text-align:center; font-weight:700; font-size:14px; margin-bottom:10px; }
.rp-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
.rp-cal-dow { display:grid; place-items:center; height:24px; font-size:11px; color:#9ca3af; }
.rp-cal-cell { display:grid; place-items:center; height:32px; border-radius:6px; font-size:13px; color:#374151; }
.rp-cal-cell.selected { background:var(--rp-primary); color:#fff; font-weight:700; }
.rp-cal-cell.muted { color:transparent; }
kanban-el, kanban-el { display:flex; gap:12px; width:fit-content; align-items:flex-start; }
kanban-column, kanban-column { display:flex; flex-direction:column; width:200px; padding:10px; border-radius:10px; background:#f3f4f6; }
.kanban-el-head { display:flex; align-items:center; justify-content:space-between; font-weight:650; font-size:13px; margin-bottom:8px; color:#374151; }
.kanban-el-count { display:grid; place-items:center; min-width:18px; height:18px; padding:0 5px; border-radius:999px; background:#e5e7eb; font-size:11px; }
.kanban-el-body { display:flex; flex-direction:column; gap:8px; }
kanban-card, kanban-card { display:block; padding:10px; border-radius:8px; background:#fff; border:1px solid var(--rp-border); }
.kanban-card-title { display:block; font-size:13px; color:#111827; }
.kanban-card-tag { display:inline-block; margin-top:6px; padding:1px 7px; border-radius:999px; background:#eef2ff; color:#3730a3; font-size:11px; }
code-block, code-block { display:block; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#0f172a; }
.rp-code-head { padding:6px 12px; font-family:ui-monospace,Menlo,monospace; font-size:11px; color:#94a3b8; background:#1e293b; }
.rp-code-body { padding:10px 0; }
.rp-code-line { display:flex; align-items:center; gap:12px; padding:1px 12px; }
.rp-code-ln { width:20px; text-align:right; color:#475569; font-family:ui-monospace,Menlo,monospace; font-size:11px; }
.rp-code-bar { height:8px; border-radius:3px; background:#334155; }
diff-el, diff-el { display:block; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; font-family:ui-monospace,Menlo,monospace; }
.diff-el-line { display:flex; align-items:center; gap:10px; padding:2px 10px; }
.diff-el-line.add { background:#dcfce7; }
.diff-el-line.del { background:#fee2e2; }
.diff-el-sign { width:10px; color:#6b7280; }
.diff-el-line.add .rp-code-bar { background:#86efac; }
.diff-el-line.del .rp-code-bar { background:#fca5a5; }
.diff-el-line.ctx .rp-code-bar { background:#e5e7eb; }
image-grid, image-grid { display:grid; grid-template-columns:repeat(var(--grid-cols,3),1fr); gap:8px; width:fit-content; }
.rp-grid-cell { display:grid; place-items:center; width:80px; height:80px; border-radius:8px; background:#f3f4f6; color:#9ca3af; }
key-value, key-value { display:flex; flex-direction:column; width:fit-content; min-width:240px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
kv-row, kv-row { display:flex; border-bottom:1px solid var(--rp-border); }
kv-row:last-child, kv-row:last-child { border-bottom:0; }
.rp-kv-key { width:120px; padding:8px 12px; background:#f9fafb; color:#6b7280; font-size:13px; }
.rp-kv-val { flex:1; padding:8px 12px; color:#111827; font-size:13px; }
accordion-el, accordion-el { display:flex; flex-direction:column; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
accordion-item, accordion-item { display:block; border-bottom:1px solid var(--rp-border); }
accordion-item:last-child, accordion-item:last-child { border-bottom:0; }
.accordion-el-head { display:flex; align-items:center; gap:8px; padding:11px 14px; font-weight:650; font-size:13px; color:#111827; }
.accordion-el-body { padding:0 14px 14px 36px; font-size:13px; color:#6b7280; }
banner-el, banner-el { display:flex; align-items:center; gap:10px; width:fit-content; min-width:480px; padding:12px 16px; border-radius:8px; font-size:13px; background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }
banner-el[type="success"], banner-el[type="success"] { background:#f0fdf4; color:#166534; border-color:#bbf7d0; }
banner-el[type="warning"], banner-el[type="warning"] { background:#fffbeb; color:#92400e; border-color:#fde68a; }
banner-el[type="error"], banner-el[type="error"] { background:#fef2f2; color:#991b1b; border-color:#fecaca; }
.banner-el-text { flex:1; }
skeleton-el, skeleton-el { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:240px; }
.rp-skel { border-radius:8px; background:linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6); }
.rp-skel-block { height:120px; }
.rp-skel-avatar { width:40px; height:40px; border-radius:50%; }
.rp-skel-avatar.sm { width:28px; height:28px; }
.rp-skel-row { display:flex; align-items:center; gap:10px; }
countdown-el, countdown-el { display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:999px; background:#fef2f2; color:#991b1b; font-size:12px; font-weight:650; font-variant-numeric:tabular-nums; }
result-el, result-el { display:grid; justify-items:center; gap:8px; width:fit-content; min-width:280px; padding:32px; text-align:center; }
.result-el-icon.success { color:var(--rp-success); }
.result-el-icon.error { color:var(--rp-danger); }
.result-el-icon.empty { color:#9ca3af; }
.result-el-title { font-size:16px; font-weight:700; color:#111827; }
.result-el-desc { font-size:13px; color:#6b7280; }
permission-gate, permission-gate { display:block; position:relative; width:fit-content; }
.rp-gate-content { opacity:.4; filter:grayscale(1); pointer-events:none; }
.rp-gate-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:6px; background:rgba(255,255,255,.6); color:#6b7280; font-size:12px; font-weight:650; border-radius:8px; }
quota-bar, quota-bar { display:block; width:fit-content; min-width:240px; }
.rp-quota-head { display:flex; justify-content:space-between; font-size:12px; color:#374151; margin-bottom:5px; }
.rp-quota-num.danger { color:var(--rp-danger); font-weight:700; }
.rp-quota-track { display:block; height:8px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
.rp-quota-fill { display:block; height:100%; background:var(--rp-primary); }
.rp-quota-fill.danger { background:var(--rp-danger); }
api-key, api-key { display:inline-flex; align-items:center; gap:8px; padding:6px 8px 6px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#f9fafb; }
.rp-apikey-val { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:#374151; }
.rp-apikey-copy { display:grid; place-items:center; width:26px; height:26px; border-radius:6px; color:#6b7280; }
audit-row, audit-row { display:flex; align-items:baseline; gap:8px; padding:8px 0; border-bottom:1px solid var(--rp-border); width:fit-content; min-width:320px; font-size:13px; }
.rp-audit-actor { font-weight:650; color:#111827; }
.rp-audit-action { flex:1; color:#6b7280; }
.rp-audit-time { color:#9ca3af; font-size:12px; }
workflow-node, workflow-node { display:inline-flex; align-items:center; gap:7px; padding:7px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; font-size:13px; }
.rp-wf-icon.done { color:var(--rp-success); }
.rp-wf-icon.active { color:var(--rp-primary); }
.rp-wf-icon.error { color:var(--rp-danger); }
.rp-wf-icon.default { color:#9ca3af; }

/* --- navigation & layout additions --- */
segmented-el, segmented-el { display:inline-flex; padding:2px; border-radius:8px; background:#f3f4f6; gap:2px; }
.rp-seg-item { padding:5px 14px; border-radius:6px; font-size:13px; color:#6b7280; }
.rp-seg-item.active { background:#fff; color:#111827; font-weight:650;  }
command-palette, command-palette { display:block; width:520px; border:1px solid var(--rp-border); border-radius:12px; background:#fff; overflow:hidden; }
.rp-cmdk-input { display:flex; align-items:center; gap:10px; padding:14px 16px; border-bottom:1px solid var(--rp-border); }
.rp-cmdk-list { padding:6px; }
.rp-cmdk-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:8px; font-size:13px; color:#374151; }
.rp-cmdk-item.active { background:#eff6ff; color:#1d4ed8; }
context-menu, context-menu, menu-el, menu-el { display:inline-flex; flex-direction:column; min-width:180px; padding:5px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.menu-item, menu-item, menu-item { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:6px; font-size:13px; color:#374151; }
.menu-item.danger, menu-item.danger, menu-item.danger { color:var(--rp-danger); }
.menu-item.disabled, menu-item.disabled, menu-item.disabled { opacity:.45; }
.menu-el-label { flex:1; }
.menu-el-shortcut { color:#9ca3af; font-size:12px; }
toc-el, toc-el { display:flex; flex-direction:column; gap:2px; width:fit-content; min-width:160px; border-left:2px solid var(--rp-border); }
.toc-el-item { padding:4px 12px; font-size:13px; color:#6b7280; border-left:2px solid transparent; margin-left:-2px; }
.toc-el-item.active { color:var(--rp-primary); border-left-color:var(--rp-primary); font-weight:650; }
kbd-el, kbd-el { display:inline-flex; align-items:center; gap:3px; }
.kbd-el-key { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 5px; border:1px solid var(--rp-border-strong); border-bottom-width:2px; border-radius:5px; background:#f9fafb; font-size:11px; font-family:var(--rp-font); color:#374151; }
.kbd-el-plus { color:#9ca3af; font-size:11px; }
split-pane, split-pane { display:grid; grid-template-columns:var(--snap-columns,1fr 1fr); width:fit-content; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
split-pane > *, split-pane > * { padding:14px; }
split-pane > *:not(:last-child), split-pane > *:not(:last-child) { border-right:1px solid var(--rp-border); }
divider-el, divider-el { display:block; height:1px; background:var(--rp-border); margin:12px 0; }
divider-el.divider-el-v, divider-el.divider-el-v { display:inline-block; width:1px; height:auto; align-self:stretch; margin:0 12px; }
spacer-el, spacer-el { display:block; height:var(--snap-size,16px); }

/* --- iOS --- */
ios-navbar, ios-navbar { display:block; background:rgba(249,249,249,.94); border-bottom:1px solid #d8d8dc; padding:6px 12px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }
.ios-navbar-row { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; min-height:36px; }
.rp-ios-nav-leading { display:flex; align-items:center; gap:2px; color:#007aff; font-size:15px; }
.rp-ios-nav-title { text-align:center; font-weight:600; font-size:16px; color:#000; }
.rp-ios-nav-trailing { text-align:right; color:#007aff; font-size:15px; }
.rp-ios-nav-large { font-size:30px; font-weight:700; color:#000; padding:2px 2px 6px; }
ios-tabbar, ios-tabbar { display:flex; background:rgba(249,249,249,.94); border-top:1px solid #d8d8dc; padding:6px 0 4px; }
.rp-ios-tab { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; color:#8e8e93; font-size:10px; }
.rp-ios-tab.active { color:#007aff; }
.rp-ios-tab-label { font-size:10px; }
ios-list, ios-list { display:block; border-radius:10px; background:#fff; overflow:hidden; width:fit-content; min-width:300px; border:1px solid #e5e5ea; font-family:-apple-system,sans-serif; }
.ios-list-header { padding:6px 16px; font-size:13px; color:#6d6d72; background:#f2f2f7; text-transform:none; }
ios-list-item, ios-list-item { display:flex; align-items:center; gap:10px; padding:11px 16px; border-bottom:1px solid #e5e5ea; font-size:15px; color:#000; }
ios-list-item:last-child, ios-list-item:last-child { border-bottom:0; }
.rp-ios-li-icon { display:grid; place-items:center; width:28px; height:28px; border-radius:6px; background:#007aff; color:#fff; }
.rp-ios-li-label { flex:1; }
.rp-ios-li-detail { color:#8e8e93; }
.rp-ios-li-chevron { color:#c7c7cc; }
ios-action-sheet, ios-action-sheet { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:320px; padding:8px; font-family:-apple-system,sans-serif; }
.rp-ios-as-group { border-radius:14px; overflow:hidden; background:rgba(255,255,255,.82); backdrop-filter:blur(20px); }
.rp-ios-as-title { padding:14px; text-align:center; font-size:13px; color:#8e8e93; border-bottom:1px solid #d1d1d6; }
.rp-ios-as-action { padding:16px; text-align:center; font-size:18px; color:#007aff; border-bottom:1px solid #d1d1d6; }
.rp-ios-as-action:last-child { border-bottom:0; }
.rp-ios-as-action.destructive { color:#ff3b30; }
.rp-ios-as-action.cancel { font-weight:600; }
ios-alert, ios-alert { display:block; width:270px; border-radius:14px; overflow:hidden; background:rgba(255,255,255,.92); backdrop-filter:blur(20px); font-family:-apple-system,sans-serif; }
.ios-alert-body { padding:18px 16px 14px; text-align:center; }
.ios-alert-title { font-size:17px; font-weight:600; color:#000; }
.ios-alert-msg { margin-top:3px; font-size:13px; color:#000; }
.ios-alert-actions { display:flex; border-top:1px solid #d1d1d6; }
.ios-alert-btn { flex:1; padding:11px; text-align:center; font-size:17px; color:#007aff; }
.ios-alert-btn.primary { font-weight:600; }
.ios-alert-btn:not(:last-child) { border-right:1px solid #d1d1d6; }
ios-switch, ios-switch { display:inline-flex; align-items:center; gap:8px; font-family:-apple-system,sans-serif; font-size:15px; }
.ios-switch-track { width:51px; height:31px; border-radius:999px; background:#34c759; padding:2px; }
.ios-switch-dot { display:block; width:27px; height:27px; border-radius:50%; background:#fff; margin-left:20px;  }
ios-segmented, ios-segmented { display:inline-flex; padding:2px; border-radius:9px; background:#767680; background:rgba(118,118,128,.12); gap:2px; font-family:-apple-system,sans-serif; }
.rp-ios-seg-item { padding:6px 16px; border-radius:7px; font-size:13px; color:#000; }
.rp-ios-seg-item.active { background:#fff; font-weight:600; }
ios-button, ios-button { display:inline-grid; place-items:center; min-height:34px; padding:0 16px; border-radius:8px; background:#007aff; color:#fff; font-size:15px; font-weight:600; font-family:-apple-system,sans-serif; }
ios-button[variant="tinted"], ios-button[variant="tinted"] { background:rgba(0,122,255,.15); color:#007aff; }
ios-button[variant="plain"], ios-button[variant="plain"] { background:transparent; color:#007aff; }
ios-search, ios-search { display:inline-flex; align-items:center; gap:6px; width:280px; height:36px; padding:0 10px; border-radius:10px; background:rgba(118,118,128,.12); color:#8e8e93; font-size:15px; font-family:-apple-system,sans-serif; }
ios-stepper, ios-stepper { display:inline-flex; align-items:center; border-radius:8px; background:rgba(118,118,128,.12); }
.rp-ios-step { display:grid; place-items:center; width:46px; height:32px; color:#000; }
.rp-ios-step-div { width:1px; height:18px; background:rgba(0,0,0,.15); }

/* --- macOS --- */
macos-window, macos-window { display:block; width:fit-content; min-width:480px; border-radius:10px; overflow:hidden; border:1px solid #d1d1d6; background:#fff; font-family:-apple-system,sans-serif; }
.rp-mac-titlebar { display:flex; align-items:center; gap:10px; height:38px; padding:0 14px; background:#ececec; border-bottom:1px solid #d1d1d6; }
.rp-mac-lights { display:flex; gap:8px; }
.rp-mac-light { width:12px; height:12px; border-radius:50%; }
.rp-mac-light.close { background:#ff5f57; }
.rp-mac-light.min { background:#febc2e; }
.rp-mac-light.max { background:#28c840; }
.rp-mac-title { flex:1; text-align:center; font-size:13px; font-weight:600; color:#3c3c43; }
.rp-mac-window-body { padding:0; }
macos-toolbar, macos-toolbar { display:flex; align-items:center; gap:10px; padding:8px 14px; background:#f6f6f6; border-bottom:1px solid #d1d1d6; }
macos-menubar, macos-menubar { display:flex; align-items:center; gap:18px; height:26px; padding:0 14px; background:rgba(246,246,246,.9); border-bottom:1px solid #d1d1d6; font-size:13px; font-family:-apple-system,sans-serif; }
.rp-mac-menubar-apple { color:#000; }
.rp-mac-menu-title { color:#000; }
.rp-mac-menu-title.active { background:#007aff; color:#fff; padding:1px 7px; border-radius:4px; }
macos-sidebar, macos-sidebar { display:flex; flex-direction:column; gap:1px; width:220px; padding:8px; background:rgba(246,246,246,.85); font-family:-apple-system,sans-serif; }
macos-source-item, macos-source-item { display:flex; align-items:center; gap:7px; padding:5px 8px; border-radius:6px; font-size:13px; color:#3c3c43; }
macos-source-item.selected, macos-source-item.selected { background:#007aff; color:#fff; }
.rp-mac-source-group { padding:8px 8px 3px; font-size:11px; font-weight:700; color:#8e8e93; text-transform:uppercase; }
macos-segmented, macos-segmented { display:inline-flex; border:1px solid #c4c4c7; border-radius:6px; overflow:hidden; font-family:-apple-system,sans-serif; }
.rp-mac-seg-item { padding:4px 14px; font-size:13px; color:#000; background:#fff; border-right:1px solid #c4c4c7; }
.rp-mac-seg-item:last-child { border-right:0; }
.rp-mac-seg-item.active { background:#007aff; color:#fff; }
macos-popover, macos-popover { display:inline-block; position:relative; }
.rp-mac-pop-arrow { display:block; width:16px; height:8px; margin:0 auto -1px; clip-path:polygon(50% 0,100% 100%,0 100%); background:#fff; border:1px solid #d1d1d6; }
.rp-mac-pop-body { min-width:220px; padding:12px; border-radius:10px; border:1px solid #d1d1d6; background:#fff;  }
.rp-mac-pop-title { font-weight:600; font-size:13px; margin-bottom:8px; }
macos-sheet, macos-sheet { display:block; width:fit-content; min-width:420px; border-radius:10px; background:#fff; box-shadow:0 24px 60px rgba(0,0,0,.3); padding:18px; font-family:-apple-system,sans-serif; }
.rp-mac-sheet-title { font-size:15px; font-weight:700; margin-bottom:12px; }
.rp-mac-sheet-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:16px; }
macos-stepper, macos-stepper { display:inline-flex; flex-direction:column; border:1px solid #c4c4c7; border-radius:5px; overflow:hidden; }
.rp-mac-step { display:grid; place-items:center; width:22px; height:13px; background:#fff; color:#3c3c43; }
.rp-mac-step.up { border-bottom:1px solid #c4c4c7; }
macos-disclosure, macos-disclosure { display:block; font-family:-apple-system,sans-serif; }
.rp-mac-disc-head { display:flex; align-items:center; gap:5px; font-size:13px; font-weight:600; color:#000; }
.rp-mac-disc-tri { display:inline-flex; transition:none; }
.rp-mac-disc-tri.open { transform:rotate(90deg); }
.rp-mac-disc-body { padding:8px 0 0 18px; font-size:13px; color:#3c3c43; }
macos-table, macos-table { display:flex; flex-direction:column; width:fit-content; min-width:360px; border:1px solid #d1d1d6; border-radius:6px; overflow:hidden; font-family:-apple-system,sans-serif; }
.rp-mac-tr { display:flex; }
.rp-mac-tr.rp-mac-th { background:#f6f6f6; border-bottom:1px solid #d1d1d6; font-size:12px; font-weight:600; color:#3c3c43; }
.rp-mac-tr.alt { background:#f5f8ff; }
.rp-mac-td { flex:1; display:flex; align-items:center; gap:6px; padding:6px 12px; font-size:13px; color:#3c3c43; }
.rp-mac-cell-bar { height:8px; border-radius:3px; background:#e5e7eb; }

/* --- agent / conversational UI (Codex-style: single column, de-bubbled) --- */
chat-el, chat-el { display:flex; flex-direction:column; gap:24px; width:fit-content; min-width:520px; max-width:680px; }
user-message, user-message, assistant-message, assistant-message { display:block; }
.rp-msg-role { font-size:12px; font-weight:700; color:#9ca3af; letter-spacing:.02em; margin:0 0 6px; }
.rp-msg-content { display:flex; flex-direction:column; gap:12px; font-size:14px; line-height:1.7; color:#1f2937; }
user-message .rp-msg-content, user-message .rp-msg-content { color:#111827; }
system-message, system-message { display:flex; justify-content:center; }
.rp-sysmsg-line { padding:3px 12px; border-radius:999px; background:#f3f4f6; color:#6b7280; font-size:12px; }
tool-call, tool-call { display:block; width:fit-content; min-width:280px; max-width:600px; }
.rp-tool-head { display:flex; align-items:center; gap:8px; font-size:13px; color:#6b7280; }
.rp-tool-glyph { display:inline-flex; }
.rp-tool-glyph.done { color:var(--rp-success); }
.rp-tool-glyph.running { color:var(--rp-primary); }
.rp-tool-glyph.error { color:var(--rp-danger); }
.rp-tool-name { font-family:ui-monospace,Menlo,monospace; font-weight:650; color:#374151; }
.rp-tool-args-inline { font-family:ui-monospace,Menlo,monospace; color:#9ca3af; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-tool-body { margin-top:8px; padding-left:21px; }
agent-output, agent-output { display:block; width:fit-content; min-width:280px; max-width:600px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#f8fafc; }
.rp-output-head { padding:6px 12px; font-size:12px; color:#6b7280; border-bottom:1px solid var(--rp-border); font-family:ui-monospace,Menlo,monospace; }
.rp-output-body { padding:12px; font-family:ui-monospace,Menlo,monospace; font-size:12.5px; line-height:1.6; color:#334155; white-space:pre-wrap; }
reasoning-el, reasoning-el { display:block; width:fit-content; min-width:280px; max-width:600px; }
.rp-reason-head { display:flex; align-items:center; gap:6px; font-size:13px; color:#9ca3af; }
.rp-reason-body { margin-top:8px; padding-left:19px; border-left:2px solid var(--rp-border); font-size:13px; line-height:1.7; color:#6b7280; }
message-actions, message-actions { display:inline-flex; gap:2px; }
.rp-msg-action { display:grid; place-items:center; width:28px; height:28px; border-radius:6px; color:#9ca3af; cursor:pointer; }
.rp-msg-action:hover { background:#f3f4f6; color:#374151; }
suggestions-el, suggestions-el { display:flex; flex-wrap:wrap; gap:8px; }
.rp-suggestion { padding:7px 13px; border:1px solid var(--rp-border); border-radius:8px; font-size:13px; color:#374151; background:#fff; cursor:pointer; }
.rp-suggestion:hover { border-color:var(--rp-border-strong); background:#f9fafb; }
typing-el, typing-el { display:flex; align-items:center; }
.typing-el-dots { display:inline-flex; gap:4px; }
.typing-el-dots > span { width:7px; height:7px; border-radius:50%; background:#c7c7cc; }
composer-el, composer-el { display:flex; align-items:center; gap:10px; width:fit-content; min-width:520px; max-width:680px; padding:9px 9px 9px 14px; border:1px solid var(--rp-border-strong); border-radius:14px; background:#fff; }
.composer-el-attach { display:inline-flex; color:#9ca3af; }
.composer-el-input { flex:1; font-size:14px; }
.composer-el-send { display:grid; place-items:center; width:32px; height:32px; border-radius:8px; background:#111827; color:#fff; }
.composer-el-send.streaming { background:var(--rp-danger); }
citation-el, citation-el { display:inline-flex; align-items:center; gap:6px; max-width:280px; padding:3px 9px 3px 3px; border:1px solid var(--rp-border); border-radius:6px; background:#f9fafb; font-size:12px; color:#374151; }
.rp-cite-idx { display:grid; place-items:center; width:17px; height:17px; border-radius:4px; background:#e5e7eb; color:#374151; font-size:11px; font-weight:700; }
.rp-cite-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
token-usage, token-usage { display:inline-flex; align-items:center; gap:7px; font-size:12px; color:#9ca3af; }
.rp-token-track { width:90px; height:5px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
.rp-token-fill { display:block; height:100%; background:#9ca3af; }
anchor-el, anchor-el { display:inline-flex; align-items:center; gap:6px; padding:4px 11px; font-size:13px; font-weight:600; color:var(--rp-primary); background:rgba(37,99,235,.08); border:1px solid rgba(37,99,235,.25); border-radius:999px; cursor:pointer; text-decoration:none; vertical-align:middle; }
anchor-el:hover, anchor-el:hover { background:rgba(37,99,235,.14); }
.anchor-el-label { line-height:1; }
diagram-block, diagram-block { display:block; width:fit-content; max-width:100%; margin:10px 0; padding:12px; background:#fff; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); overflow:auto; }
.diagram-block-svg { display:flex; justify-content:center; }
.diagram-block-svg svg { max-width:100%; height:auto; }
.diagram-block-empty, .diagram-block-err { font-size:13px; color:var(--rp-muted); }
.diagram-block-err { color:var(--rp-danger); margin-bottom:6px; }
.diagram-block-raw { margin:0; font-family:ui-monospace,Menlo,monospace; font-size:12px; line-height:1.5; color:#374151; white-space:pre; overflow:auto; }
`;

export function injectStyle() {
  if (document.getElementById(RPUI_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = RPUI_STYLE_ID;
  el.textContent = style;
  document.head.appendChild(el);
}
