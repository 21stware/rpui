import { injectStyle } from '../core/style';
import { attr, csv, escapeHtml, intAttr } from '../core/dom';
import { icon } from '../core/icons';

// iOS (Apple HIG): component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const iosStyle = `
/* --- iOS --- */
ios-navbar, ios-navbar { display:block; width:100%; max-width:100%; background:var(--rp-a-ios-bar-94); border-bottom:1px solid var(--rp-c-ios-gray-4); padding:6px 12px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }
.ios-navbar-row { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; min-height:36px; }
.rp-ios-nav-leading { display:flex; align-items:center; gap:2px; color:var(--rp-c-ios-blue); font-size:15px; }
.rp-ios-nav-title { text-align:center; font-weight:600; font-size:16px; color:var(--rp-c-black); }
.rp-ios-nav-trailing { text-align:right; color:var(--rp-c-ios-blue); font-size:15px; }
.rp-ios-nav-large { font-size:30px; font-weight:700; color:var(--rp-c-black); padding:2px 2px 6px; }
ios-tabbar, ios-tabbar { display:flex; width:100%; max-width:100%; background:var(--rp-a-ios-bar-94); border-top:1px solid var(--rp-c-ios-gray-4); padding:6px 0 4px; }
.rp-ios-tab { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; color:var(--rp-c-ios-gray); font-size:10px; }
.rp-ios-tab.active { color:var(--rp-c-ios-blue); }
.rp-ios-tab-label { font-size:10px; }
ios-list, ios-list { display:block; border-radius:10px; background:var(--rp-c-white); overflow:hidden; width:fit-content; min-width:300px; border:1px solid var(--rp-c-ios-gray-5); font-family:-apple-system,sans-serif; }
.ios-list-header { padding:6px 16px; font-size:13px; color:var(--rp-c-ios-gray-label); background:var(--rp-c-ios-gray-6); text-transform:none; }
ios-list-item, ios-list-item { display:flex; align-items:center; gap:10px; padding:11px 16px; border-bottom:1px solid var(--rp-c-ios-gray-5); font-size:15px; color:var(--rp-c-black); }
ios-list-item:last-child, ios-list-item:last-child { border-bottom:0; }
.rp-ios-li-icon { display:grid; place-items:center; width:28px; height:28px; border-radius:6px; background:var(--rp-c-ios-blue); color:var(--rp-c-white); }
.rp-ios-li-label { flex:1; }
.rp-ios-li-detail { color:var(--rp-c-ios-gray); }
.rp-ios-li-chevron { color:var(--rp-c-ios-gray-3); }
ios-action-sheet, ios-action-sheet { display:flex; flex-direction:column; gap:8px; width:100%; max-width:100%; min-width:0; padding:8px; font-family:-apple-system,sans-serif; }
.rp-ios-as-group { border-radius:14px; overflow:hidden; background:var(--rp-a-white-82); backdrop-filter:blur(20px); }
.rp-ios-as-title { padding:14px; text-align:center; font-size:13px; color:var(--rp-c-ios-gray); border-bottom:1px solid var(--rp-c-mac-border); }
.rp-ios-as-action { padding:16px; text-align:center; font-size:18px; color:var(--rp-c-ios-blue); border-bottom:1px solid var(--rp-c-mac-border); }
.rp-ios-as-action:last-child { border-bottom:0; }
.rp-ios-as-action.destructive { color:var(--rp-c-ios-red); }
.rp-ios-as-action.cancel { font-weight:600; }
ios-alert, ios-alert { display:block; width:270px; border-radius:14px; overflow:hidden; background:var(--rp-a-white-92); backdrop-filter:blur(20px); font-family:-apple-system,sans-serif; }
.ios-alert-body { padding:18px 16px 14px; text-align:center; }
.ios-alert-title { font-size:17px; font-weight:600; color:var(--rp-c-black); }
.ios-alert-msg { margin-top:3px; font-size:13px; color:var(--rp-c-black); }
.ios-alert-actions { display:flex; border-top:1px solid var(--rp-c-mac-border); }
.ios-alert-btn { flex:1; padding:11px; text-align:center; font-size:17px; color:var(--rp-c-ios-blue); }
.ios-alert-btn.primary { font-weight:600; }
.ios-alert-btn:not(:last-child) { border-right:1px solid var(--rp-c-mac-border); }
ios-switch, ios-switch { display:inline-flex; align-items:center; gap:8px; font-family:-apple-system,sans-serif; font-size:15px; }
.ios-switch-track { width:51px; height:31px; border-radius:999px; background:var(--rp-c-ios-green); padding:2px; }
.ios-switch-dot { display:block; width:27px; height:27px; border-radius:50%; background:var(--rp-c-white); margin-left:20px;  }
ios-segmented, ios-segmented { display:inline-flex; padding:2px; border-radius:9px; background:var(--rp-c-ios-fill); background:var(--rp-a-ios-fill-12); gap:2px; font-family:-apple-system,sans-serif; }
.rp-ios-seg-item { padding:6px 16px; border-radius:7px; font-size:13px; color:var(--rp-c-black); }
.rp-ios-seg-item.active { background:var(--rp-c-white); font-weight:600; }
ios-button, ios-button { display:inline-grid; place-items:center; min-height:34px; padding:0 16px; border-radius:8px; background:var(--rp-c-ios-blue); color:var(--rp-c-white); font-size:15px; font-weight:600; font-family:-apple-system,sans-serif; }
ios-button[variant="tinted"], ios-button[variant="tinted"] { background:var(--rp-a-ios-blue-15); color:var(--rp-c-ios-blue); }
ios-button[variant="plain"], ios-button[variant="plain"] { background:transparent; color:var(--rp-c-ios-blue); }
ios-search, ios-search { display:inline-flex; align-items:center; gap:6px; width:280px; height:36px; padding:0 10px; border-radius:10px; background:var(--rp-a-ios-fill-12); color:var(--rp-c-ios-gray); font-size:15px; font-family:-apple-system,sans-serif; }
ios-stepper, ios-stepper { display:inline-flex; align-items:center; border-radius:8px; background:var(--rp-a-ios-fill-12); }
.rp-ios-step { display:grid; place-items:center; width:46px; height:32px; color:var(--rp-c-black); }
.rp-ios-step-div { width:1px; height:18px; background:var(--rp-a-black-15); }
`;

// iOS (Apple HIG) platform primitives. Static visual approximations only.
export class IosNavbarElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const title = attr(this,'title','标题'); const large = this.hasAttribute('large'); const back = attr(this,'back'); const trailing = attr(this,'trailing'); this.innerHTML = `<div class="ios-navbar-row"><span class="rp-ios-nav-leading">${back ? `${icon('chevron-left',18)}<span>${escapeHtml(back)}</span>` : ''}</span><span class="rp-ios-nav-title${large ? ' inline' : ''}">${large ? '' : escapeHtml(title)}</span><span class="rp-ios-nav-trailing">${trailing ? escapeHtml(trailing) : ''}</span></div>${large ? `<div class="rp-ios-nav-large">${escapeHtml(title)}</div>` : ''}`; } }
export class IosTabbarElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const items = csv(this,'items','首页,搜索,通知,我的'); const icons = csv(this,'icons','home,search,bell,user'); const active = intAttr(this,'active',0); this.innerHTML = items.map((it,i)=>`<span class="rp-ios-tab${i===active?' active':''}">${icon(icons[i] || 'circle',22)}<span class="rp-ios-tab-label">${escapeHtml(it)}</span></span>`).join(''); } }
export class IosListElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const header = attr(this,'header'); if (header) { const h = document.createElement('div'); h.className = 'ios-list-header'; h.textContent = header; this.insertBefore(h, this.firstChild); } } }
export class IosListItemElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label','项'); const detail = attr(this,'detail'); const ic = attr(this,'icon'); const chevron = this.hasAttribute('chevron'); this.innerHTML = `${ic ? `<span class="rp-ios-li-icon">${icon(ic,16)}</span>` : ''}<span class="rp-ios-li-label">${escapeHtml(label)}</span>${detail ? `<span class="rp-ios-li-detail">${escapeHtml(detail)}</span>` : ''}${chevron ? `<span class="rp-ios-li-chevron">${icon('chevron-right',16)}</span>` : ''}`; } }
export class IosActionSheetElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const title = attr(this,'title'); const actions = csv(this,'actions','拍照,从相册选择,选择文件'); const destructive = attr(this,'destructive'); const group = `<div class="rp-ios-as-group">${title ? `<div class="rp-ios-as-title">${escapeHtml(title)}</div>` : ''}${actions.map(a=>`<div class="rp-ios-as-action${a===destructive?' destructive':''}">${escapeHtml(a)}</div>`).join('')}</div>`; const cancel = `<div class="rp-ios-as-group"><div class="rp-ios-as-action cancel">取消</div></div>`; this.innerHTML = group + cancel; } }
export class IosAlertElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const title = attr(this,'title','提示'); const message = attr(this,'message',''); const actions = csv(this,'actions','取消,确定'); this.innerHTML = `<div class="ios-alert-body"><div class="ios-alert-title">${escapeHtml(title)}</div>${message ? `<div class="ios-alert-msg">${escapeHtml(message)}</div>` : ''}</div><div class="ios-alert-actions">${actions.map((a,i)=>`<span class="ios-alert-btn${i===actions.length-1?' primary':''}">${escapeHtml(a)}</span>`).join('')}</div>`; } }
export class IosSwitchElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const label = attr(this,'label'); this.innerHTML = `${label ? `<span class="ios-switch-label">${escapeHtml(label)}</span>` : ''}<span class="ios-switch-track"><span class="ios-switch-dot"></span></span>`; } }
export class IosSegmentedElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const options = csv(this,'options','第一,第二,第三'); const active = intAttr(this,'active',0); this.innerHTML = options.map((o,i)=>`<span class="rp-ios-seg-item${i===active?' active':''}">${escapeHtml(o)}</span>`).join(''); } }
export class IosButtonElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `<span>${escapeHtml(attr(this,'label', this.textContent?.trim() || '按钮'))}</span>`; } }
export class IosSearchElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const value = attr(this,'value'); this.innerHTML = `${icon('search',15)}<span class="${value ? 'rp-value' : 'rp-placeholder'}">${escapeHtml(value || attr(this,'placeholder','搜索'))}</span>`; } }
export class IosStepperElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `<span class="rp-ios-step minus">${icon('minus',16)}</span><span class="rp-ios-step-div"></span><span class="rp-ios-step plus">${icon('plus',16)}</span>`; } }
