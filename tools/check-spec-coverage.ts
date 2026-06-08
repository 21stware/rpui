#!/usr/bin/env bun
// tools/check-spec-coverage.ts
// Checks that every RPML language element has a spec/elements/**/*.md file.

import { readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { PRIMITIVES } from '../packages/parser/src/vocabulary';

const ROOT = resolve(import.meta.dir, '..');

// Canvas language tags + all primitive language names from the shared vocabulary.
const canvas = ['page', 'view', 'annotation', 'enum', 'enum-item'];
const all = [...new Set([...canvas, ...PRIMITIVES])];

let missing = 0;
for (const name of all) {
  // Spec files are named after the language tag (e.g. button.md, view.md).
  const found = findSpec(join(ROOT, 'spec/elements'), `${name}.md`);
  if (!found) {
    console.log(`⚠ Missing spec: ${name}`);
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
