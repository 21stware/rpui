# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

RPUI (Rapid Prototype UI) is a native Web Components runtime for static UI prototypes. It combines a prototype annotation canvas with snapshot primitives so interaction states, permission variants, hidden UI, loading/empty/error states, and validation branches can be displayed in one static document.

A prototype imports the generated runtime once:

```html
<script type="module" src="./dist/rpui.js"></script>
```

The runtime registers custom elements as a side effect and injects its global stylesheet and inline SVG icons. The model-facing component reference is `llms.txt`, and the repeatable prototype authoring workflow is `rapid-prototype-implement/SKILL.md`.

## Monorepo structure

This is a **Bun workspace monorepo**. All source code lives under `packages/`.

```
packages/renderer-web/   — Web Components runtime (@21stware/rpui, was rpui src/)
packages/parser/         — .rpml text → AST → DOM (rpml-parser, private)
packages/validator/      — structural + semantic validation + CLI (rpml-validator, private)
packages/compiler/       — compile a dir of .rpml → one self-contained HTML (rpml-compiler, private)
packages/vscode-extension/ — VS Code extension (rpml-vscode-extension, WIP, private)
spec/                    — RPML language specification
examples/                — .rpml example files (01–08; viewer loads via ?rpml=)
rapid-prototype-implement/ — generation skill: SKILL.md, prompts, references
tools/                   — dev scripts; tools/build-site.ts + tools/site/ generate docs/
preview/                 — dev component browser (served by vite dev server)
docs/                    — GENERATED site portal (gitignored; CI rebuilds via `bun run site`)
dist/                    — root dist/ (synced from packages/renderer-web/dist/ at build)
```

## Documentation site (docs/ portal)

`docs/` is a **fully generated** static portal — do not hand-edit it (gitignored). `bun run site` (= `bun tools/build-site.ts`) reads `spec/`, `rapid-prototype-implement/`, and `preview/components.js` and emits:

- `index.html` — hero landing page
- `guide.html` — docs reader: sidebar + Markdown-rendered `spec/` (11 docs) + `rapid-prototype-implement/` guides, with per-doc TOC and hash routing
- `components.html` — component browser (reuses `components.js`)
- `examples.html` — example gallery (live-scaled iframes → `playground.html`)
- `api.html` — package exports, CLI usage, element index
- `playground.html` — in-browser RPML viewer (single-file or folder-drop gallery)
- `site.css` — shared styles (Inter + JetBrains Mono, modern tech aesthetic)

`spec/` Markdown is the **single source of truth** — never hand-copy spec content into HTML. The generator lives in `tools/build-site.ts` + `tools/site/` (markdown.ts converter, css.ts, chrome.ts shell, one module per page). CI runs `bun run site` then copies `dist/*.js`, `components.js`, `llms.txt`, `examples/` into `docs/` before deploying to GitHub Pages. `REPO` URL is set in `tools/site/chrome.ts`.

## Development commands

```bash
bun install                                    # install all workspace deps
bun run dev                                    # open component preview at /preview/
bun run --cwd packages/renderer-web typecheck  # TypeScript type-check
bun run build                                  # build rpui.js + rpml-loader.js + gallery.js
bun run validate <file.rpml>                   # validate one .rpml
bash tools/validate-examples.sh                # validate all examples/*.rpml
bun run compile <dir> -o out.html              # compile a dir of .rpml → one HTML
```

Dev server (`bun run dev`) serves `preview/index.html`, which imports `/packages/renderer-web/src/rpui.ts` via Vite (root is repo root). The generated `playground.html` imports `./dist/rpml-loader.js` + `./dist/gallery.js` — run the build first.

## TypeScript/build setup

- Root `package.json` is a Bun workspace root (private, no src).
- `packages/renderer-web/` contains all component source. Three Vite configs:
  - `vite.config.ts` → `rpui.js` (runtime) + `rpml-loader.js` (imports rpui.js as shared chunk).
  - `vite.gallery.config.ts` → `gallery.js`, a fully self-contained bundle (runtime + parser + gallery chrome, no shared chunks) so the compiler can inline it as one `<script>`.
  - `vite.serve.config.ts` → `serve.js`, the `rpui` CLI bundled to Node ESM (shebang, node: builtins external). Reads the sibling `gallery.js` at runtime. Exposed as the `rpui` bin with two subcommands: `npx @21stware/rpui serve .` hosts a directory of `.rpml` as one gallery (auto-opens the browser; `--no-open` to suppress), and `npx @21stware/rpui build .` compiles the directory into one self-contained HTML file (zero-dep, shares the serve HTML shape).
