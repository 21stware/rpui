import { injectStyle } from "../core/style";
import { attr } from "../core/dom";

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
