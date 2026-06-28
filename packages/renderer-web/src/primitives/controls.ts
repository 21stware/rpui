import { injectStyle } from "../core/style";
import { attr, csv, escapeHtml, intAttr } from "../core/dom";
import { icon } from "../core/icons";

// form controls: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const controlsStyle = `
search-el, search-el, input-el, input-el, date-picker, date-picker { display:inline-flex; align-items:center; gap:8px; width:280px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); color:var(--rp-c-gray-900); }
textarea-el, textarea-el { display:block; width:320px; min-height:calc(var(--snap-rows,3) * 24px + 22px); padding:9px 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); color:var(--rp-c-gray-900); white-space:pre-wrap; }
search-el[state="focus"], search-el[state="focus"], input-el[state="focus"], input-el[state="focus"], textarea-el[state="focus"], textarea-el[state="focus"], date-picker[state="focus"], date-picker[state="focus"] { border-color:var(--rp-primary); box-shadow:0 0 0 3px var(--rp-a-black-06); }
search-el[state="filled"], search-el[state="filled"], input-el[state="filled"], input-el[state="filled"], textarea-el[state="filled"], textarea-el[state="filled"], date-picker[state="filled"], date-picker[state="filled"] { border-color:var(--rp-c-zinc-300); background:var(--rp-c-zinc-50); }
search-el[state="error"], search-el[state="error"], input-el[state="error"], input-el[state="error"], textarea-el[state="error"], textarea-el[state="error"], date-picker[state="error"], date-picker[state="error"] { border-color:var(--rp-danger); box-shadow:0 0 0 3px var(--rp-a-red-10); }
search-el[state="disabled"], search-el[state="disabled"], input-el[state="disabled"], input-el[state="disabled"], textarea-el[state="disabled"], textarea-el[state="disabled"], date-picker[state="disabled"], date-picker[state="disabled"] { opacity:.55; background:var(--rp-c-gray-100); }
input-el[label], input-el[label], date-picker[label], date-picker[label] { display:inline-grid; align-items:start; gap:6px; width:280px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
input-el[label][state="focus"], input-el[label][state="focus"], input-el[label][state="filled"], input-el[label][state="filled"], input-el[label][state="error"], input-el[label][state="error"], date-picker[label][state="focus"], date-picker[label][state="focus"], date-picker[label][state="filled"], date-picker[label][state="filled"], date-picker[label][state="error"], date-picker[label][state="error"] { border:0; background:transparent; box-shadow:none; }
.rp-field-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); color:var(--rp-c-gray-900); }
input-el[state="focus"] .rp-field-control, input-el[state="focus"] .rp-field-control, date-picker[state="focus"] .rp-field-control, date-picker[state="focus"] .rp-field-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px var(--rp-a-black-06); }
input-el[state="filled"] .rp-field-control, input-el[state="filled"] .rp-field-control, date-picker[state="filled"] .rp-field-control, date-picker[state="filled"] .rp-field-control { border-color:var(--rp-c-zinc-300); background:var(--rp-c-zinc-50); }
input-el[state="error"] .rp-field-control, input-el[state="error"] .rp-field-control, date-picker[state="error"] .rp-field-control, date-picker[state="error"] .rp-field-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px var(--rp-a-red-10); }
.rp-field-label { display:block; margin:0 0 6px; color:var(--rp-c-gray-700); font-size:12px; font-weight:650; }
.rp-placeholder { color:var(--rp-c-gray-400); }
.rp-value { color:var(--rp-c-gray-900); }
.rp-field-clear { margin-left:auto; display:inline-flex; align-items:center; color:var(--rp-c-gray-400); cursor:default; }
.rp-error-text { display:block; color:var(--rp-danger); font-size:12px; }

