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

export interface RpmlNode {
  tag: string;
  attrs: Record<string, string>;
  children: RpmlNode[];
  text?: string;
}

/** Expand self-closing custom-element tags (`<rp-x ... />`) into explicit
 *  open+close pairs before HTML injection.
 *  The HTML parser ignores `/>` on custom elements; quoted attribute values
 *  (which may contain `/>`) are preserved verbatim. */
export function expandSelfClosing(source: string): string {
  return source.replace(
    /<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)\/>/g,
    (_m, tag: string, attrs: string) => `<${tag}${attrs}></${tag}>`
  );
}

/** Parse a .rpml string into an AST via browser DOMParser.
 *  Requires a browser environment (DOMParser available). */
export function parse(source: string): RpmlNode {
  const doc = new DOMParser().parseFromString(expandSelfClosing(source.trim()), 'text/html');
  const root = doc.body.querySelector('rp-page') ?? doc.body.firstElementChild;
  if (!root) throw new Error('RPML parse error: no <rp-page> root element found');
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

/** Parse a .rpml string into a DOM Element using the live document's HTML parser.
 *  Requires a browser environment. Custom elements upgrade against the live
 *  registry — identical to inlining <rp-page> in a .html file. */
export function parseToPage(source: string): Element {
  const holder = document.createElement('div');
  holder.innerHTML = expandSelfClosing(source.trim());
  const root = holder.querySelector('rp-page') ?? holder.firstElementChild;
  if (!root) throw new Error('RPML parse error: no <rp-page> root element found');
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
  const norm = expandSelfClosing(source.trim());
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
