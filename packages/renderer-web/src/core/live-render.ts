import { parseToPage } from 'rpml-parser';

export interface LiveRenderOpts {
  /** Scroll container to preserve. Defaults to document.scrollingElement. */
  scroller?: Element | null;
  /** Preserve scroll across re-render (default true). Pass false when switching docs. */
  preserve?: boolean;
  onError?: (msg: string | null) => void;
  /** Inject data-rp-line attributes for pick-mode source tracing. */
  annotateLines?: boolean;
}

/** Stateful single-document renderer — tracks initialization and exposes destroy(). */
export interface DocRenderer {
  render(source: string): void;
  destroy(): void;
}

export function createDocRenderer(
  host: HTMLElement,
  opts: Pick<LiveRenderOpts, 'scroller' | 'onError' | 'annotateLines'> = {}
): DocRenderer {
  let initialized = false;
  return {
    render(source) {
      liveRender(host, source, { ...opts, preserve: initialized });
      initialized = true;
    },
    destroy() { host.replaceChildren(); initialized = false; }
  };
}

/** Parse + mount RPML into `host`, preserving scroll position by default. */
export function liveRender(host: HTMLElement, source: string, opts: LiveRenderOpts = {}): void {
  const { scroller, preserve = true, onError } = opts;
  const sc = (scroller ?? document.scrollingElement ?? document.documentElement) as Element;
  const pane = preserve ? host.querySelector('.annotation-el-pane') : null;
  const pos = preserve
    ? { x: sc.scrollLeft, y: sc.scrollTop, px: pane?.scrollLeft ?? 0, py: pane?.scrollTop ?? 0 }
    : null;
  try {
    host.replaceChildren(parseToPage(source, { annotateLines: opts.annotateLines }));
    onError?.(null);
  } catch (e) {
    onError?.((e as Error).message ?? String(e));
    return;
  }
  if (pos) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      sc.scrollLeft = pos.x; sc.scrollTop = pos.y;
      const newPane = host.querySelector('.annotation-el-pane');
      if (newPane) { newPane.scrollLeft = pos.px; newPane.scrollTop = pos.py; }
    }));
  }
}
