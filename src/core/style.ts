export const RPUI_STYLE_ID = "rpui-runtime-style";

export const style = `
:root { --rp-bg:#f0f2f5; --rp-surface:#fff; --rp-surface-soft:#f9fafb; --rp-text:#111827; --rp-muted:#6b7280; --rp-border:#e5e7eb; --rp-border-strong:#d1d5db; --rp-primary:#2563eb; --rp-success:#059669; --rp-warning:#d97706; --rp-danger:#dc2626; --rp-purple:#7c3aed; --rp-radius-sm:4px; --rp-radius-md:8px; --rp-radius-lg:12px; --rp-shadow:0 8px 28px rgba(15,23,42,.08); --rp-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
* { box-sizing:border-box; }
body { margin:0; font-family:var(--rp-font); color:var(--rp-text); background:var(--rp-bg); }
.rp-icon { display:inline-block; flex:0 0 auto; vertical-align:-0.16em; }
rp-page, proto-page { display:block; min-height:100vh; padding:32px 40px; overflow:auto; }
.rp-page-shell { display:grid; grid-template-columns:max-content max-content; gap:24px; min-height:100vh; align-items:start; }
.rp-page-main { display:flex; flex-direction:column; min-width:0; overflow:visible; }
.rp-page-header { flex:0 0 auto; width:fit-content; max-width:none; margin:0 0 22px; }
.rp-page-title-row { display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; }
.rp-page-title { margin:0; font-size:28px; line-height:1.2; letter-spacing:-.02em; }
.rp-page-route { font-size:13px; color:var(--rp-muted); font-family:ui-monospace,SFMono-Regular,Menlo,monospace; background:rgba(255,255,255,.7); border:1px solid var(--rp-border); border-radius:999px; padding:3px 9px; }
.rp-page-description { margin:10px 0 0; color:#374151; line-height:1.6; font-size:14px; }
.rp-page-body { flex:0 1 auto; display:block; width:fit-content; max-width:100%; min-height:0; overflow:visible; }
.rp-annotation-pane { min-width:380px; max-width:680px; position:sticky; top:0; height:100vh; overflow-y:auto; overflow-x:auto; padding:0 0 48px 0; align-self:start; }
.rp-annotation-pane-inner { padding:4px 12px 24px 6px; }
rp-main-view, proto-main-view { display:block; width:fit-content; margin:0 0 28px; position:relative; }
.rp-main-shell { position:relative; overflow:visible; border:1px solid var(--rp-border-strong); border-radius:var(--rp-radius-md); background:var(--rp-surface); box-shadow:var(--rp-shadow); }
.rp-main-stage-clip { overflow:hidden; border-radius:var(--rp-radius-md); }
.rp-main-stage { position:relative; transform-origin:top left; background:var(--rp-surface); }
.rp-pin { position:absolute; z-index:20; display:grid; place-items:center; width:24px; height:24px; color:#fff; font-size:11px; font-weight:700; background:var(--rp-primary); border-radius:50% 50% 50% 0; transform:translate(-6px,-6px) rotate(-45deg); box-shadow:0 2px 8px rgba(37,99,235,.25); cursor:pointer; }
.rp-pin > span { transform:rotate(45deg); }
.rp-pin:hover { opacity:0.85; }
rp-annotation, proto-annotation { display:block; width:fit-content; max-width:980px; margin:14px 0; line-height:1.65; color:#1f2937; font-size:14px; }
rp-annotation rp-annotation, proto-annotation proto-annotation, rp-annotation proto-annotation, proto-annotation rp-annotation { margin:10px 0 8px 22px; }
.rp-annotation-head { display:flex; align-items:center; gap:8px; margin:0 0 4px; width:fit-content; }
.rp-annotation-title { font-weight:700; color:#111827; }
.rp-annotation-marker { display:inline-grid; place-items:center; flex:0 0 auto; color:#fff; font-size:10px; font-weight:700; line-height:1; }
.rp-annotation-marker.drop { width:22px; height:22px; background:var(--rp-primary); border-radius:50% 50% 50% 0; transform:rotate(-45deg); }
.rp-annotation-marker.drop > span { transform:rotate(45deg); }
.rp-annotation-marker.circle { width:16px; height:16px; background:var(--rp-purple); border-radius:50%; }
.rp-annotation-marker.triangle { width:18px; height:16px; background:var(--rp-success); clip-path:polygon(50% 0, 100% 100%, 0 100%); }
.rp-annotation-marker.triangle > span { transform:translateY(2px); font-size:9px; }
.rp-annotation-body { display:block; position:relative; width:fit-content; max-width:920px; }
.rp-pin-slice { width:18px; height:18px; font-size:10px; box-shadow:0 1px 5px rgba(37,99,235,.3); }
.rp-annotation-body > :not(rp-annotation):not(proto-annotation):not(rp-enum):not(proto-enum) { max-width:820px; }
.rp-annotation-pane rp-annotation, .rp-annotation-pane proto-annotation { max-width:none; }
.rp-annotation-pane .rp-annotation-body { max-width:none; }
.rp-annotation-pane .rp-annotation-body > :not(rp-annotation):not(proto-annotation):not(rp-enum):not(proto-enum) { max-width:420px; }
.rp-annotation-body p { margin:0 0 8px; }
rp-enum, proto-enum { display:flex; align-items:flex-start; flex-wrap:wrap; gap:10px; width:fit-content; margin:8px 0 12px; }
.rp-annotation-pane rp-enum, .rp-annotation-pane proto-enum { flex-wrap:wrap; }
rp-enum-item, proto-enum-item { display:block; flex:0 0 auto; width:fit-content; min-width:180px; max-width:600px; border:1px solid #f0f0f0; border-radius:var(--rp-radius-md); background:#fff; overflow:hidden; }
.rp-enum-label { display:flex; align-items:flex-start; gap:6px; padding:5px 9px 4px; font-size:12px; font-weight:650; color:#374151; }
.rp-enum-index { display:inline-grid; place-items:center; min-width:16px; height:16px; padding:0 4px; background:#111827; color:#fff; font-size:10px; font-weight:750; border-radius:3px; flex:0 0 auto; margin-top:1px; }
.rp-enum-label-text { display:block; }
.rp-enum-description { display:block; margin-top:2px; font-size:11px; line-height:1.35; font-weight:400; color:var(--rp-muted); }
.rp-enum-content { display:block; width:fit-content; padding:8px; }
.rp-annotation-title { font-weight:700; color:#111827; cursor:pointer; }
.rp-annotation-title:hover { color:var(--rp-primary); }
.rp-section-focus { outline:2px dashed var(--rp-primary); outline-offset:4px; border-radius:4px; }
snap-viewport, rp-viewport { display:flex; flex-direction:column; width:var(--snap-width,1440px); height:var(--snap-height,900px); background:#f8fafc; overflow:hidden; color:#111827; }
snap-layout, rp-layout { display:grid; grid-template-columns:var(--snap-columns,1fr); grid-template-rows:var(--snap-rows,auto); gap:var(--snap-gap,0); align-content:start; width:fit-content; max-width:100%; min-width:0; }
snap-layout > *, rp-layout > * { min-width:0; }
snap-viewport snap-layout, rp-viewport rp-layout { width:100%; }
snap-viewport > snap-layout, rp-viewport > rp-layout { flex:1 1 auto; min-height:0; }
snap-viewport > snap-navbar, rp-viewport > rp-navbar { flex:0 0 auto; }
snap-panel, rp-panel { display:block; width:fit-content; max-width:100%; background:#fff; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); padding:var(--snap-padding,16px); }
snap-viewport snap-panel, rp-viewport rp-panel { width:auto; min-width:0; }
snap-panel[elevation="1"], rp-panel[elevation="1"] { box-shadow:0 4px 16px rgba(15,23,42,.06); }
snap-panel[elevation="2"], rp-panel[elevation="2"] { box-shadow:var(--rp-shadow); }
snap-navbar, rp-navbar { display:flex; align-items:center; gap:14px; height:var(--snap-height,64px); padding:0 24px; background:#fff; border-bottom:1px solid var(--rp-border); }
snap-sidebar, rp-sidebar { display:block; width:var(--snap-width,260px); min-height:0; background:#fff; border-right:1px solid var(--rp-border); padding:14px; }
snap-viewport snap-sidebar, rp-viewport rp-sidebar { min-height:100%; }
snap-sidebar[collapsed], rp-sidebar[collapsed] { width:72px; }
snap-logo, rp-logo { display:inline-grid; place-items:center; width:var(--snap-size,82px); height:32px; border-radius:8px; background:#111827; color:#fff; font-size:12px; font-weight:800; letter-spacing:.08em; }
snap-search, rp-search, snap-input, rp-input, snap-date-picker, rp-date-picker { display:inline-flex; align-items:center; gap:8px; width:280px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; }
snap-textarea, rp-textarea { display:block; width:320px; min-height:calc(var(--snap-rows,3) * 24px + 22px); padding:9px 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; white-space:pre-wrap; }
snap-search[state="focus"], rp-search[state="focus"], snap-input[state="focus"], rp-input[state="focus"], snap-textarea[state="focus"], rp-textarea[state="focus"], snap-date-picker[state="focus"], rp-date-picker[state="focus"] { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
snap-search[state="filled"], rp-search[state="filled"], snap-input[state="filled"], rp-input[state="filled"], snap-textarea[state="filled"], rp-textarea[state="filled"], snap-date-picker[state="filled"], rp-date-picker[state="filled"] { border-color:#93c5fd; background:#f8fbff; }
snap-search[state="error"], rp-search[state="error"], snap-input[state="error"], rp-input[state="error"], snap-textarea[state="error"], rp-textarea[state="error"], snap-date-picker[state="error"], rp-date-picker[state="error"] { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
snap-search[state="disabled"], rp-search[state="disabled"], snap-input[state="disabled"], rp-input[state="disabled"], snap-textarea[state="disabled"], rp-textarea[state="disabled"], snap-date-picker[state="disabled"], rp-date-picker[state="disabled"] { opacity:.55; background:#f3f4f6; }
snap-input[label], rp-input[label], snap-date-picker[label], rp-date-picker[label] { display:inline-grid; align-items:start; gap:6px; width:280px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
snap-input[label][state="focus"], rp-input[label][state="focus"], snap-input[label][state="filled"], rp-input[label][state="filled"], snap-input[label][state="error"], rp-input[label][state="error"], snap-date-picker[label][state="focus"], rp-date-picker[label][state="focus"], snap-date-picker[label][state="filled"], rp-date-picker[label][state="filled"], snap-date-picker[label][state="error"], rp-date-picker[label][state="error"] { border:0; background:transparent; box-shadow:none; }
.rp-field-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; color:#111827; }
snap-input[state="focus"] .rp-field-control, rp-input[state="focus"] .rp-field-control, snap-date-picker[state="focus"] .rp-field-control, rp-date-picker[state="focus"] .rp-field-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
snap-input[state="filled"] .rp-field-control, rp-input[state="filled"] .rp-field-control, snap-date-picker[state="filled"] .rp-field-control, rp-date-picker[state="filled"] .rp-field-control { border-color:#93c5fd; background:#f8fbff; }
snap-input[state="error"] .rp-field-control, rp-input[state="error"] .rp-field-control, snap-date-picker[state="error"] .rp-field-control, rp-date-picker[state="error"] .rp-field-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px rgba(220,38,38,.1); }
.rp-field-label { display:block; margin:0 0 6px; color:#374151; font-size:12px; font-weight:650; }
.rp-placeholder { color:#9ca3af; }
.rp-value { color:#111827; }
.rp-error-text { color:var(--rp-danger); font-size:12px; }
snap-select, rp-select { display:inline-block; width:var(--snap-width,280px); }
.rp-select-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; }
snap-select[state="expanded"] .rp-select-control, rp-select[state="expanded"] .rp-select-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
snap-select[state="disabled"], rp-select[state="disabled"] { opacity:.55; }
.rp-select-value { flex:1 1 auto; min-width:0; }
.rp-select-options { display:none; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; box-shadow:0 10px 18px rgba(15,23,42,.08); }
snap-select[state="expanded"] .rp-select-options, rp-select[state="expanded"] .rp-select-options { display:grid; gap:2px; }
.rp-select-option { padding:7px 8px; border-radius:6px; font-size:13px; color:#374151; }
.rp-select-option.selected { background:#eff6ff; color:#1d4ed8; font-weight:700; }
snap-badge, rp-badge { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 6px; border-radius:999px; background:#ef4444; color:#fff; font-size:11px; font-weight:750; }
snap-avatar, rp-avatar { display:inline-grid; place-items:center; width:var(--snap-size,32px); height:var(--snap-size,32px); border-radius:999px; background:#e0e7ff; color:#3730a3; font-size:12px; font-weight:800; }
snap-list, rp-list { display:flex; flex-direction:column; gap:4px; width:100%; }
snap-list-item, rp-list-item { display:flex; align-items:center; gap:8px; width:100%; min-width:180px; height:36px; padding:0 10px; border-radius:8px; color:#374151; }
snap-list-item[state="selected"], rp-list-item[state="selected"] { background:#eff6ff; color:#1d4ed8; font-weight:700; }
snap-list-item[state="disabled"], rp-list-item[state="disabled"] { opacity:.5; }
.rp-list-label { flex:1 1 auto; }
.rp-list-badge { margin-left:auto; min-width:18px; height:18px; border-radius:999px; display:grid; place-items:center; padding:0 6px; background:#e5e7eb; color:#374151; font-size:11px; font-weight:700; }
snap-tabs, rp-tabs { display:flex; gap:6px; border-bottom:1px solid var(--rp-border); margin-bottom:12px; width:fit-content; }
snap-tab, rp-tab { display:inline-flex; align-items:center; gap:6px; padding:9px 13px; border-bottom:2px solid transparent; color:#6b7280; font-size:14px; }
snap-tab.rp-tab-active, rp-tab.rp-tab-active { color:var(--rp-primary); border-bottom-color:var(--rp-primary); font-weight:700; }
snap-button, rp-button { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:34px; padding:0 12px; border-radius:8px; border:1px solid var(--rp-border); background:#fff; color:#374151; font-size:13px; font-weight:650; }
snap-button[size="sm"], rp-button[size="sm"] { min-height:28px; padding:0 9px; font-size:12px; border-radius:6px; }
snap-button[size="lg"], rp-button[size="lg"] { min-height:40px; padding:0 16px; font-size:14px; }
snap-button[variant="primary"], rp-button[variant="primary"] { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; }
snap-button[variant="secondary"], rp-button[variant="secondary"] { border-color:#bfdbfe; background:#eff6ff; color:#1d4ed8; }
snap-button[variant="danger"], rp-button[variant="danger"] { border-color:var(--rp-danger); color:var(--rp-danger); }
snap-button[variant="link"], rp-button[variant="link"] { border-color:transparent; background:transparent; color:var(--rp-primary); padding-inline:2px; }
snap-button[variant="ghost"], rp-button[variant="ghost"] { border-color:transparent; background:transparent; }
snap-button[state="disabled"], rp-button[state="disabled"], snap-button[disabled], rp-button[disabled] { opacity:.5; }
snap-button-group, rp-button-group { display:inline-flex; gap:0; width:fit-content; }
snap-button-group > snap-button, rp-button-group > rp-button { border-radius:0; margin-left:-1px; }
snap-button-group > :first-child { border-radius:8px 0 0 8px; margin-left:0; }
snap-button-group > :last-child { border-radius:0 8px 8px 0; }
snap-table, rp-table { display:table; border-collapse:collapse; width:fit-content; min-width:720px; max-width:980px; background:#fff; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
snap-viewport snap-table, rp-viewport rp-table { width:100%; max-width:none; }
.rp-table-row { display:table-row; }
.rp-table-cell { display:table-cell; padding:11px 12px; border-bottom:1px solid var(--rp-border); font-size:13px; vertical-align:middle; white-space:nowrap; }
.rp-table-head .rp-table-cell { background:#f9fafb; color:#6b7280; font-size:12px; font-weight:750; }
.rp-table-row:last-child .rp-table-cell { border-bottom:0; }
snap-table-row, rp-table-row { display:grid; grid-template-columns:44px 150px 240px 90px 90px; align-items:center; min-width:560px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#fff; }
snap-table-row > span, rp-table-row > span { padding:10px 12px; font-size:13px; }
snap-table-row[state="unread"], rp-table-row[state="unread"] { background:#eff6ff; font-weight:700; }
snap-table-row[state="selected"], rp-table-row[state="selected"] { outline:2px solid rgba(37,99,235,.35); background:#f8fbff; }
snap-table-row[state="highlighted"], rp-table-row[state="highlighted"] { background:#fffbeb; }
snap-table-row[state="disabled"], rp-table-row[state="disabled"] { opacity:.5; }
snap-bulk-action-bar, rp-bulk-action-bar { display:flex; align-items:center; gap:8px; width:fit-content; padding:8px 10px; margin:0 0 10px; border:1px solid #bfdbfe; background:#eff6ff; border-radius:8px; color:#1e40af; font-size:13px; font-weight:650; }
snap-empty, rp-empty { display:grid; justify-items:center; gap:8px; width:fit-content; min-width:240px; padding:24px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:#fff; color:#6b7280; text-align:center; }
.rp-empty-title { color:#111827; font-weight:700; }
.rp-empty-desc { font-size:13px; }
snap-loading, rp-loading { display:grid; gap:8px; min-width:260px; color:var(--rp-primary); }
.rp-skeleton-line { height:14px; border-radius:999px; background:linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6); }
.rp-spinner { display:inline-grid; place-items:center; width:32px; height:32px; }
snap-alert, rp-alert, snap-toast, rp-toast { display:flex; align-items:flex-start; gap:8px; width:fit-content; max-width:420px; padding:10px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; font-size:13px; }
snap-alert[type="info"], rp-alert[type="info"], snap-toast[type="info"], rp-toast[type="info"] { border-color:#bfdbfe; background:#eff6ff; color:#1e40af; }
snap-alert[type="success"], rp-alert[type="success"], snap-toast[type="success"], rp-toast[type="success"] { border-color:#bbf7d0; background:#f0fdf4; color:#166534; }
snap-alert[type="warning"], rp-alert[type="warning"], snap-toast[type="warning"], rp-toast[type="warning"] { border-color:#fde68a; background:#fffbeb; color:#92400e; }
snap-alert[type="error"], rp-alert[type="error"], snap-toast[type="error"], rp-toast[type="error"] { border-color:#fecaca; background:#fef2f2; color:#991b1b; }
snap-dropdown, rp-dropdown, snap-popover, rp-popover { display:block; width:var(--snap-width,300px); padding:8px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; box-shadow:0 12px 24px rgba(15,23,42,.1); }
snap-tooltip, rp-tooltip { display:inline-block; width:fit-content; max-width:240px; padding:6px 8px; border-radius:6px; background:#111827; color:#fff; font-size:12px; }
.rp-overlay-title { margin:0 0 8px; color:#111827; font-size:14px; font-weight:750; }
snap-modal, rp-modal { display:block; width:min(var(--snap-width,480px), 100%); border:1px solid var(--rp-border); border-radius:12px; background:#fff; box-shadow:0 24px 48px rgba(15,23,42,.18); overflow:hidden; }
snap-drawer, rp-drawer { display:block; width:min(var(--snap-width,360px), 100%); min-height:320px; border:1px solid var(--rp-border); background:#fff; box-shadow:0 18px 40px rgba(15,23,42,.14); }
.rp-modal-head, .rp-drawer-head { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--rp-border); font-weight:750; }
.rp-modal-body, .rp-drawer-body { padding:16px; }
.rp-modal-footer { display:flex; justify-content:flex-end; gap:8px; padding:12px 16px; border-top:1px solid var(--rp-border); background:#f9fafb; }
snap-card, rp-card { display:block; width:auto; min-width:220px; padding:14px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.rp-card-image { display:grid; place-items:center; height:120px; margin:-14px -14px 12px; border-radius:10px 10px 0 0; background:#f3f4f6; color:#6b7280; }
.rp-card-title { display:block; color:#111827; font-weight:750; }
.rp-card-subtitle { display:block; margin-top:4px; color:#6b7280; font-size:13px; }
.rp-card-footer { display:block; margin:12px -14px -14px; padding:10px 14px; border-top:1px solid var(--rp-border); background:#f9fafb; }
snap-stat-card, rp-stat-card { display:grid; gap:6px; width:auto; min-width:0; padding:16px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.rp-stat-label { color:#6b7280; font-size:12px; font-weight:650; }
.rp-stat-value { color:#111827; font-size:26px; font-weight:800; }
.rp-stat-change { font-size:12px; font-weight:700; }
snap-stat-card[trend="up"] .rp-stat-change, rp-stat-card[trend="up"] .rp-stat-change { color:var(--rp-success); }
snap-stat-card[trend="down"] .rp-stat-change, rp-stat-card[trend="down"] .rp-stat-change { color:var(--rp-danger); }
snap-tag, rp-tag { display:inline-flex; align-items:center; gap:5px; height:24px; padding:0 8px; border-radius:999px; background:#eef2ff; color:#3730a3; font-size:12px; font-weight:650; }
snap-tag[color="green"], rp-tag[color="green"] { background:#dcfce7; color:#166534; }
snap-tag[color="orange"], rp-tag[color="orange"] { background:#ffedd5; color:#9a3412; }
snap-tag[color="red"], rp-tag[color="red"] { background:#fee2e2; color:#991b1b; }
snap-checkbox, rp-checkbox, snap-radio, rp-radio { display:inline-flex; align-items:center; gap:8px; font-size:13px; }
.rp-box { display:inline-grid; place-items:center; width:16px; height:16px; border:1px solid var(--rp-border-strong); border-radius:4px; color:#fff; }
snap-checkbox[state="checked"] .rp-box, rp-checkbox[state="checked"] .rp-box, snap-radio[state="checked"] .rp-box, rp-radio[state="checked"] .rp-box, snap-checkbox[state="indeterminate"] .rp-box, rp-checkbox[state="indeterminate"] .rp-box { background:var(--rp-primary); border-color:var(--rp-primary); }
snap-checkbox[state="disabled"], rp-checkbox[state="disabled"], snap-radio[state="disabled"], rp-radio[state="disabled"] { opacity:.5; }
snap-radio .rp-box, rp-radio .rp-box { border-radius:999px; }
snap-toggle, rp-toggle { display:inline-flex; align-items:center; gap:8px; font-size:13px; }
.rp-toggle-track { display:flex; align-items:center; width:34px; height:20px; border-radius:999px; background:#d1d5db; padding:2px; }
.rp-toggle-dot { display:block; width:16px; height:16px; border-radius:999px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.2); transition:none; }
snap-toggle[state="on"] .rp-toggle-track, rp-toggle[state="on"] .rp-toggle-track { background:var(--rp-primary); }
snap-toggle[state="on"] .rp-toggle-dot, rp-toggle[state="on"] .rp-toggle-dot { margin-left:14px; }
snap-toggle[state="disabled"], rp-toggle[state="disabled"] { opacity:.5; }
snap-form, rp-form { display:grid; gap:12px; width:fit-content; }
snap-form[layout="horizontal"], rp-form[layout="horizontal"] { grid-template-columns:max-content 1fr; align-items:start; }
snap-form-item, rp-form-item { display:grid; gap:6px; width:fit-content; }
.rp-form-label { color:#374151; font-size:12px; font-weight:700; }
.rp-form-label.required::after { content:" *"; color:var(--rp-danger); }
.rp-form-error { color:var(--rp-danger); font-size:12px; }
snap-upload, rp-upload { display:grid; justify-items:center; gap:8px; width:280px; padding:18px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:#fff; color:#6b7280; text-align:center; font-size:13px; }
snap-upload[state="has-file"], rp-upload[state="has-file"] { justify-items:start; border-style:solid; color:#374151; }
snap-upload[state="uploading"], rp-upload[state="uploading"] { border-color:#bfdbfe; background:#eff6ff; color:#1e40af; }
snap-image-placeholder, rp-image-placeholder { display:grid; place-items:center; width:var(--snap-width,160px); height:var(--snap-height,100px); background:#f3f4f6; border:1px dashed var(--rp-border-strong); border-radius:8px; color:#6b7280; font-size:12px; }
snap-progress, rp-progress { display:block; width:180px; height:8px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
snap-progress[kind="circle"], rp-progress[kind="circle"], snap-progress[style="circle"], rp-progress[style="circle"] { display:grid; place-items:center; width:52px; height:52px; border-radius:999px; background:conic-gradient(var(--rp-primary) var(--progress,40%), #e5e7eb 0); font-size:12px; font-weight:750; }
.rp-progress-bar { display:block; height:100%; width:var(--progress,40%); background:var(--rp-primary); }
snap-progress[status="success"] .rp-progress-bar, rp-progress[status="success"] .rp-progress-bar { background:var(--rp-success); }
snap-progress[status="error"] .rp-progress-bar, rp-progress[status="error"] .rp-progress-bar { background:var(--rp-danger); }
snap-pagination, rp-pagination { display:inline-flex; align-items:center; gap:6px; width:fit-content; font-size:13px; }
.rp-page-btn { display:inline-grid; place-items:center; min-width:30px; height:30px; padding:0 8px; border:1px solid var(--rp-border); border-radius:6px; background:#fff; color:#374151; }
.rp-page-btn.active { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; font-weight:750; }
snap-steps, rp-steps { display:flex; align-items:center; gap:8px; width:fit-content; }
.rp-step { display:inline-flex; align-items:center; gap:6px; color:#6b7280; font-size:13px; }
.rp-step-dot { display:inline-grid; place-items:center; width:22px; height:22px; border-radius:999px; border:1px solid var(--rp-border-strong); background:#fff; color:#6b7280; font-size:11px; font-weight:750; }
.rp-step.active { color:var(--rp-primary); font-weight:750; }
.rp-step.active .rp-step-dot { border-color:var(--rp-primary); background:var(--rp-primary); color:#fff; }
.rp-step.done .rp-step-dot { border-color:var(--rp-success); background:var(--rp-success); color:#fff; }
.rp-step-sep { width:28px; height:1px; background:var(--rp-border); }
snap-breadcrumb, rp-breadcrumb { display:inline-flex; align-items:center; gap:6px; color:#6b7280; font-size:13px; }
.rp-breadcrumb-current { color:#111827; font-weight:650; }

/* --- data input --- */
snap-slider, rp-slider { display:inline-flex; align-items:center; gap:10px; width:220px; }
.rp-slider-track { position:relative; flex:1; height:4px; border-radius:999px; background:#e5e7eb; }
.rp-slider-fill { position:absolute; height:100%; border-radius:999px; background:var(--rp-primary); }
.rp-slider-thumb { position:absolute; top:50%; width:16px; height:16px; margin-left:-8px; transform:translateY(-50%); border-radius:50%; background:#fff; border:1px solid var(--rp-border-strong); box-shadow:0 1px 3px rgba(0,0,0,.2); }
.rp-slider-value { font-size:12px; color:#374151; min-width:24px; }
snap-range, rp-range { display:inline-flex; align-items:center; width:220px; }
snap-number-input, rp-number-input { display:inline-flex; align-items:center; gap:6px; min-height:34px; padding:0 4px 0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:#fff; width:120px; }
.rp-num-value { flex:1; font-size:13px; }
.rp-num-steppers { display:flex; flex-direction:column; }
.rp-num-step { display:grid; place-items:center; width:20px; height:15px; color:#6b7280; cursor:pointer; }
snap-rating, rp-rating { display:inline-flex; gap:2px; color:#d1d5db; }
.rp-star.filled { color:#f59e0b; }
snap-pin-input, rp-pin-input { display:inline-flex; gap:8px; }
.rp-pin-cell { display:grid; place-items:center; width:40px; height:46px; border:1px solid var(--rp-border-strong); border-radius:8px; font-size:18px; font-weight:700; background:#fff; }
.rp-pin-cell.active { border-color:var(--rp-primary); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
snap-color-swatch, rp-color-swatch { display:inline-flex; align-items:center; gap:8px; padding:4px 10px 4px 4px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; }
.rp-swatch-chip { width:24px; height:24px; border-radius:6px; border:1px solid rgba(0,0,0,.1); }
.rp-swatch-hex { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:#374151; }
snap-autocomplete, rp-autocomplete { display:inline-block; width:280px; }
.rp-ac-options { display:grid; gap:1px; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; box-shadow:0 10px 18px rgba(15,23,42,.08); }
.rp-ac-option { padding:7px 8px; border-radius:6px; font-size:13px; color:#374151; }
.rp-ac-option:first-child { background:#eff6ff; color:#1d4ed8; }

/* --- data display additions --- */
snap-chip, rp-chip { display:inline-flex; align-items:center; gap:5px; height:26px; padding:0 9px; border-radius:999px; border:1px solid var(--rp-border); background:#f9fafb; color:#374151; font-size:12px; }
snap-tree, rp-tree { display:flex; flex-direction:column; gap:1px; width:fit-content; min-width:240px; }
.rp-tree-row { display:flex; align-items:center; gap:6px; padding:5px 8px; border-radius:6px; color:#374151; font-size:13px; padding-left:calc(8px + var(--tree-level,0) * 18px); }
.rp-tree-row.selected { background:#eff6ff; color:#1d4ed8; font-weight:650; }
.rp-tree-spacer { display:inline-block; width:12px; }
.rp-tree-label { flex:1; }
snap-timeline, rp-timeline { display:flex; flex-direction:column; width:fit-content; min-width:260px; }
snap-timeline-item, rp-timeline-item { display:flex; gap:12px; padding-bottom:16px; position:relative; }
snap-timeline-item:not(:last-child)::before, rp-timeline-item:not(:last-child)::before { content:''; position:absolute; left:6px; top:16px; bottom:0; width:2px; background:var(--rp-border); }
.rp-timeline-dot { flex:0 0 auto; width:14px; height:14px; margin-top:2px; border-radius:50%; background:#fff; border:2px solid var(--rp-border-strong); z-index:1; }
.rp-timeline-dot.active { border-color:var(--rp-primary); background:var(--rp-primary); }
.rp-timeline-dot.done { border-color:var(--rp-success); background:var(--rp-success); }
.rp-timeline-dot.error { border-color:var(--rp-danger); background:var(--rp-danger); }
.rp-timeline-main { flex:1; }
.rp-timeline-head { display:flex; align-items:baseline; gap:8px; }
.rp-timeline-label { font-weight:650; color:#111827; font-size:13px; }
.rp-timeline-time { font-size:12px; color:#9ca3af; }
.rp-timeline-content { font-size:13px; color:#6b7280; margin-top:2px; }
snap-calendar, rp-calendar { display:inline-block; width:280px; padding:12px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; }
.rp-cal-head { text-align:center; font-weight:700; font-size:14px; margin-bottom:10px; }
.rp-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
.rp-cal-dow { display:grid; place-items:center; height:24px; font-size:11px; color:#9ca3af; }
.rp-cal-cell { display:grid; place-items:center; height:32px; border-radius:6px; font-size:13px; color:#374151; }
.rp-cal-cell.selected { background:var(--rp-primary); color:#fff; font-weight:700; }
.rp-cal-cell.muted { color:transparent; }
snap-kanban, rp-kanban { display:flex; gap:12px; width:fit-content; align-items:flex-start; }
snap-kanban-column, rp-kanban-column { display:flex; flex-direction:column; width:200px; padding:10px; border-radius:10px; background:#f3f4f6; }
.rp-kanban-head { display:flex; align-items:center; justify-content:space-between; font-weight:650; font-size:13px; margin-bottom:8px; color:#374151; }
.rp-kanban-count { display:grid; place-items:center; min-width:18px; height:18px; padding:0 5px; border-radius:999px; background:#e5e7eb; font-size:11px; }
.rp-kanban-body { display:flex; flex-direction:column; gap:8px; }
snap-kanban-card, rp-kanban-card { display:block; padding:10px; border-radius:8px; background:#fff; border:1px solid var(--rp-border); }
.rp-kanban-card-title { display:block; font-size:13px; color:#111827; }
.rp-kanban-card-tag { display:inline-block; margin-top:6px; padding:1px 7px; border-radius:999px; background:#eef2ff; color:#3730a3; font-size:11px; }
snap-code-block, rp-code-block { display:block; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#0f172a; }
.rp-code-head { padding:6px 12px; font-family:ui-monospace,Menlo,monospace; font-size:11px; color:#94a3b8; background:#1e293b; }
.rp-code-body { padding:10px 0; }
.rp-code-line { display:flex; align-items:center; gap:12px; padding:1px 12px; }
.rp-code-ln { width:20px; text-align:right; color:#475569; font-family:ui-monospace,Menlo,monospace; font-size:11px; }
.rp-code-bar { height:8px; border-radius:3px; background:#334155; }
snap-diff, rp-diff { display:block; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; font-family:ui-monospace,Menlo,monospace; }
.rp-diff-line { display:flex; align-items:center; gap:10px; padding:2px 10px; }
.rp-diff-line.add { background:#dcfce7; }
.rp-diff-line.del { background:#fee2e2; }
.rp-diff-sign { width:10px; color:#6b7280; }
.rp-diff-line.add .rp-code-bar { background:#86efac; }
.rp-diff-line.del .rp-code-bar { background:#fca5a5; }
.rp-diff-line.ctx .rp-code-bar { background:#e5e7eb; }
snap-image-grid, rp-image-grid { display:grid; grid-template-columns:repeat(var(--grid-cols,3),1fr); gap:8px; width:fit-content; }
.rp-grid-cell { display:grid; place-items:center; width:80px; height:80px; border-radius:8px; background:#f3f4f6; color:#9ca3af; }
snap-key-value, rp-key-value { display:flex; flex-direction:column; width:fit-content; min-width:240px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
snap-kv-row, rp-kv-row { display:flex; border-bottom:1px solid var(--rp-border); }
snap-kv-row:last-child, rp-kv-row:last-child { border-bottom:0; }
.rp-kv-key { width:120px; padding:8px 12px; background:#f9fafb; color:#6b7280; font-size:13px; }
.rp-kv-val { flex:1; padding:8px 12px; color:#111827; font-size:13px; }
snap-accordion, rp-accordion { display:flex; flex-direction:column; width:fit-content; min-width:320px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
snap-accordion-item, rp-accordion-item { display:block; border-bottom:1px solid var(--rp-border); }
snap-accordion-item:last-child, rp-accordion-item:last-child { border-bottom:0; }
.rp-accordion-head { display:flex; align-items:center; gap:8px; padding:11px 14px; font-weight:650; font-size:13px; color:#111827; }
.rp-accordion-body { padding:0 14px 14px 36px; font-size:13px; color:#6b7280; }
snap-banner, rp-banner { display:flex; align-items:center; gap:10px; width:fit-content; min-width:480px; padding:12px 16px; border-radius:8px; font-size:13px; background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }
snap-banner[type="success"], rp-banner[type="success"] { background:#f0fdf4; color:#166534; border-color:#bbf7d0; }
snap-banner[type="warning"], rp-banner[type="warning"] { background:#fffbeb; color:#92400e; border-color:#fde68a; }
snap-banner[type="error"], rp-banner[type="error"] { background:#fef2f2; color:#991b1b; border-color:#fecaca; }
.rp-banner-text { flex:1; }
snap-skeleton, rp-skeleton { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:240px; }
.rp-skel { border-radius:8px; background:linear-gradient(90deg,#f3f4f6,#e5e7eb,#f3f4f6); }
.rp-skel-block { height:120px; }
.rp-skel-avatar { width:40px; height:40px; border-radius:50%; }
.rp-skel-avatar.sm { width:28px; height:28px; }
.rp-skel-row { display:flex; align-items:center; gap:10px; }
snap-countdown, rp-countdown { display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:999px; background:#fef2f2; color:#991b1b; font-size:12px; font-weight:650; font-variant-numeric:tabular-nums; }
snap-result, rp-result { display:grid; justify-items:center; gap:8px; width:fit-content; min-width:280px; padding:32px; text-align:center; }
.rp-result-icon.success { color:var(--rp-success); }
.rp-result-icon.error { color:var(--rp-danger); }
.rp-result-icon.empty { color:#9ca3af; }
.rp-result-title { font-size:16px; font-weight:700; color:#111827; }
.rp-result-desc { font-size:13px; color:#6b7280; }
snap-permission-gate, rp-permission-gate { display:block; position:relative; width:fit-content; }
.rp-gate-content { opacity:.4; filter:grayscale(1); pointer-events:none; }
.rp-gate-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:6px; background:rgba(255,255,255,.6); color:#6b7280; font-size:12px; font-weight:650; border-radius:8px; }
snap-quota-bar, rp-quota-bar { display:block; width:fit-content; min-width:240px; }
.rp-quota-head { display:flex; justify-content:space-between; font-size:12px; color:#374151; margin-bottom:5px; }
.rp-quota-num.danger { color:var(--rp-danger); font-weight:700; }
.rp-quota-track { display:block; height:8px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
.rp-quota-fill { display:block; height:100%; background:var(--rp-primary); }
.rp-quota-fill.danger { background:var(--rp-danger); }
snap-api-key, rp-api-key { display:inline-flex; align-items:center; gap:8px; padding:6px 8px 6px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#f9fafb; }
.rp-apikey-val { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:#374151; }
.rp-apikey-copy { display:grid; place-items:center; width:26px; height:26px; border-radius:6px; color:#6b7280; }
snap-audit-row, rp-audit-row { display:flex; align-items:baseline; gap:8px; padding:8px 0; border-bottom:1px solid var(--rp-border); width:fit-content; min-width:320px; font-size:13px; }
.rp-audit-actor { font-weight:650; color:#111827; }
.rp-audit-action { flex:1; color:#6b7280; }
.rp-audit-time { color:#9ca3af; font-size:12px; }
snap-workflow-node, rp-workflow-node { display:inline-flex; align-items:center; gap:7px; padding:7px 12px; border:1px solid var(--rp-border); border-radius:8px; background:#fff; font-size:13px; }
.rp-wf-icon.done { color:var(--rp-success); }
.rp-wf-icon.active { color:var(--rp-primary); }
.rp-wf-icon.error { color:var(--rp-danger); }
.rp-wf-icon.default { color:#9ca3af; }

/* --- navigation & layout additions --- */
snap-segmented, rp-segmented { display:inline-flex; padding:2px; border-radius:8px; background:#f3f4f6; gap:2px; }
.rp-seg-item { padding:5px 14px; border-radius:6px; font-size:13px; color:#6b7280; }
.rp-seg-item.active { background:#fff; color:#111827; font-weight:650; box-shadow:0 1px 3px rgba(0,0,0,.08); }
snap-command-palette, rp-command-palette { display:block; width:520px; border:1px solid var(--rp-border); border-radius:12px; background:#fff; box-shadow:0 24px 48px rgba(15,23,42,.18); overflow:hidden; }
.rp-cmdk-input { display:flex; align-items:center; gap:10px; padding:14px 16px; border-bottom:1px solid var(--rp-border); }
.rp-cmdk-list { padding:6px; }
.rp-cmdk-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:8px; font-size:13px; color:#374151; }
.rp-cmdk-item.active { background:#eff6ff; color:#1d4ed8; }
snap-context-menu, rp-context-menu, snap-menu, rp-menu { display:inline-flex; flex-direction:column; min-width:180px; padding:5px; border:1px solid var(--rp-border); border-radius:10px; background:#fff; box-shadow:0 12px 24px rgba(15,23,42,.12); }
.rp-menu-item, snap-menu-item, rp-menu-item { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:6px; font-size:13px; color:#374151; }
.rp-menu-item.danger, snap-menu-item.danger, rp-menu-item.danger { color:var(--rp-danger); }
.rp-menu-item.disabled, snap-menu-item.disabled, rp-menu-item.disabled { opacity:.45; }
.rp-menu-label { flex:1; }
.rp-menu-shortcut { color:#9ca3af; font-size:12px; }
snap-toc, rp-toc { display:flex; flex-direction:column; gap:2px; width:fit-content; min-width:160px; border-left:2px solid var(--rp-border); }
.rp-toc-item { padding:4px 12px; font-size:13px; color:#6b7280; border-left:2px solid transparent; margin-left:-2px; }
.rp-toc-item.active { color:var(--rp-primary); border-left-color:var(--rp-primary); font-weight:650; }
snap-kbd, rp-kbd { display:inline-flex; align-items:center; gap:3px; }
.rp-kbd-key { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 5px; border:1px solid var(--rp-border-strong); border-bottom-width:2px; border-radius:5px; background:#f9fafb; font-size:11px; font-family:var(--rp-font); color:#374151; }
.rp-kbd-plus { color:#9ca3af; font-size:11px; }
snap-split-pane, rp-split-pane { display:grid; grid-template-columns:var(--snap-columns,1fr 1fr); width:fit-content; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
snap-split-pane > *, rp-split-pane > * { padding:14px; }
snap-split-pane > *:not(:last-child), rp-split-pane > *:not(:last-child) { border-right:1px solid var(--rp-border); }
snap-divider, rp-divider { display:block; height:1px; background:var(--rp-border); margin:12px 0; }
snap-divider.rp-divider-v, rp-divider.rp-divider-v { display:inline-block; width:1px; height:auto; align-self:stretch; margin:0 12px; }
snap-spacer, rp-spacer { display:block; height:var(--snap-size,16px); }

/* --- iOS --- */
snap-ios-navbar, rp-ios-navbar { display:block; background:rgba(249,249,249,.94); border-bottom:1px solid #d8d8dc; padding:6px 12px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }
.rp-ios-navbar-row { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; min-height:36px; }
.rp-ios-nav-leading { display:flex; align-items:center; gap:2px; color:#007aff; font-size:15px; }
.rp-ios-nav-title { text-align:center; font-weight:600; font-size:16px; color:#000; }
.rp-ios-nav-trailing { text-align:right; color:#007aff; font-size:15px; }
.rp-ios-nav-large { font-size:30px; font-weight:700; color:#000; padding:2px 2px 6px; }
snap-ios-tabbar, rp-ios-tabbar { display:flex; background:rgba(249,249,249,.94); border-top:1px solid #d8d8dc; padding:6px 0 4px; }
.rp-ios-tab { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; color:#8e8e93; font-size:10px; }
.rp-ios-tab.active { color:#007aff; }
.rp-ios-tab-label { font-size:10px; }
snap-ios-list, rp-ios-list { display:block; border-radius:10px; background:#fff; overflow:hidden; width:fit-content; min-width:300px; border:1px solid #e5e5ea; font-family:-apple-system,sans-serif; }
.rp-ios-list-header { padding:6px 16px; font-size:13px; color:#6d6d72; background:#f2f2f7; text-transform:none; }
snap-ios-list-item, rp-ios-list-item { display:flex; align-items:center; gap:10px; padding:11px 16px; border-bottom:1px solid #e5e5ea; font-size:15px; color:#000; }
snap-ios-list-item:last-child, rp-ios-list-item:last-child { border-bottom:0; }
.rp-ios-li-icon { display:grid; place-items:center; width:28px; height:28px; border-radius:6px; background:#007aff; color:#fff; }
.rp-ios-li-label { flex:1; }
.rp-ios-li-detail { color:#8e8e93; }
.rp-ios-li-chevron { color:#c7c7cc; }
snap-ios-action-sheet, rp-ios-action-sheet { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:320px; padding:8px; font-family:-apple-system,sans-serif; }
.rp-ios-as-group { border-radius:14px; overflow:hidden; background:rgba(255,255,255,.82); backdrop-filter:blur(20px); }
.rp-ios-as-title { padding:14px; text-align:center; font-size:13px; color:#8e8e93; border-bottom:1px solid #d1d1d6; }
.rp-ios-as-action { padding:16px; text-align:center; font-size:18px; color:#007aff; border-bottom:1px solid #d1d1d6; }
.rp-ios-as-action:last-child { border-bottom:0; }
.rp-ios-as-action.destructive { color:#ff3b30; }
.rp-ios-as-action.cancel { font-weight:600; }
snap-ios-alert, rp-ios-alert { display:block; width:270px; border-radius:14px; overflow:hidden; background:rgba(255,255,255,.92); backdrop-filter:blur(20px); font-family:-apple-system,sans-serif; }
.rp-ios-alert-body { padding:18px 16px 14px; text-align:center; }
.rp-ios-alert-title { font-size:17px; font-weight:600; color:#000; }
.rp-ios-alert-msg { margin-top:3px; font-size:13px; color:#000; }
.rp-ios-alert-actions { display:flex; border-top:1px solid #d1d1d6; }
.rp-ios-alert-btn { flex:1; padding:11px; text-align:center; font-size:17px; color:#007aff; }
.rp-ios-alert-btn.primary { font-weight:600; }
.rp-ios-alert-btn:not(:last-child) { border-right:1px solid #d1d1d6; }
snap-ios-switch, rp-ios-switch { display:inline-flex; align-items:center; gap:8px; font-family:-apple-system,sans-serif; font-size:15px; }
.rp-ios-switch-track { width:51px; height:31px; border-radius:999px; background:#34c759; padding:2px; }
.rp-ios-switch-dot { display:block; width:27px; height:27px; border-radius:50%; background:#fff; margin-left:20px; box-shadow:0 2px 4px rgba(0,0,0,.2); }
snap-ios-segmented, rp-ios-segmented { display:inline-flex; padding:2px; border-radius:9px; background:#767680; background:rgba(118,118,128,.12); gap:2px; font-family:-apple-system,sans-serif; }
.rp-ios-seg-item { padding:6px 16px; border-radius:7px; font-size:13px; color:#000; }
.rp-ios-seg-item.active { background:#fff; font-weight:600; box-shadow:0 1px 3px rgba(0,0,0,.12); }
snap-ios-button, rp-ios-button { display:inline-grid; place-items:center; min-height:34px; padding:0 16px; border-radius:8px; background:#007aff; color:#fff; font-size:15px; font-weight:600; font-family:-apple-system,sans-serif; }
snap-ios-button[variant="tinted"], rp-ios-button[variant="tinted"] { background:rgba(0,122,255,.15); color:#007aff; }
snap-ios-button[variant="plain"], rp-ios-button[variant="plain"] { background:transparent; color:#007aff; }
snap-ios-search, rp-ios-search { display:inline-flex; align-items:center; gap:6px; width:280px; height:36px; padding:0 10px; border-radius:10px; background:rgba(118,118,128,.12); color:#8e8e93; font-size:15px; font-family:-apple-system,sans-serif; }
snap-ios-stepper, rp-ios-stepper { display:inline-flex; align-items:center; border-radius:8px; background:rgba(118,118,128,.12); }
.rp-ios-step { display:grid; place-items:center; width:46px; height:32px; color:#000; }
.rp-ios-step-div { width:1px; height:18px; background:rgba(0,0,0,.15); }

/* --- macOS --- */
snap-macos-window, rp-macos-window { display:block; width:fit-content; min-width:480px; border-radius:10px; overflow:hidden; border:1px solid #d1d1d6; background:#fff; box-shadow:0 20px 60px rgba(0,0,0,.25); font-family:-apple-system,sans-serif; }
.rp-mac-titlebar { display:flex; align-items:center; gap:10px; height:38px; padding:0 14px; background:#ececec; border-bottom:1px solid #d1d1d6; }
.rp-mac-lights { display:flex; gap:8px; }
.rp-mac-light { width:12px; height:12px; border-radius:50%; }
.rp-mac-light.close { background:#ff5f57; }
.rp-mac-light.min { background:#febc2e; }
.rp-mac-light.max { background:#28c840; }
.rp-mac-title { flex:1; text-align:center; font-size:13px; font-weight:600; color:#3c3c43; }
.rp-mac-window-body { padding:0; }
snap-macos-toolbar, rp-macos-toolbar { display:flex; align-items:center; gap:10px; padding:8px 14px; background:#f6f6f6; border-bottom:1px solid #d1d1d6; }
snap-macos-menubar, rp-macos-menubar { display:flex; align-items:center; gap:18px; height:26px; padding:0 14px; background:rgba(246,246,246,.9); border-bottom:1px solid #d1d1d6; font-size:13px; font-family:-apple-system,sans-serif; }
.rp-mac-menubar-apple { color:#000; }
.rp-mac-menu-title { color:#000; }
.rp-mac-menu-title.active { background:#007aff; color:#fff; padding:1px 7px; border-radius:4px; }
snap-macos-sidebar, rp-macos-sidebar { display:flex; flex-direction:column; gap:1px; width:220px; padding:8px; background:rgba(246,246,246,.85); font-family:-apple-system,sans-serif; }
snap-macos-source-item, rp-macos-source-item { display:flex; align-items:center; gap:7px; padding:5px 8px; border-radius:6px; font-size:13px; color:#3c3c43; }
snap-macos-source-item.selected, rp-macos-source-item.selected { background:#007aff; color:#fff; }
.rp-mac-source-group { padding:8px 8px 3px; font-size:11px; font-weight:700; color:#8e8e93; text-transform:uppercase; }
snap-macos-segmented, rp-macos-segmented { display:inline-flex; border:1px solid #c4c4c7; border-radius:6px; overflow:hidden; font-family:-apple-system,sans-serif; }
.rp-mac-seg-item { padding:4px 14px; font-size:13px; color:#000; background:#fff; border-right:1px solid #c4c4c7; }
.rp-mac-seg-item:last-child { border-right:0; }
.rp-mac-seg-item.active { background:#007aff; color:#fff; }
snap-macos-popover, rp-macos-popover { display:inline-block; position:relative; }
.rp-mac-pop-arrow { display:block; width:16px; height:8px; margin:0 auto -1px; clip-path:polygon(50% 0,100% 100%,0 100%); background:#fff; border:1px solid #d1d1d6; }
.rp-mac-pop-body { min-width:220px; padding:12px; border-radius:10px; border:1px solid #d1d1d6; background:#fff; box-shadow:0 12px 40px rgba(0,0,0,.2); }
.rp-mac-pop-title { font-weight:600; font-size:13px; margin-bottom:8px; }
snap-macos-sheet, rp-macos-sheet { display:block; width:fit-content; min-width:420px; border-radius:10px; background:#fff; box-shadow:0 24px 60px rgba(0,0,0,.3); padding:18px; font-family:-apple-system,sans-serif; }
.rp-mac-sheet-title { font-size:15px; font-weight:700; margin-bottom:12px; }
.rp-mac-sheet-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:16px; }
snap-macos-stepper, rp-macos-stepper { display:inline-flex; flex-direction:column; border:1px solid #c4c4c7; border-radius:5px; overflow:hidden; }
.rp-mac-step { display:grid; place-items:center; width:22px; height:13px; background:#fff; color:#3c3c43; }
.rp-mac-step.up { border-bottom:1px solid #c4c4c7; }
snap-macos-disclosure, rp-macos-disclosure { display:block; font-family:-apple-system,sans-serif; }
.rp-mac-disc-head { display:flex; align-items:center; gap:5px; font-size:13px; font-weight:600; color:#000; }
.rp-mac-disc-tri { display:inline-flex; transition:none; }
.rp-mac-disc-tri.open { transform:rotate(90deg); }
.rp-mac-disc-body { padding:8px 0 0 18px; font-size:13px; color:#3c3c43; }
snap-macos-table, rp-macos-table { display:flex; flex-direction:column; width:fit-content; min-width:360px; border:1px solid #d1d1d6; border-radius:6px; overflow:hidden; font-family:-apple-system,sans-serif; }
.rp-mac-tr { display:flex; }
.rp-mac-tr.rp-mac-th { background:#f6f6f6; border-bottom:1px solid #d1d1d6; font-size:12px; font-weight:600; color:#3c3c43; }
.rp-mac-tr.alt { background:#f5f8ff; }
.rp-mac-td { flex:1; display:flex; align-items:center; gap:6px; padding:6px 12px; font-size:13px; color:#3c3c43; }
.rp-mac-cell-bar { height:8px; border-radius:3px; background:#e5e7eb; }

/* --- agent / conversational UI (Codex-style: single column, de-bubbled) --- */
snap-chat, rp-chat { display:flex; flex-direction:column; gap:24px; width:fit-content; min-width:520px; max-width:680px; }
snap-user-message, rp-user-message, snap-assistant-message, rp-assistant-message { display:block; }
.rp-msg-role { font-size:12px; font-weight:700; color:#9ca3af; letter-spacing:.02em; margin:0 0 6px; }
.rp-msg-content { display:flex; flex-direction:column; gap:12px; font-size:14px; line-height:1.7; color:#1f2937; }
snap-user-message .rp-msg-content, rp-user-message .rp-msg-content { color:#111827; }
snap-system-message, rp-system-message { display:flex; justify-content:center; }
.rp-sysmsg-line { padding:3px 12px; border-radius:999px; background:#f3f4f6; color:#6b7280; font-size:12px; }
snap-tool-call, rp-tool-call { display:block; width:fit-content; min-width:280px; max-width:600px; }
.rp-tool-head { display:flex; align-items:center; gap:8px; font-size:13px; color:#6b7280; }
.rp-tool-glyph { display:inline-flex; }
.rp-tool-glyph.done { color:var(--rp-success); }
.rp-tool-glyph.running { color:var(--rp-primary); }
.rp-tool-glyph.error { color:var(--rp-danger); }
.rp-tool-name { font-family:ui-monospace,Menlo,monospace; font-weight:650; color:#374151; }
.rp-tool-args-inline { font-family:ui-monospace,Menlo,monospace; color:#9ca3af; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-tool-body { margin-top:8px; padding-left:21px; }
snap-agent-output, rp-agent-output { display:block; width:fit-content; min-width:280px; max-width:600px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:#f8fafc; }
.rp-output-head { padding:6px 12px; font-size:12px; color:#6b7280; border-bottom:1px solid var(--rp-border); font-family:ui-monospace,Menlo,monospace; }
.rp-output-body { padding:12px; font-family:ui-monospace,Menlo,monospace; font-size:12.5px; line-height:1.6; color:#334155; white-space:pre-wrap; }
snap-reasoning, rp-reasoning { display:block; width:fit-content; min-width:280px; max-width:600px; }
.rp-reason-head { display:flex; align-items:center; gap:6px; font-size:13px; color:#9ca3af; }
.rp-reason-body { margin-top:8px; padding-left:19px; border-left:2px solid var(--rp-border); font-size:13px; line-height:1.7; color:#6b7280; }
snap-message-actions, rp-message-actions { display:inline-flex; gap:2px; }
.rp-msg-action { display:grid; place-items:center; width:28px; height:28px; border-radius:6px; color:#9ca3af; cursor:pointer; }
.rp-msg-action:hover { background:#f3f4f6; color:#374151; }
snap-suggestions, rp-suggestions { display:flex; flex-wrap:wrap; gap:8px; }
.rp-suggestion { padding:7px 13px; border:1px solid var(--rp-border); border-radius:8px; font-size:13px; color:#374151; background:#fff; cursor:pointer; }
.rp-suggestion:hover { border-color:var(--rp-border-strong); background:#f9fafb; }
snap-typing, rp-typing { display:flex; align-items:center; }
.rp-typing-dots { display:inline-flex; gap:4px; }
.rp-typing-dots > span { width:7px; height:7px; border-radius:50%; background:#c7c7cc; }
snap-composer, rp-composer { display:flex; align-items:center; gap:10px; width:fit-content; min-width:520px; max-width:680px; padding:9px 9px 9px 14px; border:1px solid var(--rp-border-strong); border-radius:14px; background:#fff; }
.rp-composer-attach { display:inline-flex; color:#9ca3af; }
.rp-composer-input { flex:1; font-size:14px; }
.rp-composer-send { display:grid; place-items:center; width:32px; height:32px; border-radius:8px; background:#111827; color:#fff; }
.rp-composer-send.streaming { background:var(--rp-danger); }
snap-citation, rp-citation { display:inline-flex; align-items:center; gap:6px; max-width:280px; padding:3px 9px 3px 3px; border:1px solid var(--rp-border); border-radius:6px; background:#f9fafb; font-size:12px; color:#374151; }
.rp-cite-idx { display:grid; place-items:center; width:17px; height:17px; border-radius:4px; background:#e5e7eb; color:#374151; font-size:11px; font-weight:700; }
.rp-cite-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
snap-token-usage, rp-token-usage { display:inline-flex; align-items:center; gap:7px; font-size:12px; color:#9ca3af; }
.rp-token-track { width:90px; height:5px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
.rp-token-fill { display:block; height:100%; background:#9ca3af; }
`;

export function injectStyle() {
  if (document.getElementById(RPUI_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = RPUI_STYLE_ID;
  el.textContent = style;
  document.head.appendChild(el);
}
