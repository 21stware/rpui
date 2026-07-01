import { injectStyle } from "../core/style";
import {
  attr,
  hasExplicitNumericHeight,
  resolveHeight,
  resolveWidth,
  usesAutoHeight,
} from "../core/dom";
import { icon } from "../core/icons";

// layout primitives: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const layoutStyle = `
viewport-el, viewport-el { display:flex; flex-direction:column; width:var(--snap-width,1440px); height:var(--snap-height,900px); background:var(--rp-c-slate-50); overflow:hidden; color:var(--rp-c-gray-900); }
layout-el, layout-el { display:grid; grid-template-columns:var(--snap-columns,1fr); grid-template-rows:var(--snap-rows,auto); gap:var(--snap-gap,0); align-content:start; width:100%; max-width:100%; min-width:0; }
layout-el[align="center"], layout-el[align="center"] { align-items:center; }
layout-el[align="start"], layout-el[align="start"] { align-items:start; }
layout-el[align="end"], layout-el[align="end"] { align-items:end; }
layout-el[justify="center"], layout-el[justify="center"] { justify-items:center; }
layout-el[justify="end"], layout-el[justify="end"] { justify-items:end; }
panel-el, panel-el { margin:8px; display:block; width:100%; max-width:100%; background:var(--rp-c-white); border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); padding:var(--snap-padding,16px); }
panel-el[elevation="1"], panel-el[elevation="1"] { box-shadow:0 4px 16px var(--rp-a-slate-06); }
panel-el[elevation="2"], panel-el[elevation="2"] { box-shadow:var(--rp-shadow); }
navbar-el, navbar-el { display:flex; align-items:center; gap:14px; width:100%; max-width:100%; height:var(--snap-height,64px); padding:0 24px; background:var(--rp-c-white); border-bottom:1px solid var(--rp-border); }
sidebar-el, sidebar-el { display:block; width:var(--snap-width,260px); min-height:0; background:var(--rp-c-white); border-right:1px solid var(--rp-border); padding:14px; }
sidebar-el[collapsed], sidebar-el[collapsed] { width:72px; }
logo-el, logo-el { display:inline-grid; place-items:center; width:var(--snap-size,82px); height:32px; border-radius:8px; background:var(--rp-c-gray-900); color:var(--rp-c-white); font-size:12px; font-weight:800; letter-spacing:.08em; }
split-pane, split-pane { display:grid; grid-template-columns:var(--snap-columns,1fr 1fr); width:100%; max-width:100%; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; }
divider-el, divider-el { display:block; height:1px; background:var(--rp-border); margin:12px 0; }
divider-el.divider-el-v, divider-el.divider-el-v { display:inline-block; width:1px; height:auto; align-self:stretch; margin:0 12px; }
spacer-el, spacer-el { display:block; height:var(--snap-size,16px); }
row-el, row-el { display:flex; flex-direction:row; gap:var(--snap-gap,0px); align-items:var(--snap-align,stretch); width:100%; max-width:100%; }
row-el > *, row-el > * { min-width:0; flex-shrink:1; }
col-el, col-el { display:flex; flex-direction:column; gap:var(--snap-gap,0px); flex:1; min-width:0; }
section-el, section-el { display:block; padding:var(--snap-padding,0px); }
layout-el > *, layout-el > * { min-width:0; }

/* separator — visual divider with horizontal/vertical orientation */
separator-el, separator-el { display:block; height:1px; width:100%; background:var(--rp-border); margin:12px 0; border:0; }
separator-el[orientation="vertical"], separator-el[orientation="vertical"] { display:inline-block; width:1px; height:auto; align-self:stretch; margin:0 12px; }

/* icon — placeholder icon display with mode (line/fill) and type */
icon-el, icon-el { display:inline-flex; align-items:center; justify-content:center; width:var(--snap-size,32px); height:var(--snap-size,32px); color:var(--rp-c-gray-500); }
icon-el[mode="fill"], icon-el[mode="fill"] { background:var(--rp-c-gray-100); border-radius:8px; }
`;

export class GenericElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}
export class ViewportElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("width") || this.hasAttribute("device"))
      this.style.setProperty("--snap-width", `${resolveWidth(this, 1440)}px`);
    if (hasExplicitNumericHeight(this))
      this.style.setProperty("--snap-height", `${resolveHeight(this, 900)}px`);
    else if (usesAutoHeight(this))
      this.style.setProperty("--snap-height", "auto");
  }
}
export class LayoutElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.style.setProperty("--snap-columns", attr(this, "columns", "1fr"));
    this.style.setProperty("--snap-rows", attr(this, "rows", "auto"));
    if (this.hasAttribute("gap"))
      this.style.setProperty("--snap-gap", `${attr(this, "gap", "0")}px`);
  }
}
export class PanelElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.style.setProperty(
      "--snap-padding",
      `${attr(this, "padding", "16")}px`,
    );
  }
}
export class NavbarElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.style.setProperty("--snap-height", `${attr(this, "height", "64")}px`);
  }
}
export class SidebarElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.style.setProperty("--snap-width", `${attr(this, "width", "260")}px`);
  }
}
export class LogoElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("size"))
      this.style.setProperty("--snap-size", `${attr(this, "size", "82")}px`);
    if (!this.innerHTML.trim()) this.textContent = attr(this, "label", "LOGO");
  }
}
export class SplitPaneElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.style.setProperty("--snap-columns", attr(this, "columns", "1fr 1fr"));
  }
}
export class DividerElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("vertical")) this.classList.add("divider-el-v");
  }
}
export class SpacerElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("size"))
      this.style.setProperty("--snap-size", `${attr(this, "size", "16")}px`);
  }
}
export class RowElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("gap"))
      this.style.setProperty("--snap-gap", `${attr(this, "gap", "0")}px`);
    if (this.hasAttribute("align"))
      this.style.setProperty("--snap-align", attr(this, "align", "stretch"));
  }
}
export class ColElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("gap"))
      this.style.setProperty("--snap-gap", `${attr(this, "gap", "0")}px`);
  }
}
export class SectionElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("padding"))
      this.style.setProperty(
        "--snap-padding",
        `${attr(this, "padding", "0")}px`,
      );
  }
}

export class SeparatorElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute("orientation"))
      this.setAttribute("orientation", attr(this, "orientation", "horizontal"));
  }
}

export class IconElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const size = attr(this, "size", "32");
    this.style.setProperty("--snap-size", `${size}px`);
    const type = attr(this, "type", "");
    const mode = attr(this, "mode", "line");
    this.setAttribute("mode", mode);
    if (type) {
      this.innerHTML = icon(type, Number(size));
    } else {
      this.innerHTML = icon("sparkles", Number(size));
    }
  }
}
