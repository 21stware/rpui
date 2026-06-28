import { injectStyle } from "../core/style";
import { attr, escapeHtml } from "../core/dom";

// annotation + enum: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const annotationStyle = `
.annotation-el-pane { min-width:380px; max-width:680px; position:sticky; top:32px; height:auto; min-height:calc(100vh - 64px); max-height:calc(100vh - 64px); overflow-y:auto; overflow-x:auto; padding:0 0 48px 0; align-self:start; }
.annotation-el-pane-inner { padding:4px 12px 24px 6px; }
annotation-el, annotation-el { display:block; width:fit-content; max-width:980px; margin:30px 0; line-height:2; color:var(--rp-text); font-size:13.5px; }
annotation-el annotation-el, annotation-el annotation-el, annotation-el annotation-el, annotation-el annotation-el { margin:10px 0 8px 22px; }
.annotation-el-head { display:flex; align-items:center; gap:8px; margin:0 0 4px; width:fit-content; }
.annotation-el-title { font-weight:700; color:var(--rp-text); font-size:15px }
.annotation-el-marker { display:inline-grid; place-items:center; flex:0 0 auto; color:var(--rp-c-white); font-size:10px; font-weight:700; line-height:1; }
.annotation-el-marker.circle { width:22px; height:22px; background:var(--rp-primary); border-radius:50%; }
.annotation-el-marker.circle.pin-l2 { background:var(--rp-c-amber-500); }
.annotation-el-marker.circle.pin-l3 { background:var(--rp-c-emerald-500); }
.annotation-el-marker.circle.pin-l4 { background:var(--rp-c-violet-500); }
.annotation-el-marker.circle.pin-l5 { background:var(--rp-c-pink-500); }

