import { injectStyle } from '../core/style';
import { attr, escapeHtml } from '../core/dom';

export class RpAnnotation extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const existing = Array.from(this.childNodes);
    const depth = this.annotationDepth();
    const id = attr(this, 'id');
    const label = attr(this, 'label', id ? `Annotation ${id}` : 'Annotation');

    // Assign section path: top-level uses id, nested uses parent-path + sibling index
    let sectionPath: string;
    if (id) {
      sectionPath = id;
    } else {
      const parentSection = (this.closest('[data-rp-section]') as HTMLElement | null)?.dataset.rpSection ?? '';
      const siblings = this.parentElement ? Array.from(this.parentElement.children).filter(
        el => el.tagName.toLowerCase() === 'rp-annotation' || el.tagName.toLowerCase() === 'proto-annotation'
      ) : [];
      const idx = siblings.indexOf(this) + 1;
      sectionPath = parentSection ? `${parentSection}-${idx}` : String(idx);
    }
    this.dataset.rpSection = sectionPath;

    const marker = document.createElement('span');
    const kind = id ? 'drop' : depth <= 1 ? 'circle' : 'triangle';
    marker.className = `rp-annotation-marker ${kind}`;
    marker.innerHTML = kind === 'drop' ? `<span>${escapeHtml(id)}</span>` : '';

    const head = document.createElement('div');
    head.className = 'rp-annotation-head';
    head.append(marker);

    const title = document.createElement('span');
    title.className = 'rp-annotation-title';
    title.textContent = label;
    title.addEventListener('click', () => {
      const url = new URL(location.href);
      url.searchParams.set('section', sectionPath);
      history.pushState(null, '', url);
      window.dispatchEvent(new CustomEvent('rp-section', { detail: sectionPath }));
    });
    head.append(title);

    const body = document.createElement('div');
    body.className = 'rp-annotation-body';
    existing.forEach(n => body.appendChild(n));
    this.append(head, body);
  }

  annotationDepth() {
    let d = 0; let p = this.parentElement;
    while (p) {
      if (p.tagName.toLowerCase() === 'rp-annotation' || p.tagName.toLowerCase() === 'proto-annotation') d++;
      p = p.parentElement;
    }
    return d;
  }
}

export class RpEnum extends HTMLElement { connectedCallback() { injectStyle(); } }

export class RpEnumItem extends HTMLElement {
  connectedCallback() {
    injectStyle();
    if (this.dataset.rpReady) return;
    this.dataset.rpReady = 'true';
    const children = Array.from(this.childNodes);

    // Compute 1-based index among same-tag siblings
    const parent = this.parentElement;
    const siblings = parent ? Array.from(parent.children).filter(
      el => el.tagName.toLowerCase() === 'rp-enum-item' || el.tagName.toLowerCase() === 'proto-enum-item'
    ) : [];
    const idx = siblings.indexOf(this) + 1;

    const labelEl = document.createElement('span');
    labelEl.className = 'rp-enum-label';

    const idxBadge = document.createElement('span');
    idxBadge.className = 'rp-enum-index';
    idxBadge.textContent = String(idx);

    const labelText = document.createElement('span');
    labelText.className = 'rp-enum-label-text';
    labelText.textContent = attr(this, 'label', 'State');

    const description = attr(this, 'description');
    if (description) {
      const desc = document.createElement('span');
      desc.className = 'rp-enum-description';
      desc.textContent = description;
      labelText.appendChild(desc);
    }

    labelEl.append(idxBadge, labelText);

    const content = document.createElement('div');
    content.className = 'rp-enum-content';
    children.forEach(n => content.appendChild(n));
    this.append(labelEl, content);
  }
}


