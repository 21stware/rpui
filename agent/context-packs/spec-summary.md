# RPML Spec Summary (Context Pack)

## File format

An RPML file is an XML document. The root element is `<rp-page>`. No HTML wrapper, no doctype required. Import the renderer once:

```html
<script type="module" src="./dist/rpui.js"></script>
```

Or as a standalone `.rpml` XML file validated by `rpml-1.0.xsd`.

## Root structure

```xml
<rp-page title="..." route="/route" description="Snapshot shows [representative state]">
  <rp-main-view device="web|ipad|mobile" scale="0.65">
    <rp-viewport device="web|ipad|mobile">
      <!-- snapshot: rp-* primitives only, data-pin="N" on meaningful regions -->
    </rp-viewport>
  </rp-main-view>

  <rp-annotation id="1" label="Region Name">
    Spec prose.
    <rp-enum>
      <rp-enum-item label="State A" description="Trigger/condition."><!-- rp-* --></rp-enum-item>
    </rp-enum>
    <rp-annotation label="Sub-region">Nested spec.</rp-annotation>
  </rp-annotation>
  <!-- one <rp-annotation id="N"> per data-pin="N" -->
</rp-page>
```

## Two-layer model

**Canvas layer** — document structure and specification:
- `rp-page` — root; title, route, description.
- `rp-main-view` — scaled snapshot frame; `device`, `scale`, optional `width`/`height`.
- `rp-viewport` — snapshot viewport; same `device` as main-view.
- `rp-annotation` — specification block; top-level has `id` matching a pin, nested has no `id`.
- `rp-enum` — horizontal container for mutually exclusive states.
- `rp-enum-item` — one state card; `label` required, `description` optional.

**Primitive layer** — static UI building blocks used inside `rp-main-view` and inside annotation `rp-enum-item` bodies. ~109 elements across layout, controls, navigation, data display, feedback, enterprise, iOS, macOS, and agent families.

## Pin system

- Add `data-pin="N"` to any element inside `<rp-main-view>`. Pins number from 1 with no gaps.
- Every `data-pin="N"` requires a matching `<rp-annotation id="N">` at the top level of `rp-page`.
- The runtime renders water-drop pin markers automatically. Never write pin DOM manually.

## Annotation nesting and section addressing

Annotations nest arbitrarily. The runtime auto-assigns `data-rp-section` paths (authors do not write them):

| Depth | Example path | Marker |
|-------|-------------|--------|
| Top-level (has `id`) | `3` | Blue water-drop, shows id |
| Nested depth 1 | `3-2` | Purple circle, shows local index `2` |
| Nested depth ≥2 | `3-2-1` | Green triangle, shows local index `1` |

Local index = 1-based position among annotation siblings under the same parent. Sibling order is significant.

Clicking a pin or annotation title sets `?section=<path>` in the URL. Loading a URL with `?section=3-2-1` focuses that annotation.

## Decomposition levels (L1–L5)

| Level | What it describes |
|-------|-------------------|
| L1 | Page region (rp-annotation with id) |
| L2 | Element or concern inside the region (nested rp-annotation) |
| L3 | State family — mutually exclusive states (rp-enum) |
| L4 | Per-state rule — trigger, threshold, transition (rp-enum-item + description) |
| L5 | Boundary/exception — edge cases, overflow, permission denial |

Not every region reaches L5. Let domain complexity decide depth.

## rp-enum usage

Use `<rp-enum>` for: state families (loaded/loading/empty/error), permission variants, validation branches, overlay results (open/closed, success/failure), and any conditional branch in code. Each `rp-enum-item` gets an auto-numbered black square badge. Combinatorial states (permission × state) must be enumerated as products, not as separate flat lists.

## Overlay pattern

`rp-modal`, `rp-drawer`, `rp-dropdown`, `rp-popover`, `rp-tooltip`, `rp-toast` are **never placed in the main snapshot**. Pin the trigger element; render the overlay inside the trigger's annotation (usually inside `<rp-enum>`).

Exception: a permanently docked side panel may appear open in the snapshot as the representative state, but its trigger and conditions must still be documented.

## Forbidden in RPML

- Raw `div`, `button`, `input`, `table` for product UI.
- `onclick`, event attributes, timers, API calls, framework state.
- External images (use `rp-image-placeholder`), external CSS, CDN icons.
- `position:absolute` or `position:fixed` in snapshot content.
- `proto-*` or `snap-*` tags in new work (compatibility aliases only).
- Interactive JS of any kind.

## Validation

```
bun run --cwd packages/validator cli <file.rpml>
```

Checks pin/annotation parity, consecutive pin numbering, and XSD structural constraints.
