import { injectStyle } from "../core/style";
import { attr } from "../core/dom";

// document mode prose: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const docStyle = `
doc-heading, doc-heading { display:block; margin:32px 0 12px; line-height:1.25; letter-spacing:-.01em; color:var(--rp-text); font-weight:720; }
doc-heading[data-level="1"] { font-size:32px; margin-top:0; }
doc-heading[data-level="2"] { font-size:25px; margin-top:36px; padding-bottom:6px; border-bottom:1px solid var(--rp-border); }
doc-heading[data-level="3"] { font-size:20px; }
doc-heading[data-level="4"] { font-size:17px; }
doc-heading[data-level="5"] { font-size:15px; }
doc-heading[data-level="6"] { font-size:14px; color:var(--rp-muted); }
doc-paragraph, doc-paragraph { display:block; margin:0 0 16px; line-height:1.7; font-size:15px; color:var(--rp-text); }
doc-list, doc-list { display:block; margin:0 0 16px; padding-left:24px; }
doc-list-item, doc-list-item { display:list-item; margin:0 0 6px; line-height:1.65; font-size:15px; color:var(--rp-text); }
doc-list[data-type="bullet"] > doc-list-item { list-style:disc; }
doc-list[data-type="number"] > doc-list-item { list-style:decimal; }
doc-list-item::marker { color:var(--rp-muted); }
doc-quote, doc-quote { display:block; margin:0 0 18px; padding:12px 18px; background:var(--rp-surface-soft); border-left:3px solid var(--rp-primary); border-radius:0 var(--rp-radius-md) var(--rp-radius-md) 0; color:var(--rp-c-gray-700); font-size:15px; line-height:1.7; }
doc-quote[data-cite]::after { content:"— " attr(data-cite); display:block; margin-top:8px; font-size:13px; color:var(--rp-muted); }
/* inline prose inside doc elements (custom RPML inline elements + native HTML passthrough) */
doc-paragraph code, doc-list-item code, doc-quote code, doc-paragraph code-inline, doc-list-item code-inline, doc-quote code-inline { padding:1px 5px; border-radius:4px; background:var(--rp-c-zinc-100); color:var(--rp-primary); font-weight:650; font-family:ui-monospace,Menlo,monospace; font-size:.92em; }
doc-paragraph strong, doc-list-item strong, doc-quote strong, doc-paragraph bold-el, doc-list-item bold-el, doc-quote bold-el { color:var(--rp-c-gray-800); font-weight:680; }
doc-paragraph em, doc-list-item em, doc-quote em, doc-paragraph italic-el, doc-list-item italic-el, doc-quote italic-el { font-style:italic; }
doc-paragraph a, doc-list-item a { color:var(--rp-primary); }
/* doc-ordered-list / doc-unordered-list: same base as doc-list but with fixed type */
doc-ordered-list, doc-unordered-list { display:block; margin:0 0 16px; padding-left:24px; }
doc-ordered-list > doc-list-item { list-style:decimal; }
doc-unordered-list > doc-list-item { list-style:disc; }
/* inline custom elements */
bold-el { font-weight:680; color:var(--rp-c-gray-800); }
italic-el { font-style:italic; }
code-inline { padding:1px 5px; border-radius:4px; background:var(--rp-c-zinc-100); color:var(--rp-primary); font-weight:650; font-family:ui-monospace,Menlo,monospace; font-size:.92em; }
`;

/** Document-mode typography primitives.
 *
 *  These only render meaningfully inside `<page mode="doc">`, where content
 *  flows top-to-bottom like Markdown. They are thin, CSS-driven elements (see
 *  the `doc-*` rules in style.ts) that follow the same light-DOM pattern as
 *  the layout primitives in layout.ts. */

export class DocHeadingElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    const level = attr(this, "level", "1");
    this.dataset.level = level;
  }
}

export class DocParagraphElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

export class DocListElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    this.dataset.type = attr(this, "type", "bullet");
  }
}

export class DocListItemElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

export class DocQuoteElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    const cite = attr(this, "cite", "");
    if (cite) this.dataset.cite = cite;
  }
}

export class DocOrderedListElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

export class DocUnorderedListElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

export class BoldElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

export class ItalicElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}

export class CodeInlineElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
  }
}
