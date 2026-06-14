import type { Ctx } from '../build-site.ts';

const EXAMPLES: { file: string; level: string; title: string; desc: string }[] = [
  { file: '01-minimal', level: '入门', title: '最小示例', desc: '最小合法 RPML 文件：一个 pin、一条注释。' },
  { file: '02-form-page', level: '低', title: '注册表单', desc: '客户端字段验证，5 种字段状态枚举。' },
  { file: '03-list-with-filter', level: '中', title: '商品列表', desc: '多维筛选 + 表格，loading / empty / error 全态。' },
  { file: '04-ticket-desk', level: '高', title: '工单服务台', desc: '黄金范例：8 顶级注释、权限矩阵、详情抽屉。' },
  { file: '05-dashboard', level: '中高', title: '运营数据看板', desc: '独立卡片加载、告警阈值、图表占位。' },
  { file: '06-multi-step-wizard', level: '中', title: '多步骤向导', desc: '四步流程，每步 valid / invalid / pending。' },
  { file: '07-task-management', level: '高', title: '任务管理看板', desc: '任务列表、批量操作、抽屉、权限差异。' },
  { file: '08-mobile-chat', level: '中', title: '移动端即时消息', desc: 'device="mobile" 设备预设，会话列表。' },
  { file: '09-checkout-flow/index', level: '中', title: '结算流程（两屏）', desc: 'anchor 跨页跳转 + diagram 流程图 + annotation-global 总览。' },
];

export function buildExamples(ctx: Ctx): string {
  const cards = EXAMPLES.map(e => {
    const url = `playground.html?rpml=examples/${e.file}.rpml`;
    return `<a class="ex-card" href="${url}" target="_blank" rel="noopener">
      <div class="ex-thumb"><iframe src="${url}" loading="lazy" tabindex="-1"></iframe></div>
      <div class="ex-body"><span class="tag">${e.file}.rpml · ${e.level}</span><h3>${e.title}</h3><p>${e.desc}</p></div>
    </a>`;
  }).join('\n');

  const body = `
<div class="page-intro">
  <h1>示例画廊</h1>
  <p>由浅入深的 <code>.rpml</code> 原型。点击任意卡片在 Playground 中打开；也可把整个文件夹拖进 Playground 构建带侧边栏的文档集。</p>
</div>
<section class="ex-grid">${cards}</section>
<div style="text-align:center;padding:48px 28px 8px">
  <a class="btn btn-ghost" href="playground.html">打开 Playground →</a>
</div>`;

  const script = `<script>
// scale each thumbnail iframe (1440px design width) to fit its card
function scale(){document.querySelectorAll('.ex-thumb').forEach(t=>{
  const f=t.querySelector('iframe');if(!f)return;const s=t.clientWidth/1440;
  f.style.transform='scale('+s+')';f.style.width='1440px';f.style.height=(190/s)+'px';});}
window.addEventListener('load',scale);window.addEventListener('resize',scale);scale();
</script>`;

  return ctx.page({ title: '示例 — RPUI', active: 'examples', version: ctx.VERSION, path: 'examples.html', description: 'RPML 原型示例 — 邮件客户端、工单系统、数据仪表盘等真实产品用例。', bodyEnd: script }, body);
}
