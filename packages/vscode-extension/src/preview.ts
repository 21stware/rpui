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
        () => { panel = undefined; previewedUri = undefined; },
        null,
        context.subscriptions
      );
      // The webview signals 'ready' once its module loads; flush the latest
      // source then (avoids a race where the first postMessage is dropped).
      panel.webview.onDidReceiveMessage(
        msg => {
          if (msg?.type === 'ready' && panel && previewedUri) {
            const doc = docFor(previewedUri);
            if (doc) postSource(panel, doc.getText(), previewedUri.toString());
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
  panel.webview.html = htmlShell(panel.webview, runtimeUri);
}

/** Push new source into the already-loaded webview. `key` identifies the
 *  document so the webview can preserve scroll across same-document re-renders. */
function postSource(panel: vscode.WebviewPanel, source: string, key: string) {
  panel.webview.postMessage({ type: 'render', source, key });
}

function htmlShell(webview: vscode.Webview, runtimeUri: vscode.Uri): string {
  const nonce = String(Math.random()).slice(2) + String(Date.now());
  const csp = [
    `default-src 'none'`,
    `style-src ${webview.cspSource} 'unsafe-inline'`,
    `img-src ${webview.cspSource} data:`,
    `font-src ${webview.cspSource} data:`,
    `script-src 'nonce-${nonce}' ${webview.cspSource}`
  ].join('; ');

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Security-Policy" content="${csp}" />
<style nonce="${nonce}">
  html,body{margin:0;background:#f6f7f9}
  #rpml-error{display:none;font-family:ui-monospace,SFMono-Regular,monospace;color:#b00020;padding:16px;white-space:pre-wrap}
  #rpml-error.show{display:block}
  #rpml-empty{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#6b7280;padding:24px}
</style>
</head>
<body>
<div id="rpml-empty">RPML 预览已就绪，等待内容…</div>
<div id="rpml-root"></div>
<pre id="rpml-error"></pre>
<script type="module" nonce="${nonce}">
  import { parseToPage } from "${runtimeUri}";
  const root = document.getElementById('rpml-root');
  const err = document.getElementById('rpml-error');
  const empty = document.getElementById('rpml-empty');
  let lastKey = null;

  // The annotation pane (.annotation-el-pane) scrolls independently of the
  // document, so capture both. Re-querying after render is required because
  // the page shell rebuilds its DOM.
  function captureScroll() {
    const sc = document.scrollingElement || document.documentElement;
    const pane = root.querySelector('.annotation-el-pane');
    return { docX: sc.scrollLeft, docY: sc.scrollTop, paneX: pane ? pane.scrollLeft : 0, paneY: pane ? pane.scrollTop : 0 };
  }

  function restoreScroll(pos) {
    const sc = document.scrollingElement || document.documentElement;
    sc.scrollLeft = pos.docX; sc.scrollTop = pos.docY;
    const pane = root.querySelector('.annotation-el-pane');
    if (pane) { pane.scrollLeft = pos.paneX; pane.scrollTop = pos.paneY; }
  }

  function render(source, key) {
    empty.style.display = 'none';
    // Only preserve scroll when re-rendering the same document, not on switch.
    const pos = key === lastKey ? captureScroll() : null;
    try {
      root.replaceChildren(parseToPage(source));
      err.classList.remove('show');
    } catch (e) {
      err.textContent = 'RPML 渲染错误：' + (e && e.message ? e.message : String(e));
      err.classList.add('show');
    }
    lastKey = key;
    // The page shell computes pin overlays + header width on rAF; restore after
    // it settles so our offsets aren't clobbered.
    if (pos) requestAnimationFrame(() => requestAnimationFrame(() => restoreScroll(pos)));
  }

  window.addEventListener('message', (ev) => {
    const msg = ev.data;
    if (msg && msg.type === 'render') render(msg.source, msg.key);
  });
  // Signal readiness so the host can flush the first source.
  const vscode = acquireVsCodeApi();
  vscode.postMessage({ type: 'ready' });
</script>
</body>
</html>`;
}
