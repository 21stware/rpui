# RPUI

RPUI (Readable Prototype UI) is a static UI prototype canvas and snapshot primitive runtime implemented with native Web Components. It converts interaction states, permission variants, loading/empty/error states, and nested UI details into one readable static HTML document.

A prototype imports one generated runtime file:

```html
<script type="module" src="./dist/rpui.js"></script>
```

The runtime registers custom elements as a side effect and injects its global stylesheet and inline SVG icons. No framework, external CSS, image CDN, or icon CDN is required.

## What it provides

- `rp-page`, `rp-main-view`, `rp-annotation`, `rp-enum`, and `rp-enum-item` for the annotation canvas.
- A persistent two-pane page layout: title and main snapshot stay visible on the left; top-level annotations render in an independently scrollable right pane.
- Device preset sizing for `web`, `ipad`, and `mobile`, with fixed-width/auto-height snapshots by default.
- `rp-enum-item description="..."` for short state explanations.
- `rp-*` snapshot primitives for static product UI snapshots and annotation slices.
- Compatibility aliases: `proto-*` for canvas primitives and `snap-*` for snapshot primitives.
- Automatic numbered pin rendering from `data-pin="N"` inside `rp-main-view`.
- Attribute-driven static visual states for forms, navigation, tables, overlays, feedback, and empty/loading states.
- `llms.txt` as the model-facing component reference.
- `skill.txt` as the repeatable RPUI prototype authoring workflow.

## Development

```bash
npm install
npm run build
```

Useful scripts:

```bash
npm run dev        # open the source-mode component preview at /preview/
npm run typecheck  # run TypeScript type checking without emitting files
npm run build      # type-check, bundle dist/rpui.js, and emit declarations
npm run release    # currently aliases npm run build
npm run clean      # remove and recreate dist/
```

There are currently no lint or test scripts. Use `npm run build` as the full type-check and release artifact verification step.

## Release artifacts

Runtime source is organized into internal modules:

- `src/rpui.ts` — public side-effect entry/aggregator
- `src/registry.ts` — custom element registration and aliases
- `src/core/` — icons, runtime CSS injection, DOM/attribute helpers
- `src/canvas/` — page shell, main view, annotations, enums
- `src/primitives/` — snapshot primitive component groups

Build output is generated into `dist/`:

- `dist/rpui.js` — bundled browser/runtime entrypoint
- `dist/rpui.d.ts` — TypeScript declaration output for the public entry
- `dist/rpui.js.map` — source map

The package is ESM and exposes `dist/rpui.js` through `main`, `module`, and `exports`. The package is side-effectful because importing it registers custom elements.

## Development preview

Run the source-mode preview during component development:

```bash
npm run dev
```

This opens `/preview/`, which imports `/src/rpui.ts` directly through Vite. Use it to review component states while editing source.

The demo files under `demo/` intentionally import `../dist/rpui.js` and are release-artifact smoke tests; run `npm run build` before opening them after source changes.

## Demo

After building, open `demo/index.html` in a browser.

The demo shows the intended static document structure:

- one `<rp-page>` root
- one `<rp-main-view>` containing a main snapshot
- meaningful `data-pin="N"` anchors
- matching top-level annotations
- nested annotations and enum-based state coverage

## Authoring guidance

Use `rp-*` tags for new work. `proto-*` and `snap-*` are compatibility aliases.

Prefer device presets for new prototypes:

```html
<rp-main-view device="web" scale="0.65">
  <rp-viewport device="web">
    <!-- fixed-width, auto-height snapshot -->
  </rp-viewport>
</rp-main-view>
```

Supported presets are `web` (1440px), `ipad` (834px), and `mobile` (390px). Explicit `width` overrides a preset; explicit numeric `height` keeps legacy fixed-height behavior.

Top-level annotations render in the right-side annotation pane automatically. Keep annotation content compact; use `rp-enum-item description="..."` for short state explanations.

Prototype pages should be static and self-contained:

- no functional JavaScript interactions
- no event attributes such as `onclick`
- no external CSS/image/icon CDN
- no `position:absolute` or `position:fixed` in snapshot content
- all states represented explicitly through attributes and `<rp-enum>` items

See `llms.txt` for the component reference and `skill.txt` for the full prototype workflow.
