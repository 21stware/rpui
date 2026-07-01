/**
 * Programmatic zoom/pan controller for an infinite-canvas preview.
 *
 * Wraps a host element (the rendered RPUI content) inside a viewport/canvas
 * structure and exposes imperative methods for zoom, pan, fit, and focus.
 * No UI controls are rendered — callers drive everything programmatically.
 */

export interface CanvasControllerOpts {
  /** Padding (px) around content when fitting. Default: 48 */
  fitPadding?: number;
  /** Left padding (px) when fitting. Default: 32 */
  leftPadding?: number;
  /** Maximum scale when fitting. Default: 2 */
  maxFitScale?: number;
  /** Minimum zoom scale. Default: 0.1 */
  minZoom?: number;
  /** Maximum zoom scale. Default: 4 */
  maxZoom?: number;
  /** Selector for the element to fit (e.g. ".page-el-main"). Default: null (use host) */
  fitSelector?: string | null;
}

export class CanvasController {
  private canvas: HTMLElement;
  private viewport: HTMLElement;
  private host: HTMLElement;
  private scale = 1;
  private _panX = 0;
  private _panY = 0;
  private opts: Required<CanvasControllerOpts>;
  private ro: ResizeObserver | null = null;
  private wheelHandler: ((e: WheelEvent) => void) | null = null;
  private pointerDownHandler: ((e: PointerEvent) => void) | null = null;
  private pointerMoveHandler: ((e: PointerEvent) => void) | null = null;
  private pointerUpHandler: ((e: PointerEvent) => void) | null = null;
  private panning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOrigX = 0;
  private panOrigY = 0;
  private panEnabled = true;
  private spacePressed = false;
  private keyDownHandler: ((e: KeyboardEvent) => void) | null = null;
  private keyUpHandler: ((e: KeyboardEvent) => void) | null = null;
  private pinClickHandler: ((e: PointerEvent) => void) | null = null;

  /**
   * @param host The element containing rendered RPUI content (e.g. a div with <page-el>)
   * @param opts Configuration options
   */
  constructor(host: HTMLElement, opts: CanvasControllerOpts = {}) {
    this.host = host;
    this.opts = {
      fitPadding: opts.fitPadding ?? 48,
      leftPadding: opts.leftPadding ?? 32,
      maxFitScale: opts.maxFitScale ?? 2,
      minZoom: opts.minZoom ?? 0.1,
      maxZoom: opts.maxZoom ?? 4,
      fitSelector: opts.fitSelector ?? null,
    };

    // Build canvas > viewport > host structure
    this.canvas = document.createElement("div");
    this.canvas.style.cssText =
      "flex:1;min-height:0;position:relative;overflow:hidden;cursor:grab;user-select:none;background:#fff;border-radius:12px;";

    this.viewport = document.createElement("div");
    this.viewport.style.cssText =
      "position:absolute;top:50%;left:50%;transform-origin:center center;background:#fff;";

    // Move host's parent to canvas, viewport wraps host
    const parent = host.parentElement;
    if (parent) {
      parent.insertBefore(this.canvas, host);
      parent.removeChild(host);
    }
    this.viewport.appendChild(host);
    this.canvas.appendChild(this.viewport);

    this.applyTransform();
    this.attachListeners();
  }

  private applyTransform() {
    this.viewport.style.transform = `translate(-50%, -50%) translate(${this._panX}px, ${this._panY}px) scale(${this.scale})`;
  }

  /** Current zoom scale (0.1 – 4). */
  get zoom(): number {
    return this.scale;
  }

  /** Current pan X offset in screen pixels. */
  get panX(): number {
    return this._panX;
  }

  /** Current pan Y offset in screen pixels. */
  get panY(): number {
    return this._panY;
  }

  /** Enable/disable drag-to-pan (disable in pick mode). */
  setPanEnabled(enabled: boolean) {
    this.panEnabled = enabled;
    if (!enabled) {
      this.canvas.style.cursor = "crosshair";
    } else {
      this.canvas.style.cursor = "grab";
    }
  }

