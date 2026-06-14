import { registerAll } from './registry';
import { parseToPage, rewriteTags } from 'rpml-parser';
import { liveRender, createDocRenderer } from './core/live-render';
import { ModeManager } from './core/mode';

registerAll();

export { registerAll, parseToPage, rewriteTags, liveRender, createDocRenderer, ModeManager };
export type { LiveRenderOpts, DocRenderer } from './core/live-render';
export type { RpuiTheme, RpuiMode, PickInfo, ModeManagerOpts } from './core/mode';
