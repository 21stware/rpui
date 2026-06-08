import * as vscode from 'vscode';
import { getElement, loadElements } from './elements';

/** Hover: show an element's description and attribute list when hovering a tag name. */
export function registerHover(context: vscode.ExtensionContext): vscode.Disposable {
  loadElements(context.extensionPath);

  return vscode.languages.registerHoverProvider('rpml', {
    provideHover(doc, pos) {
      const range = doc.getWordRangeAtPosition(pos, /[a-zA-Z][\w:-]*/);
      if (!range) return;
      // Only treat it as a tag if preceded by `<` or `</`.
      const before = doc.getText(new vscode.Range(new vscode.Position(range.start.line, 0), range.start));
      if (!/<\/?$/.test(before)) return;

      const name = doc.getText(range);
      const el = getElement(name);
      if (!el) return;

      const md = new vscode.MarkdownString();
      md.appendMarkdown(`**\`<${el.name}>\`** — ${el.group}\n\n`);
      if (el.desc) md.appendMarkdown(`${el.desc}\n\n`);
      const attrs = el.attrs.filter(([n]) => !n.startsWith('('));
      if (attrs.length) {
        md.appendMarkdown(`**属性**\n\n`);
        for (const [n, d] of attrs) md.appendMarkdown(`- \`${n}\`${d ? ` — ${d}` : ''}\n`);
      }
      return new vscode.Hover(md, range);
    }
  });
}
