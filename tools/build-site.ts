#!/usr/bin/env bun
/** RPML site generator. Reads spec/, rapid-prototype-implement/, preview/components.js and emits a
 *  complete static portal into docs/. Run: bun tools/build-site.ts
 *
 *  spec/ Markdown is the single source of truth — never hand-copied into HTML. */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { markdown, escapeHtml } from './site/markdown.ts';
import { SITE_CSS } from './site/css.ts';
import { page, REPO } from './site/chrome.ts';
import { buildHome } from './site/home.ts';
import { buildGuide } from './site/guide.ts';
import { buildExamples } from './site/examples.ts';
import { buildApi } from './site/api.ts';
import { buildComponents } from './site/components-page.ts';
import { buildPlayground } from './site/playground.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'docs');
const VERSION = JSON.parse(readFileSync(join(ROOT, 'packages/renderer-web/package.json'), 'utf8')).version;

function read(p: string): string { return readFileSync(join(ROOT, p), 'utf8'); }
function write(name: string, html: string) { writeFileSync(join(DOCS, name), html); console.log(`  ✓ docs/${name}`); }

if (!existsSync(DOCS)) mkdirSync(DOCS, { recursive: true });

const ctx = { ROOT, read, markdown, escapeHtml, page, REPO, VERSION };

console.log('Building RPML site →');
writeFileSync(join(DOCS, '.nojekyll'), ''); // GitHub Pages: skip Jekyll processing
writeFileSync(join(DOCS, 'site.css'), SITE_CSS.trim()); console.log('  ✓ docs/site.css');
write('index.html', buildHome(ctx));
write('guide.html', buildGuide(ctx));
write('components.html', buildComponents(ctx));
write('examples.html', buildExamples(ctx));
write('api.html', buildApi(ctx));
write('playground.html', buildPlayground(ctx));
console.log('Done.');

export type Ctx = typeof ctx;
