import { injectStyle } from "../core/style";
import { attr, csv, intAttr, escapeHtml } from "../core/dom";
import { icon } from "../core/icons";

// navigation: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const navigationStyle = `
badge-el, badge-el { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 6px; border-radius:999px; background:var(--rp-c-zinc-900); color:var(--rp-c-white); font-size:11px; font-weight:750; }
avatar-el, avatar-el { display:inline-grid; place-items:center; width:var(--snap-size,32px); height:var(--snap-size,32px); border-radius:999px; background:var(--rp-c-zinc-100); color:var(--rp-c-gray-700); font-size:12px; font-weight:800; }
list-el, list-el { display:flex; flex-direction:column; gap:4px; width:100%; }
list-item, list-item { display:flex; align-items:center; gap:8px; width:100%; min-width:180px; height:36px; padding:0 10px; border-radius:8px; color:var(--rp-c-gray-700); }
list-item[state="selected"], list-item[state="selected"] { background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); font-weight:700; }
list-item[state="disabled"], list-item[state="disabled"] { opacity:.5; }
.list-el-label { flex:1 1 auto; }
.list-el-badge { margin-left:auto; min-width:18px; height:18px; border-radius:999px; display:grid; place-items:center; padding:0 6px; background:var(--rp-c-gray-200); color:var(--rp-c-gray-700); font-size:11px; font-weight:700; }
tabs-el, tabs-el { display:flex; gap:6px; border-bottom:1px solid var(--rp-border); margin-bottom:12px; width:fit-content; }
tab-el, tab-el { display:inline-flex; align-items:center; gap:6px; padding:9px 13px; border-bottom:2px solid transparent; color:var(--rp-c-gray-500); font-size:14px; }
tab-el.tab-el-active, tab-el.tab-el-active { color:var(--rp-primary); border-bottom-color:var(--rp-primary); font-weight:700; }
pagination-el, pagination-el { display:inline-flex; align-items:center; gap:6px; width:fit-content; font-size:13px; }
.page-el-btn { display:inline-grid; place-items:center; min-width:30px; height:30px; padding:0 8px; border:1px solid var(--rp-border); border-radius:6px; background:var(--rp-c-white); color:var(--rp-c-gray-700); }
.page-el-btn.active { border-color:var(--rp-primary); background:var(--rp-primary); color:var(--rp-c-white); font-weight:750; }
steps-el, steps-el { display:flex; align-items:center; gap:8px; width:fit-content; }
.rp-step { display:inline-flex; align-items:center; gap:6px; color:var(--rp-c-gray-500); font-size:13px; }
.rp-step-dot { display:inline-grid; place-items:center; width:22px; height:22px; border-radius:999px; border:1px solid var(--rp-border-strong); background:var(--rp-c-white); color:var(--rp-c-gray-500); font-size:11px; font-weight:750; }
.rp-step.active { color:var(--rp-primary); font-weight:750; }
.rp-step.active .rp-step-dot { border-color:var(--rp-primary); background:var(--rp-primary); color:var(--rp-c-white); }
.rp-step.done .rp-step-dot { border-color:var(--rp-success); background:var(--rp-success); color:var(--rp-c-white); }
.rp-step-sep { width:28px; height:1px; background:var(--rp-border); }
breadcrumb-el, breadcrumb-el { display:inline-flex; align-items:center; gap:6px; color:var(--rp-c-gray-500); font-size:13px; }
.breadcrumb-el-current { color:var(--rp-c-gray-900); font-weight:650; }
avatar-group, avatar-group { display:inline-flex; align-items:center; width:fit-content; }
avatar-group > avatar-el, avatar-group > avatar-el { margin-left:-10px; border:2px solid var(--rp-c-white); border-radius:50%; background:var(--rp-c-white); position:relative; }
avatar-group > avatar-el:first-child { margin-left:0; }
.rp-avatar-overflow { display:inline-grid; place-items:center; width:var(--snap-size,32px); height:var(--snap-size,32px); margin-left:-10px; border:2px solid var(--rp-c-white); border-radius:50%; background:var(--rp-c-gray-100); color:var(--rp-c-gray-500); font-size:11px; font-weight:700; }

