/** RPML AST types and shared parsing utilities.
 *
 *  This is the single source of truth for:
 *  - RpmlNode — the AST shape
 *  - expandSelfClosing — normalize self-closing tags before HTML injection
 *  - parse — browser: DOMParser → RpmlNode AST
 *  - parseToPage — browser: innerHTML → live Element (for renderer-web / viewer)
 *  - parseNode — universal: regex SAX → RpmlNode AST (works in Bun/Node, no DOMParser)
 *
 *  validator/cli and VS Code extension use parseNode.
 *  renderer-web/rpml-loader uses parseToPage.
 *  Everything else uses parse.
 */

import { toComponentTag } from './vocabulary';
export { LANG_TO_COMPONENT, COMPONENT_TO_LANG, toComponentTag, toLangTag, PRIMITIVES } from './vocabulary';

export interface RpmlNode {
  tag: string;
  attrs: Record<string, string>;
  children: RpmlNode[];
  text?: string;
}

/** Expand self-closing custom-element tags (`<button ... />`) into explicit
 *  open+close pairs before HTML injection.
 *  The HTML parser ignores `/>` on custom elements; quoted attribute values
 *  (which may contain `/>`) are preserved verbatim. */
export function expandSelfClosing(source: string): string {
  return source.replace(
    /<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)\/>/g,
    (_m, tag: string, attrs: string) => `<${tag}${attrs}></${tag}>`
  );
}

/** Rewrite RPML *language* tag names to their Web Component tag names.
 *  Matches a complete opening/closing tag and rewrites only the tag NAME.
 *  The attribute portion is consumed with quoted-string awareness, so a literal
 *  `<tag` inside an attribute value (e.g. label="use <button>") is never seen as
 *  a tag start. Native HTML tags and comments (`<!--`) fall through unchanged.
 *  Run AFTER expandSelfClosing so every tag is a well-formed `<...>` pair. */
export function rewriteTags(source: string): string {
  return source.replace(
    /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>])*)>/g,
    (_m, slash: string, tag: string, rest: string) => `<${slash}${toComponentTag(tag)}${rest}>`
  );
}

/** Normalize RPML source for parsing: expand self-closing tags, then map
 *  language tag names onto Web Component tag names. */
export function normalize(source: string): string {
  return rewriteTags(expandSelfClosing(source.trim()));
}

/** Parse a .rpml string into an AST via browser DOMParser.
 *  Requires a browser environment (DOMParser available). */
export function parse(source: string): RpmlNode {
  const doc = new DOMParser().parseFromString(normalize(source), 'text/html');
  const root = doc.body.querySelector('page-el') ?? doc.body.firstElementChild;
  if (!root) throw new Error('RPML parse error: no <page> root element found');
  return domToAst(root);
}

function domToAst(el: Element): RpmlNode {
  const attrs: Record<string, string> = {};
  for (let i = 0; i < el.attributes.length; i++) { const a = el.attributes[i]; attrs[a.name] = a.value; }
  const children: RpmlNode[] = [];
  let text: string | undefined;
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes[i];
    if (child.nodeType === 1) children.push(domToAst(child as Element));
    else if (child.nodeType === 3) { const t = child.textContent?.trim(); if (t) text = (text ?? '') + t; }
  }
  return { tag: el.tagName.toLowerCase(), attrs, children, ...(text ? { text } : {}) };
}

/** Inject `data-rp-line="N"` (1-based) into every opening tag so pick-mode
 *  elements can be traced back to their source line. Must run before normalize()
 *  so line offsets reflect the original source. */
function annotateLinesInSource(source: string): string {
  const lines: number[] = new Array(source.length);
  let ln = 1;
  for (let i = 0; i < source.length; i++) { lines[i] = ln; if (source[i] === '\n') ln++; }
  // Capture: tag | attrs (no slash) | optional self-closing slash
  return source.replace(
    /<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'/])*)(\/?)>/g,
    (_m, tag: string, attrs: string, sc: string, offset: number) =>
      `<${tag}${attrs} data-rp-line="${lines[offset]}"${sc}>`
  );
}

/** Parse a .rpml string into a DOM Element using the live document's HTML parser.
 *  Requires a browser environment. Language tags are rewritten to component tags
 *  first; custom elements then upgrade against the live registry — identical to
 *  inlining the component-tag markup in a .html file.
 *  Pass `{ annotateLines: true }` to inject `data-rp-line` for pick-mode line tracing. */
export function parseToPage(source: string, opts: { annotateLines?: boolean } = {}): Element {
  const src = opts.annotateLines ? annotateLinesInSource(source.trim()) : source;
  const holder = document.createElement('div');
  holder.innerHTML = normalize(src);
  const root = holder.querySelector('page-el') ?? holder.firstElementChild;
  if (!root) throw new Error('RPML parse error: no <page> root element found');
  return root;
}

/** Render an AST back into DOM elements. Requires a browser environment. */
export function astToDom(node: RpmlNode): Element {
  const el = document.createElement(node.tag);
  for (const [k, v] of Object.entries(node.attrs)) el.setAttribute(k, v);
  for (const child of node.children) el.appendChild(astToDom(child));
  if (node.text && node.children.length === 0) el.textContent = node.text;
  return el;
}

/** Parse a .rpml string into an AST using a regex SAX walker.
 *  Works in any JS environment (Bun, Node, browsers) — no DOMParser needed.
 *  Used by validator CLI and VS Code extension. */
export function parseNode(source: string): RpmlNode {
  const norm = normalize(source);
  const stack: RpmlNode[] = [];
  let root: RpmlNode | null = null;
  const tagRe = /<([/]?)([a-zA-Z][\w:-]*)([^>]*)>/g;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(norm)) !== null) {
    const [, closing, tag, attrStr] = m;
    if (closing) {
      const node = stack.pop()!;
      if (stack.length) stack[stack.length - 1].children.push(node);
      else root = node;
    } else {
      const attrs: Record<string, string> = {};
      const attrRe = /([\w:-]+)(?:="([^"]*)")?/g;
      let am: RegExpExecArray | null;
      while ((am = attrRe.exec(attrStr)) !== null) {
        if (am[1] !== attrStr.trim()) attrs[am[1]] = am[2] ?? '';
      }
      stack.push({ tag: tag.toLowerCase(), attrs, children: [] });
    }
  }
  if (!root && stack.length) root = stack[0];
  if (!root) throw new Error('RPML parse error: no root element found');
  return root;
}

export { parse as default };
