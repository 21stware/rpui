import { injectStyle } from "../core/style";
import { attr, csv, escapeHtml, intAttr } from "../core/dom";
import { icon } from "../core/icons";

// shadcn-aligned: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const shadcnStyle = `
/* --- shadcn-aligned components --- */
/* carousel */
carousel-el, carousel-el { display:block; position:relative; width:100%; max-width:100%; }
.rp-carousel-viewport { overflow:hidden; }
.rp-carousel-track { display:flex; gap:12px; }
carousel-item, carousel-item { flex:0 0 auto; width:300px; scroll-snap-align:start; }
.rp-carousel-prev, .rp-carousel-next { position:absolute; top:50%; transform:translateY(-50%); display:grid; place-items:center; width:32px; height:32px; border-radius:50%; border:1px solid var(--rp-border); background:var(--rp-c-white); color:var(--rp-c-gray-700); z-index:1; }
.rp-carousel-prev { left:8px; }
.rp-carousel-next { right:8px; }

/* combobox */
combobox-el, combobox-el { display:block; width:100%; max-width:100%; }
.rp-combobox-trigger { display:flex; align-items:center; justify-content:space-between; gap:8px; min-height:36px; padding:0 11px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); color:var(--rp-c-gray-700); font-size:13px; }
.rp-combobox-value { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-combobox-popover { display:none; margin-top:4px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); box-shadow:0 10px 18px var(--rp-a-slate-08); }
.rp-combobox-search { display:flex; align-items:center; gap:8px; padding:8px 10px; border-bottom:1px solid var(--rp-border); }
.rp-combobox-search input { border:0; outline:0; font-size:13px; width:100%; background:transparent; }
.rp-combobox-list { padding:4px; max-height:200px; overflow-y:auto; }
.rp-combobox-option { display:flex; align-items:center; gap:8px; padding:7px 8px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-700); }
.rp-combobox-option.selected { background:var(--rp-c-zinc-100); }
.rp-combobox-option svg:first-child { opacity:0; }
.rp-combobox-option.selected svg:first-child { opacity:1; }

/* data-table */
data-table, data-table { display:block; width:100%; max-width:100%; }
.rp-dt-wrap { border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:var(--rp-c-white); }
.rp-dt-table { width:100%; border-collapse:collapse; }
.rp-dt-th { display:table-cell; padding:10px 12px; border-bottom:1px solid var(--rp-border); font-size:13px; font-weight:650; color:var(--rp-c-gray-500); text-align:left; white-space:nowrap; }
.rp-dt-th svg { display:inline-block; margin-left:4px; opacity:.4; }
.rp-dt-tr { border-bottom:1px solid var(--rp-border); }
.rp-dt-tr:last-child { border-bottom:0; }
.rp-dt-td { display:table-cell; padding:10px 12px; font-size:13px; color:var(--rp-c-gray-700); }
.rp-dt-foot { padding:8px 12px; border-top:1px solid var(--rp-border); background:var(--rp-c-gray-50); font-size:12px; color:var(--rp-c-gray-500); }

/* hover-card */
hover-card, hover-card { display:inline-block; position:relative; width:fit-content; }
.rp-hovercard-trigger { color:var(--rp-primary); font-weight:650; border-bottom:1px dashed var(--rp-primary); }
.rp-hovercard-content { display:block; position:absolute; top:100%; left:0; z-index:10; margin-top:6px; width:280px; padding:14px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); box-shadow:0 10px 24px var(--rp-a-slate-08); }
.rp-hovercard-title { font-size:14px; font-weight:700; color:var(--rp-c-gray-900); margin-bottom:4px; }
.rp-hovercard-body { font-size:13px; color:var(--rp-c-gray-500); line-height:1.5; }

/* input-group */
input-group, input-group { display:flex; align-items:center; width:100%; max-width:100%; min-height:36px; border:1px solid var(--rp-border-strong); border-radius:8px; background:var(--rp-c-white); overflow:hidden; }
.rp-ig-prefix, .rp-ig-suffix { display:flex; align-items:center; padding:0 11px; font-size:13px; color:var(--rp-c-gray-500); background:var(--rp-c-zinc-100); white-space:nowrap; flex:0 0 auto; align-self:stretch; }
.rp-ig-input { flex:1; min-width:0; padding:0 11px; font-size:13px; color:var(--rp-c-gray-700); }