/* --- navigation & layout additions --- */
segmented-el, segmented-el { display:inline-flex; width:fit-content; padding:2px; border-radius:8px; background:var(--rp-c-gray-100); gap:2px; }
.rp-seg-item { padding:5px 14px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-500); }
.rp-seg-item.active { background:var(--rp-c-white); color:var(--rp-c-gray-900); font-weight:650;  }
command-palette, command-palette { display:block; width:520px; border:1px solid var(--rp-border); border-radius:12px; background:var(--rp-c-white); overflow:hidden; }
.rp-cmdk-input { display:flex; align-items:center; gap:10px; padding:14px 16px; border-bottom:1px solid var(--rp-border); }
.rp-cmdk-list { padding:6px; }
.rp-cmdk-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:8px; font-size:13px; color:var(--rp-c-gray-700); }
.rp-cmdk-item.active { background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); }
context-menu, context-menu, menu-el, menu-el { display:inline-flex; flex-direction:column; min-width:180px; padding:5px; border:1px solid var(--rp-border); border-radius:10px; background:var(--rp-c-white); }
.menu-item, menu-item, menu-item { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-700); }
.menu-item.danger, menu-item.danger, menu-item.danger { color:var(--rp-danger); }
.menu-item.disabled, menu-item.disabled, menu-item.disabled { opacity:.45; }
.menu-el-label { flex:1; }
.menu-el-shortcut { color:var(--rp-c-gray-400); font-size:12px; }
toc-el, toc-el { display:flex; flex-direction:column; gap:2px; width:fit-content; min-width:160px; border-left:2px solid var(--rp-border); }
.toc-el-item { padding:4px 12px; font-size:13px; color:var(--rp-c-gray-500); border-left:2px solid transparent; margin-left:-2px; }
.toc-el-item.active { color:var(--rp-primary); border-left-color:var(--rp-primary); font-weight:650; }
kbd-el, kbd-el { display:inline-flex; align-items:center; gap:3px; }
.kbd-el-key { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 5px; border:1px solid var(--rp-border-strong); border-bottom-width:2px; border-radius:5px; background:var(--rp-c-gray-50); font-size:11px; font-family:var(--rp-font); color:var(--rp-c-gray-700); }
.kbd-el-plus { color:var(--rp-c-gray-400); font-size:11px; }

/* menubar */
menubar-el, menubar-el { display:flex; align-items:center; gap:2px; width:fit-content; padding:4px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-white); }
.rp-menubar-item, menubar-item { display:flex; align-items:center; gap:4px; padding:6px 12px; border-radius:6px; font-size:13px; color:var(--rp-c-gray-700); }
.rp-menubar-label { font-weight:500; }

/* nav-menu */
nav-menu, nav-menu { display:flex; align-items:center; gap:0; width:fit-content; border-bottom:1px solid var(--rp-border); }
.rp-navmenu-item, nav-menu-item { display:flex; align-items:center; padding:9px 16px; border-bottom:2px solid transparent; font-size:14px; color:var(--rp-c-gray-500); }
.rp-navmenu-label.active { color:var(--rp-primary); border-bottom-color:var(--rp-primary); font-weight:650; }

