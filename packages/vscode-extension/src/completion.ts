import * as vscode from 'vscode';
import { ElementDef, GLOBAL_ATTRS, getElement, loadElements, valueOptions } from './elements';

/** Completion for RPML:
 *  - tag names after `<` (and `</`)
 *  - attribute names inside an open tag
 *  - attribute values for known enumerations
 */
export function registerCompletion(context: vscode.ExtensionContext): vscode.Disposable {
  const elements = loadElements(context.extensionPath);

  return vscode.languages.registerCompletionItemProvider(
    'rpml',
    {
      provideCompletionItems(doc, pos) {
        const linePrefix = doc.lineAt(pos).text.slice(0, pos.character);
        const upto = doc.getText(new vscode.Range(new vscode.Position(0, 0), pos));

        // 1. Attribute-value completion: inside `attr="..."`.
        const valueCtx = linePrefix.match(/([a-zA-Z][\w:-]*)=("|')([^"']*)$/);
        if (valueCtx) {
          const tag = currentTag(upto);
          return attributeValueItems(tag, valueCtx[1], elements);
        }

        // 2. Tag-name completion: right after `<` or `</`.
        const tagCtx = linePrefix.match(/<\/?([a-zA-Z][\w:-]*)?$/);
        if (tagCtx) return tagItems(elements, linePrefix.endsWith('/'));

        // 3. Attribute-name completion: inside an open tag, after whitespace.
        if (insideOpenTag(upto)) {
          const tag = currentTag(upto);
          return attributeItems(tag);
        }

        return undefined;
      }
    },
    '<', '/', ' ', '"', "'"
  );
}

/** Name of the tag whose opening `<name ...` we are currently inside (unclosed). */
function currentTag(upto: string): string | undefined {
  const lastOpen = upto.lastIndexOf('<');
  if (lastOpen === -1) return undefined;
  const slice = upto.slice(lastOpen);
  if (slice.includes('>')) return undefined; // tag already closed
  const m = slice.match(/^<\/?([a-zA-Z][\w:-]*)/);
  return m?.[1];
}

/** Are we positioned inside an unclosed `<tag ...` (so attribute names apply)? */
function insideOpenTag(upto: string): boolean {
  const lastOpen = upto.lastIndexOf('<');
  if (lastOpen === -1) return false;
  const slice = upto.slice(lastOpen);
  // Open tag, not yet closed, and has a name + at least one space (ready for attrs).
  return /^<[a-zA-Z][\w:-]*\s[^>]*$/.test(slice) && !slice.includes('>');
}

function tagItems(elements: ElementDef[], closing: boolean): vscode.CompletionItem[] {
  return elements.map(el => {
    const item = new vscode.CompletionItem(el.name, vscode.CompletionItemKind.Class);
    item.detail = el.group;
    if (el.desc) item.documentation = new vscode.MarkdownString(el.desc);
    item.sortText = sortKey(el);
    if (!closing) {
      // Insert `name></name>` skeleton for container-ish tags, snippet cursor inside.
      item.insertText = new vscode.SnippetString(`${el.name}$1>$0</${el.name}>`);
    }
    return item;
  });
}

function attributeItems(tag: string | undefined): vscode.CompletionItem[] {
  const el = tag ? getElement(tag) : undefined;
  const attrs: [string, string][] = [...(el?.attrs ?? []), ...GLOBAL_ATTRS];
  const seen = new Set<string>();
  const items: vscode.CompletionItem[] = [];
  for (const [name, desc] of attrs) {
    // Skip catalog "(子) xxx" pseudo-rows that describe child elements, not attrs.
    if (name.startsWith('(') || seen.has(name)) continue;
    seen.add(name);
    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
    if (desc) item.documentation = new vscode.MarkdownString(desc);
    const opts = valueOptions(desc);
    item.insertText = new vscode.SnippetString(
      opts.length ? `${name}="\${1|${opts.join(',')}|}"` : `${name}="$1"`
    );
    items.push(item);
  }
  return items;
}

function attributeValueItems(
  tag: string | undefined,
  attr: string,
  _elements: ElementDef[]
): vscode.CompletionItem[] {
  const el = tag ? getElement(tag) : undefined;
  const found = el?.attrs.find(([n]) => n === attr);
  const opts = found ? valueOptions(found[1]) : [];
  return opts.map(v => {
    const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.EnumMember);
    return item;
  });
}

/** Canvas tags sort to the top, then alphabetical within group. */
function sortKey(el: ElementDef): string {
  const rank = el.group === 'Canvas' ? '0' : '1';
  return `${rank}-${el.name}`;
}
