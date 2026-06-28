/** Doc metadata + hand-authored API reference for the dev app 文档 view.
 *  The actual spec/skill Markdown is loaded raw via import.meta.glob in index.html;
 *  these lists just give reading order + display titles. */

export const REPO = "https://github.com/21stware/rpui";

// Spec docs in reading order, keyed by repo-relative path, with display titles.
export const SPEC_DOCS = [
  ["spec/00-overview.md", "设计哲学"],
  ["spec/01-syntax.md", "基础语法"],
  ["spec/02-document-structure.md", "文档结构"],
  ["spec/03-element-model.md", "元素模型"],
  ["spec/04-annotation-model.md", "注释模型"],
  ["spec/05-state-machine.md", "状态机声明"],
  ["spec/06-permission-model.md", "权限模型"],
  ["spec/07-enum-model.md", "枚举分支"],
  ["spec/08-data-binding.md", "数据绑定"],
  ["spec/09-boundary-conditions.md", "边界条件"],
  ["spec/10-versioning.md", "版本策略"],
  ["spec/react.md", "React 集成"],
];

export const SKILL_DOCS = [
  ["rapid-prototype-implement/SKILL.md", "技能总览"],
  ["rapid-prototype-implement/references/practise.md", "生成实践"],
  ["rapid-prototype-implement/references/spec-summary.md", "压缩规格"],
  ["rapid-prototype-implement/references/element-index.md", "元素索引"],
];

// Examples gallery — by-depth ordering, file path relative to examples/.
export const EXAMPLES = [
  { file: "01-minimal", level: "入门", title: "最小示例", desc: "最小合法 RPML 文件：一个 pin、一条注释。" },
  { file: "02-form-page", level: "低", title: "注册表单", desc: "客户端字段验证，5 种字段状态枚举。" },
  { file: "03-list-with-filter", level: "中", title: "商品列表", desc: "多维筛选 + 表格，loading / empty / error 全态。" },
  { file: "04-ticket-desk", level: "高", title: "工单服务台", desc: "黄金范例：8 顶级注释、权限矩阵、详情抽屉。" },
  { file: "05-dashboard", level: "中高", title: "运营数据看板", desc: "独立卡片加载、告警阈值、图表占位。" },
  { file: "06-multi-step-wizard", level: "中", title: "多步骤向导", desc: "四步流程，每步 valid / invalid / pending。" },
  { file: "07-task-management", level: "高", title: "任务管理看板", desc: "任务列表、批量操作、抽屉、权限差异。" },
  { file: "08-mobile-chat", level: "中", title: "移动端即时消息", desc: 'device="mobile" 设备预设，会话列表。' },
  { file: "09-checkout-flow/index", level: "中", title: "结算流程（两屏）", desc: "anchor 跨页跳转 + diagram 流程图 + annotation-global 总览。" },
  { file: "10-doc-mode", level: "中", title: "文档模式", desc: "doc-* 文档原语：标题、段落、列表、代码、表格。" },
];

// API & CLI reference, authored as Markdown so it renders through the same
// pipeline as the spec docs (and gets a TOC for free). Ported from the former
// tools/site/api.ts. The element index table is appended at load time from
// rapid-prototype-implement/references/element-index.md (single source).
export const API_DOC_MD = `# API & CLI

monorepo 各包的导出、命令行工具用法，以及全部 RPML 元素索引。

## 包

| 包 | 说明 | 导出 |
| --- | --- | --- |
| \`@21stware/rpui\` | Web Components 运行时（渲染器） | \`registerAll()\` · 副作用注册全部自定义元素 |
| \`rpml-parser\` | .rpml → AST / DOM | \`parse\` · \`parseNode\` · \`parseToPage\` · \`astToDom\` · \`expandSelfClosing\` |
| \`rpml-validator\` | 结构 + 语义校验 | \`validate(ast)\` → \`ValidationError[]\` |
| \`rpml-compiler\` | 目录 → 单 HTML | \`collectRpml(dir)\` · \`compileDocs(docs)\` |

## 运行时加载

三种方式把 \`.rpml\` 渲染到页面：

### 1. 内联标记

\`\`\`html
<script type="module" src="dist/rpui.js"></script>
<page title="..."> ... </page>
\`\`\`

### 2. 加载器元素

\`\`\`html
<script type="module" src="dist/rpml-loader.js"></script>
<rpml-app src="./page.rpml"></rpml-app>
\`\`\`

### 3. 编程式

\`\`\`js
import { parseToPage } from 'rpml-parser';
document.body.appendChild(parseToPage(rpmlSource));
\`\`\`

## 解析与校验

\`\`\`ts
import { parseNode } from 'rpml-parser';
import { validate } from 'rpml-validator';

const ast = parseNode(rpmlText);        // 任意环境（Bun/Node/浏览器），无需 DOMParser
const errors = validate(ast);            // [{ path, message, severity }]
const fatal = errors.filter(e => e.severity === 'error');
\`\`\`

## 命令行工具

### rpml validate

校验单个 \`.rpml\` 文件的结构与 pin↔annotation 引用完整性。

\`\`\`bash
bun run validate examples/04-ticket-desk.rpml
# 或：bash tools/validate-examples.sh   # 校验全部示例
\`\`\`

### rpml-compile

把一个目录的 \`.rpml\` 编译成带侧边栏导航的单 HTML 文件，\`index.rpml\` 作主页，纯 \`file://\` 离线可用。

\`\`\`bash
bun run compile <dir> -o out.html [--title "..."]

# 示例：把 examples/ 编译成一个门户
bun run compile examples -o examples.html
\`\`\`

| 参数 | 说明 |
| --- | --- |
| \`<dir>\` | 包含 .rpml 的目录（递归扫描） |
| \`-o, --out\` | 输出 HTML 路径（默认取目录名） |
| \`--title\` | 站点标题（默认取目录名） |

### rpui serve

把当前目录的 \`.rpml\` 作为一个带侧边栏的文档集本地托管，启动后打印本地访问地址并自动打开浏览器。每次刷新都会重新扫描目录，编辑后刷新即可看到更新——无需构建、无需 watcher。

\`\`\`bash
npx @21stware/rpui serve .

# 指定目录与端口
npx @21stware/rpui serve ./prototypes --port 4000

# 不自动打开浏览器（headless / CI）
npx @21stware/rpui serve . --no-open
\`\`\`

| 参数 | 说明 |
| --- | --- |
| \`[dir]\` | 要托管的目录（默认当前目录） |
| \`-p, --port\` | 端口（默认 3000，占用时自动 +1） |
| \`--host\` | 主机（默认 localhost） |
| \`--no-open\` | 启动后不自动打开浏览器 |

### rpui build

把一个目录的 \`.rpml\` 编译成单个自包含 HTML 文件（内联运行时 + 带侧边栏的文档集），纯 \`file://\` 离线可用。与 \`serve\` 共享同一套零依赖运行时，\`index.rpml\` 作默认主页。

\`\`\`bash
npx @21stware/rpui build .

# 指定输出路径与标题
npx @21stware/rpui build ./prototypes -o prototypes.html --title "原型集"
\`\`\`

| 参数 | 说明 |
| --- | --- |
| \`[dir]\` | 包含 .rpml 的目录（递归扫描，默认当前目录） |
| \`-o, --out\` | 输出 HTML 路径（默认取目录名） |
| \`--title\` | 文档集标题（默认取目录名） |

## 元素索引

全部 RPML 元素一句话索引。完整属性见**组件**视图与 [spec/elements](${REPO}/tree/main/spec/elements)。
`;