/* --- form: grouped fields (label/help/error) + state matrix + new controls --- */
search-el.rp-field-group, input-el.rp-field-group, date-picker.rp-field-group { display:inline-grid; align-items:start; gap:6px; width:280px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
textarea-el.rp-field-group { display:inline-grid; align-items:start; gap:6px; width:320px; min-height:0; padding:0; border:0; background:transparent; box-shadow:none; }
textarea-el .rp-field-control { display:block; min-height:calc(var(--snap-rows,3) * 24px + 22px); padding:9px 11px; white-space:pre-wrap; align-items:initial; }
.rp-field-help { display:block; color:var(--rp-muted); font-size:12px; }
textarea-el[state="focus"] .rp-field-control, autocomplete-el[state="focus"] .rp-field-control, password-input[state="focus"] .rp-field-control, tag-input[state="focus"] .rp-field-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px var(--rp-a-black-06); }
textarea-el[state="filled"] .rp-field-control, autocomplete-el[state="filled"] .rp-field-control, password-input[state="filled"] .rp-field-control, tag-input[state="filled"] .rp-field-control { border-color:var(--rp-c-zinc-300); background:var(--rp-c-zinc-50); }
textarea-el[state="error"] .rp-field-control, autocomplete-el[state="error"] .rp-field-control, password-input[state="error"] .rp-field-control, tag-input[state="error"] .rp-field-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px var(--rp-a-red-10); }
autocomplete-el[state="disabled"], password-input[state="disabled"], tag-input[state="disabled"], slider-el[state="disabled"], range-el[state="disabled"], number-input[state="disabled"], rating-el[state="disabled"], pin-input[state="disabled"], color-swatch[state="disabled"] { opacity:.55; }
select-el[state="error"] .select-el-control { border-color:var(--rp-danger); box-shadow:0 0 0 3px var(--rp-a-red-10); }
select-el[state="filled"] .select-el-control { border-color:var(--rp-c-zinc-300); background:var(--rp-c-zinc-50); }
checkbox-el[state="error"], radio-el[state="error"], toggle-el[state="error"] { color:var(--rp-danger); }
checkbox-el[state="error"] .rp-box, radio-el[state="error"] .rp-box { border-color:var(--rp-danger); }
toggle-el[state="error"] .toggle-el-track { box-shadow:0 0 0 2px var(--rp-a-red-18); }
slider-el[state="error"] .slider-el-fill, range-el[state="error"] .slider-el-fill { background:var(--rp-danger); }
number-input[state="error"] { border-color:var(--rp-danger); }
upload-el[state="error"], upload-el[state="error"] { border-color:var(--rp-c-red-200); background:var(--rp-c-red-50); color:var(--rp-danger); }
password-input, password-input, tag-input, tag-input { display:inline-block; width:280px; max-width:100%; }
.rp-taginput { flex-wrap:wrap; gap:4px; min-height:36px; align-items:center; }
.rp-taginput-chip { display:inline-flex; align-items:center; gap:4px; padding:2px 6px; border-radius:999px; background:var(--rp-c-zinc-100); color:var(--rp-c-gray-700); font-size:12px; }
checkbox-group, checkbox-group, radio-group, radio-group { display:grid; gap:6px; width:fit-content; }
checkbox-group.rp-group-h, radio-group.rp-group-h { grid-auto-flow:column; }
.rp-group-label { color:var(--rp-c-gray-700); font-size:12px; font-weight:700; }
checkbox-group[state="error"] .rp-group-label, radio-group[state="error"] .rp-group-label { color:var(--rp-danger); }
select-el, select-el { display:inline-block; width:280px; max-width:100%; }
.select-el-control { display:flex; align-items:center; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); }
select-el[state="expanded"] .select-el-control, select-el[state="expanded"] .select-el-control { border-color:var(--rp-primary); box-shadow:0 0 0 3px var(--rp-a-black-06); }
select-el[state="disabled"], select-el[state="disabled"] { opacity:.55; }
.select-el-value { flex:1 1 auto; min-width:0; }
.select-el-options { display:none; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); box-shadow:0 10px 18px var(--rp-a-slate-08); }
select-el[state="expanded"] .select-el-options, select-el[state="expanded"] .select-el-options { display:grid; gap:2px; }
.select-el-option { padding:7px 8px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-700); }
.select-el-option.selected { background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); font-weight:700; }
button-el, button-el { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:34px; padding:0 12px; border-radius:8px; border:1px solid var(--rp-border); background:var(--rp-c-white); color:var(--rp-c-gray-700); font-size:13px; font-weight:650; }
button-el[block], button-el[block] { display:flex; width:100%; }
button-el[size="sm"], button-el[size="sm"] { min-height:28px; padding:0 9px; font-size:12px; border-radius:6px; }
button-el[size="lg"], button-el[size="lg"] { min-height:40px; padding:0 16px; font-size:14px; }
button-el[variant="primary"], button-el[variant="primary"] { border-color:var(--rp-primary); background:var(--rp-primary); color:var(--rp-c-white); }
button-el[variant="secondary"], button-el[variant="secondary"] { border-color:var(--rp-c-zinc-200); background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); }
button-el[variant="danger"], button-el[variant="danger"] { border-color:var(--rp-danger); color:var(--rp-danger); }
button-el[variant="link"], button-el[variant="link"] { border-color:transparent; background:transparent; color:var(--rp-primary); padding-inline:2px; }
button-el[variant="ghost"], button-el[variant="ghost"] { border-color:transparent; background:transparent; }
button-el[state="disabled"], button-el[state="disabled"], button-el[disabled], button-el[disabled] { opacity:.5; }
button-group, button-group { display:inline-flex; gap:0; width:fit-content; }
checkbox-el, checkbox-el, radio-el, radio-el { display:inline-flex; align-items:center; gap:8px; font-size:13px; }
.rp-box { display:inline-grid; place-items:center; width:16px; height:16px; border:1px solid var(--rp-border-strong); border-radius:4px; color:var(--rp-c-white); }
checkbox-el[state="checked"] .rp-box, checkbox-el[state="checked"] .rp-box, radio-el[state="checked"] .rp-box, radio-el[state="checked"] .rp-box, checkbox-el[state="indeterminate"] .rp-box, checkbox-el[state="indeterminate"] .rp-box { background:var(--rp-primary); border-color:var(--rp-primary); }
checkbox-el[state="disabled"], checkbox-el[state="disabled"], radio-el[state="disabled"], radio-el[state="disabled"] { opacity:.5; }
radio-el .rp-box, radio-el .rp-box { border-radius:999px; }
toggle-el, toggle-el { display:inline-flex; align-items:center; gap:8px; font-size:13px; }
.toggle-el-track { display:flex; align-items:center; width:34px; height:20px; border-radius:999px; background:var(--rp-c-gray-300); padding:2px; }
.toggle-el-dot { display:block; width:16px; height:16px; border-radius:999px; background:var(--rp-c-white); box-shadow:0 1px 2px var(--rp-a-black-20); transition:none; }
toggle-el[state="on"] .toggle-el-track, toggle-el[state="on"] .toggle-el-track { background:var(--rp-primary); }
toggle-el[state="on"] .toggle-el-dot, toggle-el[state="on"] .toggle-el-dot { margin-left:14px; }
toggle-el[state="disabled"], toggle-el[state="disabled"] { opacity:.5; }
form-el, form-el { display:grid; gap:12px; width:fit-content; max-width:100%; }
form-el[layout="horizontal"], form-el[layout="horizontal"] { grid-template-columns:max-content 1fr; align-items:start; }
form-item, form-item { display:grid; grid-template-columns:minmax(0,1fr); gap:6px; width:100%; max-width:100%; min-width:0; }
.form-el-label { color:var(--rp-c-gray-700); font-size:12px; font-weight:700; }
.form-el-label.required::after { content:" *"; color:var(--rp-danger); }
.form-el-error { color:var(--rp-danger); font-size:12px; }
upload-el, upload-el { display:grid; justify-items:center; gap:8px; width:280px; padding:18px; border:1px dashed var(--rp-border-strong); border-radius:10px; background:var(--rp-c-white); color:var(--rp-c-gray-500); text-align:center; font-size:13px; }
upload-el[state="has-file"], upload-el[state="has-file"] { justify-items:start; border-style:solid; color:var(--rp-c-gray-700); }
upload-el[state="uploading"], upload-el[state="uploading"] { border-color:var(--rp-c-zinc-200); background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); }
image-placeholder, image-placeholder { display:grid; place-items:center; width:var(--snap-width,160px); height:var(--snap-height,100px); background:var(--rp-c-gray-100); border:1px dashed var(--rp-border-strong); border-radius:8px; color:var(--rp-c-gray-500); font-size:12px; }
progress-el, progress-el { display:block; width:180px; height:8px; border-radius:999px; background:var(--rp-c-gray-200); overflow:hidden; }
progress-el[kind="circle"], progress-el[kind="circle"], progress-el[style="circle"], progress-el[style="circle"] { display:grid; place-items:center; width:52px; height:52px; border-radius:999px; background:conic-gradient(var(--rp-primary) var(--progress,40%), var(--rp-c-gray-200) 0); font-size:12px; font-weight:750; }
.progress-el-bar { display:block; height:100%; width:var(--progress,40%); background:var(--rp-primary); }
progress-el[status="success"] .progress-el-bar, progress-el[status="success"] .progress-el-bar { background:var(--rp-success); }
progress-el[status="error"] .progress-el-bar, progress-el[status="error"] .progress-el-bar { background:var(--rp-danger); }

