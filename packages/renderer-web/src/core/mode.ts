import { injectStyle } from "./style";
import { toLangTag } from "rpml-parser";

export interface RpuiTheme {
  bg?: string;
  surface?: string;
  border?: string;
  text?: string;
  textMuted?: string;
  accent?: string;
  /** Pick-mode hover highlight background (rgba recommended) */
  pickHover?: string;
  /** Pick-mode hover outline color */
  pickHoverBorder?: string;
  /** Pick-mode selected highlight background */
  pickSelected?: string;
  /** Pick-mode selected outline color */
  pickSelectedBorder?: string;
}

export type RpuiMode = "view" | "edit" | "pick";

export interface PickInfo {
  element: Element;
  /** Web Component tag name (e.g. "navbar-el") */
  tag: string;
  /** RPML language tag name (e.g. "navigator") */
  langTag: string;
  /** data-pin value if the element carries one */
  pin?: string;
  /** 1-based source line (only present when annotateLines was enabled) */
  line?: number;
  attrs: Record<string, string>;
}

// ─── Mode CSS ──────────────────────────────────────────────────────────────

const MODE_CSS = `
[data-rp-mode="edit"] .rp-pin{display:none!important}
[data-rp-mode="edit"] .annotation-el-pane,[data-rp-mode="pick"] .annotation-el-pane{position:relative!important;max-height:none!important;overflow:visible!important}
[data-rp-mode="edit"] *{pointer-events:none!important;cursor:default!important}
[data-rp-mode="pick"]{cursor:crosshair}
[data-rp-mode="pick"] [data-rp-hover]{outline:2px solid var(--rpui-pick-hover-border,rgba(99,102,241,.8))!important;outline-offset:2px;background-color:var(--rpui-pick-hover,rgba(99,102,241,.07))!important}
[data-rp-mode="pick"] [data-rp-selected]{outline:2px solid var(--rpui-pick-selected-border,rgba(37,99,235,1))!important;outline-offset:2px;background-color:var(--rpui-pick-selected,rgba(37,99,235,.1))!important}
`;

let modeCssInjected = false;
function injectModeStyle() {
  if (modeCssInjected) return;
  modeCssInjected = true;
  injectStyle(); // ensure base styles are in
  const el = document.createElement("style");
  el.id = "rpui-mode-style";
  el.textContent = MODE_CSS;
  document.head.appendChild(el);
}

// ─── Internal structural elements that are not user-pickable ──────────────

const INTERNAL = new Set([
  "rp-main-shell",
  "rp-main-stage",
  "rp-main-stage-clip",
  "rp-pin",
  "page-el-shell",
  "page-el-main",
  "page-el-body",
  "page-el-header",
  "annotation-el-pane",
  "annotation-el-pane-inner",
]);

function isPickable(el: Element): boolean {
  return (
    el.tagName.includes("-") && !INTERNAL.has(el.className.split(" ")[0] ?? "")
  );
}

function closest(el: Element | null, host: Element): Element | null {
  let cur: Element | null = el;
  while (cur && cur !== host) {
    if (isPickable(cur)) return cur;
    cur = cur.parentElement;
  }
  return null;
}

// ─── Theme application ─────────────────────────────────────────────────────

const THEME_MAP: [keyof RpuiTheme, string][] = [
  ["bg", "--rp-bg"],
  ["surface", "--rp-surface"],
  ["border", "--rp-border"],
  ["text", "--rp-text"],
  ["textMuted", "--rp-muted"],
  ["accent", "--rp-primary"],
  ["pickHover", "--rpui-pick-hover"],
  ["pickHoverBorder", "--rpui-pick-hover-border"],
  ["pickSelected", "--rpui-pick-selected"],
  ["pickSelectedBorder", "--rpui-pick-selected-border"],
];

function applyTheme(host: HTMLElement, theme: RpuiTheme) {
  for (const [key, varName] of THEME_MAP) {
    const val = theme[key];
    if (val) host.style.setProperty(varName, val);
    else host.style.removeProperty(varName);
  }
}

