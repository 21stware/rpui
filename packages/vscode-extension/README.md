# RPML for VS Code

Language support for **RPML** (`.rpml`) — the Rapid Prototype Markup Language rendered by [RPUI](https://github.com/21stware/rpui).

## Features

- **Syntax highlighting** — tags, attributes, `data-pin` anchors, comments, and entities (TextMate grammar, `text.html.rpml`).
- **Completion**
  - Tag names after `<` / `</` (canvas tags sort first), inserting a `<tag>…</tag>` skeleton.
  - Attribute names inside an open tag, drawn from the element catalog plus the global `data-pin` / `style` / `class`.
  - Attribute **values** for known enumerations (e.g. `device="web|ipad|mobile"`, `variant="primary|…"`).
- **Hover** — element description and attribute list on any tag name.
- **Diagnostics** — runs the RPML parser + validator on every edit: parse errors, missing `<view>`, `data-pin` ↔ `<annotation id>` parity, missing `title`. Toggle with `rpml.validate.enable`.
- **Live preview** — `RPML: Open Preview to the Side` renders the document with the real RPUI runtime in a webview, re-rendering as you type.

## How it works

The completion catalog (`data/elements.json`) is generated from the **single source of truth** — the parser vocabulary (`packages/parser/src/vocabulary.ts`) plus the component attribute catalog (`preview/components.js`). The diagnostics reuse `rpml-parser` + `rpml-validator` directly (bundled). The preview loads the same `dist/rpui.js` runtime the browser uses, so the language tags (`page`, `view`, `navigator`, …) are mapped to component tags exactly as in production.

## Develop

```bash
bun install                       # from repo root
bun run build                     # from repo root — produces dist/rpui.js (preview needs it)
bun run --cwd packages/vscode-extension build   # gen catalog + copy runtime + bundle
```

Then press <kbd>F5</kbd> in VS Code (Extension Development Host) to try it on `examples/*.rpml`.

Regenerate the catalog after changing the vocabulary or component attributes:

```bash
bun run --cwd packages/vscode-extension gen
```

## Build outputs (git-ignored, regenerated)

- `dist/extension.js` — bundled extension (esbuild, CJS, `vscode` external).
- `media/rpui.js` — copy of the RPUI runtime for the preview webview.
