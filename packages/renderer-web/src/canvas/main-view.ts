import { injectStyle } from '../core/style';
import { attr, escapeHtml, isViewportNode, resolveHeight, resolveWidth, usesAutoHeight } from '../core/dom';

export class RpMainView extends HTMLElement {
  private ro?: ResizeObserver;
  private frame = 0;

  connectedCallback() {
    injectStyle();
    if (!this.dataset.rpReady) {
      this.dataset.rpReady = 'true';
      const width = resolveWidth(this, 1440);
      const height = resolveHeight(this, 900);
      const autoHeight = usesAutoHeight(this);
      const scale = Number(attr(this, 'scale', '0.7')) || 0.7;
      const children = Array.from(this.childNodes);
      const shell = document.createElement('div');
      shell.className = 'rp-main-shell';
      shell.style.width = `${width * scale}px`;
      if (!autoHeight) shell.style.height = `${height * scale}px`;
      const stage = document.createElement('div');
      stage.className = 'rp-main-stage';
      stage.style.width = `${width}px`;
      stage.style.minHeight = autoHeight ? '0' : `${height}px`;
      stage.style.height = autoHeight ? 'auto' : `${height}px`;
      stage.style.transform = `scale(${scale})`;
      const clip = document.createElement('div');
      clip.className = 'rp-main-stage-clip';
      // transform:scale keeps the stage's *layout* box at its unscaled size, so
      // the clip must be given the scaled height explicitly — otherwise it wraps
      // the full unscaled stage and bleeds empty space below the visible canvas.
      if (!autoHeight) clip.style.height = `${height * scale}px`;
      children.forEach(n => {
        if (isViewportNode(n)) {
          if (!n.hasAttribute('width') && !n.hasAttribute('device')) n.style.setProperty('--snap-width', `${width}px`);
          if (!n.hasAttribute('height')) n.style.setProperty('--snap-height', autoHeight ? 'auto' : `${height}px`);
        }
        stage.appendChild(n);
      });
      clip.appendChild(stage);
      shell.appendChild(clip);
      this.appendChild(shell);
    }
    this.scheduleRender();
    this.ro = new ResizeObserver(() => this.scheduleRender());
    this.ro.observe(this);
    const stage = this.querySelector<HTMLElement>('.rp-main-stage');
    if (stage) this.ro.observe(stage);
  }

  disconnectedCallback() {
    this.ro?.disconnect();
    if (this.frame) { cancelAnimationFrame(this.frame); this.frame = 0; }
  }

  scheduleRender() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => { this.frame = 0; this.syncAutoHeight(); this.renderPins(); });
  }

  syncAutoHeight() {
    if (!usesAutoHeight(this)) return;
    const shell = this.querySelector<HTMLElement>('.rp-main-shell');
    const stage = this.querySelector<HTMLElement>('.rp-main-stage');
    const clip = this.querySelector<HTMLElement>('.rp-main-stage-clip');
    if (!shell || !stage) return;
    const scale = Number(attr(this, 'scale', '0.7')) || 0.7;
    const next = `${Math.ceil(stage.scrollHeight * scale)}px`;
    if (shell.style.height !== next) shell.style.height = next;
    // Keep the clip's layout box at the scaled height too; transform:scale leaves
    // the stage's own box unscaled, so without this the clip reserves the full
    // unscaled height and pushes empty space below the canvas.
    if (clip && clip.style.height !== next) clip.style.height = next;
  }

  renderPins() {
    const shell = this.querySelector<HTMLElement>('.rp-main-shell');
    const stage = this.querySelector<HTMLElement>('.rp-main-stage');
    if (!shell || !stage) return;
    shell.querySelectorAll('.rp-pin').forEach(p => p.remove());
    const shellRect = shell.getBoundingClientRect();
    stage.querySelectorAll<HTMLElement>('[data-pin]').forEach(target => {
      const id = target.dataset.pin;
      if (!id) return;
      const r = target.getBoundingClientRect();
      const pin = document.createElement('span');
      pin.className = 'rp-pin';
      pin.style.left = `${r.left - shellRect.left}px`;
      pin.style.top = `${r.top - shellRect.top}px`;
      pin.innerHTML = `<span>${escapeHtml(id)}</span>`;
      pin.addEventListener('click', () => {
        const url = new URL(location.href);
        url.searchParams.set('section', id);
        history.pushState(null, '', url);
        window.dispatchEvent(new CustomEvent('rp-section', { detail: id }));
      });
      shell.appendChild(pin);
    });
  }
}

