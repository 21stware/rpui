import { registerAll, parseToPage } from './rpui';
import { mountThemeFab } from './core/theme';

export { parseToPage };
registerAll();

class RpmlApp extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute('src');
    if (!src) return;
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.replaceWith(parseToPage(await res.text()));
      // A single .rpml preview has no sidebar, so surface the theme toggle as a
      // floating button (mirrors the gallery's collapse FAB).
      mountThemeFab();
      // Honor a ?section= deep-link (e.g. arriving from an <anchor> fallback).
      const section = new URLSearchParams(location.search).get('section');
      if (section) requestAnimationFrame(() => requestAnimationFrame(() =>
        window.dispatchEvent(new CustomEvent('rp-section', { detail: section }))));
    } catch (e) {
      this.textContent = `RPML load error: ${e}`;
      console.error(e);
    }
  }
}

customElements.define('rpml-app', RpmlApp);

const rpmlSrc = new URLSearchParams(location.search).get('rpml');
if (rpmlSrc && !document.querySelector('rpml-app')) {
  const app = document.createElement('rpml-app') as HTMLElement;
  app.setAttribute('src', rpmlSrc);
  document.body.appendChild(app);
}
