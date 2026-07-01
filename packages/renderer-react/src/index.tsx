import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  createDocRenderer,
  registerAll,
  ModeManager,
  CanvasController,
} from "@21stware/rpui";
import type {
  DocRenderer,
  RpuiMode,
  RpuiTheme,
  PickInfo,
  ModeManagerOpts,
  CanvasControllerOpts,
} from "@21stware/rpui";

export type { RpuiMode, RpuiTheme, PickInfo, CanvasControllerOpts };
export { CanvasController };

export interface RpmlRendererProps {
  /** RPML source text. Updates trigger incremental re-render with scroll preserved. */
  rpml: string;
  /** Debounce delay in ms before re-rendering (recommended for live editors). Default: 0. */
  debounce?: number;
  /**
   * Rendering mode (default: "view"):
   * - "view"  — scrollable panes, pins and navigation active.
   * - "edit"  — full-height flat layout, no scroll, no interactions.
   * - "pick"  — flat layout, mouse hover/click highlights elements for selection.
   */
  mode?: RpuiMode;
  /** Override CSS color tokens for theming. */
  theme?: RpuiTheme;
  /**
   * CSS selectors of elements to mark as programmatically selected in pick mode.
   * Re-applied after every render.
   */
  selected?: string[];
  /** Called when user clicks an element in pick mode. */
  onPick?: (info: PickInfo) => void;
  className?: string;
  style?: React.CSSProperties;
  /** Called with an error message on parse failure, null on recovery. */
  onError?: (msg: string | null) => void;
  /** Called when an `<anchor>` link is clicked; prevents default URL navigation.
   *  Receive the target document path and optional section id. */
  onLinkNavigate?: (to: string, section?: string) => void;
  /** Called when an element is selected in pick mode. Return a React node to
   *  render it as a portal inside the selected element (e.g. an overlay or
   *  inspector panel). Return null/undefined to render nothing. */
  onElementSelectRender?: (info: PickInfo) => React.ReactNode;
  /** Options for the CanvasController (zoom/pan/fit). When provided, the host
   *  element is wrapped in a canvas structure and the controller is exposed via
   *  `canvasControllerRef`. */
  canvasOpts?: CanvasControllerOpts;
  /** Ref to access the CanvasController instance programmatically. */
  canvasControllerRef?: React.MutableRefObject<CanvasController | null>;
}

let _registered = false;

export function RpmlRenderer({
  rpml,
  debounce = 0,
  mode = "view",
  theme,
  selected,
  onPick,
  className,
  style,
  onError,
  onLinkNavigate,
  onElementSelectRender,
  canvasOpts,
  canvasControllerRef,
}: RpmlRendererProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<DocRenderer | null>(null);
  const managerRef = useRef<ModeManager | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep callbacks stable without recreating managers
  const onErrorRef = useRef(onError);
  const onPickRef = useRef(onPick);
  const onLinkNavigateRef = useRef(onLinkNavigate);
  const onElementSelectRenderRef = useRef(onElementSelectRender);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);
  useEffect(() => {
    onLinkNavigateRef.current = onLinkNavigate;
  }, [onLinkNavigate]);
  useEffect(() => {
    onElementSelectRenderRef.current = onElementSelectRender;
  }, [onElementSelectRender]);

  const [selectPortal, setSelectPortal] = useState<{
    target: Element;
    info: PickInfo;
  } | null>(null);

  // Mount: create renderer + mode manager
  useEffect(() => {
    if (!_registered) {
      registerAll();
      _registered = true;
    }
    const renderer = createDocRenderer(hostRef.current!, {
      onError: (msg) => onErrorRef.current?.(msg),
      annotateLines: true, // always annotate for potential pick use
    });
    const opts: ModeManagerOpts = {
      mode,
      theme,
      selected,
      onPick: (info) => {
        onPickRef.current?.(info);
        if (onElementSelectRenderRef.current) {
          setSelectPortal(
            info.element.hasAttribute("data-rp-selected")
              ? { target: info.element, info }
              : null,
          );
        }
      },
      onNavigate: (to, section) => onLinkNavigateRef.current?.(to, section),
    };
    const manager = new ModeManager(hostRef.current!, opts);
    rendererRef.current = renderer;
    managerRef.current = manager;

    // Create CanvasController if opts provided
    let canvasCtl: CanvasController | null = null;
    if (canvasOpts && hostRef.current) {
      canvasCtl = new CanvasController(hostRef.current, canvasOpts);
      canvasControllerRef && (canvasControllerRef.current = canvasCtl);
    }

    return () => {
      canvasCtl?.destroy();
      canvasControllerRef && (canvasControllerRef.current = null);
      renderer.destroy();
      manager.destroy();
      rendererRef.current = null;
      managerRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync mode: also update canvas pan enabled
  useEffect(() => {
    managerRef.current?.setMode(mode);
    if (canvasControllerRef?.current) {
      canvasControllerRef.current.setPanEnabled(mode !== "pick");
    }
  }, [mode]);

  // Sync theme
  useEffect(() => {
    if (theme) managerRef.current?.setTheme(theme);
  }, [theme]);

  // Render + re-apply selected after DOM is rebuilt
  useEffect(() => {
    const renderer = rendererRef.current;
    const manager = managerRef.current;
    if (!renderer) return;
    const run = () => {
      setSelectPortal(null);
      renderer.render(rpml);
      if (selected?.length) manager?.setSelected(selected);
      if (canvasControllerRef?.current) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => canvasControllerRef.current?.reset()),
        );
      }
    };
    if (debounce > 0) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(run, debounce);
      return () => clearTimeout(timerRef.current);
    }
    run();
  }, [rpml, debounce]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync selected independently (when rpml hasn't changed but selection has)
  useEffect(() => {
    managerRef.current?.setSelected(selected ?? []);
  }, [selected]);

  return (
    <>
      <div
        ref={hostRef}
        className={`rpui-scope${className ? " " + className : ""}`}
        style={style}
      />
      {selectPortal &&
        onElementSelectRender &&
        createPortal(
          onElementSelectRender(selectPortal.info),
          selectPortal.target,
        )}
    </>
  );
}
