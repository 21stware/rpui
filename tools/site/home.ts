import type { Ctx } from '../build-site.ts';

const HERO_CODE = `<span class="t">&lt;page</span> <span class="a">title</span>=<span class="v">"用户管理"</span> <span class="a">route</span>=<span class="v">"/users"</span><span class="t">&gt;</span>
  <span class="t">&lt;view</span> <span class="a">device</span>=<span class="v">"web"</span> <span class="a">scale</span>=<span class="v">"0.65"</span><span class="t">&gt;</span>
    <span class="t">&lt;viewport</span> <span class="a">device</span>=<span class="v">"web"</span><span class="t">&gt;</span>
      <span class="t">&lt;navigator</span> <span class="a">data-pin</span>=<span class="v">"1"</span><span class="t">&gt;</span>
        <span class="t">&lt;search</span> <span class="a">state</span>=<span class="v">"filled"</span> <span class="a">value</span>=<span class="v">"张"</span><span class="t">/&gt;</span>
      <span class="t">&lt;/navigator&gt;</span>
      <span class="t">&lt;table</span> <span class="a">rows</span>=<span class="v">"8"</span> <span class="a">has-checkbox</span> <span class="a">data-pin</span>=<span class="v">"2"</span><span class="t">/&gt;</span>
    <span class="t">&lt;/viewport&gt;</span>
  <span class="t">&lt;/view&gt;</span>

  <span class="c">&lt;!-- 每个 data-pin 配一条规格注释 --&gt;</span>
  <span class="t">&lt;annotation</span> <span class="a">id</span>=<span class="v">"1"</span> <span class="a">label</span>=<span class="v">"顶部导航"</span><span class="t">&gt;</span>...<span class="t">&lt;/annotation&gt;</span>
<span class="t">&lt;/page&gt;</span>`;

function feat(ic: string, h: string, p: string): string {
  return `<div class="feat"><div class="ic">${ic}</div><h3>${h}</h3><p>${p}</p></div>`;
}

const I = {
  layers: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
  zap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>',
  check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  bot: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h0M16 16h0"/></svg>',
  term: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 17 6-6-6-6M12 19h8"/></svg>',
  box: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
};

export function buildHome(ctx: Ctx): string {
  const body = `
<section class="hero">
  <div class="hero-in">
    <span class="eyebrow">⬡ RPML · Rapid Prototype Markup Language</span>
    <h1>把时间轴<span class="grad">压平为空间</span><br/>的静态原型语言</h1>
    <p>RPUI 用原生 Web Components 渲染 <code>.rpml</code> 标记。交互状态、权限分支、加载 / 空 / 错误态，全部铺陈在一份可交付、可验证、可生成代码的静态文档里。</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="guide.html">阅读文档 →</a>
      <a class="btn btn-ghost" href="examples.html">查看示例</a>
    </div>
    <div class="codewin">
      <div class="codewin-bar"><i></i><i></i><i></i><span>users.rpml</span></div>
      <pre>${HERO_CODE}</pre>
    </div>
  </div>
</section>

<div class="section-head"><h2>为什么是 RPML</h2><p>不是又一个原型工具，而是给工程交付和 QA 的完整规格语言。</p></div>
<section class="features">
  ${feat(I.layers, '完整覆盖状态', '一个页面在真实运行中的数十种状态——选中、展开、权限受限、加载、空、错误——全部在同一份文档里显式呈现。')}
  ${feat(I.zap, '零运行时依赖', '一个 .rpml 文件 + 一个 rpui.js 渲染器。无框架、无 CDN、无构建。导入即注册全部自定义元素。')}
  ${feat(I.bot, 'Agent 友好', 'llms.txt 是权威组件参考，标记可由 LLM 直接生成与审查，配套 prompt 模板与压缩规格。')}
  ${feat(I.check, '可机器验证', 'XSD + 语义校验：pin↔annotation 引用完整性、结构约束，rpml validate 一键检查。')}
  ${feat(I.term, 'CLI 编译', 'rpml-compile 把一个目录的 .rpml 编译成带侧边栏导航的单 HTML 文件，纯 file:// 离线可用。')}
  ${feat(I.box, '109+ 组件', 'Web / iOS / macOS / Agent UI 全平台快照原语，覆盖表格、表单、浮层、反馈、对话流。')}
</section>

<div class="section-head" style="margin-top:80px"><h2>三步上手</h2><p>从一行导入到完整原型。</p></div>
<section class="features" style="margin-top:24px">
  ${feat('<b style="font-size:18px">1</b>', '导入运行时', '<code>&lt;script type="module" src="rpui.js"&gt;&lt;/script&gt;</code> —— 副作用注册全部自定义元素。')}
  ${feat('<b style="font-size:18px">2</b>', '编写快照', '用 <code>page</code> / <code>view</code> / 各类原语搭主快照，<code>data-pin</code> 标记关键区域。')}
  ${feat('<b style="font-size:18px">3</b>', '补全规格', '每个 pin 配 <code>annotation</code>，用 <code>enum</code> 穷举状态分支，写到实现深度。')}
</section>

<div style="text-align:center;padding:72px 28px 8px">
  <a class="btn btn-primary" href="guide.html">开始阅读语言规格 →</a>
</div>
`;
  return ctx.page({ title: 'RPUI — Rapid Prototype UI', active: 'home', version: ctx.VERSION }, body);
}
