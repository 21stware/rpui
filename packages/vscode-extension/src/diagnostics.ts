import * as vscode from 'vscode';
import { parseNode } from 'rpml-parser';
import { validate } from 'rpml-validator';

/** Run the RPML parser + validator on a document and publish diagnostics.
 *  The validator reports structural and pin↔annotation parity issues; we map
 *  each message back to a best-effort source range. */
export function registerDiagnostics(context: vscode.ExtensionContext): vscode.Disposable {
  const collection = vscode.languages.createDiagnosticCollection('rpml');
  context.subscriptions.push(collection);

  const run = (doc: vscode.TextDocument) => {
    if (doc.languageId !== 'rpml') return;
    if (!vscode.workspace.getConfiguration('rpml').get('validate.enable', true)) {
      collection.delete(doc.uri);
      return;
    }
    collection.set(doc.uri, computeDiagnostics(doc));
  };

  const subs = [
    vscode.workspace.onDidOpenTextDocument(run),
    vscode.workspace.onDidChangeTextDocument(e => run(e.document)),
    vscode.workspace.onDidCloseTextDocument(d => collection.delete(d.uri))
  ];
  vscode.workspace.textDocuments.forEach(run);
  return vscode.Disposable.from(...subs);
}

function computeDiagnostics(doc: vscode.TextDocument): vscode.Diagnostic[] {
  const text = doc.getText();
  let ast;
  try {
    ast = parseNode(text);
  } catch (e) {
    // Parse failure → single diagnostic at the top of the file.
    return [
      new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 1),
        `RPML parse error: ${e instanceof Error ? e.message : String(e)}`,
        vscode.DiagnosticSeverity.Error
      )
    ];
  }

  const errors = validate(ast);
  return errors.map(err => {
    const range = locate(text, doc, err);
    const sev =
      err.severity === 'error'
        ? vscode.DiagnosticSeverity.Error
        : vscode.DiagnosticSeverity.Warning;
    const diag = new vscode.Diagnostic(range, err.message, sev);
    diag.source = 'rpml';
    return diag;
  });
}

/** Best-effort: locate the offending token in the source for a validator error.
 *  Falls back to the first line. */
function locate(text: string, doc: vscode.TextDocument, err: { path: string; message: string }): vscode.Range {
  // data-pin="N" without matching annotation → point at that data-pin.
  const pin = err.message.match(/data-pin="([^"]+)"/);
  if (pin && /no matching <annotation/.test(err.message)) {
    const r = findRegex(text, doc, new RegExp(`data-pin=["']${escapeRe(pin[1])}["']`));
    if (r) return r;
  }
  // annotation id="N" without matching pin → point at that annotation tag.
  const ann = err.message.match(/id="([^"]+)"/);
  if (ann) {
    const r = findRegex(text, doc, new RegExp(`<annotation\\b[^>]*\\bid=["']${escapeRe(ann[1])}["']`));
    if (r) return r;
  }
  // Root / structural messages → point at the root <page or first <view.
  if (/Root element|page missing title/.test(err.message)) {
    const r = findRegex(text, doc, /<page\b/);
    if (r) return r;
  }
  if (/<view>/.test(err.message)) {
    const r = findRegex(text, doc, /<view\b/) ?? findRegex(text, doc, /<page\b/);
    if (r) return r;
  }
  return new vscode.Range(0, 0, 0, Math.max(1, doc.lineAt(0).text.length));
}

function findRegex(text: string, doc: vscode.TextDocument, re: RegExp): vscode.Range | null {
  const m = re.exec(text);
  if (!m) return null;
  const start = doc.positionAt(m.index);
  const end = doc.positionAt(m.index + m[0].length);
  return new vscode.Range(start, end);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
