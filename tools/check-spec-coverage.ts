#!/usr/bin/env bun
// tools/check-spec-coverage.ts
// Checks that every element registered in registry.ts has a spec/elements/**/*.md file.

import { readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(import.meta.dir, '..');
const REGISTRY = Bun.file(join(ROOT, 'packages/renderer-web/src/registry.ts'));
const text = await REGISTRY.text();

// Extract all suffix strings from the pairs array
const matches = text.matchAll(/\['([\w-]+)',\s*\w+Element\]/g);
const suffixes = [...matches].map(m => m[1]);

// Also add canvas elements
const canvas = ['page', 'main-view', 'annotation', 'enum', 'enum-item'];

const all = [...new Set([...canvas, ...suffixes])];

let missing = 0;
for (const name of all) {
  const tag = `rp-${name}`;
  // Search recursively in spec/elements/
  const found = findSpec(join(ROOT, 'spec/elements'), `${tag}.md`);
  if (!found) {
    console.log(`⚠ Missing spec: ${tag}`);
    missing++;
  }
}

if (missing === 0) {
  console.log(`✓ All ${all.length} elements have spec files`);
} else {
  console.log(`\n${all.length - missing}/${all.length} covered, ${missing} missing`);
}

function findSpec(dir: string, filename: string): boolean {
  if (!existsSync(dir)) return false;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (findSpec(join(dir, entry.name), filename)) return true;
    } else if (entry.name === filename) return true;
  }
  return false;
}
