# RPML Monorepo

**RPML** (Rapid Prototype Markup Language) is a static UI prototype specification language and rendering runtime. A `.rpml` file is pure markup starting with `<page>` — no HTML wrapper needed.

```xml
<page title="任务管理" route="/tasks" description="主快照：有数据、筛选展开、抽屉打开。">
  <view device="web" scale="0.65">
    <viewport device="web">
      <navigator height="56" data-pin="1"><logo label="PM+"></logo></navigator>
    </viewport>
  </view>
  <annotation id="1" label="导航栏">固定顶栏，高度 56px。</annotation>
</page>
```

## Packages

| Package | Description |
|---------|-------------|
| [`@21stware/rpui`](./packages/renderer-web) | Web Components runtime (the RPUI/RPML renderer) |
| [`rpml-parser`](./packages/parser) | `.rpml` text → AST → DOM (private) |
| [`rpml-validator`](./packages/validator) | Structural + semantic validation, `rpml` CLI (private) |
| [`rpml-vscode-extension`](./packages/vscode-extension) | VS Code syntax + preview + diagnostics — WIP (private) |

## Quick start

```bash
bun install
bun run dev          # component preview at /preview/
bun run build        # build renderer-web to dist/rpui.js
```

## Render a .rpml file

```html
<!-- host.html -->
<script type="module" src="dist/rpml-loader.js"></script>
<rpml-app src="./my-page.rpml"></rpml-app>
```

Or via URL param: `host.html?rpml=./my-page.rpml`

## Serve or build a directory of prototypes

Host a folder of `.rpml` files as one navigable gallery (collapsible sidebar, re-scanned on each refresh), opening the browser at a local URL:

```bash
npx @21stware/rpui serve .
```

Or compile the folder into one self-contained, offline HTML file:

```bash
npx @21stware/rpui build .
```

See [`packages/renderer-web`](./packages/renderer-web#rpui-cli) for options.

## Validate

```bash
bun packages/validator/src/cli.ts examples/04-ticket-desk.rpml
```

## Docs

- [`spec/`](./spec/) — Language specification
- [`examples/`](./examples/) — `.rpml` example files (01 minimal → 04 golden)
- [`rapid-prototype-implement/`](./rapid-prototype-implement/) — Generation skill: SKILL.md, prompts, and reference packs
- [`llms.txt`](./llms.txt) — Component reference for LLMs
- [`rapid-prototype-implement/SKILL.md`](./rapid-prototype-implement/SKILL.md) — Prototype authoring workflow
