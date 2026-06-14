import { join } from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import type { Ctx } from '../build-site.ts';
import type { Heading } from './markdown.ts';

interface DocPage { id: string; title: string; html: string; headings: Heading[]; }
interface NavGroup { label: string; items: { id: string; title: string }[]; }

// Spec docs in reading order, with display titles.
const SPEC_DOCS: [file: string, title: string][] = [
  ['spec/00-overview.md', '设计哲学'],
  ['spec/01-syntax.md', '基础语法'],
  ['spec/02-document-structure.md', '文档结构'],
  ['spec/03-element-model.md', '元素模型'],
  ['spec/04-annotation-model.md', '注释模型'],
  ['spec/05-state-machine.md', '状态机声明'],
  ['spec/06-permission-model.md', '权限模型'],
  ['spec/07-enum-model.md', '枚举分支'],
  ['spec/08-data-binding.md', '数据绑定'],
  ['spec/09-boundary-conditions.md', '边界条件'],
  ['spec/10-versioning.md', '版本策略'],
  ['spec/react.md', 'React 集成'],
];

const SKILL_DOCS: [file: string, title: string][] = [
  ['rapid-prototype-implement/SKILL.md', '技能总览'],
  ['rapid-prototype-implement/references/practise.md', '生成实践'],
  ['rapid-prototype-implement/references/spec-summary.md', '压缩规格'],
  ['rapid-prototype-implement/references/element-index.md', '元素索引'],
];

function firstTitle(md: string, fallback: string): string {
  const m = md.match(/^#{1,2}\s+(.+)$/m);
  return m ? m[1].replace(/^\d+\s*—\s*/, '').trim() : fallback;
}

export function buildGuide(ctx: Ctx): string {
  const pages: DocPage[] = [];
  const groups: NavGroup[] = [
    { label: '语言规格', items: [] },
    { label: '技能', items: [] },
  ];

  const ingest = (file: string, title: string, group: NavGroup) => {
    const src = ctx.read(file);
    const id = file.replace(/^(spec|rapid-prototype-implement\/references|rapid-prototype-implement)\//, '').replace(/\.md$/, '').replace(/[\/]/g, '-');
    const { html, headings } = ctx.markdown(src);
    pages.push({ id, title, html, headings });
    group.items.push({ id, title });
  };

  for (const [f, t] of SPEC_DOCS) ingest(f, t, groups[0]);
  for (const [f, t] of SKILL_DOCS) ingest(f, t, groups[1]);

  // Sidebar
  const sidebar = groups.map(g =>
    `<div class="grp">${g.label}</div>` +
    g.items.map(it => `<a href="#${it.id}" data-doc="${it.id}">${ctx.escapeHtml(it.title)}</a>`).join('')
  ).join('');

  // All docs rendered into one stream; JS toggles visibility + TOC per doc.
  const articles = pages.map((p, idx) =>
    `<article class="prose doc-article" data-doc="${p.id}"${idx ? ' hidden' : ''}>${p.html}</article>`
  ).join('\n');

  // Per-doc TOC data for the right rail
  const tocData = JSON.stringify(Object.fromEntries(pages.map(p => [p.id, p.headings])));

  const body = `
<div class="doc">
  <aside class="doc-side" id="doc-side">${sidebar}</aside>
  <main class="doc-main" id="doc-main">${articles}
    <div class="doc-foot">
      <a href="${ctx.REPO}/tree/main/spec" target="_blank" rel="noopener">在 GitHub 编辑此文档 ↗</a>
      <span></span>
    </div>
  </main>
  <nav class="doc-toc" id="doc-toc"><div class="lbl">本页</div><div id="toc-list"></div></nav>
</div>`;

  const script = `<script>
const TOC = ${tocData};
const side = document.getElementById('doc-side');
const tocList = document.getElementById('toc-list');
const articles = [...document.querySelectorAll('.doc-article')];
function show(id){
  articles.forEach(a => a.hidden = a.dataset.doc !== id);
  side.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.doc === id));
  const hs = TOC[id] || [];
  tocList.innerHTML = hs.map(h => '<a href="#'+id+'::'+h.id+'" class="'+(h.level===3?'lvl3':'')+'">'+h.text+'</a>').join('');
  window.scrollTo(0,0);
}
function route(){
  const raw = decodeURIComponent(location.hash.slice(1));
  const [docId, anchor] = raw.split('::');
  const valid = articles.find(a => a.dataset.doc === docId);
  const id = valid ? docId : articles[0].dataset.doc;
  show(id);
  if (anchor){ const el = document.getElementById(anchor); if(el) el.scrollIntoView(); }
}
side.addEventListener('click', e => {
  const a = e.target.closest('a[data-doc]'); if(!a) return;
  e.preventDefault(); history.pushState(null,'','#'+a.dataset.doc); show(a.dataset.doc);
});
tocList.addEventListener('click', e => {
  const a = e.target.closest('a'); if(!a) return;
  e.preventDefault(); const anchor = a.getAttribute('href').split('::')[1];
  const el = document.getElementById(anchor); if(el) el.scrollIntoView({behavior:'smooth'});
});
window.addEventListener('popstate', route);
route();
</script>`;

  return ctx.page(
    { title: '文档 — RPUI', active: 'guide', version: ctx.VERSION, path: 'guide.html', description: 'RPML 语言规格、React 集成指南 — 注释模型、状态枚举、权限门控、三种渲染模式。', bodyEnd: script },
    body
  );
}
