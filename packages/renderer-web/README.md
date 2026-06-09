# @21stware/rpui

The RPUI Web Components runtime — renders [RPML](https://github.com/21stware/rpui) (`.rpml`) static UI prototypes in the browser. Importing the bundle registers the custom elements as a side effect and injects one global stylesheet.

## Install

```bash
npm install @21stware/rpui
# or: bun add @21stware/rpui
```

## Render a prototype

Import the runtime once; author with the bare RPML language tags (`page`, `view`, `button`, …):

```html
<script type="module" src="node_modules/@21stware/rpui/dist/rpui.js"></script>

<page title="Tasks" route="/tasks">
  <view device="web">
    <viewport device="web">
      <navigator height="56"><logo label="PM+"></logo></navigator>
    </viewport>
  </view>
</page>
```

Programmatic use (the runtime re-exports the parser entry points, so no separate dependency is needed):

```js
import { parseToPage } from '@21stware/rpui';
document.body.appendChild(parseToPage(rpmlSource));
```

## `rpui serve` — host a directory of prototypes

The package ships an `rpui` bin that hosts a directory of `.rpml` files as one navigable gallery (collapsible sidebar, hash routing, `index.rpml` as the default home) and prints a local URL:

```bash
npx @21stware/rpui serve .
```

```
  RPUI serving 9 .rpml files from /Users/me/prototypes

  Local:  http://localhost:3000

  Press Ctrl+C to stop
```

The directory is re-scanned on every page load, so editing a `.rpml` and refreshing the browser shows the change — no build step, no watcher, no websocket.

| Argument | Description |
|----------|-------------|
| `[dir]` | Directory to serve (default: current directory) |
| `-p, --port` | Port (default `3000`; auto-increments if busy) |
| `--host` | Host (default `localhost`) |

```bash
# serve a specific directory on a chosen port
npx @21stware/rpui serve ./prototypes --port 4000
```

## Exports

| Export | Description |
|--------|-------------|
| `@21stware/rpui` | side-effect entry; registers all custom elements and injects the runtime stylesheet |
| `registerAll()` | re-run registration (idempotent; `define()` skips already-registered tags) |
| `parseToPage(source)` | parse `.rpml` text into a ready-to-mount `<page>` element |
| `rewriteTags(source)` | rewrite bare RPML language tags to the registered component tags |

See the repo root for the full [RPML spec](../../spec), [`llms.txt`](../../llms.txt) component reference, and the [`SKILL.md`](../../rapid-prototype-implement/SKILL.md) authoring workflow.
