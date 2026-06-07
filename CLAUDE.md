# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

RPUI (Readable Prototype UI) is a native Web Components runtime for static UI prototypes. It combines a prototype annotation canvas with snapshot primitives so interaction states, permission variants, hidden UI, loading/empty/error states, and validation branches can be displayed in one static document.

A prototype imports the generated runtime once:

```html
<script type="module" src="./dist/rpui.js"></script>
```

The runtime registers custom elements as a side effect and injects its global stylesheet and inline SVG icons. The model-facing component reference is `llms.txt`, and the repeatable prototype authoring workflow is `skill.txt`.

## Development commands

```bash
npm install        # install dependencies
npm run dev        # open the source-mode component preview at /preview/
npm run typecheck  # run TypeScript type checking without emitting files
npm run build      # type-check, bundle dist/rpui.js, and emit declarations
npm run release    # currently aliases npm run build
npm run clean      # remove and recreate dist/
```

Use `npm run dev` during component development. It serves `preview/index.html`, which imports `/src/rpui.ts` directly through Vite.

After building, open `demo/index.html` in a browser to view the demo. Open `demo/showcase.html` to review primitive coverage. The demo files import `../dist/rpui.js`, so they validate the built release artifact.

There are currently no test or lint scripts in `package.json`. To type-check/build after a change, use `npm run typecheck` and `npm run build`.

## TypeScript/build setup

- `package.json` is ESM (`"type": "module"`).
- `src/rpui.ts` is the public side-effect entry/aggregator. Do not hand-edit generated files in `dist/`.
- `tsconfig.json` type-checks `src/**/*.ts` with `strict: true` and `noEmit: true`.
- `vite.config.ts` bundles the modular source into a single ESM runtime at `dist/rpui.js`.
- `tsconfig.types.json` emits declaration files into `dist/`.
- Build output includes `dist/rpui.js`, `dist/rpui.d.ts`, source maps, and declarations for internal modules.
- The package exposes `dist/rpui.js` through `main`, `module`, and `exports`.
- The package is side-effectful: importing it registers all custom elements.

## Runtime architecture

Runtime source is split into internal modules and bundled into one browser file. `src/rpui.ts` is the public side-effect entry/aggregator; implementation lives in:

- `src/core/` — inline icons, runtime CSS injection, DOM/attribute helpers, device sizing helpers.
- `src/canvas/` — `RpPage`, `RpMainView`, `RpAnnotation`, `RpEnum`, and `RpEnumItem`.
- `src/primitives/` — snapshot primitive component groups for layout, controls, navigation, and data/display elements.
- `src/registry.ts` — central custom-element registration and alias mapping.

The runtime is a client-side Web Components implementation that:

1. injects one shared global stylesheet (`rpui-runtime-style`),
2. defines custom elements for the page shell, annotations, enums, and snapshot primitives,
3. uses light DOM mutation/reparenting rather than Shadow DOM,
4. registers current `rp-*` tags and compatibility aliases.

Key runtime pieces:

- Icon system: `iconPaths` and `icon()` render Lucide-style inline SVG without CDN dependencies.
- Style system: a large runtime CSS string is injected once by `injectStyle()` and applies globally to `rp-*`, `snap-*`, and `proto-*` aliases where relevant.
- Registration: `registerAll()` centralizes custom-element registration. It defines `rp-*` and `proto-*` aliases for page/annotation primitives, and registers snapshot primitives under both `rp-*` and `snap-*` names.
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

When creating or editing prototype HTML, follow `skill.txt` and `llms.txt`:

- Use `rp-*` tags for new work. `proto-*` and `snap-*` exist for compatibility.
- Use `<rp-page>` as the root and exactly one `<rp-main-view>` per prototype page.
- Prefer `<rp-main-view device="web|ipad|mobile" scale="...">` and matching `<rp-viewport device="...">` for new prototypes. Device presets are fixed-width and auto-height by default; explicit numeric `height` opts into legacy fixed-height clipping.
- Build the main snapshot inside `<rp-main-view>` using `rp-*` snapshot primitives, typically with an `<rp-viewport>` child.
- Add `data-pin="N"` to meaningful regions inside `<rp-main-view>`. Number pins from 1 without gaps.
- Every `data-pin="N"` must have a matching top-level `<rp-annotation id="N" label="...">`.
- Keep annotations compact; use nested `<rp-annotation>` only when a rule belongs to a smaller sub-region.
- Use `<rp-enum>` and `<rp-enum-item label="...">` to document conditional states and variants.
- Do not use direct HTML UI elements such as `div`, `button`, `input`, or `table` to represent product UI in prototypes; use `rp-*` primitives instead. Basic text in annotations is fine.
- Do not add interactive JavaScript, `onclick`, hover behavior, runtime focus, timers, API calls, external CSS, image CDNs, or icon CDNs to prototypes.
- Do not use `position:absolute` or `position:fixed` in snapshot content; RPUI owns pin positioning.

For state coverage, consider loaded, empty, loading, error/retry, search default/focus/filled/no-result, filters collapsed/expanded, row selected/unread/highlighted/disabled, bulk selection on/off, pagination, permission variants, destructive confirmations, validation states, overlays, and upload states when relevant.

## Demo/reference files

- `README.md` gives the project summary, build/demo instructions, and release artifact notes.
- `demo/index.html` demonstrates the intended static document structure, pins, annotations, and enum-based state coverage.
- `demo/showcase.html` covers the snapshot primitive surface and common states for visual review.
- `llms.txt` is the component/tag reference for generated prototypes.
- `skill.txt` documents the prototype implementation workflow and quality bar.
