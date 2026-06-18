import { injectStyle } from '../core/style';
import { attr, escapeHtml, isGlobalAnnotation, isTopAnnotation } from '../core/dom';

function activateSection(path: string, pane: Element | null) {
  document.querySelectorAll('.rp-section-focus').forEach(el => el.classList.remove('rp-section-focus'));
  const target = document.querySelector(`[data-rp-section="${CSS.escape(path)}"]`);
  if (!target) return;
  target.classList.add('rp-section-focus');
  if (pane) {
    const paneEl = pane as HTMLElement;
    const targetRect = (target as HTMLElement).getBoundingClientRect();
    const paneRect = paneEl.getBoundingClientRect();
    paneEl.scrollTo({ top: paneEl.scrollTop + targetRect.top - paneRect.top - 20, behavior: 'smooth' });
  }
  setTimeout(() => target.classList.remove('rp-section-focus'), 3000);
}

export class RpPage extends HTMLElement {
  private _handlers?: [() => void, (e: Event) => void];

  connectedCallback() {
    injectStyle();
    this.wireRouting();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const pageTitle = attr(this,'title','Untitled');
    const route = attr(this,'route','/');
    const description = attr(this,'description','');
    const mode = attr(this,'mode','');
    this.removeAttribute('title');
    this.removeAttribute('mode');
    const isDoc = mode === 'doc';
    const existing = Array.from(this.childNodes);

    // Doc mode is a linear document (release notes, spec) with no route — it
    // doesn't map to one screen, so the route badge is omitted.
    const routeBadge = isDoc ? '' : `<span class="page-el-route">${escapeHtml(route)}</span>`;
    const header = document.createElement('div');
    header.className = 'page-el-header';
    header.innerHTML = `<div class="page-el-title-row"><h1 class="page-el-title">${escapeHtml(pageTitle)}</h1>${routeBadge}</div><p class="page-el-description">${escapeHtml(description)}</p>`;

    const body = document.createElement('div');
    body.className = 'page-el-body';

    const shell = document.createElement('div');
    shell.className = 'page-el-shell';

    if (isDoc) {
      // Document mode: a single readable column. No scaled <view> canvas, no
      // pin overlays, no right-hand annotation pane — every child flows in
      // source order, like Markdown built from RPML elements.
      existing.forEach(n => body.appendChild(n));
      shell.classList.add('page-el-doc');
      shell.append(header, body);
      this.appendChild(shell);
    } else {
      const main = document.createElement('main');
      main.className = 'page-el-main';
      const pane = document.createElement('aside');
      pane.className = 'annotation-el-pane';
      pane.setAttribute('aria-label', 'Annotations');
      const paneInner = document.createElement('div');
      paneInner.className = 'annotation-el-pane-inner';

      // Right pane gets global annotations first (the "0th", cross-cutting notes),
      // then the numbered top-level annotations in source order. Everything else
      // (the header/main snapshot) stays in the left body.
      existing.forEach(n => { if (isGlobalAnnotation(n)) paneInner.appendChild(n); });
      existing.forEach(n => { if (isTopAnnotation(n)) paneInner.appendChild(n); else if (!isGlobalAnnotation(n)) body.appendChild(n); });
      pane.appendChild(paneInner);
      main.append(header, body);
      shell.append(main, pane);
      this.appendChild(shell);

      // Bind header max-width to main view rendered width so description never drives page width
      requestAnimationFrame(() => {
        const mv = body.querySelector<HTMLElement>('main-view, main-view');
        if (mv) header.style.maxWidth = `${mv.offsetWidth}px`;
      });
    }

    this.wireRouting();
    requestAnimationFrame(this._handlers![0]);
  }

  /** Section routing: handle URL and rp-section events. Re-queries the pane
   *  lazily so listeners don't capture build-scope DOM (survives reconnect). */
  private wireRouting() {
    if (this._handlers) return; // already wired this connection
    const pane = () => this.querySelector('.annotation-el-pane');
    const go = () => {
      const sec = new URLSearchParams(location.search).get('section');
      if (sec) activateSection(sec, pane());
    };
    const onSection = (e: Event) => activateSection((e as CustomEvent).detail, pane());
    this._handlers = [go, onSection];
    window.addEventListener('popstate', go);
    window.addEventListener('rp-section', onSection);
  }

  disconnectedCallback() {
    if (this._handlers) {
      window.removeEventListener('popstate', this._handlers[0]);
      window.removeEventListener('rp-section', this._handlers[1]);
      this._handlers = undefined;
    }
  }
}