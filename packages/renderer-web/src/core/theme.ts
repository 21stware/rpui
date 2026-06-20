/**
 * Light/dark theme, shared by the gallery (sidebar present) and the single-file
 * loader (no sidebar). The chosen theme lives in the `theme` URL param so it
 * survives reloads and can be deep-linked; on first load with no param we fall
 * back to the OS `prefers-color-scheme`.
 *
 * Strategy:
 *  - Chrome (sidebar/header/main bg) is themed with CSS variables (--rpml-gx-*).
 *  - The rendered prototype (page-el) carries 256+ hardcoded colors, so instead
 *    of remapping each one we invert it as a whole with `invert + hue-rotate`,
 *    which flips light/dark while keeping hues (blue stays blue) — guaranteed
 *    readable without touching the runtime stylesheet.
 */

const THEME_STYLE_ID = "rpml-theme-style";
const ATTR = "data-rpml-theme";

export const THEME_CSS = `
:root {
  --rpml-gx-border:#e5e7eb; --rpml-gx-side-bg:#fff; --rpml-gx-main-bg:#ffffff;
  --rpml-gx-fg:#111827; --rpml-gx-muted:#6b7280; --rpml-gx-group:#9ca3af;
  --rpml-gx-hover:#f3f4f6; --rpml-gx-item:#374151; --rpml-gx-active-bg:#eff6ff;
  --rpml-gx-active-fg:#1d4ed8; --rpml-gx-copy-hover:#e5e7eb; --rpml-gx-ok:#059669;
}
html[${ATTR}="dark"] {
  --rpml-gx-border:#2a3344; --rpml-gx-side-bg:#0f172a; --rpml-gx-main-bg:#0b1120;
  --rpml-gx-fg:#e2e8f0; --rpml-gx-muted:#94a3b8; --rpml-gx-group:#64748b;
  --rpml-gx-hover:#1e293b; --rpml-gx-item:#cbd5e1; --rpml-gx-active-bg:#1e3a5f;
  --rpml-gx-active-fg:#93c5fd; --rpml-gx-copy-hover:#334155; --rpml-gx-ok:#34d399;
}
html[${ATTR}="dark"] .rpui-scope { background:#0b1120; }
/* Invert the rendered prototype as a whole; hue-rotate keeps colors recognizable. */
html[${ATTR}="dark"] page-el { filter:invert(0.92) hue-rotate(180deg); }

.rpml-theme-fab {
  position:fixed; top:12px; right:12px; z-index:50; display:flex; align-items:center;
  justify-content:center; width:34px; height:34px; padding:0; border:1px solid var(--rpml-gx-border);
  border-radius:9px; background:var(--rpml-gx-side-bg); color:var(--rpml-gx-fg); font-size:16px;
  line-height:1; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,.12);
}
.rpml-theme-fab:hover { background:var(--rpml-gx-hover); }
`;

export function injectThemeStyle(): void {
  if (document.getElementById(THEME_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = THEME_STYLE_ID;
  s.textContent = THEME_CSS;
  document.head.appendChild(s);
}

function themeFromUrl(): "light" | "dark" | null {
  const t = new URLSearchParams(location.search).get("theme");
  return t === "dark" || t === "light" ? t : null;
}

export function currentTheme(): "light" | "dark" {
  return document.documentElement.getAttribute(ATTR) === "dark"
    ? "dark"
    : "light";
}

/** Apply a theme to <html> and reflect it in the `theme` URL param. */
export function setTheme(theme: "light" | "dark"): void {
  document.documentElement.setAttribute(ATTR, theme);
  const url = new URL(location.href);
  url.searchParams.set("theme", theme);
  history.replaceState(history.state, "", url);
}

/** Seed the theme from the URL param, falling back to the OS preference.
 *  Does not write the URL on the OS-preference path, keeping links clean until
 *  the user explicitly toggles. */
export function initTheme(): void {
  const fromUrl = themeFromUrl();
  if (fromUrl) {
    document.documentElement.setAttribute(ATTR, fromUrl);
    return;
  }
  const prefersDark =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(ATTR, prefersDark ? "dark" : "light");
}

/** A floating top-right toggle, mirroring the sidebar-collapse FAB, so the theme
 *  switch is reachable even when there is no sidebar (single-file preview) or it
 *  is collapsed. Idempotent. */
export function mountThemeFab(host: HTMLElement = document.body): void {
  injectThemeStyle();
  initTheme();
  if (document.querySelector(".rpml-theme-fab")) return;
  const btn = document.createElement("button");
  btn.className = "rpml-theme-fab";
  btn.type = "button";
  btn.title = "切换亮色/暗色";
  btn.setAttribute("aria-label", "切换亮色/暗色");
  btn.textContent = "◑";
  btn.addEventListener("click", () =>
    setTheme(currentTheme() === "dark" ? "light" : "dark"),
  );
  host.appendChild(btn);
}
