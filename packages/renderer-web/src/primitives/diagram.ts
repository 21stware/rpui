import { injectStyle } from "../core/style";
import { renderMermaidSVG, THEMES } from "beautiful-mermaid";

// diagram: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const diagramStyle = `
diagram-block, diagram-block { display:block; width:100%; max-width:100%; min-width:0; margin:10px 0; padding:12px; background:var(--rp-c-white); border:1px solid var(--rp-border); border-radius:var(--rp-radius-md); overflow:auto; }
.diagram-block-svg { display:flex; justify-content:center; }
.diagram-block-svg svg { max-width:100%; height:auto; }
.diagram-block-empty, .diagram-block-err { font-size:13px; color:var(--rp-muted); }
.diagram-block-err { color:var(--rp-danger); margin-bottom:6px; }
.diagram-block-raw { margin:0; font-family:ui-monospace,Menlo,monospace; font-size:12px; line-height:1.5; color:var(--rp-c-gray-700); white-space:pre; overflow:auto; }
`;

/** Strip common leading indentation so authors can indent the mermaid source
 *  inside `<diagram>` for readability without breaking the parser. Drops blank
 *  leading/trailing lines, then removes the smallest shared indent. */
function dedent(raw: string): string {
  const lines = raw.replace(/\t/g, "  ").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length),
  );
  return lines.map((l) => l.slice(indent)).join("\n");
}

/** `<diagram>` — renders its Mermaid text content to inline SVG via
 *  beautiful-mermaid (synchronous, no DOM/CDN dependency). On a parse error it
 *  degrades to showing the raw source so the diagram intent stays legible. */
export class DiagramElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = "true";
    const source = dedent(this.textContent ?? "");
    if (!source) {
      this.innerHTML = '<div class="diagram-block-empty">空图表</div>';
      return;
    }
    const isDark =
      document.documentElement.getAttribute("data-rpml-theme") === "dark";
    // beautiful-mermaid's stock github-light uses a soft fg (#1f2328) and a
    // light muted (#59636e) for edge labels, which read faint in a prototype
    // snapshot. Darken both for crisper diagram text; keep the dark theme stock.
    const themeOpts = isDark
      ? THEMES["github-dark"]
      : { ...THEMES["github-light"], fg: "#111827", muted: "#4b5563" };
    try {
      const svg = renderMermaidSVG(source, themeOpts)
        // beautiful-mermaid embeds a Google Fonts @import; RPUI is offline /
        // self-contained and forbids external font/CDN fetches, so strip it.
        // The diagram falls back to the inherited font stack.
        .replace(/@import\s+url\(['"]?https?:\/\/[^)]*\)\s*;?/gi, "");
      this.innerHTML = `<div class="diagram-block-svg">${svg}</div>`;
    } catch {
      const pre = document.createElement("pre");
      pre.className = "diagram-block-raw";
      pre.textContent = source;
      this.innerHTML = '<div class="diagram-block-err">图表解析失败</div>';
      this.appendChild(pre);
    }
  }
}
