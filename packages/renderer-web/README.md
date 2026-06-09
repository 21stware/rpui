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

## `rpui` CLI

The package ships an `rpui` bin with two commands for working with a directory of `.rpml` files. Both render the directory as one navigable gallery (collapsible sidebar, hash routing, `index.rpml` as the default home) and share the same zero-dependency runtime.

### `rpui serve` — host a directory of prototypes

Hosts the directory on a local server, prints the URL, and opens the browser:

```bash
npx @21stware/rpui serve .
```

```
  RPUI serving 8 .rpml files from /Users/me/prototypes

  Local:  http://localhost:3000

  Press Ctrl+C to stop
```

The directory is re-scanned on every page load, so editing a `.rpml` and refreshing the browser shows the change — no build step, no watcher, no websocket.

| Argument | Description |
|----------|-------------|
| `[dir]` | Directory to serve (default: current directory) |
| `-p, --port` | Port (default `3000`; auto-increments if busy) |
| `--host` | Host (default `localhost`) |
| `--no-open` | Don't open the browser on start (headless / CI) |

```bash
# serve a specific directory on a chosen port, without opening a browser
npx @21stware/rpui serve ./prototypes --port 4000 --no-open
```

### `rpui build` — compile to one HTML file

Compiles the directory into a single self-contained HTML file (inlined runtime + gallery) that works offline from `file://`:

```bash
npx @21stware/rpui build .
```

```
  ✓ compiled 8 .rpml files → prototypes.html
```

| Argument | Description |
|----------|-------------|
| `[dir]` | Directory of `.rpml` (recursive; default: current directory) |
| `-o, --out` | Output HTML path (default: `<dir>.html`) |
| `--title` | Gallery title (default: directory name) |

```bash
# compile to a named file with a custom title
npx @21stware/rpui build ./prototypes -o prototypes.html --title "Prototypes"
```

## Exports

| Export | Description |
|--------|-------------|
| `@21stware/rpui` | side-effect entry; registers all custom elements and injects the runtime stylesheet |
| `registerAll()` | re-run registration (idempotent; `define()` skips already-registered tags) |
| `parseToPage(source)` | parse `.rpml` text into a ready-to-mount `<page>` element |
| `rewriteTags(source)` | rewrite bare RPML language tags to the registered component tags |

See the repo root for the full [RPML spec](../../spec), [`llms.txt`](../../llms.txt) component reference, and the [`SKILL.md`](../../rapid-prototype-implement/SKILL.md) authoring workflow.