  /** The canvas DOM element (for attaching overlay UI if needed). */
  get canvasEl(): HTMLElement {
    return this.canvas;
  }

  /** The viewport DOM element. */
  get viewportEl(): HTMLElement {
    return this.viewport;
  }

  private attachListeners() {
    this.wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const delta = -e.deltaY * 0.01;
        this.setZoom(this.scale * (1 + delta), e.clientX, e.clientY);
      } else {
        this._panX -= e.deltaX;
        this._panY -= e.deltaY;
        this.applyTransform();
      }
    };
    this.canvas.addEventListener("wheel", this.wheelHandler, {
      passive: false,
    });

    this.pointerDownHandler = (e: PointerEvent) => {
      // Cmd/Ctrl+click on pin: don't start pan, let pin handler work
      if (
        (e.metaKey || e.ctrlKey) &&
        e.target instanceof Element &&
        e.target.closest(".rp-pin")
      )
        return;
      // Space+drag always pans, even when pan is disabled (pick mode)
      if (!this.panEnabled && !this.spacePressed) return;
      this.panning = true;
      this.panStartX = e.clientX;
      this.panStartY = e.clientY;
      this.panOrigX = this._panX;
      this.panOrigY = this._panY;
      this.canvas.classList.add("panning");
      this.canvas.style.cursor = "grabbing";
      this.canvas.setPointerCapture(e.pointerId);
    };
    this.pointerMoveHandler = (e: PointerEvent) => {
      if (!this.panning) return;
      this._panX = this.panOrigX + (e.clientX - this.panStartX);
      this._panY = this.panOrigY + (e.clientY - this.panStartY);
      this.applyTransform();
    };
    this.pointerUpHandler = (e: PointerEvent) => {
      this.panning = false;
      this.canvas.classList.remove("panning");
      this.canvas.style.cursor = this.panEnabled ? "grab" : "crosshair";
      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };
    this.canvas.addEventListener("pointerdown", this.pointerDownHandler);
    this.canvas.addEventListener("pointermove", this.pointerMoveHandler);
    this.canvas.addEventListener("pointerup", this.pointerUpHandler);

    // Space+drag pan support
    this.keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === "Space" && !this.spacePressed) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        this.spacePressed = true;
        this.canvas.style.cursor = "grab";
        e.preventDefault();
      }
    };
    this.keyUpHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        this.spacePressed = false;
        this.canvas.style.cursor = this.panEnabled ? "grab" : "crosshair";
      }
    };
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);

    // Cmd/Ctrl+click on pins: pan to and highlight the corresponding annotation
    this.pinClickHandler = (e: PointerEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const pin =
        e.target instanceof Element ? e.target.closest(".rp-pin") : null;
      if (!pin) return;
      e.preventDefault();
      e.stopPropagation();
      const sectionId = pin.textContent?.trim();
      if (!sectionId) return;
      const target = this.host.querySelector(
        `[data-rp-section="${CSS.escape(sectionId)}"]`,
      );
      if (target) this.focusAnnotation(target);
    };
    this.host.addEventListener("pointerdown", this.pinClickHandler, true);
  }

  /** Set zoom scale, optionally anchored to a screen point. */
  setZoom(s: number, cx?: number, cy?: number) {
    const prev = this.scale;
    const next = Math.max(this.opts.minZoom, Math.min(this.opts.maxZoom, s));
    if (cx !== undefined && cy !== undefined) {
      const rect = this.canvas.getBoundingClientRect();
      const px = cx - rect.left - rect.width / 2;
      const py = cy - rect.top - rect.height / 2;
      this._panX = px - (px - this._panX) * (next / prev);
      this._panY = py - (py - this._panY) * (next / prev);
    }
    this.scale = next;
    this.applyTransform();
  }

  /** Zoom in by a factor (default 1.2). */
  zoomIn(factor = 1.2) {
    this.setZoom(this.scale * factor);
  }

  /** Zoom out by a factor (default 1.2). */
  zoomOut(factor = 1.2) {
    this.setZoom(this.scale / factor);
  }

  /** Fit the content (or fitSelector element) into the canvas view. */
  fit() {
    const canvasRect = this.canvas.getBoundingClientRect();
    const fitEl = this.opts.fitSelector
      ? this.host.querySelector<HTMLElement>(this.opts.fitSelector)
      : this.host;
    if (!fitEl) return;
    const rw = fitEl.offsetWidth;
    const rh = fitEl.offsetHeight;
    if (rw === 0 || rh === 0) return;

    const pad = this.opts.fitPadding;
    const sx = (canvasRect.width - pad) / rw;
    const sy = (canvasRect.height - pad) / rh;
    const newScale = Math.min(sx, sy, this.opts.maxFitScale);

    // Reset to measure natural offset
    this.scale = 1;
    this._panX = 0;
    this._panY = 0;
    this.applyTransform();

    const renderRect = this.host.getBoundingClientRect();
    const fitRect = fitEl.getBoundingClientRect();
    // Offset of fit element center from host center, in unscaled coords
    const dx =
      fitRect.left +
      fitRect.width / 2 -
      (renderRect.left + renderRect.width / 2);
    const dy =
      fitRect.top +
      fitRect.height / 2 -
      (renderRect.top + renderRect.height / 2);

    this.scale = newScale;
    // With transform-origin:center: panX = -s*dx (center), or left-aligned:
    // For left alignment: panX = canvasLeft + leftPadding - canvasCenter - s*leftOffset
    const leftOffset = fitRect.left - (renderRect.left + renderRect.width / 2);
    const canvasLeft = canvasRect.left;
    const canvasCx = canvasRect.left + canvasRect.width / 2;
    this._panX =
      canvasLeft + this.opts.leftPadding - canvasCx - this.scale * leftOffset;
    this._panY = -this.scale * dy;
    this.applyTransform();
  }

  /** Reset zoom and pan to defaults (scale=1, pan=0). */
  reset() {
    this.scale = 1;
    this._panX = 0;
    this._panY = 0;
    this.applyTransform();
  }

  /** Pan the canvas to center a specific element in the view. */
  panToElement(el: Element) {
    const canvasRect = this.canvas.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const elCx = elRect.left + elRect.width / 2;
    const elCy = elRect.top + elRect.height / 2;
    const canvasCx = canvasRect.left + canvasRect.width / 2;
    const canvasCy = canvasRect.top + canvasRect.height / 2;
    this._panX += canvasCx - elCx;
    this._panY += canvasCy - elCy;
    this.applyTransform();
  }

  /** Highlight an annotation block and pan to its title. */
  focusAnnotation(el: Element) {
    this.host
      .querySelectorAll(".rp-section-focus")
      .forEach((n) => n.classList.remove("rp-section-focus"));
    (el as HTMLElement).classList.add("rp-section-focus");
    setTimeout(
      () => (el as HTMLElement).classList.remove("rp-section-focus"),
      3000,
    );
    const head = el.querySelector(".annotation-el-head") || el;
    this.panToElement(head);
  }

  /** Destroy the controller, remove listeners and restore DOM. */
  destroy() {
    if (this.wheelHandler)
      this.canvas.removeEventListener("wheel", this.wheelHandler);
    if (this.pointerDownHandler)
      this.canvas.removeEventListener("pointerdown", this.pointerDownHandler);
    if (this.pointerMoveHandler)
      this.canvas.removeEventListener("pointermove", this.pointerMoveHandler);
    if (this.pointerUpHandler)
      this.canvas.removeEventListener("pointerup", this.pointerUpHandler);
    if (this.keyDownHandler)
      window.removeEventListener("keydown", this.keyDownHandler);
    if (this.keyUpHandler)
      window.removeEventListener("keyup", this.keyUpHandler);
    if (this.pinClickHandler)
      this.host.removeEventListener("pointerdown", this.pinClickHandler, true);
    this.ro?.disconnect();

    // Restore host to original parent
    const parent = this.canvas.parentElement;
    if (parent) {
      parent.insertBefore(this.host, this.canvas);
      parent.removeChild(this.canvas);
    }
  }
}
