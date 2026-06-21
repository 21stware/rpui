export const RPUI_STYLE_ID = "rpui-runtime-style";

export const style = `
:root { --rp-bg:#f4f4f5; --rp-surface:#fff; --rp-surface-soft:#fafafa; --rp-text:#09090b; --rp-muted:#71717a; --rp-border:#e4e4e7; --rp-border-strong:#d4d4d8; --rp-primary:#09090b; --rp-success:#059669; --rp-warning:#d97706; --rp-danger:#dc2626; --rp-purple:#7c3aed; --rp-radius-sm:4px; --rp-radius-md:8px; --rp-radius-lg:16px; --rp-shadow:0 8px 28px rgba(15,23,42,.08); --rp-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
.rpui-scope, .rpui-scope * { box-sizing:border-box; }
.rp-icon { display:inline-block; flex:0 0 auto; vertical-align:-0.16em; }
page-el, page-el { display:block; padding:32px 40px; overflow:visible; }
.page-el-shell { display:grid; grid-template-columns:max-content max-content; gap:24px; min-height:calc(100vh - 64px); align-items:start; }
.page-el-main { display:flex; flex-direction:column; min-width:0; overflow:visible; }
.page-el-header { flex:0 0 auto; width:fit-content; max-width:none; margin:0 0 22px; }
.page-el-title-row { display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; }
.page-el-title { margin:0; font-size:28px; line-height:1.2; letter-spacing:-.02em; }
.page-el-route { font-size:13px; color:var(--rp-muted); font-family:ui-monospace,SFMono-Regular,Menlo,monospace; background:rgba(255,255,255,.7); border:1px solid var(--rp-border); border-radius:999px; padding:3px 9px; }
.page-el-description { margin:10px 0 0; color:var(--rp-muted); line-height:1.6; font-size:14px; }
.page-el-body { flex:0 1 auto; display:block; width:fit-content; max-width:100%; min-height:0; overflow:visible; }
.annotation-el-pane { min-width:380px; max-width:680px; position:sticky; top:32px; height:auto; min-height:calc(100vh - 64px); max-height:calc(100vh - 64px); overflow-y:auto; overflow-x:auto; padding:0 0 48px 0; align-self:start; }
.annotation-el-pane-inner { padding:4px 12px 24px 6px; }
main-view, main-view { display:block; width:fit-content; margin:0 0 28px; position:relative; }
.rp-main-shell { position:relative; overflow:visible; border:1px solid var(--rp-border-strong); border-radius:var(--rp-radius-md); background:var(--rp-surface); box-shadow:var(--rp-shadow); }
.rp-main-stage-clip { overflow:hidden; border-radius:var(--rp-radius-md); }
.rp-main-stage { position:relative; transform-origin:top left; background:var(--rp-surface); }
.rp-pin { position:absolute; z-index:20; display:grid; place-items:center; width:22px; height:22px; color:#fff; font-size:11px; font-weight:700; background:var(--rp-primary); border-radius:50%; transform:translate(-5px,-5px); box-shadow:0 2px 8px rgba(0,0,0,.14); cursor:pointer; }
.rp-pin > span { display:grid; place-items:center; }
.rp-pin:hover { opacity:0.85; }
.rp-pin-l2 { width:18px; height:18px; font-size:10px; background:#f59e0b; transform:translate(-4px,-4px); }
.rp-pin-l3 { width:16px; height:16px; font-size:9px; background:#10b981; transform:translate(-3px,-3px); }
.rp-pin-l4 { width:14px; height:14px; font-size:8px; background:#8b5cf6; transform:translate(-3px,-3px); }
.rp-pin-l5 { width:12px; height:12px; font-size:7px; background:#ec4899; transform:translate(-2px,-2px); }
annotation-el, annotation-el { display:block; width:fit-content; max-width:980px; margin:30px 0; line-height:2; color:var(--rp-text); font-size:13.5px; }
annotation-el annotation-el, annotation-el annotation-el, annotation-el annotation-el, annotation-el annotation-el { margin:10px 0 8px 22px; }
.annotation-el-head { display:flex; align-items:center; gap:8px; margin:0 0 4px; width:fit-content; }
.annotation-el-title { font-weight:700; color:var(--rp-text); font-size:15px }
.annotation-el-marker { display:inline-grid; place-items:center; flex:0 0 auto; color:#fff; font-size:10px; font-weight:700; line-height:1; }
.annotation-el-marker.circle { width:22px; height:22px; background:var(--rp-primary); border-radius:50%; }
.annotation-el-marker.circle.pin-l2 { background:#f59e0b; }
.annotation-el-marker.circle.pin-l3 { background:#10b981; }
.annotation-el-marker.circle.pin-l4 { background:#8b5cf6; }
.annotation-el-marker.circle.pin-l5 { background:#ec4899; }

.annotation-el-marker.triangle { width:18px; height:16px; background:var(--rp-success); clip-path:polygon(50% 0, 100% 100%, 0 100%); }
.annotation-el-marker.triangle > span { transform:translateY(2px); font-size:9px; }
.annotation-el-marker.global { width:20px; height:20px; background:#0f172a; border-radius:6px; font-size:11px; }
annotation-global-el, annotation-global-el { display:block; width:fit-content; max-width:980px; margin:0 0 18px; padding:10px 12px 12px; line-height:1.65; color:#1f2937; font-size:14px; background:var(--rp-surface-soft); border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); }
.annotation-el-pane annotation-global-el, .annotation-el-pane annotation-global-el { max-width:none; }
.annotation-el-pane annotation-global-el .annotation-el-body { max-width:none; }
.annotation-el-body { display:block; position:relative; width:fit-content; max-width:920px; }
.rp-pin-slice { width:18px; height:18px; font-size:10px; box-shadow:0 1px 5px rgba(0,0,0,.18); }
.annotation-el-body > :not(annotation-el):not(annotation-el):not(enum-el):not(enum-el) { max-width:820px; }
.annotation-el-pane annotation-el, .annotation-el-pane annotation-el { max-width:none; font-size:13.5px; color:#4b5563; }
.annotation-el-pane .annotation-el-body { max-width:none; }
.annotation-el-pane .annotation-el-body > :not(annotation-el):not(annotation-el):not(enum-el):not(enum-el) { max-width:420px; }
.annotation-el-body p, .annotation-el-body doc-paragraph { margin:0 0 8px; }
.annotation-el-body ul, .annotation-el-body ol, .annotation-el-body doc-unordered-list, .annotation-el-body doc-ordered-list { margin:6px 0 10px; padding-left:20px; }
.annotation-el-body li, .annotation-el-body doc-list-item { margin:0 0 5px; line-height:1.55; }
.annotation-el-body li::marker, .annotation-el-body doc-list-item::marker { color:#9ca3af; }
.annotation-el-body strong, .annotation-el-body bold-el { color:#1f2937; font-weight:680; }
.annotation-el-body em, .annotation-el-body italic-el { font-style:italic; }
.annotation-el-body code, .annotation-el-body code-inline { padding:1px 5px; border-radius:4px; background:#f4f4f5; color:var(--rp-primary); font-weight:650; font-family:ui-monospace,Menlo,monospace; font-size:.92em; }
enum-el, enum-el { display:flex; align-items:flex-start; flex-wrap:wrap; gap:10px; width:fit-content; margin:8px 0 12px; }
.annotation-el-pane enum-el, .annotation-el-pane enum-el { flex-wrap:wrap; }
enum-item, enum-item { display:block; flex:0 0 auto; width:fit-content; min-width:180px; max-width:600px; border:1px solid #f0f0f0; border-radius:var(--rp-radius-md); background:#fff; overflow:hidden; }
.enum-el-label { display:flex; align-items:flex-start; gap:6px; padding:5px 9px 4px; font-size:12px; font-weight:650; color:#374151; }
.enum-el-index { display:inline-grid; place-items:center; min-width:16px; height:16px; padding:0 4px; background:#111827; color:#fff; font-size:10px; font-weight:750; border-radius:3px; flex:0 0 auto; margin-top:1px; }
.enum-el-label-text { display:block; }
.enum-el-description { display:block; margin-top:2px; font-size:11px; line-height:1.35; font-weight:400; color:var(--rp-muted); }
.enum-el-content { display:block; width:fit-content; padding:8px; }
.annotation-el-title { font-weight:700; color:#111827; cursor:pointer; font-size:15px }
.annotation-el-title:hover { color:var(--rp-primary); }
.rp-section-focus { outline:2px dashed var(--rp-primary); outline-offset:4px; border-radius:4px; }
viewport-el, viewport-el { display:flex; flex-direction:column; width:var(--snap-width,1440px); height:var(--snap-height,900px); background:#f8fafc; overflow:hidden; color:#111827; }
layout-el, layout-el { display:grid; grid-template-columns:var(--snap-columns,1fr); grid-template-rows:var(--snap-rows,auto); gap:var(--snap-gap,0); align-content:start; width:100%; max-width:100%; min-width:0; }
layout-el[align="center"], layout-el[align="center"] { align-items:center; }
layout-el[align="start"], layout-el[align="start"] { align-items:start; }
layout-el[align="end"], layout-el[align="end"] { align-items:end; }
layout-el[justify="center"], layout-el[justify="center"] { justify-items:center; }
layout-el[justify="end"], layout-el[justify="end"] { justify-items:end; }
layout-el > *, layout-el > * { min-width:0; }
/* stretch/compact form fields to fit their grid column instead of using the standalone 280px default */
layout-el > search-el, layout-el > search-el, layout-el > input-el, layout-el > input-el, layout-el > textarea-el, layout-el > textarea-el { width:100%; max-width:none; }
layout-el > select-el, layout-el > select-el, layout-el > date-picker, layout-el > date-picker { width:100%; min-width:fit-content; }
layout-el > button-el, layout-el > button-el { width:100%; }
layout-el > panel-el, layout-el > panel-el { width:100%; }
layout-el > form-el, layout-el > form-el { width:100%; max-width:none; }
layout-el > form-item, layout-el > form-item { width:100%; max-width:none; }
layout-el > key-value, layout-el > key-value { width:100%; max-width:none; }
layout-el > kv-row, layout-el > kv-row { width:100%; max-width:none; }
layout-el > empty-el, layout-el > empty-el { width:100%; max-width:none; }
layout-el > timeline-el, layout-el > timeline-el { width:100%; max-width:none; }
layout-el > chart-el, layout-el > chart-el { max-width:none; }
layout-el > checkbox-group, layout-el > checkbox-group { width:100%; max-width:none; }
layout-el > progress-el, layout-el > progress-el { width:100%; max-width:none; }
layout-el > slider-el, layout-el > slider-el { width:100%; max-width:none; }
layout-el > range-el, layout-el > range-el { width:100%; max-width:none; }
layout-el > segmented-el, layout-el > segmented-el { width:100%; max-width:none; }
layout-el > calendar-el, layout-el > calendar-el { width:100%; max-width:none; }
layout-el > api-key, layout-el > api-key { width:100%; max-width:none; }
layout-el > image-placeholder, layout-el > image-placeholder { width:100%; max-width:none; }
layout-el > accordion-el, layout-el > accordion-el { width:100%; max-width:none; }
layout-el > tabs-el, layout-el > tabs-el { width:100%; max-width:none; }
layout-el > radio-card, layout-el > radio-card { width:100%; max-width:none; }
layout-el > stat-card, layout-el > stat-card { width:100%; max-width:none; }
layout-el > doc-paragraph, layout-el > doc-paragraph { width:100%; max-width:none; }
layout-el > divider-el, layout-el > divider-el { width:100%; max-width:none; }
layout-el > toggle-el, layout-el > toggle-el { width:100%; max-width:none; }
layout-el > list-el, layout-el > list-el { width:100%; max-width:none; }
layout-el > password-input, layout-el > password-input { width:100%; max-width:none; }
layout-el > tag-input, layout-el > tag-input { width:100%; max-width:none; }
layout-el > autocomplete-el, layout-el > autocomplete-el { width:100%; max-width:none; }
layout-el > textarea-el, layout-el > textarea-el { width:100%; max-width:none; }
viewport-el layout-el, viewport-el layout-el { width:100%; }
viewport-el > layout-el, viewport-el > layout-el { flex:1 1 auto; min-height:0; }
viewport-el > navbar-el, viewport-el > navbar-el { flex:0 0 auto; }
panel-el, panel-el { margin:8px; display:block; width:100%; max-width:100%; background:#fff; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); padding:var(--snap-padding,16px); }
viewport-el panel-el, viewport-el panel-el { margin:8px; width:auto; min-width:0; }
panel-el[elevation="1"], panel-el[elevation="1"] { box-shadow:0 4px 16px rgba(15,23,42,.06); }
panel-el[elevation="2"], panel-el[elevation="2"] { box-shadow:var(--rp-shadow); }
navbar-el, navbar-el { display:flex; align-items:center; gap:14px; height:var(--snap-height,64px); padding:0 24px; background:#fff; border-bottom:1px solid var(--rp-border); }
sidebar-el, sidebar-el { display:block; width:var(--snap-width,260px); min-height:0; background:#fff; border-right:1px solid var(--rp-border); padding:14px; }
viewport-el sidebar-el, viewport-el sidebar-el { min-height:100%; }
sidebar-el[collapsed], sidebar-el[collapsed] { width:72px; }
logo-el, logo-el { display:inline-grid; place-items:center; width:var(--snap-size,82px); height:32px; border-radius:8px; background:#111827; color:#fff; font-size:12px; font-weight:800; letter-spacing:.08em; }
search-el, search-el, input-el, input-el, date-picker, date-picker { display:inline-flex; align-items:center; gap:8px; width:280px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; }
textarea-el, textarea-el { display:block; width:320px; min-height:calc(var(--snap-rows,3) * 24px + 22px); padding:9px 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; white-space:pre-wrap; }
search-el[state="focus"], search-el[state="focus"], input-el[state="focus"], input-el[state="focus"], textarea-el[state="focus"], textarea-el[state="focus"], date-picker[state="focus"], date-picker[state="focus"] { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(0,0,0,.06); }
search-el[state="filled"], search-el[state="filled"], input-el[state="filled"], input-el[state="filled"], textarea-el[state="filled"], textarea-el[state="filled"], date-picker[state="filled"], date-picker[state="filled"] { border-color:#d4d4d8; background:#fafafa; }
search-el[state="error"], search-el[state="error"], input-el[state="error"], input-el[state="error"], textarea-el[state="error"], textarea-el[state="error"], date-picker[state="error"], date-picker[state="error"] { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
search-el[state="disabled"], search-el[state="disabled"], input-el[state="disabled"], input-el[state="disabled"], textarea-el[state="disabled"], textarea-el[state="disabled"], date-picker[state="disabled"], date-picker[state="disabled"] { opacity:.55; background:#f3f4f6; }
input-el[label], input-el[label], date-picker[label], date-picker[label] { display:inline-grid; align-items:start; gap:6px; width:280px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
input-el[label][state="focus"], input-el[label][state="focus"], input-el[label][state="filled"], input-el[label][state="filled"], input-el[label][state="error"], input-el[label][state="error"], date-picker[label][state="focus"], date-picker[label][state="focus"], date-picker[label][state="filled"], date-picker[label][state="filled"], date-picker[label][state="error"], date-picker[label][state="error"] { border:0; background:transparent; box-shadow:none; }
.rp-field-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; }
input-el[state="focus"] .rp-field-control, input-el[state="focus"] .rp-field-control, date-picker[state="focus"] .rp-field-control, date-picker[state="focus"] .rp-field-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(0,0,0,.06); }
input-el[state="filled"] .rp-field-control, input-el[state="filled"] .rp-field-control, date-picker[state="filled"] .rp-field-control, date-picker[state="filled"] .rp-field-control { border-color:#d4d4d8; background:#fafafa; }
input-el[state="error"] .rp-field-control, input-el[state="error"] .rp-field-control, date-picker[state="error"] .rp-field-control, date-picker[state="error"] .rp-field-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
.rp-field-label { display:block; margin:0 0 6px; color:#374151; font-size:12px; font-weight:650; }
.rp-placeholder { color:#9ca3af; }
.rp-value { color:#111827; }
.rp-field-clear { margin-left:auto; display:inline-flex; align-items:center; color:#9ca3af; cursor:default; }
.rp-error-text { display:block; color:var(--rp-danger); font-size:12px; }

/* --- form: grouped fields (label/help/error) + state matrix + new controls --- */
search-el.rp-field-group, input-el.rp-field-group, date-picker.rp-field-group { display:inline-grid; align-items:start; gap:6px; width:280px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
textarea-el.rp-field-group { display:inline-grid; align-items:start; gap:6px; width:320px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
textarea-el .rp-field-control { display:block; min-height:calc(var(--snap-rows,3) * 24px + 22px); padding:9px 11px; white-space:pre-wrap; align-items:initial; }
.rp-field-help { display:block; color:var(--rp-muted); font-size:12px; }
textarea-el[state="focus"] .rp-field-control, autocomplete-el[state="focus"] .rp-field-control, password-input[state="focus"] .rp-field-control, tag-input[state="focus"] .rp-field-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(0,0,0,.06); }
textarea-el[state="filled"] .rp-field-control, autocomplete-el[state="filled"] .rp-field-control, password-input[state="filled"] .rp-field-control, tag-input[state="filled"] .rp-field-control { border-color:#d4d4d8; background:#fafafa; }
textarea-el[state="error"] .rp-field-control, autocomplete-el[state="error"] .rp-field-control, password-input[state="error"] .rp-field-control, tag-input[state="error"] .rp-field-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
autocomplete-el[state="disabled"], password-input[state="disabled"], tag-input[state="disabled"], slider-el[state="disabled"], range-el[state="disabled"], number-input[state="disabled"], rating-el[state="disabled"], pin-input[state="disabled"], color-swatch[state="disabled"] { opacity:.55; }
select-el[state="error"] .select-el-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
select-el[state="filled"] .select-el-control { border-color:#d4d4d8; background:#fafafa; }
checkbox-el[state="error"], radio-el[state="error"], toggle-el[state="error"] { color:var(--rp-danger); }
checkbox-el[state="error"] .rp-box, radio-el[state="error"] .rp-box { border-color:var(--rp-danger); }
toggle-el[state="error"] .toggle-el-track { box-shadow:0 0 0 2px rgba(220,38,38,.18); }
slider-el[state="error"] .slider-el-fill, range-el[state="error"] .slider-el-fill { background:var(--rp-danger); }
number-input[state="error"] { border-color:var(--rp-danger); }
upload-el[state="error"], upload-el[state="error"] { border-color:#fecaca; background:#fef2f2; color:var(--rp-danger); }
password-input, password-input, tag-input, tag-input { display:inline-block; width:280px; max-width:100%; }
form-item > password-input, form-item > password-input, form-item > tag-input, form-item > tag-input { width:100%; max-width:none; }
.rp-taginput { flex-wrap:wrap; gap:4px; min-height:36px; align-items:center; }
.rp-taginput-chip { display:inline-flex; align-items:center; gap:4px; padding:2px 6px; border-radius:999px; background:#f4f4f5; color:#374151; font-size:12px; }
checkbox-group, checkbox-group, radio-group, radio-group { display:grid; gap:6px; width:fit-content; }
checkbox-group.rp-group-h, radio-group.rp-group-h { grid-auto-flow:column; }
.rp-group-label { color:#374151; font-size:12px; font-weight:700; }
checkbox-group[state="error"] .rp-group-label, radio-group[state="error"] .rp-group-label { color:var(--rp-danger); }
select-el, select-el { display:inline-block; width:280px; max-width:100%; }
form-item > select-el, form-item > select-el { width:100%; max-width:none; }
.select-el-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; }
select-el[state="expanded"] .select-el-control, select-el[state="expanded"] .select-el-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(0,0,0,.06); }
select-el[state="disabled"], select-el[state="disabled"] { opacity:.55; }
.select-el-value { flex:1 1 auto; min-width:0; }
.select-el-options { display:none; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; box-shadow:0 10px 18px rgba(15,23,42,.08); }
select-el[state="expanded"] .select-el-options, select-el[state="expanded"] .select-el-options { display:grid; gap:2px; }
.select-el-option { padding:7px 8px; border-radius:6px; font-size:13px; color:#374151; }
.select-el-option.selected { background:#f4f4f5; color:#09090b; font-weight:700; }
badge-el, badge-el { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 6px; border-radius:999px; background:#18181b; color:#fff; font-size:11px; font-weight:750; }
avatar-el, avatar-el { display:inline-grid; place-items:center; width:var(--snap-size,32px); height:var(--snap-size,32px); border-radius:999px; background:#f4f4f5; color:#374151; font-size:12px; font-weight:800; }
list-el, list-el { display:flex; flex-direction:column; gap:4px; width:100%; }
list-item, list-item { display:flex; align-items:center; gap:8px; width:100%; min-width:180px; height:36px; padding:0 10px; border-radius:8px; color:#374151; }
list-item[state="selected"], list-item[state="selected"] { background:#f4f4f5; color:#09090b; font-weight:700; }
list-item[state="disabled"], list-item[state="disabled"] { opacity:.5; }
.list-el-label { flex:1 1 auto; }
.list-el-badge { margin-left:auto; min-width:18px; height:18px; border-radius:999px; display:grid; place-items:center; padding:0 6px; background:#e5e7eb; color:#374151; font-size:11px; font-weight:700; }
tabs-el, tabs-el { display:flex; gap:6px; border-bottom:1px solid var(--rp-border); margin-bottom:12px; width:fit-content; }
tab-el, tab-el { display:inline-flex; align-items:center; gap:6px; padding:9px 13px; border-bottom:2px solid transparent; color:#6b7280; font-size:14px; }
tab-el.tab-el-active, tab-el.tab-el-active { color:var(--rp-primary); border-bottom-color:var(--rp-primary); font-weight:700; }
button-el, button-el { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:34px; padding:0 12px; border-radius:8px; border:1px solid var(--rp-border); background:#fff; color:#374151; font-size:13px; font-weight:650; }
button-el[block], button-el[block] { display:flex; width:100%; }
button-el[size="sm"], button-el[size="sm"] { min-height:28px; padding:0 9px; font-size:12px; border-radius:6px; }
button-el[size="lg"], button-el[size="lg"] { min-height:40px; padding:0 16px; font-size:14px; }
button-el[variant="primary"], button-el[variant="primary"] { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; }
button-el[variant="secondary"], button-el[variant="secondary"] { border-color:#e4e4e7; background:#f4f4f5; color:#09090b; }
button-el[variant="danger"], button-el[variant="danger"] { border-color:var(--rp-danger); color:var(--rp-danger); }
button-el[variant="link"], button-el[variant="link"] { border-color:transparent; background:transparent; color:var(--rp-primary); padding-inline:2px; }
button-el[variant="ghost"], button-el[variant="ghost"] { border-color:transparent; background:transparent; }
button-el[state="disabled"], button-el[state="disabled"], button-el[disabled], button-el[disabled] { opacity:.5; }
button-group, button-group { display:inline-flex; gap:0; width:fit-content; }
button-group > button-el, button-group > button-el { border-radius:0; margin-left:-1px; }
button-group > button-el:first-child { border-radius:8px 0 0 8px; margin-left:0; }
button-group > button-el:last-child { border-radius:0 8px 8px 0; }
table-el, table-el { display:table; border-collapse:collapse; width:fit-content; min-width:720px; max-width:980px; background:#fff; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
viewport-el table-el, viewport-el table-el { width:100%; max-width:none; }
.table-row { display:table-row; }
.table-el-cell { display:table-cell; padding:11px 12px; border-bottom:1px solid var(--rp-border); font-size:13px; vertical-align:middle; white-space:nowrap; }
.table-el-head .table-el-cell { background:#f9fafb; color:#6b7280; font-size:12px; font-weight:750; }
.table-row:last-child .table-el-cell { border-bottom:0; }
table-list-row, table-list-row { display:grid; grid-template-columns:44px 150px 240px 90px 90px; align-items:center; min-width:560px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#fff; }
table-list-row > span, table-list-row > span { padding:10px 12px; font-size:13px; }
table-list-row[state="unread"], table-list-row[state="unread"] { background:#f4f4f5; font-weight:700; }
table-list-row[state="selected"], table-list-row[state="selected"] { outline:2px solid rgba(0,0,0,.12); background:#fafafa; }
table-list-row[state="highlighted"], table-list-row[state="highlighted"] { background:#fffbeb; }
table-list-row[state="disabled"], table-list-row[state="disabled"] { opacity:.5; }
bulk-action-bar, bulk-action-bar { display:flex; align-items:center; gap:8px; width:fit-content; padding:8px 10px; margin:0 0 10px; border:1px solid #e4e4e7; background:#f4f4f5; border-radius:8px; color:#09090b; font-size:13px; font-weight:650; }
empty-el, empty-el { display:grid; justify-items:center; gap:8px; width:fit-content; min-width:240px; padding:24px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:#fff; color:#6b7280; text-align:center; }
.empty-el-title { color:#111827; font-weight:700; }
.empty-el-desc { font-size:13px; }
loading-el, loading-el { display:grid; gap:8px; min-width:260px; color:var(--rp-primary); }
.skeleton-el-line { height:14px; border-radius:999px; background:linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6); }
.rp-spinner { display:inline-grid; place-items:center; width:32px; height:32px; }
alert-el, alert-el, toast-el, toast-el { display:flex; align-items:flex-start; gap:8px; width:fit-content; max-width:420px; padding:10px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; font-size:13px; }
alert-el[type="info"], alert-el[type="info"], toast-el[type="info"], toast-el[type="info"] { border-color:#e4e4e7; background:#f4f4f5; color:#09090b; }
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
tag-el, tag-el { display:inline-flex; align-items:center; gap:5px; height:24px; padding:0 8px; border-radius:999px; background:#f4f4f5; color:#374151; font-size:12px; font-weight:650; }
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
form-el > form-item, form-el > form-item { width:100%; max-width:none; }
form-el > layout-el, form-el > layout-el { width:100%; max-width:none; }
.form-el-label { color:#374151; font-size:12px; font-weight:700; }
.form-el-label.required::after { content:" *"; color:var(--rp-danger); }
.form-el-error { color:var(--rp-danger); font-size:12px; }
upload-el, upload-el { display:grid; justify-items:center; gap:8px; width:280px; padding:18px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:#fff; color:#6b7280; text-align:center; font-size:13px; }
upload-el[state="has-file"], upload-el[state="has-file"] { justify-items:start; border-style:solid; color:#374151; }
upload-el[state="uploading"], upload-el[state="uploading"] { border-color:#e4e4e7; background:#f4f4f5; color:#09090b; }
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
.rp-ac-option:first-child { background:#f4f4f5; color:#09090b; }

/* --- data display additions --- */
chip-el, chip-el { display:inline-flex; align-items:center; gap:5px; height:26px; padding:0 9px; border-radius:999px; border:1px solid var(--rp-border); background:#f9fafb; color:#374151; font-size:12px; }
tree-el, tree-el { display:flex; flex-direction:column; gap:1px; width:fit-content; min-width:240px; }
.tree-el-row { display:flex; align-items:center; gap:6px; padding:5px 8px; border-radius:6px; color:#374151; font-size:13px; padding-left:calc(8px + var(--tree-level,0) * 18px); }
.tree-el-row.selected { background:#f4f4f5; color:#09090b; font-weight:650; }
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
.kanban-card-tag { display:inline-block; margin-top:6px; padding:1px 7px; border-radius:999px; background:#f4f4f5; color:#374151; font-size:11px; }
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
banner-el, banner-el { display:flex; align-items:center; gap:10px; width:fit-content; min-width:480px; padding:12px 16px; border-radius:8px; font-size:13px; background:#f4f4f5; color:#09090b; border:1px solid #e4e4e7; }
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

/* --- chart / avatar-group / comment / file-list --- */
chart-el, chart-el { display:block; width:100%; max-width:560px; }
.rp-chart-svg { display:block; width:100%; height:auto; overflow:visible; }
.rp-chart-label { fill:var(--rp-muted); font-size:9px; font-family:var(--rp-font); }
avatar-group, avatar-group { display:inline-flex; align-items:center; width:fit-content; }
avatar-group > avatar-el, avatar-group > avatar-el { margin-left:-10px; border:2px solid #fff; border-radius:50%; background:#fff; position:relative; }
avatar-group > avatar-el:first-child { margin-left:0; }
.rp-avatar-overflow { display:inline-grid; place-items:center; width:var(--snap-size,32px); height:var(--snap-size,32px); margin-left:-10px; border:2px solid #fff; border-radius:50%; background:#f3f4f6; color:#6b7280; font-size:11px; font-weight:700; }
comment-el, comment-el { display:block; width:fit-content; max-width:100%; }
.comment-el-head { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.comment-el-author { font-weight:650; font-size:13px; color:var(--rp-text); }
.comment-el-time { font-size:12px; color:var(--rp-muted); }
.comment-el-body { font-size:13px; line-height:1.6; color:#374151; padding-left:36px; }
comment-el comment-el { margin:12px 0 0; padding-left:14px; border-left:2px solid var(--rp-border); }
comment-el.comment-el-me .comment-el-author { color:var(--rp-primary); }
file-list, file-list { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:240px; max-width:100%; }
file-item, file-item { display:flex; align-items:center; gap:10px; padding:9px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; font-size:13px; }
file-item[state="error"], file-item[state="error"] { border-color:#fecaca; background:#fef2f2; }
.rp-file-ic { display:inline-grid; place-items:center; color:var(--rp-primary); flex:0 0 auto; }
.rp-file-ic.error { color:var(--rp-danger); }
.rp-file-ic.uploading { color:var(--rp-primary); }
.rp-file-name { flex:1 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--rp-text); }
.rp-file-size { color:var(--rp-muted); font-size:12px; flex:0 0 auto; }
.rp-file-err { color:var(--rp-danger); font-size:12px; flex:0 0 auto; }
.rp-file-progress { width:80px; height:6px; border-radius:999px; background:#f3f4f6; overflow:hidden; flex:0 0 auto; }
.rp-file-bar { display:block; height:100%; background:var(--rp-primary); border-radius:999px; }

/* --- navigation & layout additions --- */
segmented-el, segmented-el { display:inline-flex; width:fit-content; padding:2px; border-radius:8px; background:#f3f4f6; gap:2px; }
.rp-seg-item { padding:5px 14px; border-radius:6px; font-size:13px; color:#6b7280; }
.rp-seg-item.active { background:#fff; color:#111827; font-weight:650;  }
command-palette, command-palette { display:block; width:520px; border:1px solid var(--rp-border); border-radius:12px; background:#fff; overflow:hidden; }
.rp-cmdk-input { display:flex; align-items:center; gap:10px; padding:14px 16px; border-bottom:1px solid var(--rp-border); }
.rp-cmdk-list { padding:6px; }
.rp-cmdk-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:8px; font-size:13px; color:#374151; }
.rp-cmdk-item.active { background:#f4f4f5; color:#09090b; }
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
user-message, user-message, agent-message, agent-message { display:block; }
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
.rp-tool-tag { padding:1px 6px; border-radius:4px; background:#f4f4f5; color:#374151; font-size:10px; font-weight:700; }
.rp-tool-state { margin-left:auto; font-size:11px; color:#9ca3af; }
.rp-tool-state.running { color:var(--rp-primary); }
.rp-tool-state.error { color:var(--rp-danger); }
.rp-tool-state.done { color:var(--rp-success); }
.rp-tool-args { margin-top:4px; padding-left:21px; font-family:ui-monospace,Menlo,monospace; font-size:12px; color:#9ca3af; white-space:pre-wrap; word-break:break-all; }
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
composer-el, composer-el { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:520px; max-width:680px; padding:9px 9px 9px 14px; border:1px solid var(--rp-border-strong); border-radius:14px; background:#fff; }
composer-el.composer-el-disabled, composer-el.composer-el-disabled { opacity:.55; }
.composer-el-files { display:flex; flex-wrap:wrap; gap:6px; }
.composer-el-file { display:inline-flex; align-items:center; gap:5px; padding:4px 8px; border:1px solid var(--rp-border); border-radius:8px; background:#f9fafb; font-size:12px; color:#374151; }
.composer-el-row { display:flex; align-items:center; gap:8px; }
.composer-el-attach { display:inline-flex; color:#9ca3af; flex:0 0 auto; }
.composer-el-input { flex:1; font-size:14px; min-width:0; }
.composer-el-modes { display:inline-flex; gap:4px; flex:0 0 auto; }
.composer-el-mode { display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border:1px solid var(--rp-border); border-radius:999px; font-size:12px; color:#6b7280; background:#fff; }
.composer-el-mode.active { border-color:var(--rp-primary); background:#f4f4f5; color:#09090b; }
.composer-el-model { padding:4px 9px; border:1px solid var(--rp-border); border-radius:999px; font-size:12px; color:#374151; background:#f9fafb; flex:0 0 auto; }
.composer-el-send { display:grid; place-items:center; width:32px; height:32px; flex:0 0 auto; border-radius:8px; background:#111827; color:#fff; }
.composer-el-send.streaming { background:var(--rp-danger); }
citation-el, citation-el { display:inline-flex; align-items:center; gap:6px; max-width:280px; padding:3px 9px 3px 3px; border:1px solid var(--rp-border); border-radius:6px; background:#f9fafb; font-size:12px; color:#374151; }
.rp-cite-idx { display:grid; place-items:center; width:17px; height:17px; border-radius:4px; background:#e5e7eb; color:#374151; font-size:11px; font-weight:700; }
.rp-cite-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
token-usage, token-usage { display:inline-flex; align-items:center; gap:7px; font-size:12px; color:#9ca3af; }
.rp-token-track { width:90px; height:5px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
.rp-token-fill { display:block; height:100%; background:#9ca3af; }
anchor-el, anchor-el { display:inline-flex; align-items:center; gap:6px; padding:4px 11px; font-size:13px; font-weight:600; color:var(--rp-primary); background:rgba(0,0,0,.05); border:1px solid rgba(0,0,0,.14); border-radius:999px; cursor:pointer; text-decoration:none; vertical-align:middle; }
anchor-el:hover, anchor-el:hover { background:rgba(0,0,0,.08); }
.anchor-el-label { line-height:1; }
diagram-block, diagram-block { display:block; width:fit-content; max-width:100%; margin:10px 0; padding:12px; background:#fff; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); overflow:auto; }
.diagram-block-svg { display:flex; justify-content:center; }
.diagram-block-svg svg { max-width:100%; height:auto; }
.diagram-block-empty, .diagram-block-err { font-size:13px; color:var(--rp-muted); }
.diagram-block-err { color:var(--rp-danger); margin-bottom:6px; }
.diagram-block-raw { margin:0; font-family:ui-monospace,Menlo,monospace; font-size:12px; line-height:1.5; color:#374151; white-space:pre; overflow:auto; }

/* --- document mode (<page mode="doc">) --- */
.page-el-shell.page-el-doc { display:block; max-width:860px; margin:0 auto; min-height:0; }
.page-el-doc .page-el-header { max-width:none; width:auto; }
.page-el-doc .page-el-body { display:block; width:auto; max-width:none; }
doc-heading, doc-heading { display:block; margin:32px 0 12px; line-height:1.25; letter-spacing:-.01em; color:var(--rp-text); font-weight:720; }
doc-heading[data-level="1"] { font-size:32px; margin-top:0; }
doc-heading[data-level="2"] { font-size:25px; margin-top:36px; padding-bottom:6px; border-bottom:1px solid var(--rp-border); }
doc-heading[data-level="3"] { font-size:20px; }
doc-heading[data-level="4"] { font-size:17px; }
doc-heading[data-level="5"] { font-size:15px; }
doc-heading[data-level="6"] { font-size:14px; color:var(--rp-muted); }
doc-paragraph, doc-paragraph { display:block; margin:0 0 16px; line-height:1.7; font-size:15px; color:var(--rp-text); }
doc-list, doc-list { display:block; margin:0 0 16px; padding-left:24px; }
doc-list-item, doc-list-item { display:list-item; margin:0 0 6px; line-height:1.65; font-size:15px; color:var(--rp-text); }
doc-list[data-type="bullet"] > doc-list-item { list-style:disc; }
doc-list[data-type="number"] > doc-list-item { list-style:decimal; }
doc-list-item::marker { color:var(--rp-muted); }
doc-quote, doc-quote { display:block; margin:0 0 18px; padding:12px 18px; background:var(--rp-surface-soft); border-left:3px solid var(--rp-primary); border-radius:0 var(--rp-radius-md) var(--rp-radius-md) 0; color:#374151; font-size:15px; line-height:1.7; }
doc-quote[data-cite]::after { content:"— " attr(data-cite); display:block; margin-top:8px; font-size:13px; color:var(--rp-muted); }
/* inline prose inside doc elements (custom RPML inline elements + native HTML passthrough) */
doc-paragraph code, doc-list-item code, doc-quote code, doc-paragraph code-inline, doc-list-item code-inline, doc-quote code-inline { padding:1px 5px; border-radius:4px; background:#f4f4f5; color:var(--rp-primary); font-weight:650; font-family:ui-monospace,Menlo,monospace; font-size:.92em; }
doc-paragraph strong, doc-list-item strong, doc-quote strong, doc-paragraph bold-el, doc-list-item bold-el, doc-quote bold-el { color:#1f2937; font-weight:680; }
doc-paragraph em, doc-list-item em, doc-quote em, doc-paragraph italic-el, doc-list-item italic-el, doc-quote italic-el { font-style:italic; }
doc-paragraph a, doc-list-item a { color:var(--rp-primary); }
/* doc-ordered-list / doc-unordered-list: same base as doc-list but with fixed type */
doc-ordered-list, doc-unordered-list { display:block; margin:0 0 16px; padding-left:24px; }
doc-ordered-list > doc-list-item { list-style:decimal; }
doc-unordered-list > doc-list-item { list-style:disc; }
/* inline custom elements */
bold-el { font-weight:680; color:#1f2937; }
italic-el { font-style:italic; }
code-inline { padding:1px 5px; border-radius:4px; background:#f4f4f5; color:var(--rp-primary); font-weight:650; font-family:ui-monospace,Menlo,monospace; font-size:.92em; }

/* --- form-field-description --- */
form-field-description, form-field-description { display:block; margin-top:4px; color:var(--rp-muted); font-size:12px; line-height:1.55; }

/* --- radio-card --- */
radio-card, radio-card { display:flex; align-items:flex-start; gap:10px; padding:12px 14px; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); background:var(--rp-surface); min-width:180px; }
radio-card[state="checked"], radio-card[state="checked"] { border-color:var(--rp-primary); }
radio-card[state="disabled"], radio-card[state="disabled"] { opacity:.5; }
.radio-card-dot { display:grid; place-items:center; width:16px; height:16px; border-radius:50%; border:1.5px solid var(--rp-border-strong); flex:0 0 auto; margin-top:1px; }
.radio-card-dot.checked { border-color:var(--rp-primary); background:var(--rp-primary); }
.radio-card-dot.checked::after { content:''; display:block; width:6px; height:6px; border-radius:50%; background:#fff; }
.radio-card-body { flex:1; min-width:0; }
.radio-card-label { display:block; font-size:13px; font-weight:650; color:var(--rp-text); }
.radio-card-desc { display:block; font-size:12px; color:var(--rp-muted); margin-top:2px; }

/* --- design-system palettes --- */
color-palette, color-palette { display:flex; flex-wrap:wrap; gap:12px; width:fit-content; }
.cp-item { display:flex; flex-direction:column; gap:5px; min-width:72px; }
.cp-swatch { height:52px; border-radius:var(--rp-radius-md); border:1px solid rgba(0,0,0,.06); }
.cp-name { font-size:11px; font-weight:650; color:var(--rp-text); }
.cp-value { font-size:10px; font-family:ui-monospace,Menlo,monospace; color:var(--rp-muted); }
font-palette, font-palette { display:flex; flex-direction:column; width:fit-content; min-width:440px; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); overflow:hidden; }
.fp-row { display:flex; align-items:baseline; gap:16px; padding:12px 16px; border-bottom:1px solid var(--rp-border); }
.fp-row:last-child { border-bottom:0; }
.fp-role { width:96px; font-size:11px; font-weight:650; color:var(--rp-muted); text-transform:uppercase; letter-spacing:.06em; flex:0 0 auto; }
.fp-sample { flex:1; color:var(--rp-text); overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.fp-meta { font-size:11px; font-family:ui-monospace,Menlo,monospace; color:#a1a1aa; white-space:nowrap; }
space-palette, space-palette { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:300px; }
.sp-row { display:flex; align-items:center; gap:10px; }
.sp-token { font-size:11px; font-weight:650; color:var(--rp-muted); width:40px; font-family:ui-monospace,Menlo,monospace; }
.sp-bar-wrap { flex:1; min-width:0; }
.sp-bar { height:14px; background:var(--rp-text); border-radius:2px; min-width:4px; }
.sp-value { font-size:11px; font-family:ui-monospace,Menlo,monospace; color:var(--rp-text); width:40px; text-align:right; }
radius-palette, radius-palette { display:flex; flex-wrap:wrap; gap:20px; width:fit-content; align-items:flex-end; }
.rp-rp-item { display:flex; flex-direction:column; align-items:center; gap:6px; }
.rp-rp-box { width:56px; height:56px; background:var(--rp-surface-soft); border:2px solid var(--rp-text); }
.rp-rp-label { font-size:11px; font-weight:650; color:var(--rp-text); }
.rp-rp-value { font-size:10px; font-family:ui-monospace,Menlo,monospace; color:var(--rp-muted); }
/* --- shadcn-aligned components --- */
/* carousel */
carousel-el, carousel-el { display:block; position:relative; width:100%; max-width:100%; }
.rp-carousel-viewport { overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; }
.rp-carousel-viewport::-webkit-scrollbar { display:none; }
.rp-carousel-track { display:flex; gap:12px; }
carousel-item, carousel-item { flex:0 0 auto; width:300px; scroll-snap-align:start; }
.rp-carousel-prev, .rp-carousel-next { position:absolute; top:50%; transform:translateY(-50%); display:grid; place-items:center; width:32px; height:32px; border-radius:50%; border:1px solid var(--rp-border); background:#fff; color:#374151; z-index:1; }
.rp-carousel-prev { left:8px; }
.rp-carousel-next { right:8px; }

/* combobox */
combobox-el, combobox-el { display:block; width:100%; max-width:100%; }
.rp-combobox-trigger { display:flex; align-items:center; justify-content:space-between; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#374151; font-size:13px; }
.rp-combobox-value { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-combobox-popover { display:none; margin-top:4px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; box-shadow:0 10px 18px rgba(15,23,42,.08); }
.rp-combobox-search { display:flex; align-items:center; gap:8px; padding:8px 10px; border-bottom:1px solid var(--rp-border); }
.rp-combobox-search input { border:0; outline:0; font-size:13px; width:100%; background:transparent; }
.rp-combobox-list { padding:4px; max-height:200px; overflow-y:auto; }
.rp-combobox-option { display:flex; align-items:center; gap:8px; padding:7px 8px; border-radius:6px; font-size:13px; color:#374151; }
.rp-combobox-option.selected { background:#f4f4f5; }
.rp-combobox-option svg:first-child { opacity:0; }
.rp-combobox-option.selected svg:first-child { opacity:1; }

/* data-table */
data-table, data-table { display:block; width:100%; max-width:100%; }
.rp-dt-wrap { border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#fff; }
.rp-dt-table { width:100%; border-collapse:collapse; }
.rp-dt-th { display:table-cell; padding:10px 12px; border-bottom:1px solid var(--rp-border); font-size:13px; font-weight:650; color:#6b7280; text-align:left; white-space:nowrap; }
.rp-dt-th svg { display:inline-block; margin-left:4px; opacity:.4; }
.rp-dt-tr { border-bottom:1px solid var(--rp-border); }
.rp-dt-tr:last-child { border-bottom:0; }
.rp-dt-td { display:table-cell; padding:10px 12px; font-size:13px; color:#374151; }
.rp-dt-foot { padding:8px 12px; border-top:1px solid var(--rp-border); background:#f9fafb; font-size:12px; color:#6b7280; }

/* hover-card */
hover-card, hover-card { display:inline-block; position:relative; width:fit-content; }
.rp-hovercard-trigger { color:var(--rp-primary); font-weight:650; border-bottom:1px dashed var(--rp-primary); }
.rp-hovercard-content { display:block; position:absolute; top:100%; left:0; z-index:10; margin-top:6px; width:280px; padding:14px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; box-shadow:0 10px 24px rgba(15,23,42,.08); }
.rp-hovercard-title { font-size:14px; font-weight:700; color:#111827; margin-bottom:4px; }
.rp-hovercard-body { font-size:13px; color:#6b7280; line-height:1.5; }

/* input-group */
input-group, input-group { display:flex; align-items:center; width:100%; max-width:100%; min-height:36px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; overflow:hidden; }
.rp-ig-prefix, .rp-ig-suffix { display:flex; align-items:center; padding:0 11px; font-size:13px; color:#6b7280; background:#f4f4f5; white-space:nowrap; flex:0 0 auto; align-self:stretch; }
.rp-ig-input { flex:1; min-width:0; padding:0 11px; font-size:13px; color:#374151; }

/* menubar */
menubar-el, menubar-el { display:flex; align-items:center; gap:2px; width:fit-content; padding:4px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; }
.rp-menubar-item, menubar-item { display:flex; align-items:center; gap:4px; padding:6px 12px; border-radius:6px; font-size:13px; color:#374151; }
.rp-menubar-label { font-weight:500; }

/* nav-menu */
nav-menu, nav-menu { display:flex; align-items:center; gap:0; width:fit-content; border-bottom:1px solid var(--rp-border); }
.rp-navmenu-item, nav-menu-item { display:flex; align-items:center; padding:9px 16px; border-bottom:2px solid transparent; font-size:14px; color:#6b7280; }
.rp-navmenu-label.active { color:var(--rp-primary); border-bottom-color:var(--rp-primary); font-weight:650; }

/* scroll-area */
scroll-area, scroll-area { display:block; position:relative; width:100%; max-width:100%; height:var(--snap-height,200px); overflow:hidden; border:1px solid var(--rp-border); border-radius:8px; background:#fff; }
.rp-scroll-viewport { height:100%; overflow-y:auto; padding:12px; scrollbar-width:thin; }
.rp-scroll-viewport::-webkit-scrollbar { width:6px; }
.rp-scroll-viewport::-webkit-scrollbar-thumb { background:#d4d4d8; border-radius:3px; }
.rp-scroll-bar { position:absolute; right:4px; top:4px; bottom:4px; width:6px; }
.rp-scroll-thumb { width:100%; height:40%; background:#d4d4d8; border-radius:3px; }

/* toggle-group */
toggle-group, toggle-group { display:inline-flex; align-items:center; gap:2px; width:fit-content; padding:2px; border-radius:8px; background:#f3f4f6; }
.rp-tg-item, toggle-group-item { display:flex; align-items:center; padding:6px 12px; border-radius:6px; font-size:13px; color:#6b7280; }
.rp-tg-item.active, toggle-group-item.active { background:#fff; color:#111827; font-weight:650; box-shadow:0 1px 2px rgba(0,0,0,.06); }

/* collapsible */
collapsible-el, collapsible-el { display:block; width:100%; max-width:100%; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
.rp-collapsible-head { display:flex; align-items:center; gap:8px; padding:11px 14px; font-size:13px; font-weight:650; color:#111827; }
.rp-collapsible-head svg { transition:transform .15s; }
collapsible-el.expanded .rp-collapsible-head svg { transform:rotate(90deg); }
.rp-collapsible-body { display:none; padding:0 14px 14px; font-size:13px; color:#6b7280; }
collapsible-el.expanded .rp-collapsible-body { display:block; }

/* aspect-ratio */
aspect-ratio, aspect-ratio { display:block; position:relative; width:100%; max-width:100%; border-radius:8px; overflow:hidden; background:#f3f4f6; }
aspect-ratio::before { content:''; display:block; padding-top:var(--snap-ratio,56.25%); }
.rp-aspect-inner { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }

/* field (shadcn Field) */
field-el, field-el { display:grid; gap:6px; width:100%; max-width:100%; }
.rp-sf-label { font-size:13px; font-weight:650; color:#374151; }
.rp-sf-control { display:flex; align-items:center; min-height:36px; }
.rp-sf-control > * { width:100%; }
.rp-sf-desc { font-size:12px; color:var(--rp-muted); }
.rp-sf-err { font-size:12px; color:var(--rp-danger); }

/* sonner (toast) */
sonner-el, sonner-el { display:flex; align-items:flex-start; gap:10px; width:100%; max-width:360px; padding:14px 16px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; box-shadow:0 10px 24px rgba(15,23,42,.08); box-sizing:border-box; }
.rp-sonner-icon { flex:0 0 auto; display:grid; place-items:center; width:20px; height:20px; }
.rp-sonner-main { flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.rp-sonner-title { font-size:14px; font-weight:650; color:#111827; line-height:1.4; }
.rp-sonner-desc { font-size:13px; color:#6b7280; line-height:1.4; }
.rp-sonner-close { flex:0 0 auto; display:grid; place-items:center; width:20px; height:20px; margin-top:1px; border:0; background:transparent; padding:0; border-radius:6px; color:#9ca3af; font:inherit; }

/* layout stretch for new shadcn components */
layout-el > carousel-el, layout-el > carousel-el { width:100%; max-width:none; }
layout-el > combobox-el, layout-el > combobox-el { width:100%; max-width:none; }
layout-el > data-table, layout-el > data-table { width:100%; max-width:none; }
layout-el > input-group, layout-el > input-group { width:100%; max-width:none; }
layout-el > scroll-area, layout-el > scroll-area { width:100%; max-width:none; }
layout-el > toggle-group, layout-el > toggle-group { width:100%; max-width:none; }
layout-el > collapsible-el, layout-el > collapsible-el { width:100%; max-width:none; }
layout-el > aspect-ratio, layout-el > aspect-ratio { width:100%; max-width:none; }
layout-el > field-el, layout-el > field-el { width:100%; max-width:none; }
layout-el > sonner-el, layout-el > sonner-el { width:100%; max-width:none; }
layout-el > menubar-el, layout-el > menubar-el { width:100%; max-width:none; }
layout-el > nav-menu, layout-el > nav-menu { width:100%; max-width:none; }
layout-el > hover-card, layout-el > hover-card { width:100%; max-width:none; }
form-item > input-group, form-item > input-group { width:100%; max-width:none; }
form-item > combobox-el, form-item > combobox-el { width:100%; max-width:none; }
form-item > field-el, form-item > field-el { width:100%; max-width:none; }
form-el > field-el, form-el > field-el { width:100%; max-width:none; }
`;

export function injectStyle() {
  if (document.getElementById(RPUI_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = RPUI_STYLE_ID;
  el.textContent = style;
  document.head.appendChild(el);
}
