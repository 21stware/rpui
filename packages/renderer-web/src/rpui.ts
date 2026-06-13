import { registerAll } from './registry';
import { parseToPage, rewriteTags } from 'rpml-parser';
import { liveRender } from './core/live-render';

registerAll();

export { registerAll, parseToPage, rewriteTags, liveRender };
