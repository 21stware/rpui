import { readFileSync, writeFileSync } from 'fs';

let s = readFileSync('packages/renderer-web/src/core/style.ts', 'utf8');

// CSS variables
s = s.replace('--rp-bg:#f0f2f5;', '--rp-bg:#f4f4f5;');
s = s.replace('--rp-surface-soft:#f9fafb;', '--rp-surface-soft:#fafafa;');
s = s.replace('--rp-text:#111827;', '--rp-text:#09090b;');
s = s.replace('--rp-muted:#6b7280;', '--rp-muted:#71717a;');
s = s.replace('--rp-border:#e5e7eb;', '--rp-border:#e4e4e7;');
s = s.replace('--rp-border-strong:#d1d5db;', '--rp-border-strong:#d4d4d8;');
s = s.replace('--rp-primary:#2563eb;', '--rp-primary:#09090b;');
s = s.replace('--rp-radius-lg:12px;', '--rp-radius-lg:16px;');

// Blue rgba focus/shadow references
s = s.replaceAll('rgba(37,99,235,.12)', 'rgba(0,0,0,.06)');
s = s.replaceAll('rgba(37,99,235,.25)', 'rgba(0,0,0,.14)');
s = s.replaceAll('rgba(37,99,235,.35)', 'rgba(0,0,0,.12)');
s = s.replaceAll('rgba(37,99,235,.08)', 'rgba(0,0,0,.05)');
s = s.replaceAll('rgba(37,99,235,.14)', 'rgba(0,0,0,.08)');
s = s.replaceAll('rgba(37,99,235,.3)', 'rgba(0,0,0,.18)');

// Blue-tinted backgrounds → neutral
s = s.replaceAll('#eff6ff', '#f4f4f5');
s = s.replaceAll('#eef2ff', '#f4f4f5');
s = s.replaceAll('#e0e7ff', '#f4f4f5');
s = s.replaceAll('#f8fbff', '#fafafa');

// Blue border/tint values
s = s.replaceAll('#bfdbfe', '#e4e4e7');
s = s.replaceAll('#93c5fd', '#d4d4d8');

// Blue text values → near-black/neutral
s = s.replaceAll('#1d4ed8', '#09090b');
s = s.replaceAll('#1e40af', '#09090b');
s = s.replaceAll('#3730a3', '#374151');

// Badge: red → dark
s = s.replace('background:#ef4444; color:#fff; font-size:11px', 'background:#18181b; color:#fff; font-size:11px');

writeFileSync('packages/renderer-web/src/core/style.ts', s);

// Verify
const out = readFileSync('packages/renderer-web/src/core/style.ts', 'utf8');
['--rp-primary:#09090b', '--rp-bg:#f4f4f5', 'background:#18181b', 'rgba(0,0,0,.06)', '--rp-radius-lg:16px'].forEach(c =>
  console.log((out.includes(c) ? '✓' : '✗') + ' ' + c));
['#2563eb', '#ef4444', '#eff6ff', '#eef2ff', '#1d4ed8'].forEach(c => {
  const n = out.split(c).length - 1;
  if (n > 0) console.log('STILL PRESENT (' + n + 'x): ' + c);
});
