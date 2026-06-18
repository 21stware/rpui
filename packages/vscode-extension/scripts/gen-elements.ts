#!/usr/bin/env bun
/**
 * Generates data/elements.json — the element + attribute catalog the extension's
 * completion provider consumes. Single source of truth: the parser vocabulary
 * (all language tags) + preview/components.js (per-tag attributes) + the canvas
 * tags (authored here, since they are not in the component catalog).
 *
 * Run from the repo root: bun packages/vscode-extension/scripts/gen-elements.ts
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// @ts-expect-error — JS module without types
import { COMPONENTS } from '../../../preview/components.js';
import { LANG_TO_COMPONENT } from '../../parser/src/vocabulary';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface ElementDef {
  name: string;
  group: string;
  desc: string;
  attrs: [string, string][];
}

// Canvas tags are not in components.js; their authoring attributes live here.
const canvas: ElementDef[] = [
  { name: 'page', group: 'Canvas', desc: '根文档外壳：title / route / description；mode=doc 切换文档流', attrs: [['title', '页面标题（必填）'], ['route', '路由路径，如 /users'], ['description', '页面说明'], ['mode', 'snapshot | doc；doc=单栏文档流，无 view/pin/annotation']] },
  { name: 'view', group: 'Canvas', desc: '缩放主快照画布；每页恰好一个', attrs: [['device', 'web | ipad | mobile 预设'], ['width', '显式宽度，覆盖预设'], ['height', 'auto 或数字固定高'], ['scale', '画布缩放，如 0.65']] },
  { name: 'annotation', group: 'Canvas', desc: '规格注释；顶层 id=N 对应 data-pin="N"，嵌套补充子区域规格', attrs: [['id', '顶层注释编号，匹配 data-pin'], ['label', '注释标题']] },
  { name: 'enum', group: 'Canvas', desc: '横向互斥状态/变体卡片容器', attrs: [] },
  { name: 'enum-item', group: 'Canvas', desc: '一个状态卡片，自动编号；可选 description', attrs: [['label', '状态名'], ['description', '简短状态说明']] },
];

const seen = new Set<string>();
const out: ElementDef[] = [];
for (const c of canvas) { out.push(c); seen.add(c.name); }
for (const c of COMPONENTS as { group: string; name: string; attrs: [string, string][] }[]) {
  if (seen.has(c.name)) continue;
  seen.add(c.name);
  out.push({ name: c.name, group: c.group, desc: '', attrs: c.attrs ?? [] });
}
// Any vocabulary tag missing from the catalog: include name-only so it still completes.
for (const lang of Object.keys(LANG_TO_COMPONENT)) {
  if (!seen.has(lang)) { out.push({ name: lang, group: 'Other', desc: '', attrs: [] }); seen.add(lang); }
}
out.sort((a, b) => a.name.localeCompare(b.name));

const dest = join(__dirname, '../data/elements.json');
writeFileSync(dest, JSON.stringify(out, null, 0) + '\n');
console.log(`✓ wrote ${out.length} elements → ${dest}`);