/* scroll-area */
scroll-area, scroll-area { display:block; position:relative; width:100%; max-width:100%; height:var(--snap-height,200px); overflow:hidden; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); }
.rp-scroll-viewport { height:100%; overflow:hidden; padding:12px; }
.rp-scroll-bar { position:absolute; right:4px; top:4px; bottom:4px; width:6px; }
.rp-scroll-thumb { width:100%; height:40%; background:var(--rp-c-zinc-300); border-radius:3px; }

/* toggle-group */
toggle-group, toggle-group { display:inline-flex; align-items:center; gap:2px; width:fit-content; padding:2px; border-radius:8px; background:var(--rp-c-gray-100); }
.rp-tg-item, toggle-group-item { display:flex; align-items:center; padding:6px 12px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-500); }
.rp-tg-item.active, toggle-group-item.active { background:var(--rp-c-white); color:var(--rp-c-gray-900); font-weight:650; box-shadow:0 1px 2px var(--rp-a-black-06); }

/* collapsible */
collapsible-el, collapsible-el { display:block; width:100%; max-width:100%; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
.rp-collapsible-head { display:flex; align-items:center; gap:8px; padding:11px 14px; font-size:13px; font-weight:650; color:var(--rp-c-gray-900); }
.rp-collapsible-head svg { transition:transform .15s; }
collapsible-el.expanded .rp-collapsible-head svg { transform:rotate(90deg); }
.rp-collapsible-body { display:none; padding:0 14px 14px; font-size:13px; color:var(--rp-c-gray-500); }
collapsible-el.expanded .rp-collapsible-body { display:block; }

/* aspect-ratio */
aspect-ratio, aspect-ratio { display:block; position:relative; width:100%; max-width:100%; border-radius:8px; overflow:hidden; background:var(--rp-c-gray-100); }
aspect-ratio::before { content:''; display:block; padding-top:var(--snap-ratio,56.25%); }
.rp-aspect-inner { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }

/* field (shadcn Field) */
field-el, field-el { display:grid; gap:6px; width:100%; max-width:100%; }
.rp-sf-label { font-size:13px; font-weight:650; color:var(--rp-c-gray-700); }
.rp-sf-control { display:flex; align-items:center; min-height:36px; }
.rp-sf-control > * { width:100%; }
.rp-sf-desc { font-size:12px; color:var(--rp-muted); }
.rp-sf-err { font-size:12px; color:var(--rp-danger); }

/* sonner (toast) */
sonner-el, sonner-el { display:flex; align-items:flex-start; gap:10px; width:100%; max-width:360px; padding:14px 16px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); box-shadow:0 10px 24px var(--rp-a-slate-08); box-sizing:border-box; }
.rp-sonner-icon { flex:0 0 auto; display:grid; place-items:center; width:20px; height:20px; }
.rp-sonner-main { flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.rp-sonner-title { font-size:14px; font-weight:650; color:var(--rp-c-gray-900); line-height:1.4; }
.rp-sonner-desc { font-size:13px; color:var(--rp-c-gray-500); line-height:1.4; }
.rp-sonner-close { flex:0 0 auto; display:grid; place-items:center; width:20px; height:20px; margin-top:1px; border:0; background:transparent; padding:0; border-radius:6px; color:var(--rp-c-gray-400); font:inherit; }
`;

/* Carousel — horizontal scrolling content with prev/next controls */
export class CarouselElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const children = Array.from(this.children);
    const items = children.filter(
      (n) => n.tagName.toLowerCase() === "carousel-item",
    );
    if (items.length === 0) return;
    const inner = items.map((n) => n.outerHTML).join("");
    this.innerHTML = `<div class="rp-carousel-viewport"><div class="rp-carousel-track">${inner}</div></div><button class="rp-carousel-prev">${icon("chevron-left", 18)}</button><button class="rp-carousel-next">${icon("chevron-right", 18)}</button>`;
  }
}
export class CarouselItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

/* Combobox — search input with filtered dropdown options */
export class ComboboxElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const options = csv(
      this,
      "options",
      "Apple,Banana,Blueberry,Grapes,Pineapple",
    );
    const placeholder = attr(this, "placeholder", "Search...");
    const value = attr(this, "value");
    this.innerHTML = `<div class="rp-combobox-trigger"><span class="rp-combobox-value">${escapeHtml(value || placeholder)}</span>${icon("chevrons-up-down", 14)}</div><div class="rp-combobox-popover"><div class="rp-combobox-search">${icon("search", 14)}<input type="text" placeholder="Search..." /></div><div class="rp-combobox-list">${options.map((o) => `<div class="rp-combobox-option${o === value ? " selected" : ""}">${icon("check", 14)}<span>${escapeHtml(o)}</span></div>`).join("")}</div></div>`;
  }
}

/* Data Table — enhanced table with sortable headers and row count */
export class DataTableElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const columns = csv(this, "columns", "Name,Email,Status,Amount");
    const rowsAttr = attr(this, "rows", "");
    let rows: string[][] = [];
    if (rowsAttr) {
      rows = rowsAttr.split(";").map((r) => r.split(",").map((c) => c.trim()));
    }
    const head = columns
      .map(
        (c) =>
          `<th class="rp-dt-th">${escapeHtml(c)}${icon("chevrons-up-down", 12)}</th>`,
      )
      .join("");
    const body = rows
      .map(
        (r) =>
          `<tr class="rp-dt-tr">${r.map((c) => `<td class="rp-dt-td">${escapeHtml(c)}</td>`).join("")}</tr>`,
      )
      .join("");
    this.innerHTML = `<div class="rp-dt-wrap"><table class="rp-dt-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table><div class="rp-dt-foot">${rows.length} row(s)</div></div>`;
  }
}

