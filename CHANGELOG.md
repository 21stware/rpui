# Changelog

## 0.3.0 — 2026-06-08

### Added
- Monorepo structure with Bun workspaces (`@bracken/rpui` renderer, `rpml-parser`, `rpml-validator`, `rpml-vscode-extension`)
- RPML as a first-class file format (`.rpml`) — pure markup, root `<page-el>`, no HTML wrapper
- `rpml-parser` — `.rpml` text → AST → DOM (`parse()`, `astToDom()`)
- `rpml-validator` — structural + semantic validation (pin↔annotation parity, `rpml validate` CLI)
- `rpml-loader.ts` — `<rpml-app src="...">` custom element + `?rpml=` URL param rendering
- `spec/` — full language specification (00-overview through 10-versioning, per-element docs, XSD + JSON Schema)
- `examples/` — 6 `.rpml` example files (01-minimal through 06-multi-step-wizard)
- `agent/` — agent guide, prompt templates, context packs
- `tools/` — validate-examples.sh, check-spec-coverage.ts
- GitHub Actions deploy workflow for GitHub Pages

## 0.2.1 — 2026-06-07

- Add agent UI components (`chat-el`, `tool-call`, `reasoning-el`, etc.)
- Add preview gallery in docs/

## 0.2.0 — 2026-06-06

Initial public release of RPUI Web Components runtime.
