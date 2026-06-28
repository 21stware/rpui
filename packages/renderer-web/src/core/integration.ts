// Integration layer — rules that express relationships *between* components and
// therefore belong to no single component file. Assembled by core/style.ts.
//
// Ordering matters (light DOM, global cascade):
//  - resetStyle + integrationEarlyStyle are emitted BEFORE component segments so
//    component base rules can still override them (e.g. `layout-el > *` sets a
//    low-specificity min-width that components legitimately beat).
//  - integrationLateStyle is emitted AFTER all components: container-to-child
//    stretch/override rules (`layout-el > button-el`, `form-item > *`,
//    `split-pane > *`, …) that must win over a component's own width/padding
//    when it sits inside a layout container.

export const resetStyle = `
.rpui-scope, .rpui-scope * { box-sizing:border-box; }
.rp-icon { display:inline-block; flex:0 0 auto; vertical-align:-0.16em; }`;

// Low-specificity base that components must be able to override → emitted early.
export const integrationEarlyStyle = `
layout-el > *, layout-el > * { min-width:0; }`;

// Container-to-child overrides that must beat component defaults → emitted late.
export const integrationLateStyle = `
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
viewport-el panel-el, viewport-el panel-el { margin:8px; width:auto; min-width:0; }
viewport-el sidebar-el, viewport-el sidebar-el { min-height:100%; }
form-item > password-input, form-item > password-input, form-item > tag-input, form-item > tag-input { width:100%; max-width:none; }
form-item > select-el, form-item > select-el { width:100%; max-width:none; }
button-group > button-el, button-group > button-el { border-radius:0; margin-left:-1px; }
button-group > button-el:first-child { border-radius:8px 0 0 8px; margin-left:0; }
button-group > button-el:last-child { border-radius:0 8px 8px 0; }
viewport-el table-el, viewport-el table-el { width:100%; max-width:none; }
form-item > *, form-item > * { max-width:100%; }
form-el > form-item, form-el > form-item { width:100%; max-width:none; }
form-el > layout-el, form-el > layout-el { width:100%; max-width:none; }
split-pane > *, split-pane > * { padding:14px; margin:0; min-width:0; width:auto; max-width:none; }
split-pane > *:not(:last-child), split-pane > *:not(:last-child) { border-right:1px solid var(--rp-border); }

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
form-el > field-el, form-el > field-el { width:100%; max-width:none; }`;
