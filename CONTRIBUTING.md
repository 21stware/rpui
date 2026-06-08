# Contributing

## Setup

```bash
bun install
bun run dev     # renderer-web dev server
bun run build   # build all
```

## Workspace layout

```
packages/renderer-web/  — Web Components renderer (rpui runtime)
packages/parser/        — .rpml → AST
packages/validator/     — validation + CLI
spec/                   — language specification (edit here to propose changes)
examples/               — .rpml example files
agent/                  — agent prompt templates
tools/                  — dev scripts
```

## Adding a component

1. Implement in `packages/renderer-web/src/primitives/`.
2. Register in `packages/renderer-web/src/registry.ts`.
3. Add to `preview/components.js` (group + attrs + html example).
4. Add spec doc in `spec/elements/<category>/rp-<name>.md` using `spec/elements/_template.md`.
5. Add at least one usage in an `examples/` `.rpml` file.

## Adding a spec change

Edit the relevant `spec/` file. For new elements, follow the template. For language changes, update the relevant numbered doc and the XSD/JSON Schema in `spec/schema/`.

## Validate examples

```bash
bash tools/validate-examples.sh
```

## Type-check

```bash
bun run typecheck   # runs tsc in packages/renderer-web
```
