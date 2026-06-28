import { registerAll } from "./registry";
import { parseToPage, rewriteTags } from "rpml-parser";
import { liveRender, createDocRenderer } from "./core/live-render";
import { ModeManager } from "./core/mode";
import { CanvasController } from "./core/canvas-controller";

registerAll();

export {
  registerAll,
  parseToPage,
  rewriteTags,
  liveRender,
  createDocRenderer,
  ModeManager,
  CanvasController,
};
export type { LiveRenderOpts, DocRenderer } from "./core/live-render";
export type {
  RpuiTheme,
  RpuiMode,
  PickInfo,
  ModeManagerOpts,
} from "./core/mode";
export type { CanvasControllerOpts } from "./core/canvas-controller";