- `packages/renderer-web/src/rpui.ts` is the public side-effect entry. Do not hand-edit `dist/`.
- After building, sync root `dist/` manually: `cp packages/renderer-web/dist/*.js dist/` (CI does this automatically).
- `rpml-validator` exports from `dist/` with `.d.ts`; `rpml-parser` exports directly from `src/` (all export conditions point at `src/index.ts`) so no pre-build is needed. `renderer-web` depends on `rpml-parser` (workspace:*) so Bun symlinks it for tsc/vite resolution.

## RPML language vs renderer tags

RPML the **language** uses clean, curated tag names (`page`, `view`, `navigator`, `button`, …). The **renderer** registers Web Component tags, which must contain a hyphen (HTML custom-element requirement) and avoid colliding with native HTML (`button`, `table`, `form`). `packages/parser/src/vocabulary.ts` is the single source of truth bridging the two:

- `LANG_TO_COMPONENT` / `COMPONENT_TO_LANG` — the bidirectional map (e.g. `page`↔`page-el`, `view`↔`main-view`, `navigator`↔`navbar-el`; most primitives just gain/drop an `-el` suffix; compounds like `split-pane` are identical on both sides).
- `toComponentTag` / `toLangTag` — identity for anything unmapped (native HTML, comments).

The parser applies the rewrite on the source string (`rewriteTags`, run after `expandSelfClosing`) inside `parse`/`parseToPage`/`parseNode`, so the renderer, CSS, registry, and validator all keep operating on component tags. `registry.ts` registers via `toComponentTag`; the validator maps messages back to language names via `toLangTag`.

## RPML file format

`.rpml` files are **HTML-like markup** (parsed as HTML, not strict XML — boolean attrs and bare `&` allowed; self-closing leaves are normalized by `expandSelfClosing`). Root element `<page>`, **no HTML wrapper**. Load at runtime with:

```html
<script type="module" src="dist/rpml-loader.js"></script>
<rpml-app src="./my-page.rpml"></rpml-app>
```

Or via URL param: `playground.html?rpml=examples/04-ticket-desk.rpml`

## Playground & compiler

- `playground.html` (generated into `docs/` by `bun run site`, source in `tools/site/playground.ts`): drag a single `.rpml` to render it; drag a **folder** to build a sidebar gallery (nav tree from file paths, hash routing `#<path>`, `index.rpml` as default home, no localStorage). Also supports `?rpml=` and a file picker.
- `bun run compile <dir> -o out.html`: recursively reads `.rpml`, validates (errors abort, warnings print), inlines all sources as `globalThis.__RPML_DOCS__` plus `gallery.js` into one self-contained HTML that works from `file://`. `index.rpml` is the default home.
- Shared logic lives in `packages/renderer-web/src/gallery.ts` (`mountGallery(docs, host)`); both the playground and compiler consume it — single source of truth.


Validate with: `bun packages/validator/src/cli.ts <file.rpml>`

## Runtime architecture

Runtime source lives in `packages/renderer-web/src/`, bundled into one browser file. `rpui.ts` is the public side-effect entry; implementation lives in:

- `src/core/` — inline icons, runtime CSS injection, DOM/attribute helpers, device sizing helpers.
- `src/canvas/` — `RpPage`, `RpMainView`, `RpAnnotation`, `RpEnum`, and `RpEnumItem`.
- `src/primitives/` — snapshot primitive component groups: `layout.ts`, `controls.ts`, `navigation.ts`, `data-display.ts` (general web primitives), plus `ios.ts` (`ios-*`, Apple HIG iOS) and `macos.ts` (`macos-*`, Apple HIG macOS).
- `src/registry.ts` — central custom-element registration; maps RPML language tags to Web Component tags via `toComponentTag` from `rpml-parser`.

The runtime is a client-side Web Components implementation that:

