import { injectStyle } from '../core/style';
import { attr, csv, escapeHtml } from '../core/dom';

export class ColorPaletteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const items = csv(this, 'items', 'Primary:#09090b,Muted:#71717a,Border:#e4e4e7,Success:#059669,Warning:#d97706,Danger:#dc2626');
    this.innerHTML = items.map(item => {
      const colon = item.indexOf(':');
      const name = item.slice(0, colon);
      const color = item.slice(colon + 1);
      return `<div class="cp-item"><div class="cp-swatch" style="background:${escapeHtml(color)}"></div><span class="cp-name">${escapeHtml(name)}</span><span class="cp-value">${escapeHtml(color)}</span></div>`;
    }).join('');
  }
}

export class FontPaletteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    // items format: "Label:size/weight" e.g. "Heading 1:32/800,Body:15/400"
    const items = csv(this, 'items', 'Heading 1:32/800,Heading 2:24/700,Heading 3:20/650,Body:15/400,Small:13/400,Caption:12/500,Label:12/650');
    this.innerHTML = items.map(item => {
      const colon = item.indexOf(':');
      const role = item.slice(0, colon);
      const meta = item.slice(colon + 1);
      const slash = meta.indexOf('/');
      const size = meta.slice(0, slash);
      const weight = meta.slice(slash + 1);
      return `<div class="fp-row"><span class="fp-role">${escapeHtml(role)}</span><span class="fp-sample" style="font-size:${parseInt(size)||15}px;font-weight:${parseInt(weight)||400}">${escapeHtml(role)}</span><span class="fp-meta">${escapeHtml(size)}px · ${escapeHtml(weight)}</span></div>`;
    }).join('');
  }
}

export class SpacePaletteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    // tokens format: "name:px" e.g. "xs:4,sm:8,md:16"
    const items = csv(this, 'tokens', 'xs:4,sm:8,md:16,lg:24,xl:32,2xl:48,3xl:64');
    const max = Math.max(...items.map(i => parseInt(i.split(':')[1] ?? '0')), 1);
    this.innerHTML = items.map(item => {
      const colon = item.indexOf(':');
      const name = item.slice(0, colon);
      const px = parseInt(item.slice(colon + 1)) || 0;
      const pct = Math.round(px / max * 100);
      return `<div class="sp-row"><span class="sp-token">${escapeHtml(name)}</span><div class="sp-bar-wrap"><div class="sp-bar" style="width:${pct}%"></div></div><span class="sp-value">${px}px</span></div>`;
    }).join('');
  }
}

export class RadiusPaletteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    // tokens format: "name:value" e.g. "none:0px,sm:4px,md:8px"
    const items = csv(this, 'tokens', 'none:0px,sm:4px,md:8px,lg:16px,xl:24px,full:9999px');
    this.innerHTML = items.map(item => {
      const colon = item.indexOf(':');
      const name = item.slice(0, colon);
      const val = item.slice(colon + 1);
      return `<div class="rp-rp-item"><div class="rp-rp-box" style="border-radius:${escapeHtml(val)}"></div><span class="rp-rp-label">${escapeHtml(name)}</span><span class="rp-rp-value">${escapeHtml(val)}</span></div>`;
    }).join('');
  }
}
