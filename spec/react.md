# React Integration

`@21stware/rpui-react` wraps the RPML Web Components runtime as a React component with incremental, scroll-preserving rendering.

## Installation

```bash
npm install @21stware/rpui @21stware/rpui-react
# or
bun add @21stware/rpui @21stware/rpui-react
```

Both packages are required: `@21stware/rpui` provides the runtime and custom element definitions; `@21stware/rpui-react` is the React binding.

## Basic usage

```tsx
import { RpmlRenderer } from '@21stware/rpui-react';

function App() {
  return (
    <RpmlRenderer
      rpml={`
<page title="Dashboard" route="/dashboard">
  <view device="web" scale="0.7">
    <viewport>
      <navbar logo="Acme" />
    </viewport>
  </view>
</page>
      `}
    />
  );
}
```

## Live editor with debounce

When the RPML text changes on every keystroke (e.g. a live code editor), use `debounce` to avoid re-parsing on each character. The component preserves scroll position across updates.

```tsx
import { useState } from 'react';
import { RpmlRenderer } from '@21stware/rpui-react';

function Editor() {
  const [rpml, setRpml] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <textarea value={rpml} onChange={e => setRpml(e.target.value)} />
      <div style={{ flex: 1 }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <RpmlRenderer rpml={rpml} debounce={150} onError={setError} />
      </div>
    </div>
  );
}
```

## Rendering modes

Pass a `mode` prop to control interaction behavior:

```tsx
// view (default) — scrollable panes, pins and navigation active
<RpmlRenderer rpml={source} mode="view" />

// edit — full-height flat layout, no scrolling, no interactions (read-only)
<RpmlRenderer rpml={source} mode="edit" />

// pick — flat layout, hover/click highlights elements for selection
<RpmlRenderer
  rpml={source}
  mode="pick"
  onPick={info => console.log(info.langTag, info.line, info.attrs)}
/>
```

In **pick mode** elements highlight on hover and show a solid outline when clicked. Pass `selected` to mark elements programmatically (accepts an array of CSS selectors):

```tsx
<RpmlRenderer
  mode="pick"
  rpml={source}
  selected={['navbar-el', '[data-pin="1"]']}
  onPick={({ langTag, line, pin, attrs }) => revealLine(line)}
/>
```

## Theming

Pass a `theme` object to override the default color palette. All fields are optional CSS color strings:

```tsx
const darkTheme: RpuiTheme = {
  bg:         '#1e1e2e',
  surface:    '#2a2a3c',
  border:     '#3a3a4c',
  text:       '#cdd6f4',
  textMuted:  '#7f849c',
  accent:     '#89b4fa',
  // pick-mode highlights
  pickHoverBorder:    'rgba(137,180,250,.8)',
  pickHover:          'rgba(137,180,250,.08)',
  pickSelectedBorder: 'rgba(166,227,161,1)',
  pickSelected:       'rgba(166,227,161,.12)',
};

<RpmlRenderer rpml={source} theme={darkTheme} />
```

The theme keys map to CSS custom properties on the host element (`--rp-bg`, `--rp-surface`, etc.) which cascade into the prototype chrome (page background, annotation pane, header text, borders).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rpml` | `string` | required | RPML source text |
| `debounce` | `number` | `0` | Delay in ms before re-rendering after prop change |
| `mode` | `"view" \| "edit" \| "pick"` | `"view"` | Interaction mode |
| `theme` | `RpuiTheme` | — | Color overrides applied as CSS vars on the host |
| `selected` | `string[]` | — | CSS selectors to mark as selected (pick mode) |
| `onPick` | `(info: PickInfo) => void` | — | Called when user clicks an element in pick mode |
| `onError` | `(msg: string \| null) => void` | — | Parse error callback; `null` signals recovery |
| `className` | `string` | — | CSS class on the host `<div>` |
| `style` | `CSSProperties` | — | Inline style on the host `<div>` |

### PickInfo

```typescript
interface PickInfo {
  element: Element;   // the DOM element
  tag: string;        // Web Component tag, e.g. "navbar-el"
  langTag: string;    // RPML language tag, e.g. "navigator"
  pin?: string;       // data-pin value if present
  line?: number;      // 1-based source line in the original .rpml file
  attrs: Record<string, string>;
}
```

## VS Code integration

The VS Code extension's preview panel runs in **pick mode by default**. Clicking any prototype element highlights it and jumps the editor cursor to its source line in the `.rpml` file.

The webview automatically inherits VS Code's active theme by mapping VS Code CSS variables to RPUI CSS vars:

```
--vscode-editor-background   → --rp-bg
--vscode-editor-foreground   → --rp-text
--vscode-panel-border        → --rp-border
--vscode-button-background   → --rp-primary
… and pick-highlight vars from VS Code selection tokens
```

No configuration is needed — the preview adapts to light and dark themes automatically.

## How incremental rendering works

Each `RpmlRenderer` instance creates a single `DocRenderer` (from `@21stware/rpui`) tied to its host `<div>`. On each `rpml` change:

1. The RPML source is re-parsed and the host is updated via `replaceChildren`.
2. Custom elements that have already initialized (marked with `data-rp-ready`) skip their expensive setup in `connectedCallback`, re-using previously established DOM structure.
3. Scroll position is saved before and restored after the update via `requestAnimationFrame`.

This makes successive updates fast: the component-level paint is fresh, but the runtime overhead is amortized.

## Build

The package is built with [rolldown](https://rolldown.rs) and ships as a single ESM file. React and `@21stware/rpui` are peer dependencies (externalized from the bundle).

```bash
bun run --cwd packages/renderer-react build
```
