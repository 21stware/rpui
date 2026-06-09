import type { Ctx } from '../build-site.ts';

/** API & CLI reference page. Hand-authored structure, but the element index
 *  table is pulled from rapid-prototype-implement/references/element-index.md (single source). */
export function buildApi(ctx: Ctx): string {
  // Render the element index markdown (a big table) into the page.
  let elementIndex = '';
  try { elementIndex = ctx.markdown(ctx.read('rapid-prototype-implement/references/element-index.md')).html; }
  catch { elementIndex = '<p>（元素索引未找到）</p>'; }

  const body = `
<div class="page-intro">
  <h1>API &amp; CLI</h1>
  <p>monorepo 各包的导出、命令行工具用法，以及全部 RPML 元素索引。</p>
</div>

<div class="wrap prose" style="padding-top:32px">

<h2 id="packages">包</h2>
<table>
<thead><tr><th>包</th><th>说明</th><th>导出</th></tr></thead>
<tbody>
<tr><td><code>@21stware/rpui</code></td><td>Web Components 运行时（渲染器）</td><td><code>registerAll()</code> · 副作用注册全部自定义元素</td></tr>
<tr><td><code>rpml-parser</code></td><td>.rpml → AST / DOM</td><td><code>parse</code> · <code>parseNode</code> · <code>parseToPage</code> · <code>astToDom</code> · <code>expandSelfClosing</code> · <code>RpmlNode</code></td></tr>
<tr><td><code>rpml-validator</code></td><td>结构 + 语义校验</td><td><code>validate(ast)</code> → <code>ValidationError[]</code></td></tr>
<tr><td><code>rpml-compiler</code></td><td>目录 → 单 HTML</td><td><code>collectRpml(dir)</code> · <code>compileDocs(docs)</code></td></tr>
</tbody>
</table>

<h2 id="runtime">运行时加载</h2>
<p>三种方式把 <code>.rpml</code> 渲染到页面：</p>
<h3>1. 内联标记</h3>
<pre class="code" data-lang="html"><code>&lt;script type="module" src="dist/rpui.js"&gt;&lt;/script&gt;
&lt;page title="..."&gt; ... &lt;/page&gt;</code></pre>
<h3>2. 加载器元素</h3>
<pre class="code" data-lang="html"><code>&lt;script type="module" src="dist/rpml-loader.js"&gt;&lt;/script&gt;
&lt;rpml-app src="./page.rpml"&gt;&lt;/rpml-app&gt;
&lt;!-- 或 URL 参数：playground.html?rpml=./page.rpml --&gt;</code></pre>
<h3>3. 编程式</h3>
<pre class="code" data-lang="js"><code>import { parseToPage } from 'rpml-parser';
document.body.appendChild(parseToPage(rpmlSource));</code></pre>

<h2 id="parser">解析与校验</h2>
<pre class="code" data-lang="ts"><code>import { parseNode } from 'rpml-parser';
import { validate } from 'rpml-validator';

const ast = parseNode(rpmlText);        // 任意环境（Bun/Node/浏览器），无需 DOMParser
const errors = validate(ast);            // [{ path, message, severity }]
const fatal = errors.filter(e =&gt; e.severity === 'error');</code></pre>

<h2 id="cli">命令行工具</h2>

<h3>rpml validate</h3>
<p>校验单个 <code>.rpml</code> 文件的结构与 pin↔annotation 引用完整性。</p>
<pre class="code" data-lang="bash"><code>bun run validate examples/04-ticket-desk.rpml
# 或：bash tools/validate-examples.sh   # 校验全部示例</code></pre>

<h3>rpml-compile</h3>
<p>把一个目录的 <code>.rpml</code> 编译成带侧边栏导航的单 HTML 文件，<code>index.rpml</code> 作主页，纯 <code>file://</code> 离线可用。</p>
<pre class="code" data-lang="bash"><code>bun run compile &lt;dir&gt; -o out.html [--title "..."]

# 示例：把 examples/ 编译成一个门户
bun run compile examples -o examples.html</code></pre>
<table>
<thead><tr><th>参数</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>&lt;dir&gt;</code></td><td>包含 .rpml 的目录（递归扫描）</td></tr>
<tr><td><code>-o, --out</code></td><td>输出 HTML 路径（默认取目录名）</td></tr>
<tr><td><code>--title</code></td><td>站点标题（默认取目录名）</td></tr>
</tbody>
</table>

<h3>rpui serve</h3>
<p>把当前目录的 <code>.rpml</code> 作为一个带侧边栏的文档集本地托管，启动后打印本地访问地址并自动打开浏览器。每次刷新都会重新扫描目录，编辑后刷新即可看到更新——无需构建、无需 watcher。</p>
<pre class="code" data-lang="bash"><code>npx @21stware/rpui serve .

# 指定目录与端口
npx @21stware/rpui serve ./prototypes --port 4000

# 不自动打开浏览器（headless / CI）
npx @21stware/rpui serve . --no-open</code></pre>
<table>
<thead><tr><th>参数</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>[dir]</code></td><td>要托管的目录（默认当前目录）</td></tr>
<tr><td><code>-p, --port</code></td><td>端口（默认 3000，占用时自动 +1）</td></tr>
<tr><td><code>--host</code></td><td>主机（默认 localhost）</td></tr>
<tr><td><code>--no-open</code></td><td>启动后不自动打开浏览器</td></tr>
</tbody>
</table>

<h3>rpui build</h3>
<p>把一个目录的 <code>.rpml</code> 编译成单个自包含 HTML 文件（内联运行时 + 带侧边栏的文档集），纯 <code>file://</code> 离线可用。与 <code>serve</code> 共享同一套零依赖运行时，<code>index.rpml</code> 作默认主页。</p>
<pre class="code" data-lang="bash"><code>npx @21stware/rpui build .

# 指定输出路径与标题
npx @21stware/rpui build ./prototypes -o prototypes.html --title "原型集"</code></pre>
<table>
<thead><tr><th>参数</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>[dir]</code></td><td>包含 .rpml 的目录（递归扫描，默认当前目录）</td></tr>
<tr><td><code>-o, --out</code></td><td>输出 HTML 路径（默认取目录名）</td></tr>
<tr><td><code>--title</code></td><td>文档集标题（默认取目录名）</td></tr>
</tbody>
</table>

<h2 id="viewer">Playground</h2>
<p><a href="playground.html">Playground</a> 支持三种加载：URL 参数 <code>?rpml=</code>、拖拽单个 <code>.rpml</code>、拖拽<strong>文件夹</strong>构建带侧边栏的文档集（按文件路径生成导航树，hash 路由，<code>index.rpml</code> 作默认主页）。</p>

<h2 id="elements">元素索引</h2>
<p>全部 RPML 元素一句话索引。完整属性见<a href="components.html">组件</a>页与 <a href="${ctx.REPO}/tree/main/spec/elements" target="_blank" rel="noopener">spec/elements</a>。</p>
${elementIndex}

</div>`;

  return ctx.page({ title: 'API — RPUI', active: 'api', version: ctx.VERSION }, body);
}
