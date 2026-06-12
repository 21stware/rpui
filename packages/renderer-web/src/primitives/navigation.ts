import { injectStyle } from '../core/style';
import { attr, csv, intAttr, escapeHtml } from '../core/dom';
import { icon } from '../core/icons';

export class BadgeElement extends HTMLElement { connectedCallback() { injectStyle(); const count = attr(this,'count','0'); const max = intAttr(this,'max',99); const n = Number(count); this.textContent = Number.isFinite(n) && n > max ? `${max}+` : count; } }
export class AvatarElement extends HTMLElement { connectedCallback() { injectStyle(); const size = attr(this,'size','32'); this.style.setProperty('--snap-size', `${size}px`); if (!this.textContent?.trim()) this.textContent = attr(this,'initials','U'); } }
export class ListElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady || this.children.length) return; this.dataset.rpReady='true'; const items = intAttr(this,'items',3); const state = attr(this,'state'); this.innerHTML = Array.from({length: items}, (_,i)=>`<list-item label="${['全部','未读','@ 我','已归档','设置'][i] || `Item ${i+1}`}" icon="${['inbox','message-square','at-sign','archive','settings'][i] || 'file'}"${state === 'first-selected' && i === 0 ? ' state="selected"' : ''}></list-item>`).join(''); } }
export class ListItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label', this.textContent?.trim() || 'Item'); const badge = attr(this,'badge'); const ic = attr(this,'icon'); this.innerHTML = `${ic ? icon(ic) : ''}<span class="list-el-label">${escapeHtml(label)}</span>${badge ? `<span class="list-el-badge">${escapeHtml(badge)}</span>` : ''}`; } }
export class TabsElement extends HTMLElement { connectedCallback() { injectStyle(); const active = attr(this,'active','0'); const numeric = Number(active); const children = Array.from(this.children) as HTMLElement[]; children.forEach((child, i) => { const label = child.getAttribute('label') || child.textContent?.trim() || ''; const isActive = Number.isFinite(numeric) ? i === numeric : label === active; child.classList.toggle('tab-el-active', isActive); }); } }
export class TabElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label', this.textContent?.trim() || 'Tab'); const badge = attr(this,'badge'); this.innerHTML = `<span>${escapeHtml(label)}</span>${badge ? `<span class="list-el-badge">${escapeHtml(badge)}</span>` : ''}`; } }
export class PaginationElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; const total = intAttr(this,'total',10); const current = intAttr(this,'current',1); const pageSize = intAttr(this,'page-size',10); const pages = Math.max(1, Math.ceil(total / pageSize)); const visible = Array.from({length: Math.min(pages,5)}, (_,i)=>i+1); this.innerHTML = `<span class="page-el-btn">${icon('chevron-left',14)}</span>${visible.map(p=>`<span class="page-el-btn${p===current?' active':''}">${p}</span>`).join('')}<span class="page-el-btn">${icon('chevron-right',14)}</span><span>共 ${total} 条</span>`; } }
export class StepsElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; const steps = csv(this,'steps','步骤一,步骤二,步骤三'); const active = intAttr(this,'active',0); this.innerHTML = steps.map((s,i)=>`<span class="rp-step ${i < active ? 'done' : i === active ? 'active' : ''}"><span class="rp-step-dot">${i < active ? icon('check',12) : i + 1}</span>${escapeHtml(s)}</span>${i < steps.length - 1 ? '<span class="rp-step-sep"></span>' : ''}`).join(''); } }
export class BreadcrumbElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady = 'true'; const items = csv(this,'items','首页,当前页'); this.innerHTML = items.map((item,i)=>`<span class="${i===items.length-1?'breadcrumb-el-current':''}">${escapeHtml(item)}</span>${i < items.length - 1 ? '<span>/</span>' : ''}`).join(''); } }

export class SegmentedElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const options = csv(this,'options','日,周,月'); const active = attr(this,'active','0'); const idx = Number(active); this.innerHTML = options.map((o,i)=>`<span class="rp-seg-item${(Number.isFinite(idx) ? i===idx : o===active) ? ' active' : ''}">${escapeHtml(o)}</span>`).join(''); } }
export class CommandPaletteElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const query = attr(this,'query'); const results = csv(this,'results','新建文件,打开设置,搜索工单,切换主题'); this.innerHTML = `<div class="rp-cmdk-input">${icon('search')}<span class="${query ? 'rp-value' : 'rp-placeholder'}">${escapeHtml(query || '输入命令…')}</span></div><div class="rp-cmdk-list">${results.map((r,i)=>`<div class="rp-cmdk-item${i===0?' active':''}">${icon('zap',14)}<span>${escapeHtml(r)}</span></div>`).join('')}</div>`; } }
export class ContextMenuElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady || this.children.length) return; this.dataset.rpReady='true'; const items = csv(this,'items','复制,重命名,移动到,删除'); this.innerHTML = items.map(it=>`<div class="menu-item${it==='删除'?' danger':''}"><span>${escapeHtml(it)}</span></div>`).join(''); } }
export class MenuElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class MenuItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label', this.textContent?.trim() || '菜单项'); const ic = attr(this,'icon'); const shortcut = attr(this,'shortcut'); const disabled = attr(this,'state')==='disabled'; this.innerHTML = `${ic ? icon(ic,14) : ''}<span class="menu-el-label">${escapeHtml(label)}</span>${shortcut ? `<span class="menu-el-shortcut">${escapeHtml(shortcut)}</span>` : ''}`; if (disabled) this.classList.add('disabled'); } }
export class TocElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady || this.children.length) return; this.dataset.rpReady='true'; const items = csv(this,'items','概述,安装,用法,API,常见问题'); this.innerHTML = items.map((it,i)=>`<span class="toc-el-item${i===0?' active':''}">${escapeHtml(it)}</span>`).join(''); } }
export class KbdElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const keys = csv(this,'keys','⌘,K'); this.innerHTML = keys.map(k=>`<kbd class="kbd-el-key">${escapeHtml(k)}</kbd>`).join('<span class="kbd-el-plus">+</span>'); } }

/** `<anchor to="other.rpml" section="3" label="...">` — cross-page navigation
 *  between prototype pages. Inside a gallery (playground / compiled / serve) it
 *  dispatches a cancelable `rp-anchor` event that the gallery resolves to a
 *  hash route (with optional `?section=` deep-link). With no gallery present
 *  (standalone `?rpml=` viewer) it falls back to a `?rpml=&section=` reload, so
 *  a single embedded page still navigates. */
export class AnchorElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const to = attr(this, 'to');
    const section = attr(this, 'section');
    const label = attr(this, 'label', this.textContent?.trim() || to || '跳转');
    const ic = attr(this, 'icon', 'arrow-right');
    this.innerHTML = `${ic ? icon(ic, 14) : ''}<span class="anchor-el-label">${escapeHtml(label)}</span>`;
    this.addEventListener('click', () => {
      if (!to) return;
      const ev = new CustomEvent('rp-anchor', { detail: { to, section, from: this }, bubbles: true, composed: true, cancelable: true });
      this.dispatchEvent(ev);
      if (ev.defaultPrevented) return; // a gallery handled the route
      // Standalone fallback: reload the single-page viewer with the new doc.
      const url = new URL(location.href);
      url.searchParams.set('rpml', to);
      if (section) url.searchParams.set('section', section); else url.searchParams.delete('section');
      location.href = url.toString();
    });
  }
}