.annotation-el-marker.triangle { width:18px; height:16px; background:var(--rp-success); clip-path:polygon(50% 0, 100% 100%, 0 100%); }
.annotation-el-marker.triangle > span { transform:translateY(2px); font-size:9px; }
.annotation-el-marker.global { width:20px; height:20px; background:var(--rp-c-slate-900); border-radius:6px; font-size:11px; }
annotation-global-el, annotation-global-el { display:block; width:fit-content; max-width:980px; margin:0 0 18px; padding:10px 12px 12px; line-height:1.65; color:var(--rp-c-gray-800); font-size:14px; background:var(--rp-surface-soft); border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); }
.annotation-el-pane annotation-global-el, .annotation-el-pane annotation-global-el { max-width:none; }
.annotation-el-pane annotation-global-el .annotation-el-body { max-width:none; }
.annotation-el-body { display:block; position:relative; width:fit-content; max-width:920px; }
.rp-pin-slice { width:18px; height:18px; font-size:10px; box-shadow:0 1px 5px var(--rp-a-black-18); }
.annotation-el-body > :not(annotation-el):not(annotation-el):not(enum-el):not(enum-el) { max-width:820px; }
.annotation-el-pane annotation-el, .annotation-el-pane annotation-el { max-width:none; font-size:13.5px; color:var(--rp-c-gray-600); }
.annotation-el-pane .annotation-el-body { max-width:none; }
.annotation-el-pane .annotation-el-body > :not(annotation-el):not(annotation-el):not(enum-el):not(enum-el) { max-width:420px; }
.annotation-el-body p, .annotation-el-body doc-paragraph { margin:0 0 8px; }
.annotation-el-body ul, .annotation-el-body ol, .annotation-el-body doc-unordered-list, .annotation-el-body doc-ordered-list { margin:6px 0 10px; padding-left:20px; }
.annotation-el-body li, .annotation-el-body doc-list-item { margin:0 0 5px; line-height:1.55; }
.annotation-el-body li::marker, .annotation-el-body doc-list-item::marker { color:var(--rp-c-gray-400); }
.annotation-el-body strong, .annotation-el-body bold-el { color:var(--rp-c-gray-800); font-weight:680; }
.annotation-el-body em, .annotation-el-body italic-el { font-style:italic; }
.annotation-el-body code, .annotation-el-body code-inline { padding:1px 5px; border-radius:4px; background:var(--rp-c-zinc-100); color:var(--rp-primary); font-weight:650; font-family:ui-monospace,Menlo,monospace; font-size:.92em; }
enum-el, enum-el { display:flex; align-items:flex-start; flex-wrap:wrap; gap:10px; width:fit-content; margin:8px 0 12px; }
.annotation-el-pane enum-el, .annotation-el-pane enum-el { flex-wrap:wrap; }
enum-item, enum-item { display:block; flex:0 0 auto; width:fit-content; min-width:180px; max-width:600px; border:1px solid var(--rp-c-neutral-100); border-radius:var(--rp-radius-md); background:var(--rp-c-white); overflow:hidden; }
.enum-el-label { display:flex; align-items:flex-start; gap:6px; padding:5px 9px 4px; font-size:12px; font-weight:650; color:var(--rp-c-gray-700); }
.enum-el-index { display:inline-grid; place-items:center; min-width:16px; height:16px; padding:0 4px; background:var(--rp-c-gray-900); color:var(--rp-c-white); font-size:10px; font-weight:750; border-radius:3px; flex:0 0 auto; margin-top:1px; }
.enum-el-label-text { display:block; }
.enum-el-description { display:block; margin-top:2px; font-size:11px; line-height:1.35; font-weight:400; color:var(--rp-muted); }
.enum-el-content { display:block; width:fit-content; padding:8px; }
.annotation-el-title { font-weight:700; color:var(--rp-c-gray-900); cursor:pointer; font-size:15px }
.annotation-el-title:hover { color:var(--rp-primary); }
.rp-section-focus { outline:2px dashed var(--rp-primary); outline-offset:4px; border-radius:4px; }
`;

export class RpAnnotation extends HTMLElement {
  private ro?: ResizeObserver;
  private frame = 0;

  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) {
      this.setupSlicePins();
      return;
    }
    this.dataset.rpReady = "true";
    const existing = Array.from(this.childNodes);
    const depth = this.annotationDepth();
    const id = attr(this, "id");
    const label = attr(this, "label", id ? `Annotation ${id}` : "Annotation");

    // Assign section path: top-level uses id, nested uses parent-path + sibling index
    let sectionPath: string;
    if (id) {
      sectionPath = id;
    } else {
      const parentSection =
        (this.closest("[data-rp-section]") as HTMLElement | null)?.dataset
          .rpSection ?? "";
      const siblings = this.parentElement
        ? Array.from(this.parentElement.children).filter(
            (el) =>
              el.tagName.toLowerCase() === "annotation-el" ||
              el.tagName.toLowerCase() === "annotation-el",
          )
        : [];
      const idx = siblings.indexOf(this) + 1;
      sectionPath = parentSection ? `${parentSection}-${idx}` : String(idx);
    }
    this.dataset.rpSection = sectionPath;

    const marker = document.createElement("span");
    const kind = id ? "circle" : depth <= 1 ? "circle" : "triangle";
    const pinParts = id ? id.split("-") : [];
    const pinDisplay = pinParts[0] || id || sectionPath.split("-").pop() || "";
    const pinLevel = pinParts.length > 1 ? parseInt(pinParts[1], 10) || 1 : 1;
    marker.className = `annotation-el-marker ${kind}`;
    if (id && pinLevel > 1) marker.classList.add(`pin-l${pinLevel}`);
    marker.innerHTML = `<span>${escapeHtml(pinDisplay)}</span>`;

    const head = document.createElement("div");
    head.className = "annotation-el-head";
    head.append(marker);

    const title = document.createElement("span");
    title.className = "annotation-el-title";
    title.textContent = label;
    title.addEventListener("click", () => {
      const url = new URL(location.href);
      url.searchParams.set("section", sectionPath);
      history.pushState(null, "", url);
      window.dispatchEvent(
        new CustomEvent("rp-section", { detail: sectionPath }),
      );
    });
    head.append(title);

    const body = document.createElement("div");
    body.className = "annotation-el-body";
    existing.forEach((n) => body.appendChild(n));
    this.append(head, body);

    this.setupSlicePins();
  }

  disconnectedCallback() {
    this.ro?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  // A UI slice inside this annotation may carry data-pin markers on sub-regions.
  // Render pins on those slices so their numbers connect to the deeper annotations
  // that explain them — mirroring how main-view pins top-level regions.
  private setupSlicePins() {
    const body = this.querySelector<HTMLElement>(
      ":scope > .annotation-el-body",
    );
    if (!body || !body.querySelector("[data-pin]")) return;
    this.ro?.disconnect();
    this.scheduleSlicePins(body);
    this.ro = new ResizeObserver(() => this.scheduleSlicePins(body));
    this.ro.observe(this);
  }

  private scheduleSlicePins(body: HTMLElement) {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.renderSlicePins(body);
    });
  }

  private renderSlicePins(body: HTMLElement) {
    body.querySelectorAll(":scope > .rp-pin").forEach((p) => p.remove());
    const bodyRect = body.getBoundingClientRect();
    body.querySelectorAll<HTMLElement>("[data-pin]").forEach((target) => {
      // Only own data-pin elements whose nearest annotation ancestor is this one.
      if (target.closest("annotation-el, annotation-el") !== this) return;
      const pinId = target.dataset.pin;
      if (!pinId) return;
      const parts = pinId.split("-");
      const displayNum = parts[0];
      const level = parts.length > 1 ? parseInt(parts[1], 10) || 1 : 1;
      const r = target.getBoundingClientRect();
      const pin = document.createElement("span");
      pin.className = "rp-pin rp-pin-slice";
      if (level > 1) pin.classList.add(`rp-pin-l${level}`);
      pin.style.left = `${r.left - bodyRect.left}px`;
      pin.style.top = `${r.top - bodyRect.top}px`;
      pin.innerHTML = `<span>${escapeHtml(displayNum)}</span>`;
      body.appendChild(pin);
    });
  }

  annotationDepth() {
    let d = 0;
    let p = this.parentElement;
    while (p) {
      if (
        p.tagName.toLowerCase() === "annotation-el" ||
        p.tagName.toLowerCase() === "annotation-el"
      )
        d++;
      p = p.parentElement;
    }
    return d;
  }
}

export class RpEnum extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

/** `<annotation-global>` — a page-level annotation with no pin and no number.
 *  RpPage renders these at the very top of the right-side pane (the "0th"
 *  annotation), for cross-cutting notes that don't map to one snapshot region:
 *  permission matrices, glossaries, global empty/error policy, conventions. */
export class RpAnnotationGlobal extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const existing = Array.from(this.childNodes);
    const label = attr(this, "label", "全局说明");

    // Give the global a non-numeric section namespace so any nested <annotation>
    // inside it (which has no id) resolves to e.g. `global-1-1` instead of a bare
    // numeric index — otherwise it would collide with the numbered pin annotation
    // of the same index and steal its hash-navigation target.
    const globalSiblings = this.parentElement
      ? Array.from(this.parentElement.children).filter(
          (el) => el.tagName.toLowerCase() === "annotation-global-el",
        )
      : [];
    this.dataset.rpSection = `global-${globalSiblings.indexOf(this) + 1}`;

    const marker = document.createElement("span");
    marker.className = "annotation-el-marker global";
    marker.innerHTML = "<span>★</span>";

    const head = document.createElement("div");
    head.className = "annotation-el-head";
    const title = document.createElement("span");
    title.className = "annotation-el-title";
    title.textContent = label;
    head.append(marker, title);

    const body = document.createElement("div");
    body.className = "annotation-el-body";
    existing.forEach((n) => body.appendChild(n));
    this.append(head, body);
  }
}

export class RpEnumItem extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const children = Array.from(this.childNodes);

    // Compute 1-based index among same-tag siblings
    const parent = this.parentElement;
    const siblings = parent
      ? Array.from(parent.children).filter(
          (el) =>
            el.tagName.toLowerCase() === "enum-item" ||
            el.tagName.toLowerCase() === "enum-item",
        )
      : [];
    const idx = siblings.indexOf(this) + 1;

    const labelEl = document.createElement("span");
    labelEl.className = "enum-el-label";

    const idxBadge = document.createElement("span");
    idxBadge.className = "enum-el-index";
    idxBadge.textContent = String(idx);

    const labelText = document.createElement("span");
    labelText.className = "enum-el-label-text";
    labelText.textContent = attr(this, "label", "State");

    const description = attr(this, "description");
    if (description) {
      const desc = document.createElement("span");
      desc.className = "enum-el-description";
      desc.textContent = description;
      labelText.appendChild(desc);
    }

    labelEl.append(idxBadge, labelText);

    const content = document.createElement("div");
    content.className = "enum-el-content";
    children.forEach((n) => content.appendChild(n));
    this.append(labelEl, content);
  }
}