function buildPickInfo(el: Element): PickInfo {
  const attrs: Record<string, string> = {};
  for (let i = 0; i < el.attributes.length; i++) {
    const a = el.attributes[i];
    if (a.name !== "data-rp-hover" && a.name !== "data-rp-selected")
      attrs[a.name] = a.value;
  }
  const tag = el.tagName.toLowerCase();
  const lineAttr = el.getAttribute("data-rp-line");
  return {
    element: el,
    tag,
    langTag: toLangTag(tag),
    pin: el.getAttribute("data-pin") ?? undefined,
    line: lineAttr ? parseInt(lineAttr, 10) : undefined,
    attrs,
  };
}

// ─── ModeManager ──────────────────────────────────────────────────────────

export interface ModeManagerOpts {
  mode?: RpuiMode;
  theme?: RpuiTheme;
  selected?: string[];
  onPick?: (info: PickInfo) => void;
  /** Called when an `<anchor>` link is clicked; prevents the default URL navigation. */
  onNavigate?: (to: string, section?: string) => void;
}

export class ModeManager {
  private host: HTMLElement;
  private _mode: RpuiMode = "view";
  private _hovered: Element | null = null;
  onPick?: (info: PickInfo) => void;
  onNavigate?: (to: string, section?: string) => void;

  private _over: (e: PointerEvent) => void;
  private _out: (e: PointerEvent) => void;
  private _click: (e: PointerEvent) => void;
  private _anchor: (e: Event) => void;

  constructor(host: HTMLElement, opts: ModeManagerOpts = {}) {
    this.host = host;
    this.onPick = opts.onPick;
    this.onNavigate = opts.onNavigate;

    this._anchor = (e: Event) => {
      if (!this.onNavigate) return;
      const ev = e as CustomEvent<{ to: string; section?: string }>;
      ev.preventDefault();
      this.onNavigate(ev.detail.to, ev.detail.section);
    };
    host.addEventListener("rp-anchor", this._anchor);

    this._over = (e: PointerEvent) => {
      const target = closest(e.target as Element, this.host);
      if (target === this._hovered) return;
      this._hovered?.removeAttribute("data-rp-hover");
      this._hovered = target;
      target?.setAttribute("data-rp-hover", "");
    };
    this._out = (e: PointerEvent) => {
      if (e.relatedTarget && this.host.contains(e.relatedTarget as Node))
        return;
      this._hovered?.removeAttribute("data-rp-hover");
      this._hovered = null;
    };
    this._click = (e: PointerEvent) => {
      const target = closest(e.target as Element, this.host);
      if (!target) return;
      e.stopPropagation();
      // Toggle selected: clicking again deselects
      if (target.hasAttribute("data-rp-selected")) {
        target.removeAttribute("data-rp-selected");
      } else {
        this.host
          .querySelectorAll("[data-rp-selected]")
          .forEach((el) => el.removeAttribute("data-rp-selected"));
        target.setAttribute("data-rp-selected", "");
      }
      this.onPick?.(buildPickInfo(target));
    };

    if (opts.theme) applyTheme(host, opts.theme);
    if (opts.selected) this.setSelected(opts.selected);
    this.setMode(opts.mode ?? "view");
  }

  setMode(mode: RpuiMode) {
    if (mode !== "view") injectModeStyle();
    this._mode = mode;
    this.host.dataset.rpMode = mode;
    if (mode === "pick") {
      this.host.addEventListener("pointerover", this._over);
      this.host.addEventListener("pointerout", this._out);
      this.host.addEventListener("click", this._click, true);
    } else {
      this._detachPick();
    }
  }

  setTheme(theme: RpuiTheme) {
    applyTheme(this.host, theme);
  }

  /** Re-apply programmatic selection after a render cycle. */
  setSelected(selectors: string[]) {
    this.host
      .querySelectorAll("[data-rp-selected]")
      .forEach((el) => el.removeAttribute("data-rp-selected"));
    for (const sel of selectors) {
      try {
        this.host
          .querySelectorAll(sel)
          .forEach((el) => el.setAttribute("data-rp-selected", ""));
      } catch {
        /* invalid selector — skip */
      }
    }
  }

  private _detachPick() {
    this._hovered?.removeAttribute("data-rp-hover");
    this._hovered = null;
    this.host.removeEventListener("pointerover", this._over);
    this.host.removeEventListener("pointerout", this._out);
    this.host.removeEventListener("click", this._click, true);
  }

  destroy() {
    this._detachPick();
    this.host.removeEventListener("rp-anchor", this._anchor);
    delete this.host.dataset.rpMode;
  }
}
