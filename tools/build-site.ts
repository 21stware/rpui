#!/usr/bin/env bun
/** RPML site generator. Reads spec/, rapid-prototype-implement/, preview/components.js and emits a
 *  complete static portal into docs/. Run: bun tools/build-site.ts
 *
 *  spec/ Markdown is the single source of truth — never hand-copied into HTML. */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
  cpSync,
  rmSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { markdown, escapeHtml } from "./site/markdown.ts";
import { SITE_CSS } from "./site/css.ts";
import { page, REPO, SITE_URL } from "./site/chrome.ts";
import { buildHome } from "./site/home.ts";
import { buildGuide } from "./site/guide.ts";
import { buildExamples } from "./site/examples.ts";
import { buildApi } from "./site/api.ts";
import { buildComponents } from "./site/components-page.ts";
import { buildPlayground } from "./site/playground.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const VERSION = JSON.parse(
  readFileSync(join(ROOT, "packages/renderer-web/package.json"), "utf8"),
).version;

function read(p: string): string {
  return readFileSync(join(ROOT, p), "utf8");
}
function write(name: string, html: string) {
  writeFileSync(join(DOCS, name), html);
  console.log(`  ✓ docs/${name}`);
}

if (!existsSync(DOCS)) mkdirSync(DOCS, { recursive: true });

const ctx = { ROOT, read, markdown, escapeHtml, page, REPO, VERSION };

console.log("Building RPML site →");
writeFileSync(join(DOCS, ".nojekyll"), ""); // GitHub Pages: skip Jekyll processing
writeFileSync(join(DOCS, "site.css"), SITE_CSS.trim());
console.log("  ✓ docs/site.css");
write("index.html", buildHome(ctx));
write("guide.html", buildGuide(ctx));
write("components.html", buildComponents(ctx));
write("examples.html", buildExamples(ctx));
write("api.html", buildApi(ctx));
write("playground.html", buildPlayground(ctx));

// sitemap.xml
const PAGES = [
  "index.html",
  "guide.html",
  "components.html",
  "examples.html",
  "api.html",
  "playground.html",
];
const now = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map((p) => `  <url><loc>${SITE_URL}/${p}</loc><lastmod>${now}</lastmod></url>`).join("\n")}\n</urlset>`;
writeFileSync(join(DOCS, "sitemap.xml"), sitemap);
console.log("  ✓ docs/sitemap.xml");

// Assemble the runtime assets the generated HTML references, so `bun run site`
// produces a portal that actually works locally (playground imports
// ./dist/gallery.js + ./dist/rpml-loader.js; examples-page iframes load
// examples/*.rpml). Previously this copy lived only in deploy.yml, so a local
// `bun run site` always left a stale playground. CI runs the renderer build
// before this script; locally, run `bun run build` first.
function copyInto(srcRel: string, destRel: string, label: string) {
  const src = join(ROOT, srcRel);
  if (!existsSync(src)) {
    console.log(
      `  ⚠ skip docs/${destRel} (missing ${srcRel} — run \`bun run build\` first)`,
    );
    return;
  }
  const dest = join(DOCS, destRel);
  rmSync(dest, { recursive: true, force: true }); // drop stale leftovers (e.g. renamed examples)
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`  ✓ docs/${destRel}${label ? ` ${label}` : ""}`);
}

mkdirSync(join(DOCS, "dist"), { recursive: true });
copyInto("packages/renderer-web/dist/rpui.js", "dist/rpui.js", "");
// Copy Vite code-split chunks (e.g. rpui2.js, rpui-*.mjs) referenced by rpui.js
const distDir = join(ROOT, "packages/renderer-web/dist");
if (existsSync(distDir)) {
  for (const f of readdirSync(distDir)) {
    if (f === "rpui.js" || f === "rpui.d.ts" || f.startsWith("rpui.js."))
      continue;
    if (
      f.startsWith("rpui") &&
      (f.endsWith(".js") ||
        f.endsWith(".mjs") ||
        f.endsWith(".js.map") ||
        f.endsWith(".mjs.map"))
    ) {
      cpSync(join(distDir, f), join(DOCS, "dist", f));
      console.log(`  ✓ docs/dist/${f}`);
    }
  }
}
copyInto(
  "packages/renderer-web/dist/rpml-loader.js",
  "dist/rpml-loader.js",
  "",
);
copyInto("packages/renderer-web/dist/gallery.js", "dist/gallery.js", "");
copyInto("preview/components.js", "components.js", "");
copyInto("llms.txt", "llms.txt", "");
copyInto("examples", "examples", "");

console.log("Done.");

export type Ctx = typeof ctx;
