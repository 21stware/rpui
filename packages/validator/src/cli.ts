#!/usr/bin/env bun
import { readFileSync } from 'fs';
import { parseNode } from 'rpml-parser';
import { validate } from './index.ts';

const file = process.argv[2];
if (!file) { console.error('Usage: rpml validate <file.rpml>'); process.exit(1); }

let ast;
try { ast = parseNode(readFileSync(file, 'utf8')); }
catch (e) { console.error(`Parse error: ${e}`); process.exit(1); }

const errors = validate(ast);
if (!errors.length) { console.log(`✓ ${file} — valid`); process.exit(0); }
for (const e of errors) console.log(`${e.severity === 'error' ? '✗' : '⚠'} [${e.severity}] ${e.path}: ${e.message}`);
process.exit(errors.some(e => e.severity === 'error') ? 1 : 0);
