import { injectStyle } from "../core/style";
import { attr, csv, escapeHtml, intAttr } from "../core/dom";
import { icon } from "../core/icons";

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