/* Hover Card — inline trigger that shows a card on hover */
export class HoverCardElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const trigger = attr(this, "trigger", "@shadcn");
    const title = attr(this, "title");
    const description = attr(this, "description");
    const children = Array.from(this.childNodes).filter(
      (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent?.trim()),
    );
    let bodyHtml = "";
    if (children.length) {
      const wrapper = document.createElement("div");
      wrapper.className = "rp-hovercard-body";
      children.forEach((n) => wrapper.appendChild(n));
      bodyHtml = wrapper.outerHTML;
    } else if (description) {
      bodyHtml = `<div class="rp-hovercard-body"><p>${escapeHtml(description)}</p></div>`;
    }
    this.innerHTML = `<span class="rp-hovercard-trigger">${escapeHtml(trigger)}</span><div class="rp-hovercard-content">${title ? `<div class="rp-hovercard-title">${escapeHtml(title)}</div>` : ""}${bodyHtml}</div>`;
  }
}

/* Input Group — input with prefix/suffix addons */
export class InputGroupElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const prefix = attr(this, "prefix");
    const suffix = attr(this, "suffix");
    const placeholder = attr(this, "placeholder", "Enter value...");
    const value = attr(this, "value");
    const prefixHtml = prefix
      ? `<span class="rp-ig-prefix">${escapeHtml(prefix)}</span>`
      : "";
    const suffixHtml = suffix
      ? `<span class="rp-ig-suffix">${escapeHtml(suffix)}</span>`
      : "";
    this.innerHTML = `${prefixHtml}<span class="rp-ig-input">${escapeHtml(value || placeholder)}</span>${suffixHtml}`;
  }
}

/* Menubar — horizontal menu bar with dropdown items */
export class MenubarElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const items = Array.from(this.children).filter(
      (n) => n.tagName.toLowerCase() === "menubar-item",
    );
    if (items.length === 0) {
      const labels = csv(this, "items", "File,Edit,View,Help");
      this.innerHTML = labels
        .map((l) => `<div class="rp-menubar-item">${escapeHtml(l)}</div>`)
        .join("");
    } else {
      this.innerHTML = items.map((n) => n.outerHTML).join("");
    }
  }
}
export class MenubarItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", "Item");
    this.innerHTML = `<span class="rp-menubar-label">${escapeHtml(label)}</span>${icon("chevron-down", 14)}`;
  }
}

/* Navigation Menu — horizontal nav with sections */
export class NavMenuElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const items = Array.from(this.children).filter(
      (n) => n.tagName.toLowerCase() === "nav-menu-item",
    );
    if (items.length === 0) {
      const labels = csv(this, "items", "Home,Components,Docs");
      this.innerHTML = labels
        .map(
          (l, i) =>
            `<div class="rp-navmenu-item${i === 0 ? " active" : ""}">${escapeHtml(l)}</div>`,
        )
        .join("");
    } else {
      this.innerHTML = items.map((n) => n.outerHTML).join("");
    }
  }
}
export class NavMenuItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", "Item");
    const active = this.hasAttribute("active");
    this.innerHTML = `<span class="rp-navmenu-label${active ? " active" : ""}">${escapeHtml(label)}</span>`;
  }
}

