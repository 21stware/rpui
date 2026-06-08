import { injectStyle } from '../core/style';
import { attr, hasExplicitNumericHeight, resolveHeight, resolveWidth, usesAutoHeight } from '../core/dom';

export class GenericElement extends HTMLElement { connectedCallback() { injectStyle(); } }
export class ViewportElement extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.hasAttribute('width') || this.hasAttribute('device')) this.style.setProperty('--snap-width', `${resolveWidth(this,1440)}px`);
    if (hasExplicitNumericHeight(this)) this.style.setProperty('--snap-height', `${resolveHeight(this,900)}px`);
    else if (usesAutoHeight(this)) this.style.setProperty('--snap-height', 'auto');
  }
}
export class LayoutElement extends HTMLElement { connectedCallback() { injectStyle(); this.style.setProperty('--snap-columns', attr(this,'columns','1fr')); this.style.setProperty('--snap-rows', attr(this,'rows','auto')); if (this.hasAttribute('gap')) this.style.setProperty('--snap-gap', `${attr(this,'gap','0')}px`); } }
export class PanelElement extends HTMLElement { connectedCallback() { injectStyle(); this.style.setProperty('--snap-padding', `${attr(this,'padding','16')}px`); } }
export class NavbarElement extends HTMLElement { connectedCallback() { injectStyle(); this.style.setProperty('--snap-height', `${attr(this,'height','64')}px`); } }
export class SidebarElement extends HTMLElement { connectedCallback() { injectStyle(); this.style.setProperty('--snap-width', `${attr(this,'width','260')}px`); } }
export class LogoElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.hasAttribute('size')) this.style.setProperty('--snap-size', `${attr(this,'size','82')}px`); if (!this.innerHTML.trim()) this.textContent = attr(this,'label','LOGO'); } }
export class SplitPaneElement extends HTMLElement { connectedCallback() { injectStyle(); this.style.setProperty('--snap-columns', attr(this,'columns','1fr 1fr')); } }
export class DividerElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.hasAttribute('vertical')) this.classList.add('rp-divider-v'); } }
export class SpacerElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.hasAttribute('size')) this.style.setProperty('--snap-size', `${attr(this,'size','16')}px`); } }

