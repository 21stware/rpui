import { injectStyle } from "../core/style";
import { attr, escapeHtml } from "../core/dom";

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
