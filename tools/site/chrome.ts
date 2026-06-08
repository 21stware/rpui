/** Shared page chrome: HTML shell, header nav, footer. */

export const REPO = 'https://github.com/21stware/rpui';

const MARK = `<span class="mark">R</span>`;

export interface PageOpts {
  title: string;
  active: 'home' | 'guide' | 'components' | 'examples' | 'api';
  version: string;
  /** extra <head> markup (page-specific styles/scripts) */
  head?: string;
  /** extra markup before </body> */
  bodyEnd?: string;
  /** relative path prefix to site root, e.g. '' or '../' */
  base?: string;
}

function header(active: PageOpts['active'], version: string, base: string): string {
  const link = (id: string, href: string, label: string) =>
    `<a href="${base}${href}"${active === id ? ' class="active"' : ''}>${label}</a>`;
  return `<header class="nav">
  <a class="brand" href="${base}index.html">${MARK} RPUI <span class="ver">v${version}</span></a>
  <nav class="nav-links">
    ${link('guide', 'guide.html', '文档')}
    ${link('components', 'components.html', '组件')}
    ${link('examples', 'examples.html', '示例')}
    ${link('api', 'api.html', 'API')}
  </nav>
  <div class="nav-right">
    <a href="${base}llms.txt" target="_blank">llms.txt</a>
    <a class="nav-cta" href="${REPO}" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
      GitHub
    </a>
  </div>
</header>`;
}

function footer(base: string): string {
  return `<footer class="foot">
  <div class="foot-in">
    <div>
      <a class="brand" href="${base}index.html" style="margin-bottom:10px">${MARK} RPUI</a>
      <p style="max-width:280px;font-size:14px;color:var(--ink-2);margin:8px 0 0">Rapid Prototype UI — 把交互状态、权限分支、加载/空/错误态铺陈进一份静态文档。</p>
    </div>
    <div><h4>产品</h4><ul>
      <li><a href="${base}guide.html">语言文档</a></li>
      <li><a href="${base}components.html">组件参考</a></li>
      <li><a href="${base}examples.html">示例画廊</a></li>
      <li><a href="${base}api.html">API & CLI</a></li>
    </ul></div>
    <div><h4>资源</h4><ul>
      <li><a href="${base}llms.txt" target="_blank">llms.txt</a></li>
      <li><a href="${base}demo/viewer.html" target="_blank">RPML Viewer</a></li>
      <li><a href="${REPO}" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="${REPO}/issues" target="_blank" rel="noopener">Issues</a></li>
    </ul></div>
    <div class="copy">© ${new Date().getFullYear()} RPUI · MIT-style license · Built with Bun + Vite</div>
  </div>
</footer>`;
}

/** Wrap page body content in the full HTML shell with header + footer. */
export function page(opts: PageOpts, body: string): string {
  const base = opts.base ?? '';
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${opts.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${base}site.css" />
${opts.head ?? ''}
</head>
<body>
${header(opts.active, opts.version, base)}
${body}
${footer(base)}
${opts.bodyEnd ?? ''}
</body>
</html>`;
}