1. injects one shared global stylesheet (`rpui-runtime-style`),
2. defines custom elements for the page shell, annotations, enums, and snapshot primitives,
3. uses light DOM mutation/reparenting rather than Shadow DOM,
4. registers the Web Component tags that the RPML vocabulary maps onto.

Key runtime pieces:

- Icon system: `iconPaths` and `icon()` render Lucide-style inline SVG without CDN dependencies.
- Style system: a large runtime CSS string is injected once by `injectStyle()` and applies globally to the registered component tags.
- Registration: `registerAll()` centralizes custom-element registration, resolving each RPML language name to its component tag through the shared `rpml-parser` vocabulary.
- Defensive registration: `define()` avoids redefining a custom element if it is already registered.
- Attribute helpers: `attr()`, `intAttr()`, and `csv()` keep rendering attribute-driven.
- Idempotent rendering: many `connectedCallback()` methods set `this.dataset.rpReady = 'true'` to avoid duplicate DOM generation after reconnects.

Important custom elements:

- `RpPage` builds the document shell from `title`, `route`, and `description`, keeps the header/main view on the left, and moves top-level annotations into an independently scrollable right-side pane.
- `RpMainView` creates the scaled prototype canvas, supports `device="web|ipad|mobile"` fixed-width/auto-height sizing, moves child nodes into a stage, and computes numbered pin overlays from elements with `data-pin` using `ResizeObserver` and `requestAnimationFrame()`.
- `RpAnnotation` renders top-level and nested annotation blocks, choosing marker styles based on nesting depth and whether an `id` is present.
- `RpEnum` and `RpEnumItem` display explicit state/variant cards inside annotations. `RpEnumItem` supports optional `description` for short state notes.
- Snapshot primitives render static UI building blocks from attributes: layout, navigation, table/list data display, forms, overlays, feedback, progress, upload, pagination, steps, and cards.

## RPUI prototype authoring rules

When creating or editing prototype HTML, follow `rapid-prototype-implement/SKILL.md` and `llms.txt`:

- Use the bare RPML language tags (`page`, `view`, `button`, `navigator`, …). The parser maps them to the renderer's Web Component tags; never write the underlying component tags (`page-el`, `main-view`) directly.
- Use `<page>` as the root and exactly one `<view>` per prototype page.
- Prefer `<view device="web|ipad|mobile" scale="...">` and matching `<viewport device="...">` for new prototypes. Device presets are fixed-width and auto-height by default; explicit numeric `height` opts into legacy fixed-height clipping.
- Build the main snapshot inside `<view>` using RPML snapshot primitives, typically with a `<viewport>` child.
- Add `data-pin="N"` to meaningful regions inside `<view>`. Number pins from 1 without gaps.
- Every `data-pin="N"` must have a matching top-level `<annotation id="N" label="...">`.
- Keep annotations compact; use nested `<annotation>` only when a rule belongs to a smaller sub-region.
- Use `<enum>` and `<enum-item label="...">` to document conditional states and variants.
- Do not use direct HTML UI elements such as `div`, `button`, `input`, or `table` to represent product UI in prototypes; use RPML primitives instead. Basic text in annotations is fine.
- Do not add interactive JavaScript, `onclick`, hover behavior, runtime focus, timers, API calls, external CSS, image CDNs, or icon CDNs to prototypes.
- Do not use `position:absolute` or `position:fixed` in snapshot content; RPUI owns pin positioning.

For state coverage, consider loaded, empty, loading, error/retry, search default/focus/filled/no-result, filters collapsed/expanded, row selected/unread/highlighted/disabled, bulk selection on/off, pagination, permission variants, destructive confirmations, validation states, overlays, and upload states when relevant.

## Demo/reference files

- `playground.html` (generated into `docs/`) — in-browser RPML viewer: load any `.rpml` via `?rpml=examples/04-ticket-desk.rpml`, drag-and-drop, or file picker.
- `examples/` — all 8 prototype examples as `.rpml` files (01–08); see `examples/README.md`.
- `llms.txt` is the component/tag reference for generated prototypes.
- `rapid-prototype-implement/SKILL.md` documents the prototype implementation workflow, recursive decomposition method, overlay-trigger pattern, and quality bar.
