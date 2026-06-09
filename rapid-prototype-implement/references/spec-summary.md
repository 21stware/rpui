# RPML Spec Summary (Context Pack)

## File format

An RPML file is an XML document. The root element is `<page>`. No HTML wrapper, no doctype required. Import the renderer once:

```html
<script type="module" src="./dist/rpui.js"></script>
```

Or as a standalone `.rpml` XML file validated by `rpml-1.0.xsd`.

## Root structure

```xml
<page title="..." route="/route" description="Snapshot shows [representative state]">
  <view device="web|ipad|mobile" scale="0.65">
    <viewport device="web|ipad|mobile">
      <!-- snapshot: RPML primitives only, data-pin="N" on meaningful regions -->
    </viewport>
  </view>

  <annotation id="1" label="Region Name">
    Spec prose.
    <enum>
      <enum-item label="State A" description="Trigger/condition."><!-- RPML primitives --></enum-item>
    </enum>
    <annotation label="Sub-region">Nested spec.</annotation>
  </annotation>
  <!-- one <annotation id="N"> per data-pin="N" -->
</page>
```

## Two-layer model

**Canvas layer** — document structure and specification:
- `page` — root; title, route, description.
- `view` — scaled snapshot frame; `device`, `scale`, optional `width`/`height`.
- `viewport` — snapshot viewport; same `device` as view.
- `annotation` — specification block; top-level has `id` matching a pin, nested has no `id`.
- `enum` — horizontal container for mutually exclusive states.
- `enum-item` — one state card; `label` required, `description` optional.

**Primitive layer** — static UI building blocks used inside `view` and inside annotation `enum-item` bodies. ~109 elements across layout, controls, navigation, data display, feedback, enterprise, iOS, macOS, and agent families.

## Pin system

- Add `data-pin="N"` to any element inside `<view>`. Pins number from 1 with no gaps.
- Every `data-pin="N"` requires a matching `<annotation id="N">` at the top level of `page`.
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
| L1 | Page region (annotation with id) |
| L2 | Element or concern inside the region (nested annotation) |
| L3 | State family — mutually exclusive states (enum) |
| L4 | Per-state rule — trigger, threshold, transition (enum-item + description) |
| L5 | Boundary/exception — edge cases, overflow, permission denial |

Not every region reaches L5. Let domain complexity decide depth.

## enum usage

Use `<enum>` for: state families (loaded/loading/empty/error), permission variants, validation branches, overlay results (open/closed, success/failure), and any conditional branch in code. Each `enum-item` gets an auto-numbered black square badge. Combinatorial states (permission × state) must be enumerated as products, not as separate flat lists.

## Overlay pattern

`modal`, `drawer`, `dropdown`, `popover`, `tooltip`, `toast` are **never placed in the main snapshot**. Pin the trigger element; render the overlay inside the trigger's annotation (usually inside `<enum>`).

Exception: a permanently docked side panel may appear open in the snapshot as the representative state, but its trigger and conditions must still be documented.

## Forbidden in RPML

- Raw `div`, `button`, `input`, `table` for product UI.
- `onclick`, event attributes, timers, API calls, framework state.
- External images (use `image-placeholder`), external CSS, CDN icons.
- `position:absolute` or `position:fixed` in snapshot content.
- Prefixed or aliased tags — use bare RPML tag names only.
- Interactive JS of any kind.

## Validation

```
bun run validate <file.rpml>
```

Checks pin/annotation parity, consecutive pin numbering, and XSD structural constraints.