/* --- data input --- */
slider-el, slider-el { display:inline-flex; align-items:center; gap:10px; width:220px; }
.slider-el-track { position:relative; flex:1; height:4px; border-radius:999px; background:var(--rp-c-gray-200); }
.slider-el-fill { position:absolute; height:100%; border-radius:999px; background:var(--rp-primary); }
.slider-el-thumb { position:absolute; top:50%; width:16px; height:16px; margin-left:-8px; transform:translateY(-50%); border-radius:50%; background:var(--rp-c-white); border:1px solid var(--rp-border-strong); }
.slider-el-value { font-size:12px; color:var(--rp-c-gray-700); min-width:24px; }
range-el, range-el { display:inline-flex; align-items:center; width:220px; }
number-input, number-input { display:inline-flex; align-items:center; gap:6px; min-height:34px; padding:0 4px 0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); width:120px; }
.rp-num-value { flex:1; font-size:13px; }
.rp-num-steppers { display:flex; flex-direction:column; }
.rp-num-step { display:grid; place-items:center; width:20px; height:15px; color:var(--rp-c-gray-500); cursor:pointer; }
rating-el, rating-el { display:inline-flex; gap:2px; color:var(--rp-c-gray-300); }
.rp-star.filled { color:var(--rp-c-amber-500); }
pin-input, pin-input { display:inline-flex; gap:8px; }
.rp-pin-cell { display:grid; place-items:center; width:40px; height:46px; border:1px solid var(--rp-border-strong); border-radius:8px; font-size:18px; font-weight:700; background:var(--rp-c-white); }
.rp-pin-cell.active { border-color:var(--rp-primary); }
color-swatch, color-swatch { display:inline-flex; align-items:center; gap:8px; padding:4px 10px 4px 4px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); }
.rp-swatch-chip { width:24px; height:24px; border-radius:6px; border:1px solid var(--rp-a-black-10); }
.rp-swatch-hex { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:var(--rp-c-gray-700); }
autocomplete-el, autocomplete-el { display:inline-block; width:280px; }
.rp-ac-options { display:grid; gap:1px; margin-top:6px; padding:5px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); }
.rp-ac-option { padding:7px 8px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-700); }
.rp-ac-option:first-child { background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); }

