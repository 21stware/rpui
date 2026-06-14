import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/** Live preview: a webview that loads the RPUI runtime (dist/rpui.js) once, then
 *  re-renders the active .rpml document in place (via postMessage) as it changes.
 *  The runtime maps the language tags (page/view/navigator…) to component tags,
 *  exactly as in the browser. */
export function registerPreview(context: vscode.ExtensionContext): vscode.Disposable[] {
  let panel: vscode.WebviewPanel | undefined;
  let previewedUri: vscode.Uri | undefined;
  let lastUri = '';
  let debounce: ReturnType<typeof setTimeout> | undefined;

  const open = (column: vscode.ViewColumn) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'rpml') {
      vscode.window.showInformationMessage('RPML 预览：请先打开一个 .rpml 文件。');
      return;
    }
    previewedUri = editor.document.uri;

    if (!panel) {
      const runtimeDir = locateRuntimeDir(context.extensionPath);
      panel = vscode.window.createWebviewPanel(
        'rpmlPreview',
        previewTitle(editor.document),
        column,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: runtimeDir ? [vscode.Uri.file(runtimeDir)] : []
        }
      );
      panel.iconPath = iconUri(context.extensionPath);
      panel.onDidDispose(
        () => { panel = undefined; previewedUri = undefined; lastUri = ''; },
        null,
        context.subscriptions
      );
      // The webview signals 'ready' once its module loads; flush the latest
      // source then (avoids a race where the first postMessage is dropped).
      // 'pick' messages carry a source line to reveal in the originating editor.
      panel.webview.onDidReceiveMessage(
        async msg => {
          if (msg?.type === 'ready' && panel && previewedUri) {
            const doc = docFor(previewedUri);
            if (doc) postSource(panel, doc.getText(), previewedUri.toString());
          } else if (msg?.type === 'pick' && msg.line) {
            const doc = vscode.workspace.textDocuments.find(d => d.uri.toString() === lastUri);
            if (doc) {
              const pos = new vscode.Position(Math.max(0, msg.line - 1), 0);
              await vscode.window.showTextDocument(doc, {
                selection: new vscode.Range(pos, pos),
                preserveFocus: true,
                viewColumn: panel?.viewColumn === vscode.ViewColumn.Two
                  ? vscode.ViewColumn.One : vscode.ViewColumn.Active,
              });
            }
          }
        },
        null,
        context.subscriptions
      );
      setShell(context, panel);
    } else {
      panel.reveal(column, true);
    }
    panel.title = previewTitle(editor.document);
    postSource(panel, editor.document.getText(), previewedUri.toString());
  };

  const refresh = (doc: vscode.TextDocument) => {
    if (!panel) return;
    clearTimeout(debounce);
    debounce = setTimeout(() => panel && postSource(panel, doc.getText(), doc.uri.toString()), 150);
  };

  const docFor = (uri: vscode.Uri): vscode.TextDocument | undefined =>
    vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString());

  return [
    vscode.commands.registerCommand('rpml.openPreview', () => open(vscode.ViewColumn.Active)),
    vscode.commands.registerCommand('rpml.openPreviewToSide', () => open(vscode.ViewColumn.Beside)),
    vscode.workspace.onDidChangeTextDocument(e => {
      if (previewedUri && e.document.uri.toString() === previewedUri.toString()) refresh(e.document);
    }),
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (panel && editor?.document.languageId === 'rpml') {
        previewedUri = editor.document.uri;
        panel.title = previewTitle(editor.document);
        postSource(panel, editor.document.getText(), previewedUri.toString());
      }
    })
  ];

  function postSource(p: vscode.WebviewPanel, source: string, key: string) {
    lastUri = key;
    p.webview.postMessage({ type: 'render', source, key });
  }
}

function previewTitle(doc: vscode.TextDocument): string {
  return `Preview ${path.basename(doc.fileName)}`;
}

function iconUri(extensionPath: string): vscode.Uri | undefined {
  const p = path.join(extensionPath, 'icons', 'rpml-file.s.svg');
  return fs.existsSync(p) ? vscode.Uri.file(p) : undefined;
}

/** Directory containing rpui.js — bundled copy (media/) or the repo dist/ in dev. */
function locateRuntimeDir(extensionPath: string): string | undefined {
  const candidates = [
    path.join(extensionPath, 'media'),
    path.join(extensionPath, '..', '..', 'dist'),
    path.join(extensionPath, '..', 'renderer-web', 'dist')
  ];
  return candidates.find(d => fs.existsSync(path.join(d, 'rpui.js')));
}

