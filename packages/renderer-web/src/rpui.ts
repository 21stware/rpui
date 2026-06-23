import { registerAll } from "./registry";
import { parseToPage, rewriteTags } from "rpml-parser";
import { liveRender, createDocRenderer } from "./core/live-render";
import { ModeManager } from "./core/mode";
import { initTheme, currentTheme, setTheme } from "./core/theme";

registerAll();

export {
  registerAll,
  parseToPage,
  rewriteTags,
  liveRender,
  createDocRenderer,
  ModeManager,
  initTheme,
  currentTheme,
  setTheme,
};
export type { LiveRenderOpts, DocRenderer } from "./core/live-render";
export type {
  RpuiTheme,
  RpuiMode,
  PickInfo,
  ModeManagerOpts,
} from "./core/mode";
