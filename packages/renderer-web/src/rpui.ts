import { registerAll } from './registry';
import { parseToPage, rewriteTags } from 'rpml-parser';
import { liveRender, createDocRenderer } from './core/live-render';

registerAll();

export { registerAll, parseToPage, rewriteTags, liveRender, createDocRenderer };
export type { LiveRenderOpts, DocRenderer } from './core/live-render';