/** Render the webview shell once: it loads the runtime and listens for source updates. */
function setShell(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
  const dir = locateRuntimeDir(context.extensionPath);
  if (!dir) {
    panel.webview.html = `<!doctype html><html><body style="font-family:sans-serif;padding:24px">
      <h3>找不到 RPUI 运行时</h3>
      <p>请先在仓库根目录执行 <code>bun run build</code> 生成 <code>dist/rpui.js</code>，
      或执行 <code>bun run --cwd packages/vscode-extension build</code> 复制到 <code>media/</code>。</p>
    </body></html>`;
    return;
  }
  const runtimeUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(dir, 'rpui.js')));
  panel.webview.html = htmlShell(panel.webview.cspSource, runtimeUri);
}

function htmlShell(cspSource: string, runtimeUri: vscode.Uri): string {
  const nonce = String(Math.random()).slice(2) + String(Date.now());
  const csp = [
    `default-src 'none'`,
    `style-src ${cspSource} 'unsafe-inline'`,
    `img-src ${cspSource} data:`,
    `font-src ${cspSource} data:`,
    `script-src 'nonce-${nonce}' ${cspSource}`
  ].join('; ');

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Security-Policy" content="${csp}" />
<style nonce="${nonce}">
/* Map VS Code theme tokens → RPUI CSS vars so the prototype chrome matches the editor theme */
:root {
  --rp-bg: var(--vscode-editor-background, #f6f7f9);
  --rp-surface: var(--vscode-sideBar-background, #ffffff);
  --rp-surface-soft: var(--vscode-editorGroupHeader-tabsBackground, #f9fafb);
  --rp-text: var(--vscode-editor-foreground, #111827);
  --rp-muted: var(--vscode-descriptionForeground, #6b7280);
  --rp-border: var(--vscode-panel-border, #e5e7eb);
  --rp-border-strong: var(--vscode-editorWidget-border, #d1d5db);
  --rp-primary: var(--vscode-button-background, #2563eb);
  /* pick-mode highlight colors from VS Code selection tokens */
  --rpui-pick-hover: var(--vscode-editor-hoverHighlightBackground, rgba(99,102,241,.07));
  --rpui-pick-hover-border: var(--vscode-focusBorder, rgba(99,102,241,.8));
  --rpui-pick-selected: var(--vscode-editor-selectionBackground, rgba(37,99,235,.12));
  --rpui-pick-selected-border: var(--vscode-editor-selectionHighlightBorder, rgba(37,99,235,1));
}
html,body { margin:0; background:var(--rp-bg); }
#rpml-error { display:none; font-family:ui-monospace,SFMono-Regular,monospace; color:var(--vscode-editorError-foreground,#b00020); padding:16px; white-space:pre-wrap; }
#rpml-error.show { display:block; }
#rpml-empty { font-family:var(--vscode-font-family,-apple-system,sans-serif); color:var(--rp-muted); padding:24px; }
</style>
</head>
<body>
<div id="rpml-empty">RPML 预览已就绪，等待内容…</div>
<div id="rpml-root"></div>
<pre id="rpml-error"></pre>
<script type="module" nonce="${nonce}">
  import { createDocRenderer, ModeManager } from "${runtimeUri}";
  const root  = document.getElementById('rpml-root');
  const err   = document.getElementById('rpml-error');
  const empty = document.getElementById('rpml-empty');
  const vscode = acquireVsCodeApi();

  const renderer = createDocRenderer(root, {
    annotateLines: true,
    onError: msg => {
      if (msg) { err.textContent = 'RPML 渲染错误：' + msg; err.classList.add('show'); }
      else { err.classList.remove('show'); }
    }
  });
  // pick mode by default: clicking an element focuses its source line in the editor
  const manager = new ModeManager(root, {
    mode: 'pick',
    onPick: info => vscode.postMessage({ type: 'pick', line: info.line, tag: info.tag, langTag: info.langTag, pin: info.pin }),
  });

  window.addEventListener('message', ev => {
    const msg = ev.data;
    if (!msg || msg.type !== 'render') return;
    empty.style.display = 'none';
    renderer.render(msg.source);
  });

  vscode.postMessage({ type: 'ready' });
<\/script>
</body>
</html>`;
}