/* --- form-field-description --- */
form-field-description, form-field-description { display:block; margin-top:4px; color:var(--rp-muted); font-size:12px; line-height:1.55; }

/* --- radio-card --- */
radio-card, radio-card { display:flex; align-items:flex-start; gap:10px; padding:12px 14px; border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); background:var(--rp-surface); min-width:0; }
radio-card[state="checked"], radio-card[state="checked"] { border-color:var(--rp-primary); }
radio-card[state="disabled"], radio-card[state="disabled"] { opacity:.5; }
.radio-card-dot { display:grid; place-items:center; width:16px; height:16px; border-radius:50%; border:1.5px solid var(--rp-border-strong); flex:0 0 auto; margin-top:1px; }
.radio-card-dot.checked { border-color:var(--rp-primary); background:var(--rp-primary); }
.radio-card-dot.checked::after { content:''; display:block; width:6px; height:6px; border-radius:50%; background:var(--rp-c-white); }
.radio-card-body { flex:1; min-width:0; }
.radio-card-label { display:block; font-size:13px; font-weight:650; color:var(--rp-text); }
.radio-card-desc { display:block; font-size:12px; color:var(--rp-muted); margin-top:2px; }
`;

export class FieldElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const value = attr(this, "value");
    const placeholder = attr(this, "placeholder", "Search");
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    const help = attr(this, "help");
    const showValue = value || attr(this, "state") === "filled";
    const content = `${this.fieldIcon()}<span class="${showValue ? "rp-value" : "rp-placeholder"}">${escapeHtml(value || placeholder)}</span>${this.hasAttribute("has-clear-button") ? `<span class="rp-field-clear">${icon("x", 14)}</span>` : ""}`;
    if (label || error || help) {
      this.classList.add("rp-field-group");
      this.innerHTML = `<span class="rp-field-label">${escapeHtml(label)}</span><span class="rp-field-control">${content}</span>${help ? `<span class="rp-field-help">${escapeHtml(help)}</span>` : ""}${error ? `<span class="rp-error-text">${escapeHtml(error)}</span>` : ""}`;
    } else {
      this.innerHTML = content;
    }
  }
  fieldIcon() {
    const tag = this.tagName.toLowerCase();
    if (tag === "search-el") return icon("search");
    const ic = attr(this, "icon");
    return ic ? icon(ic, 15) : "";
  }
}
export class TextareaElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    this.style.setProperty("--snap-rows", attr(this, "rows", "3"));
    const value = attr(this, "value");
    const placeholder = attr(this, "placeholder", "Textarea");
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    const help = attr(this, "help");
    const inner = `<span class="${value ? "rp-value" : "rp-placeholder"}">${escapeHtml(value || placeholder)}</span>`;
    if (label || error || help) {
      this.classList.add("rp-field-group");
      this.innerHTML = `<span class="rp-field-label">${escapeHtml(label)}</span><span class="rp-field-control">${inner}</span>${help ? `<span class="rp-field-help">${escapeHtml(help)}</span>` : ""}${error ? `<span class="rp-error-text">${escapeHtml(error)}</span>` : ""}`;
    } else {
      this.innerHTML = inner;
    }
  }
}
export class SelectElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const options = csv(this, "options", "选项 A,选项 B,选项 C");
    const value = attr(this, "value", options[0] || "Select");
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    this.innerHTML = `${label ? `<span class="rp-field-label">${escapeHtml(label)}</span>` : ""}<span class="select-el-control"><span class="select-el-value">${escapeHtml(value)}</span>${icon("chevron-down")}</span><span class="select-el-options">${options.map((o) => `<span class="select-el-option${o === value ? " selected" : ""}">${escapeHtml(o)}</span>`).join("")}</span>${error ? `<span class="rp-error-text">${escapeHtml(error)}</span>` : ""}`;
  }
}
export class ButtonElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", this.textContent?.trim() || "Button");
    const ic = attr(this, "icon");
    const loading = attr(this, "state") === "loading";
    this.innerHTML = `${loading ? icon("loader") : ic ? icon(ic) : ""}<span>${escapeHtml(label)}</span>`;
  }
}
export class CheckboxElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const state = attr(this, "state");
    const mark =
      state === "checked"
        ? icon("check", 12)
        : state === "indeterminate"
          ? icon("minus", 12)
          : "";
    this.innerHTML = `<span class="rp-box">${mark}</span><span>${escapeHtml(attr(this, "label", ""))}</span>`;
  }
}
export class RadioElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const checked = attr(this, "state") === "checked";
    this.innerHTML = `<span class="rp-box">${checked ? icon("circle", 8) : ""}</span><span>${escapeHtml(attr(this, "label", ""))}</span>`;
  }
}
export class ToggleElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    this.innerHTML = `<span class="toggle-el-track"><span class="toggle-el-dot"></span></span><span>${escapeHtml(attr(this, "label", ""))}</span>`;
  }
}
export class FormElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}
export class FormItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const children = Array.from(this.childNodes);
    const label = attr(this, "label");
    const error = attr(this, "error");
    this.innerHTML = `${label ? `<span class="form-el-label${this.hasAttribute("required") ? " required" : ""}">${escapeHtml(label)}</span>` : ""}`;
    children.forEach((n) => this.appendChild(n));
    if (error)
      this.insertAdjacentHTML(
        "beforeend",
        `<span class="form-el-error">${escapeHtml(error)}</span>`,
      );
  }
}
export class DatePickerElement extends FieldElement {
  fieldIcon() {
    return icon("calendar");
  }
}
export class UploadElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const state = attr(this, "state", "empty");
    if (state === "has-file")
      this.innerHTML = `${icon("file")}<span>${escapeHtml(attr(this, "file", "document.pdf"))}</span>`;
    else if (state === "uploading")
      this.innerHTML = `${icon("loader")}<span>上传中...</span><span class="progress-el-bar" style="width:${escapeHtml(attr(this, "progress", "60"))}%"></span>`;
    else if (state === "error")
      this.innerHTML = `${icon("circle-x", 24)}<span>${escapeHtml(attr(this, "error") || attr(this, "label") || "上传失败，点击重试")}</span>`;
    else
      this.innerHTML = `${icon("upload", 24)}<span>${escapeHtml(attr(this, "label", "点击或拖拽文件上传"))}</span>`;
  }
}
export class ImagePlaceholderElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.style.setProperty("--snap-width", `${attr(this, "width", "160")}px`);
    this.style.setProperty("--snap-height", `${attr(this, "height", "100")}px`);
    if (!this.innerHTML.trim())
      this.innerHTML = `${icon("image")} ${escapeHtml(attr(this, "label", "Image"))}`;
  }
}
export class ProgressElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const value = attr(this, "value", "40");
    this.style.setProperty("--progress", `${value}%`);
    const kind = attr(this, "kind", attr(this, "style"));
    this.innerHTML =
      kind === "circle"
        ? `${escapeHtml(value)}%`
        : '<span class="progress-el-bar"></span>';
  }
}

export class SliderElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const min = intAttr(this, "min", 0);
    const max = intAttr(this, "max", 100);
    const value = intAttr(this, "value", 40);
    const pct =
      max > min
        ? Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
        : 0;
    const label = attr(this, "label");
    this.innerHTML = `${label ? `<span class="rp-field-label">${escapeHtml(label)}</span>` : ""}<span class="slider-el-track"><span class="slider-el-fill" style="width:${pct}%"></span><span class="slider-el-thumb" style="left:${pct}%"></span></span>${this.hasAttribute("show-value") ? `<span class="slider-el-value">${value}</span>` : ""}`;
  }
}
export class RangeElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const min = intAttr(this, "min", 0);
    const max = intAttr(this, "max", 100);
    const low = intAttr(this, "low", 25);
    const high = intAttr(this, "high", 75);
    const span = max - min || 1;
    const l = ((low - min) / span) * 100;
    const h = ((high - min) / span) * 100;
    this.innerHTML = `<span class="slider-el-track"><span class="slider-el-fill" style="left:${l}%;width:${h - l}%"></span><span class="slider-el-thumb" style="left:${l}%"></span><span class="slider-el-thumb" style="left:${h}%"></span></span>`;
  }
}
export class NumberInputElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const value = attr(this, "value", "0");
    this.innerHTML = `<span class="rp-num-value">${escapeHtml(value)}</span><span class="rp-num-steppers"><span class="rp-num-step">${icon("chevron-up", 12)}</span><span class="rp-num-step">${icon("chevron-down", 12)}</span></span>`;
  }
}
export class RatingElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const max = intAttr(this, "max", 5);
    const value = intAttr(this, "value", 3);
    this.innerHTML = Array.from(
      { length: max },
      (_, i) =>
        `<span class="rp-star${i < value ? " filled" : ""}">${icon("star", 16)}</span>`,
    ).join("");
  }
}
export class PinInputElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const len = intAttr(this, "length", 4);
    const value = attr(this, "value", "");
    const chars = value.split("");
    this.innerHTML = Array.from(
      { length: len },
      (_, i) =>
        `<span class="rp-pin-cell${i === chars.length ? " active" : ""}">${escapeHtml(chars[i] || "")}</span>`,
    ).join("");
  }
}
export class ColorSwatchElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const value = attr(this, "value", "#2563eb");
    this.innerHTML = `<span class="rp-swatch-chip" style="background:${escapeHtml(value)}"></span><span class="rp-swatch-hex">${escapeHtml(attr(this, "label", value))}</span>`;
  }
}
export class AutocompleteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const value = attr(this, "value");
    const options = csv(this, "options", "选项一,选项二,选项三");
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    this.innerHTML = `${label ? `<span class="rp-field-label">${escapeHtml(label)}</span>` : ""}<span class="rp-field-control">${icon("search")}<span class="${value ? "rp-value" : "rp-placeholder"}">${escapeHtml(value || attr(this, "placeholder", "输入以搜索"))}</span></span>${this.hasAttribute("open") ? `<span class="rp-ac-options">${options.map((o) => `<span class="rp-ac-option">${escapeHtml(o)}</span>`).join("")}</span>` : ""}${error ? `<span class="rp-error-text">${escapeHtml(error)}</span>` : ""}`;
  }
}

export class PasswordInputElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const value = attr(this, "value");
    const placeholder = attr(this, "placeholder", "请输入密码");
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    const help = attr(this, "help");
    const masked = value ? "•".repeat(Math.min(12, value.length)) : "";
    const inner = `<span class="${value ? "rp-value" : "rp-placeholder"}">${escapeHtml(masked || placeholder)}</span>${this.hasAttribute("has-show") ? `<span class="rp-field-clear">${icon("eye", 15)}</span>` : ""}`;
    this.innerHTML = `${label ? `<span class="rp-field-label">${escapeHtml(label)}</span>` : ""}<span class="rp-field-control">${inner}</span>${help ? `<span class="rp-field-help">${escapeHtml(help)}</span>` : ""}${error ? `<span class="rp-error-text">${escapeHtml(error)}</span>` : ""}`;
  }
}
export class TagInputElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const tags = csv(this, "tags", "");
    const placeholder = attr(this, "placeholder", "输入后回车添加");
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    const chips = tags
      .map(
        (t) =>
          `<span class="rp-taginput-chip">${escapeHtml(t)}${icon("x", 11)}</span>`,
      )
      .join("");
    const inner = `${chips}<span class="rp-placeholder">${escapeHtml(placeholder)}</span>`;
    this.innerHTML = `${label ? `<span class="rp-field-label">${escapeHtml(label)}</span>` : ""}<span class="rp-field-control rp-taginput">${inner}</span>${error ? `<span class="rp-error-text">${escapeHtml(error)}</span>` : ""}`;
  }
}
export class ChoiceGroupElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label");
    const error = attr(this, "error") || attr(this, "error-message");
    if (attr(this, "direction") === "horizontal")
      this.classList.add("rp-group-h");
    if (label)
      this.insertAdjacentHTML(
        "afterbegin",
        `<span class="rp-group-label">${escapeHtml(label)}</span>`,
      );
    if (error)
      this.insertAdjacentHTML(
        "beforeend",
        `<span class="rp-error-text">${escapeHtml(error)}</span>`,
      );
  }
}

export class FormFieldDescriptionElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    const t = attr(this, "text", "");
    if (t && !this.innerHTML.trim()) this.textContent = t;
  }
}

export class RadioCardElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", "选项");
    const description = attr(this, "description", "");
    const isChecked = attr(this, "state", "") === "checked";
    this.innerHTML = `<div class="radio-card-dot${isChecked ? " checked" : ""}"></div><div class="radio-card-body"><span class="radio-card-label">${escapeHtml(label)}</span>${description ? `<span class="radio-card-desc">${escapeHtml(description)}</span>` : ""}</div>`;
  }
}
