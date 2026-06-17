import { injectStyle } from '../core/style';
import { attr, csv, escapeHtml, intAttr } from '../core/dom';

/** `<chart>` — static data-visualization primitive. Renders inline SVG (offline,
 *  no CDN, same self-contained philosophy as `<diagram>`) from a `data` csv.
 *  Kinds: bar | line | area | donut | sparkline. */

const PALETTE = ['var(--rp-primary)', 'var(--rp-success)', 'var(--rp-warning)', 'var(--rp-purple)', 'var(--rp-danger)', '#9ca3af'];
const SVG_ATTRS = 'preserveAspectRatio="xMidYMid meet" width="100%" class="rp-chart-svg" aria-hidden="true"';

function bar(data: number[], labels: string[], W: number, H: number, color: string): string {
  const pad = 6, labelH = labels.length ? 18 : 0;
  const plotH = H - labelH - pad;
  const max = Math.max(1, ...data);
  const n = data.length || 1;
  const slot = (W - pad * 2) / n;
  const bw = Math.min(30, slot * 0.62);
  const bars = data.map((v, i) => {
    const bh = Math.max(2, (v / max) * plotH);
    const x = pad + slot * i + (slot - bw) / 2;
    const y = pad + plotH - bh;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${color}"/>`;
  }).join('');
  const labs = labels.length ? labels.map((l, i) =>
    `<text x="${(pad + slot * i + slot / 2).toFixed(1)}" y="${H - 4}" text-anchor="middle" class="rp-chart-label">${escapeHtml(l)}</text>`).join('') : '';
  return `<svg viewBox="0 0 ${W} ${H}" ${SVG_ATTRS}>${bars}${labs}</svg>`;
}

function line(data: number[], labels: string[], W: number, H: number, color: string, area: boolean): string {
  const pad = 6, labelH = labels.length ? 18 : 0;
  const plotH = H - labelH - pad;
  const max = Math.max(1, ...data);
  const n = data.length || 1;
  const slot = n > 1 ? (W - pad * 2) / (n - 1) : 0;
  const pts = data.map((v, i) => [n === 1 ? W / 2 : pad + slot * i, pad + plotH - (v / max) * plotH] as const);
  const poly = pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const base = pad + plotH;
  const areaPath = area && n > 1
    ? `<path d="M${pts[0][0].toFixed(1)},${base} ${pts.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')} L${pts[n - 1][0].toFixed(1)},${base} Z" fill="${color}" fill-opacity="0.12"/>`
    : '';
  const dots = pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.5" fill="${color}"/>`).join('');
  const labs = labels.length ? labels.map((l, i) =>
    `<text x="${(n === 1 ? W / 2 : pad + slot * i).toFixed(1)}" y="${H - 4}" text-anchor="middle" class="rp-chart-label">${escapeHtml(l)}</text>`).join('') : '';
  return `<svg viewBox="0 0 ${W} ${H}" ${SVG_ATTRS}>${areaPath}<polyline points="${poly}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${dots}${labs}</svg>`;
}

function donut(data: number[], W: number, H: number): string {
  const total = data.reduce((a, b) => a + b, 0) || 1;
  const cx = W / 2, cy = H / 2;
  const r = Math.max(6, Math.min(W, H) / 2 - 6);
  const sw = Math.min(14, r * 0.32);
  const C = 2 * Math.PI * r;
  let offset = 0;
  const segs = data.map((v, i) => {
    const dash = (v / total) * C;
    const seg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${PALETTE[i % PALETTE.length]}" stroke-width="${sw}" stroke-dasharray="${dash.toFixed(1)} ${(C - dash).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += dash;
    return seg;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" ${SVG_ATTRS}>${segs}</svg>`;
}

function sparkline(data: number[], W: number, H: number, color: string): string {
  const n = data.length;
  if (n === 0) return '';
  const max = Math.max(...data), min = Math.min(...data);
  const span = max - min || 1;
  const slot = n > 1 ? W / (n - 1) : 0;
  const pts = data.map((v, i) => `${(n === 1 ? W / 2 : i * slot).toFixed(1)},${(H - 2 - ((v - min) / span) * (H - 4)).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" ${SVG_ATTRS}><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

export class ChartElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const kind = attr(this, 'kind', 'bar');
    const data = csv(this, 'data', '10,24,18,30,22').map(Number).filter(Number.isFinite);
    const labels = csv(this, 'labels', '');
    const H = intAttr(this, 'height', 160);
    const W = 320;
    const color = attr(this, 'color', 'var(--rp-primary)');
    let svg: string;
    if (kind === 'donut') svg = donut(data, W, H);
    else if (kind === 'sparkline') svg = sparkline(data, W, Math.min(H, 48), color);
    else if (kind === 'line' || kind === 'area') svg = line(data, labels, W, H, color, kind === 'area');
    else svg = bar(data, labels, W, H, color);
    this.innerHTML = svg;
  }
}
