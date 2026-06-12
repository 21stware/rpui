export function attr(el: Element, name: string, fallback = ''): string { return el.getAttribute(name) ?? fallback; }
export function intAttr(el: Element, name: string, fallback: number): number { const raw = el.getAttribute(name); const value = raw === null || raw === '' ? NaN : Number(raw); return Number.isFinite(value) ? value : fallback; }
export function escapeHtml(value: string): string { return value.replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c] || c)); }
export function csv(el: Element, name: string, fallback: string): string[] { return attr(el, name, fallback).split(',').map(s => s.trim()).filter(Boolean); }

export const deviceWidths: Record<string, number> = { web: 1440, ipad: 834, mobile: 390 };
export function resolveWidth(el: Element, fallback: number): number { const raw = el.getAttribute('width'); const width = raw === null || raw === '' ? NaN : Number(raw); if (Number.isFinite(width)) return width; return deviceWidths[attr(el,'device')] ?? fallback; }
export function hasExplicitNumericHeight(el: Element): boolean { const raw = el.getAttribute('height'); return raw !== null && raw !== '' && Number.isFinite(Number(raw)); }
export function usesAutoHeight(el: Element): boolean { const raw = el.getAttribute('height'); return raw === 'auto' || el.hasAttribute('auto-height') || (!!el.getAttribute('device') && !hasExplicitNumericHeight(el)); }
export function resolveHeight(el: Element, fallback: number): number { const raw = el.getAttribute('height'); const height = raw === null || raw === '' ? NaN : Number(raw); return Number.isFinite(height) ? height : fallback; }
export function isTopAnnotation(node: Node): node is HTMLElement { if (!(node instanceof HTMLElement)) return false; const tag = node.tagName.toLowerCase(); return tag === 'annotation-el' || tag === 'annotation-el'; }
export function isGlobalAnnotation(node: Node): node is HTMLElement { return node instanceof HTMLElement && node.tagName.toLowerCase() === 'annotation-global-el'; }
export function isViewportNode(node: Node): node is HTMLElement { if (!(node instanceof HTMLElement)) return false; const tag = node.tagName.toLowerCase(); return tag === 'viewport-el' || tag === 'viewport-el'; }
export function define(name: string, ctor: CustomElementConstructor) {
  if (customElements.get(name)) return;
  const Alias = class extends (ctor as { new(): HTMLElement }) {};
  customElements.define(name, Alias as CustomElementConstructor);
}


