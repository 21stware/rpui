#!/usr/bin/env bun
import { writeFileSync, statSync } from 'node:fs';
import { basename } from 'node:path';
import { collectRpml, compileDocs } from './index.ts';

function usage(): never {
  console.error('Usage: rpml-compile <dir> [-o out.html] [--title "..."]');
  process.exit(1);
}

const args = process.argv.slice(2);
let dir = '';
let out = '';
let title = '';
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '-o' || a === '--out') out = args[++i];
  else if (a === '--title') title = args[++i];
  else if (a === '-h' || a === '--help') usage();
  else if (!a.startsWith('-')) dir = a;
}
if (!dir) usage();

try {
  if (!statSync(dir).isDirectory()) { console.error(`Not a directory: ${dir}`); process.exit(1); }
} catch { console.error(`No such directory: ${dir}`); process.exit(1); }

if (!out) out = `${basename(dir.replace(/\/+$/, ''))}.html`;
if (!title) title = basename(dir.replace(/\/+$/, ''));

try {
  const docs = collectRpml(dir);
  const { html, warnings } = compileDocs(docs, { title });
  writeFileSync(out, html);
  for (const w of warnings) console.log(`⚠ ${w}`);
  console.log(`✓ compiled ${docs.length} document${docs.length === 1 ? '' : 's'} → ${out}`);
  if (warnings.length) console.log(`  (${warnings.length} warning${warnings.length === 1 ? '' : 's'})`);
} catch (e) {
  console.error(`✗ ${(e as Error).message}`);
  process.exit(1);
}
