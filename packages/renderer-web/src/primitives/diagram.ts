import { injectStyle } from '../core/style';
import { renderMermaidSVG } from 'beautiful-mermaid';

/** Strip common leading indentation so authors can indent the mermaid source
 *  inside `<diagram>` for readability without breaking the parser. Drops blank
 *  leading/trailing lines, then removes the smallest shared indent. */
function dedent(raw: string): string {
  const lines = raw.replace(/\t/g, '  ').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(
    ...lines.filter(l => l.trim()).map(l => l.match(/^ */)![0].length)
  );
  return lines.map(l => l.slice(indent)).join('\n');
}

/** `<diagram>` — renders its Mermaid text content to inline SVG via
 *  beautiful-mermaid (synchronous, no DOM/CDN dependency). On a parse error it
 *  degrades to showing the raw source so the diagram intent stays legible. */
export class DiagramElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const source = dedent(this.textContent ?? '');
    if (!source) { this.innerHTML = '<div class="diagram-block-empty">空图表</div>'; return; }
    try {
      const svg = renderMermaidSVG(source)
        // beautiful-mermaid embeds a Google Fonts @import; RPUI is offline /
        // self-contained and forbids external font/CDN fetches, so strip it.
        // The diagram falls back to the inherited font stack.
        .replace(/@import\s+url\(['"]?https?:\/\/[^)]*\)\s*;?/gi, '');
      this.innerHTML = `<div class="diagram-block-svg">${svg}</div>`;
    } catch {
      const pre = document.createElement('pre');
      pre.className = 'diagram-block-raw';
      pre.textContent = source;
      this.innerHTML = '<div class="diagram-block-err">图表解析失败</div>';
      this.appendChild(pre);
    }
  }
}