/* Scroll Area — custom-styled scrollable container */
export class ScrollAreaElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const children = Array.from(this.childNodes);
    const height = attr(this, "height", "200");
    this.style.setProperty("--snap-height", `${height}px`);
    this.innerHTML = `<div class="rp-scroll-viewport">${children.map((n) => (n.nodeType === 3 ? escapeHtml(n.textContent || "") : (n as HTMLElement).outerHTML)).join("")}</div><div class="rp-scroll-bar"><div class="rp-scroll-thumb"></div></div>`;
  }
}

/* Toggle Group — multi/single select toggle buttons */
export class ToggleGroupElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const type = attr(this, "type", "single");
    const items = Array.from(this.children).filter(
      (n) => n.tagName.toLowerCase() === "toggle-group-item",
    );
    if (items.length === 0) {
      const labels = csv(this, "options", "Bold,Italic,Underline");
      const activeIdx = intAttr(this, "active", -1);
      this.innerHTML = labels
        .map(
          (l, i) =>
            `<div class="rp-tg-item${i === activeIdx ? " active" : ""}">${escapeHtml(l)}</div>`,
        )
        .join("");
    } else {
      this.innerHTML = items.map((n) => n.outerHTML).join("");
    }
    this.classList.add(`rp-tg-${type}`);
  }
}
export class ToggleGroupItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", "Toggle");
    const active =
      this.hasAttribute("active") || attr(this, "state") === "active";
    this.innerHTML = `<span class="rp-tg-label">${escapeHtml(label)}</span>`;
    if (active) this.classList.add("active");
  }
}

/* Collapsible — lightweight expand/collapse section */
export class CollapsibleElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", "Collapsible");
    const expanded = this.hasAttribute("expanded");
    const children = Array.from(this.childNodes).filter(
      (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent?.trim()),
    );
    const body = document.createElement("div");
    body.className = "rp-collapsible-body";
    children.forEach((n) => body.appendChild(n.cloneNode(true)));
    this.innerHTML = `<div class="rp-collapsible-head">${icon("chevron-right", 16)}<span>${escapeHtml(label)}</span></div>`;
    if (expanded) this.classList.add("expanded");
    this.appendChild(body);
  }
}

/* Aspect Ratio — container that maintains a width/height ratio */
export class AspectRatioElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const ratio = attr(this, "ratio", "16/9");
    const [w, h] = ratio.split("/").map((n) => parseFloat(n.trim()) || 16);
    this.style.setProperty("--snap-ratio", `${(h / w) * 100}%`);
    const children = Array.from(this.childNodes);
    const inner = document.createElement("div");
    inner.className = "rp-aspect-inner";
    children.forEach((n) => inner.appendChild(n.cloneNode(true)));
    this.innerHTML = "";
    this.appendChild(inner);
  }
}

/* Field — shadcn Field wrapper: label + control + description/error */
export class ShadcnFieldElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label");
    const description = attr(this, "description");
    const error = attr(this, "error");
    const children = Array.from(this.childNodes);
    this.innerHTML = "";
    if (label) {
      const lbl = document.createElement("span");
      lbl.className = "rp-sf-label";
      lbl.textContent = label;
      this.appendChild(lbl);
    }
    const control = document.createElement("div");
    control.className = "rp-sf-control";
    children.forEach((n) => control.appendChild(n));
    this.appendChild(control);
    if (description) {
      const desc = document.createElement("span");
      desc.className = "rp-sf-desc";
      desc.textContent = description;
      this.appendChild(desc);
    }
    if (error) {
      const err = document.createElement("span");
      err.className = "rp-sf-err";
      err.textContent = error;
      this.appendChild(err);
    }
  }
}

/* Sonner — toast notification stack */
export class SonnerElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const title = attr(this, "title", "Event has been created");
    const description = attr(this, "description");
    const type = attr(this, "type", "info");
    const ic =
      type === "success"
        ? "circle-check"
        : type === "error"
          ? "circle-x"
          : type === "warning"
            ? "triangle-alert"
            : "info";
    this.innerHTML = `<div class="rp-sonner-icon">${icon(ic, 18)}</div><div class="rp-sonner-main"><span class="rp-sonner-title">${escapeHtml(title)}</span>${description ? `<span class="rp-sonner-desc">${escapeHtml(description)}</span>` : ""}</div><button class="rp-sonner-close">${icon("x", 14)}</button>`;
  }
}
