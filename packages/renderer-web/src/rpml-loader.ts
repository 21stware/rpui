import { registerAll, parseToPage } from './rpui';

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
