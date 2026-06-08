import * as fs from 'fs';
import * as path from 'path';

export interface ElementDef {
  name: string;
  group: string;
  desc: string;
  attrs: [string, string][];
}

let cache: ElementDef[] | null = null;
let byName: Map<string, ElementDef> | null = null;

/** Load the bundled element/attribute catalog (data/elements.json), generated
 *  from the parser vocabulary + preview/components.js. */
export function loadElements(extensionPath: string): ElementDef[] {
  if (cache) return cache;
  const file = path.join(extensionPath, 'data', 'elements.json');
  try {
    cache = JSON.parse(fs.readFileSync(file, 'utf8')) as ElementDef[];
  } catch {
    cache = [];
  }
  byName = new Map(cache.map(e => [e.name, e]));
  return cache;
}

export function getElement(name: string): ElementDef | undefined {
  return byName?.get(name);
}

/** Attributes common to every element (positioning + identity). */
export const GLOBAL_ATTRS: [string, string][] = [
  ['data-pin', '把该区域标记为编号锚点 N，需有匹配的 <annotation id="N">'],
  ['style', '内联样式（避免 position:absolute/fixed）'],
  ['class', 'CSS 类名']
];

/** Known attribute-value enumerations, keyed by attribute name, for value completion.
 *  Parsed loosely from the catalog descriptions (e.g. "info | success | warning"). */
export function valueOptions(desc: string): string[] {
  // Descriptions often read like "web | ipad | mobile 预设" or "primary|secondary|...".
  const m = desc.match(/([a-z][a-z0-9-]*(?:\s*\|\s*[a-z][a-z0-9-]*)+)/i);
  if (!m) return [];
  return m[1].split('|').map(s => s.trim()).filter(Boolean);
}
