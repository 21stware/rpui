import { injectStyle } from '../core/style';
import { attr, escapeHtml, isTopAnnotation } from '../core/dom';

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
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const pageTitle = attr(this,'title','Untitled');
    const route = attr(this,'route','/');
    const description = attr(this,'description','');
    this.removeAttribute('title');
    const existing = Array.from(this.childNodes);

    const header = document.createElement('div');
    header.className = 'rp-page-header';
    header.innerHTML = `<div class="rp-page-title-row"><h1 class="rp-page-title">${escapeHtml(pageTitle)}</h1><span class="rp-page-route">${escapeHtml(route)}</span></div><p class="rp-page-description">${escapeHtml(description)}</p>`;

    const body = document.createElement('div');
    body.className = 'rp-page-body';
    const main = document.createElement('main');
    main.className = 'rp-page-main';
    const pane = document.createElement('aside');
    pane.className = 'rp-annotation-pane';
    pane.setAttribute('aria-label', 'Annotations');
    const paneInner = document.createElement('div');
    paneInner.className = 'rp-annotation-pane-inner';

    existing.forEach(n => (isTopAnnotation(n) ? paneInner : body).appendChild(n));
    pane.appendChild(paneInner);
    main.append(header, body);

    const shell = document.createElement('div');
    shell.className = 'rp-page-shell';
    shell.append(main, pane);
    this.appendChild(shell);

    // Bind header max-width to main view rendered width so description never drives page width
    requestAnimationFrame(() => {
      const mv = body.querySelector<HTMLElement>('rp-main-view, proto-main-view');
      if (mv) header.style.maxWidth = `${mv.offsetWidth}px`;
    });

    // Section routing: handle URL and clicks
    const go = () => {
      const sec = new URLSearchParams(location.search).get('section');
      if (sec) activateSection(sec, pane);
    };
    window.addEventListener('popstate', go);
    window.addEventListener('rp-section', (e) => activateSection((e as CustomEvent).detail, pane));
    requestAnimationFrame(go);
  }
}


