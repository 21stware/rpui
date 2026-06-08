import type { Ctx } from '../build-site.ts';

/** Component browser — reuses preview/components.js (COMPONENTS catalog).
 *  Search + render preview + attribute table + source, inside site chrome. */
export function buildComponents(ctx: Ctx): string {
  const head = `<style>
  .cx{display:grid;grid-template-columns:288px minmax(0,1fr);height:calc(100vh - 60px)}
  .cx-side{display:flex;flex-direction:column;border-right:1px solid var(--line);background:var(--surface);min-height:0}
  .cx-shead{padding:18px 16px 12px;border-bottom:1px solid var(--line)}
  .cx-search{width:100%;height:38px;padding:0 12px;border:1px solid var(--line);border-radius:9px;font-size:14px;font-family:var(--sans);outline:none}
  .cx-search:focus{border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-wash)}
  .cx-list{flex:1;overflow-y:auto;padding:8px}
  .cx-grp{padding:12px 8px 4px;font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
  .cx-item{display:block;padding:6px 11px;border-radius:7px;font-size:13px;color:var(--ink-2);cursor:pointer;font-family:var(--mono)}
  .cx-item:hover{background:var(--line-2);color:var(--ink)}
  .cx-item.active{background:var(--brand-wash);color:var(--brand-ink);font-weight:600}
  .cx-count{padding:8px 12px 12px;font-size:11px;color:var(--muted)}
  .cx-main{overflow-y:auto;min-height:0;padding:40px 48px 80px}
  .cx-title{margin:0;font-size:28px;font-weight:800;letter-spacing:-.02em;font-family:var(--mono)}
  .cx-tag{display:inline-block;margin:4px 0 24px;font-size:13px;color:var(--muted)}
  .cx-card{border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);margin-bottom:20px;overflow:hidden}
  .cx-chead{padding:10px 16px;font-size:12px;font-weight:650;color:var(--muted);border-bottom:1px solid var(--line);background:var(--line-2)}
  .cx-render{padding:28px;display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
  .cx-code{margin:0;padding:16px 18px;font-family:var(--mono);font-size:12.5px;line-height:1.7;color:var(--code-ink);background:var(--code-bg);white-space:pre-wrap;word-break:break-word}
  table.cx-attrs{width:100%;border-collapse:collapse}
  .cx-attrs th,.cx-attrs td{text-align:left;padding:10px 16px;font-size:13.5px;border-bottom:1px solid var(--line)}
  .cx-attrs th{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
  .cx-attrs tr:last-child td{border-bottom:0}
  .cx-attrs td:first-child{font-family:var(--mono);color:var(--brand-ink);white-space:nowrap;width:1%}
  </style>
  <script type="module" src="dist/rpui.js"></script>`;

  const body = `
<div class="cx">
  <aside class="cx-side">
    <div class="cx-shead"><input class="cx-search" type="search" id="cx-search" placeholder="搜索组件…" autocomplete="off" /></div>
    <nav class="cx-list" id="cx-list"></nav>
    <div class="cx-count" id="cx-count"></div>
  </aside>
  <main class="cx-main" id="cx-main"></main>
</div>`;

  const script = `<script type="module">
import { COMPONENTS } from './components.js';
import { rewriteTags } from './dist/rpui.js';
const listEl=document.getElementById('cx-list'),mainEl=document.getElementById('cx-main'),
  searchEl=document.getElementById('cx-search'),countEl=document.getElementById('cx-count');
let active=COMPONENTS[0]?.name;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const filtered=q=>{q=q.trim().toLowerCase();return q?COMPONENTS.filter(c=>c.name.toLowerCase().includes(q)||c.group.toLowerCase().includes(q)):COMPONENTS;};
function renderList(q){
  const items=filtered(q);
  countEl.textContent=items.length+' / '+COMPONENTS.length+' 个组件';
  if(!items.length){listEl.innerHTML='<div class="cx-count">无匹配</div>';return;}
  let html='',last=null;
  for(const c of items){
    if(c.group!==last){html+='<div class="cx-grp">'+esc(c.group)+'</div>';last=c.group;}
    html+='<div class="cx-item'+(c.name===active?' active':'')+'" data-name="'+c.name+'">'+esc(c.name)+'</div>';
  }
  listEl.innerHTML=html;
  listEl.querySelectorAll('.cx-item').forEach(el=>el.addEventListener('click',()=>{active=el.dataset.name;location.hash=active;renderList(searchEl.value);renderMain();}));
}
function renderMain(){
  const c=COMPONENTS.find(x=>x.name===active);
  if(!c){mainEl.innerHTML='<div class="cx-count">选择左侧组件</div>';return;}
  const rows=c.attrs.map(([a,d])=>'<tr><td>'+esc(a)+'</td><td>'+esc(d)+'</td></tr>').join('');
  mainEl.innerHTML='<h1 class="cx-title">'+esc(c.name)+'</h1><span class="cx-tag">'+esc(c.group)+'</span>'
    +'<div class="cx-card"><div class="cx-chead">渲染预览</div><div class="cx-render">'+rewriteTags(c.html)+'</div></div>'
    +'<div class="cx-card"><div class="cx-chead">属性</div><table class="cx-attrs"><thead><tr><th>属性</th><th>说明</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
    +'<div class="cx-card"><div class="cx-chead">源码</div><pre class="cx-code">'+esc(c.html)+'</pre></div>';
}
searchEl.addEventListener('input',()=>{const items=filtered(searchEl.value);if(items.length&&!items.find(x=>x.name===active)){active=items[0].name;renderMain();}renderList(searchEl.value);});
const hash=decodeURIComponent(location.hash.slice(1));
if(hash&&COMPONENTS.find(c=>c.name===hash))active=hash;
renderList('');renderMain();
</script>`;

  return ctx.page({ title: '组件 — RPUI', active: 'components', version: ctx.VERSION, head, bodyEnd: script }, body);
}
