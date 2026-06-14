import { useEffect, useRef } from 'react';
import { createDocRenderer, registerAll, ModeManager } from '@21stware/rpui';
import type { DocRenderer, RpuiMode, RpuiTheme, PickInfo, ModeManagerOpts } from '@21stware/rpui';

export type { RpuiMode, RpuiTheme, PickInfo };

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
}

let _registered = false;

export function RpmlRenderer({
  rpml, debounce = 0, mode = 'view', theme, selected, onPick,
  className, style, onError,
}: RpmlRendererProps) {
  const hostRef   = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<DocRenderer | null>(null);
  const managerRef  = useRef<ModeManager | null>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep callbacks stable without recreating managers
  const onErrorRef = useRef(onError);
  const onPickRef  = useRef(onPick);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);
  useEffect(() => { onPickRef.current  = onPick;  }, [onPick]);

  // Mount: create renderer + mode manager
  useEffect(() => {
    if (!_registered) { registerAll(); _registered = true; }
    const renderer = createDocRenderer(hostRef.current!, {
      onError: (msg) => onErrorRef.current?.(msg),
      annotateLines: true, // always annotate for potential pick use
    });
    const opts: ModeManagerOpts = {
      mode,
      theme,
      selected,
      onPick: (info) => onPickRef.current?.(info),
    };
    const manager = new ModeManager(hostRef.current!, opts);
    rendererRef.current = renderer;
    managerRef.current  = manager;
    return () => {
      renderer.destroy();
      manager.destroy();
      rendererRef.current = null;
      managerRef.current  = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync mode
  useEffect(() => { managerRef.current?.setMode(mode); }, [mode]);

  // Sync theme
  useEffect(() => { if (theme) managerRef.current?.setTheme(theme); }, [theme]);

  // Render + re-apply selected after DOM is rebuilt
  useEffect(() => {
    const renderer = rendererRef.current;
    const manager  = managerRef.current;
    if (!renderer) return;
    const run = () => {
      renderer.render(rpml);
      if (selected?.length) manager?.setSelected(selected);
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

  return <div ref={hostRef} className={className} style={style} />;
}