/* header-notification — top banner message bar */
header-notification, header-notification { display:flex; align-items:center; gap:10px; width:100%; padding:10px 16px; background:var(--rp-c-blue-50); border-bottom:1px solid var(--rp-c-blue-200); color:var(--rp-c-blue-900); font-size:13px; }
header-notification[type="success"], header-notification[type="success"] { background:var(--rp-c-green-50); border-color:var(--rp-c-green-200); color:var(--rp-c-green-900); }
header-notification[type="warning"], header-notification[type="warning"] { background:var(--rp-c-amber-50); border-color:var(--rp-c-amber-200); color:var(--rp-c-amber-900); }
header-notification[type="error"], header-notification[type="error"] { background:var(--rp-c-red-50); border-color:var(--rp-c-red-200); color:var(--rp-c-red-900); }
.rp-hn-icon { flex:0 0 auto; display:grid; place-items:center; }
.rp-hn-body { flex:1; min-width:0; }
.rp-hn-title { font-weight:650; }
.rp-hn-desc { color:inherit; opacity:.7; font-size:12px; margin-top:1px; }
.rp-hn-action { flex:0 0 auto; font-weight:650; text-decoration:underline; cursor:default; }
.rp-hn-close { flex:0 0 auto; display:grid; place-items:center; color:currentColor; opacity:.5; }
`;

export class BadgeElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    const count = attr(this, "count", "0");
    const max = intAttr(this, "max", 99);
    const n = Number(count);
    this.textContent = Number.isFinite(n) && n > max ? `${max}+` : count;
  }
}
export class AvatarElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    const size = attr(this, "size", "32");
    this.style.setProperty("--snap-size", `${size}px`);
    if (!this.textContent?.trim())
      this.textContent = attr(this, "initials", "U");
  }
}
export class ListElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady || this.children.length) return;
    this.dataset.rpReady = "true";
    const items = intAttr(this, "items", 3);
    const state = attr(this, "state");
    this.innerHTML = Array.from(
      { length: items },
      (_, i) =>
        `<list-item label="${["全部", "未读", "@ 我", "已归档", "设置"][i] || `Item ${i + 1}`}" icon="${["inbox", "message-square", "at-sign", "archive", "settings"][i] || "file"}"${state === "first-selected" && i === 0 ? ' state="selected"' : ""}></list-item>`,
    ).join("");
  }
}
export class ListItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", this.textContent?.trim() || "Item");
    const badge = attr(this, "badge");
    const ic = attr(this, "icon");
    this.innerHTML = `${ic ? icon(ic) : ""}<span class="list-el-label">${escapeHtml(label)}</span>${badge ? `<span class="list-el-badge">${escapeHtml(badge)}</span>` : ""}`;
  }
}
export class TabsElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    const active = attr(this, "active", "0");
    const numeric = Number(active);
    const children = Array.from(this.children) as HTMLElement[];
    children.forEach((child, i) => {
      const label =
        child.getAttribute("label") || child.textContent?.trim() || "";
      const isActive = Number.isFinite(numeric)
        ? i === numeric
        : label === active;
      child.classList.toggle("tab-el-active", isActive);
    });
  }
}
export class TabElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", this.textContent?.trim() || "Tab");
    const badge = attr(this, "badge");
    this.innerHTML = `<span>${escapeHtml(label)}</span>${badge ? `<span class="list-el-badge">${escapeHtml(badge)}</span>` : ""}`;
  }
}
export class PaginationElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const total = intAttr(this, "total", 10);
    const current = intAttr(this, "current", 1);
    const pageSize = intAttr(this, "page-size", 10);
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const visible = Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1);
    this.innerHTML = `<span class="page-el-btn">${icon("chevron-left", 14)}</span>${visible.map((p) => `<span class="page-el-btn${p === current ? " active" : ""}">${p}</span>`).join("")}<span class="page-el-btn">${icon("chevron-right", 14)}</span><span>共 ${total} 条</span>`;
  }
}
export class StepsElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const steps = csv(this, "steps", "步骤一,步骤二,步骤三");
    const active = intAttr(this, "active", 0);
    this.innerHTML = steps
      .map(
        (s, i) =>
          `<span class="rp-step ${i < active ? "done" : i === active ? "active" : ""}"><span class="rp-step-dot">${i < active ? icon("check", 12) : i + 1}</span>${escapeHtml(s)}</span>${i < steps.length - 1 ? '<span class="rp-step-sep"></span>' : ""}`,
      )
      .join("");
  }
}
export class BreadcrumbElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const items = csv(this, "items", "首页,当前页");
    this.innerHTML = items
      .map(
        (item, i) =>
          `<span class="${i === items.length - 1 ? "breadcrumb-el-current" : ""}">${escapeHtml(item)}</span>${i < items.length - 1 ? "<span>/</span>" : ""}`,
      )
      .join("");
  }
}

export class SegmentedElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const options = csv(this, "options", "日,周,月");
    const active = attr(this, "active", "0");
    const idx = Number(active);
    this.innerHTML = options
      .map(
        (o, i) =>
          `<span class="rp-seg-item${(Number.isFinite(idx) ? i === idx : o === active) ? " active" : ""}">${escapeHtml(o)}</span>`,
      )
      .join("");
  }
}
export class CommandPaletteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const query = attr(this, "query");
    const results = csv(this, "results", "新建文件,打开设置,搜索工单,切换主题");
    this.innerHTML = `<div class="rp-cmdk-input">${icon("search")}<span class="${query ? "rp-value" : "rp-placeholder"}">${escapeHtml(query || "输入命令…")}</span></div><div class="rp-cmdk-list">${results.map((r, i) => `<div class="rp-cmdk-item${i === 0 ? " active" : ""}">${icon("zap", 14)}<span>${escapeHtml(r)}</span></div>`).join("")}</div>`;
  }
}
export class ContextMenuElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady || this.children.length) return;
    this.dataset.rpReady = "true";
    const items = csv(this, "items", "复制,重命名,移动到,删除");
    this.innerHTML = items
      .map(
        (it) =>
          `<div class="menu-item${it === "删除" ? " danger" : ""}"><span>${escapeHtml(it)}</span></div>`,
      )
      .join("");
  }
}
export class MenuElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}
export class MenuItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const label = attr(this, "label", this.textContent?.trim() || "菜单项");
    const ic = attr(this, "icon");
    const shortcut = attr(this, "shortcut");
    const disabled = attr(this, "state") === "disabled";
    this.innerHTML = `${ic ? icon(ic, 14) : ""}<span class="menu-el-label">${escapeHtml(label)}</span>${shortcut ? `<span class="menu-el-shortcut">${escapeHtml(shortcut)}</span>` : ""}`;
    if (disabled) this.classList.add("disabled");
  }
}
export class TocElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady || this.children.length) return;
    this.dataset.rpReady = "true";
    const items = csv(this, "items", "概述,安装,用法,API,常见问题");
    this.innerHTML = items
      .map(
        (it, i) =>
          `<span class="toc-el-item${i === 0 ? " active" : ""}">${escapeHtml(it)}</span>`,
      )
      .join("");
  }
}
export class KbdElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const keys = csv(this, "keys", "⌘,K");
    this.innerHTML = keys
      .map((k) => `<kbd class="kbd-el-key">${escapeHtml(k)}</kbd>`)
      .join('<span class="kbd-el-plus">+</span>');
  }
}

/** `<anchor to="other.rpml" section="3" label="...">` — cross-page navigation
 *  between prototype pages. Inside a gallery (playground / compiled / serve) it
 *  dispatches a cancelable `rp-anchor` event that the gallery resolves to a
 *  hash route (with optional `?section=` deep-link). With no gallery present
 *  (standalone `?rpml=` viewer) it falls back to a `?rpml=&section=` reload, so
 *  a single embedded page still navigates. */
export class AnchorElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const to = attr(this, "to");
    const section = attr(this, "section");
    const label = attr(this, "label", this.textContent?.trim() || to || "跳转");
    const ic = attr(this, "icon", "arrow-right");
    this.innerHTML = `${ic ? icon(ic, 14) : ""}<span class="anchor-el-label">${escapeHtml(label)}</span>`;
    this.addEventListener("click", () => {
      if (!to) return;
      const ev = new CustomEvent("rp-anchor", {
        detail: { to, section, from: this },
        bubbles: true,
        composed: true,
        cancelable: true,
      });
      this.dispatchEvent(ev);
      if (ev.defaultPrevented) return; // a gallery handled the route
      // Standalone fallback: reload the single-page viewer with the new doc.
      const url = new URL(location.href);
      url.searchParams.set("rpml", to);
      if (section) url.searchParams.set("section", section);
      else url.searchParams.delete("section");
      location.href = url.toString();
    });
  }
}

export class HeaderNotificationElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const type = attr(this, "type", "info");
    const title = attr(this, "title", "系统通知");
    const message = attr(this, "message", "");
    const action = attr(this, "action", "");
    const closable = this.hasAttribute("closable");
    const ic =
      type === "error"
        ? "circle-alert"
        : type === "warning"
          ? "triangle-alert"
          : type === "success"
            ? "circle-check"
            : "info";
    this.innerHTML = `<span class="rp-hn-icon">${icon(ic, 16)}</span><div class="rp-hn-body"><span class="rp-hn-title">${escapeHtml(title)}</span>${message ? `<div class="rp-hn-desc">${escapeHtml(message)}</div>` : ""}</div>${action ? `<span class="rp-hn-action">${escapeHtml(action)}</span>` : ""}${closable ? `<span class="rp-hn-close">${icon("x", 14)}</span>` : ""}`;
  }
}
