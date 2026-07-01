import { memo, useState, useEffect, useRef, useCallback } from "react";
import {
  RpmlRenderer,
  CanvasController,
  type CanvasControllerOpts,
} from "@21stware/rpui-react";
import { type CatalogItem, formatHtml } from "../data/catalog";
import { CodeEditor } from "./CodeEditor";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  item: CatalogItem | null;
  categoryName: string;
  codeOpen: boolean;
  onCodeOpenChange: (open: boolean) => void;
}

const CANVAS_OPTS: CanvasControllerOpts = {
  fitPadding: 48,
  leftPadding: 32,
  maxFitScale: 2,
  minZoom: 0.1,
  maxZoom: 4,
};

export const EditorView = memo(function EditorView({
  item,
  categoryName,
  codeOpen,
  onCodeOpenChange,
}: Props) {
  const [editedSource, setEditedSource] = useState("");
  const [originalSource, setOriginalSource] = useState("");
  const [status, setStatus] = useState("Ready");
  const canvasRef = useRef<CanvasController | null>(null);

  useEffect(() => {
    if (item) {
      const formatted = formatHtml(item.html);
      setOriginalSource(formatted);
      setEditedSource(formatted);
      setStatus("Ready");
    }
  }, [item?.name, item?.html, categoryName]);

  const handleReset = useCallback(() => {
    setEditedSource(originalSource);
    setStatus("Reset");
  }, [originalSource]);

  const handleZoomIn = useCallback(() => canvasRef.current?.zoomIn(), []);
  const handleZoomOut = useCallback(() => canvasRef.current?.zoomOut(), []);
  const handleResetView = useCallback(() => canvasRef.current?.reset(), []);

  const handleCodeChange = useCallback((value: string) => {
    setEditedSource(value);
    setStatus("Editing...");
  }, []);

  if (!item) {
    return (
      <main className="flex min-h-0 flex-1 items-center justify-center bg-slate-50 text-[13px] text-slate-400">
        Select an item to preview
      </main>
    );
  }

  return (
    <main className="flex min-h-0 flex-1 overflow-hidden bg-slate-50 p-4 gap-3">
      {/* ── Left: header + canvas ── */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="shrink-0 border-b border-slate-100 px-6 py-4">
          <div className="mb-1 flex items-start gap-3">
            <h2 className="text-[17px] font-bold tracking-tight text-slate-900">
              {item.name}
            </h2>
            <div className="mt-0.5 flex gap-1.5">
              <Badge>{categoryName}</Badge>
              {item.subGroup && <Badge>{item.subGroup}</Badge>}
            </div>
          </div>
          {item.description && (
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              {item.description}
            </p>
          )}
          {item.attrs && item.attrs.length > 0 && (
            <div className="mt-4">
              <table className="w-full border-collapse text-[12.5px]">
                <thead>
                  <tr>
                    <th className="border-b border-slate-200 pb-2 text-left text-[10.5px] font-bold uppercase tracking-widest text-slate-400">
                      Attribute
                    </th>
                    <th className="border-b border-slate-200 pb-2 text-left text-[10.5px] font-bold uppercase tracking-widest text-slate-400">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.attrs.map(([k, v]) => (
                    <tr key={k}>
                      <td className="w-[34%] border-b border-slate-100 py-1.5 pr-4 align-top">
                        <code className="rounded-md bg-indigo-50 px-1.5 py-0.5 font-mono text-[11.5px] text-indigo-600">
                          {k}
                        </code>
                      </td>
                      <td className="border-b border-slate-100 py-1.5 pr-4 align-top text-slate-600">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Live canvas */}
        <div className="relative flex min-h-0 flex-1 flex-col bg-slate-50/60">
          <RpmlRenderer
            rpml={editedSource}
            debounce={200}
            canvasOpts={CANVAS_OPTS}
            canvasControllerRef={canvasRef}
            onError={(msg) => {
              setStatus(msg ? `Error: ${msg}` : "Rendered");
            }}
          />
          {/* Zoom controls */}
          <div className="absolute right-3 top-3 z-10 flex overflow-hidden rounded-lg border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleZoomOut}
                  className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
            <div className="w-px self-stretch bg-slate-200" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleZoomIn}
                  className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
            <div className="w-px self-stretch bg-slate-200" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleResetView}
                  className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Reset view (1×)</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* ── Right: collapsible code panel ── */}
      {codeOpen ? (
        <div className="flex w-[420px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <span className="text-[12px] font-semibold text-slate-700">
              Code
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400">
                {status}
              </span>
              <Button
                variant="outline"
                size="xs"
                onClick={handleReset}
                disabled={editedSource === originalSource}
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onCodeOpenChange(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    <PanelRightClose className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Close panel</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <CodeEditor value={editedSource} onChange={handleCodeChange} />
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onCodeOpenChange(true)}
              className="flex w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50"
            >
              <PanelRightOpen className="h-4 w-4 text-slate-400" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 [writing-mode:vertical-rl]">
                Code
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Open code panel</TooltipContent>
        </Tooltip>
      )}
    </main>
  );
});
