---
name: rapid-prototype-implement
description: Generate static RPML UI prototypes from product requirements, screenshots, existing UI code, or design notes. Each .rpml file is one screen or functional region (root `<page>`) that lays out every interaction state, permission variant, and loading/empty/error/validation branch in a single annotated layout; a multi-screen product becomes a set of such files, browsed together as a gallery. The result is a product definition engineering can build from and QA can test against. Use when the user wants to prototype, spec, or visualize one or more product screens, turn requirements or a design into a reviewable UI artifact, or document a page's states and edge cases, even if they don't explicitly say "RPML" or "prototype".
---

# RPUI Prototype Implementation Skill

Turn product requirements, screenshots, existing UI code, or design notes into a static **RPML** prototype. Each `.rpml` file is **one screen or functional region** — a single readable document that bakes every interaction state, permission variant, and loading/empty/error/validation branch into one spatial layout, at a depth engineering can implement from and QA can derive test cases from, without running the app. A multi-screen product is a **set** of these files (one per page/region), browsed together as a gallery via `serve`, the compiler, or the playground.

RPML does not simulate interaction; it replaces time with space. The two words that govern quality are **complex** (cover a real production page's information density) and **complete** (no state, branch, permission, or edge case left implicit). For the _why_, see `spec/00-overview.md`.

> If a reviewer finishes reading the prototype and still has to ask "but what happens when…", it is not done.

## Capabilities (generation-first)

| Capability              | Prompt                                                       | Use when                                                          |
| ----------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Generate** (flagship) | [`prompts/generate-rpml.md`](prompts/generate-rpml.md)       | Producing a new `.rpml` from requirements/screenshots/code        |
| Review                  | [`prompts/review-rpml.md`](prompts/review-rpml.md)           | Checking an existing `.rpml` for completeness                     |
| Diff impact             | [`prompts/rpml-diff-impact.md`](prompts/rpml-diff-impact.md) | Classifying what changed between two `.rpml` versions             |
| RPML → code             | [`prompts/rpml-to-code.md`](prompts/rpml-to-code.md)         | Extracting a spec from `.rpml` and generating implementation code |

## Generation best practices (non-negotiable)

These are short and load-bearing — follow them even before opening the references.

**Output contract (per file).** Each `.rpml` covers exactly one screen/region. Emit a bare `.rpml` file — root element `<page>`, **no HTML wrapper, no doctype**. The document holds:

1. one `<page>` with `title`, `route`, and a `description` naming the representative state the snapshot captures,
2. exactly one `<view device="web|ipad|mobile">` containing the main snapshot (usually inside a `<viewport device="…">`),
3. snapshot content built with **RPML primitives only**,
4. `data-pin="N"` on every meaningful region, numbered from 1 with no gaps,
5. a matching top-level `<annotation id="N" label="…">` for every pin,
6. `<enum>` / `<enum-item>` for every conditional branch and state family.

To preview, host the `.rpml` (playground `?rpml=`, `npx @21stware/rpui serve .`, or the compiler). Only as a secondary "embed in a page" option do you wrap it in HTML with a single `<script type="module" src="dist/rpui.js"></script>` — never the primary output.

**Pin↔annotation parity.** Every `data-pin="N"` has exactly one top-level `<annotation id="N">`, and vice versa. Pins are consecutive from 1.

**Overlay trigger pattern.** Overlays and transient feedback (`modal`, `drawer`, `dropdown`, `popover`, `tooltip`, `toast`) are interaction _results_, not page regions. Never place them in the main snapshot. Instead: pin the **trigger** (the button/row/menu entry that opens it), state the trigger condition + permission gate in the annotation body, and render the overlay **inside the annotation** as an `<enum>` of its variants.

```html
<!-- main snapshot: only the trigger is pinned -->
<button label="批量关闭" variant="danger" data-pin="5"></button>

<!-- annotation: trigger condition + overlay rendered here -->
<annotation id="5" label="批量关闭">
  触发条件：勾选 ≥1 行后点击「批量关闭」，仅主管/坐席可见。点击弹出二次确认。
  <enum>
    <enum-item label="确认弹窗" description="列出影响范围与可逆性。">
      <modal title="批量关闭确认" has-footer>
        <alert
          type="warning"
          title="将关闭 3 条工单"
          message="客户 7 天内可重开。"
        ></alert>
      </modal>
    </enum-item>
    <enum-item label="关闭成功" description="3s 自动消失，列表刷新。">
      <toast type="success" title="已关闭 3 条工单"></toast>
    </enum-item>
  </enum>
</annotation>
```

A side panel that is a _permanently docked_ structural region may appear open in the snapshot — but document its open/close trigger anyway. When unsure, treat it as an overlay.

**Forbidden.** No `div`/`button`/`input`/`table` for product UI (use RPML primitives; plain text in annotations is fine). No `onclick`, event attributes, timers, API calls, runtime focus, or hover behavior. No external CSS, image CDNs, or icon CDNs (the runtime ships inline SVG icons). No `position:absolute`/`fixed` in snapshot content — RPUI owns pin positioning.

**Bare tags.** Single-word elements have no suffix (`button`, `table`); compound names keep their hyphen (`list-item`, `table-row`); platform primitives use `ios-*` / `macos-*`. Never write the underlying component tags (`page-el`, `main-view`).

## References (single sources of truth)

Depth lives in these — do not re-derive it:

- **Method** — recursive decomposition L1–L5, coverage-matrix for combinatorial states, annotation-body dimensions, the what-NOT-to-do list: [`references/practise.md`](references/practise.md).
- **Compressed spec** — root structure, attributes, rules at a glance: [`references/spec-summary.md`](references/spec-summary.md). Full language rules: `spec/`.
- **Component reference** — every element and its attributes: `llms.txt` (authoritative). One-line element index: [`references/element-index.md`](references/element-index.md).
- **Worked example (the complexity bar)** — a complete, implementation-depth prototype to study before authoring: [`references/example-reference.rpml`](references/example-reference.rpml) (a service desk: 9 top-level annotations, 3–5 levels deep, every overlay modeled as trigger → result). Match your depth to the domain — don't over-build a simple page to this level. More graduated examples (entry → complex) live in `examples/`.
- **Visual catalog** — `bun run dev`, then the source-mode preview at `/preview/`.

## Workflow

1. Gather inputs (requirement → screenshot → conditional code → permission matrix → async states). Make every inferred state explicit in an annotation.
2. Pick the device preset (`web` desktop/admin, `ipad`, `mobile`) — prefer fixed-width, auto-height.
3. Choose the **most information-dense representative state** for the snapshot: loaded data, active selection, an open docked panel, role-specific controls, active validation. Never an empty shell.
4. Build the snapshot inside `<view>` with RPML primitives, adding `data-pin="N"` to every meaningful region.
5. Create one top-level `<annotation id="N">` per pin.
6. Apply recursive decomposition (L1→L5) and the coverage-matrix method to each region — see `references/practise.md`.
7. Write annotation bodies at implementation depth; expand every hidden interaction result into an `<enum>`.
8. Verify no forbidden patterns (HTML product UI, JS, external resources, absolute positioning).
9. **Validate:** `bun run validate <file.rpml>` — fix every reported error before delivering.

**Multi-screen products.** A prototype is rarely one file. Produce **one `.rpml` per screen or functional region**, named by route, and collect them in a directory the gallery can host (`serve`, the compiler, or playground folder-drop). Never cram multiple screens into one `<page>` — the one-`<view>` contract forbids it. If a single page exceeds ~12 pins it is too dense: split a sub-area into its own file and note the relationship in each `description`. For cross-screen flows (wizard, drill-down), state the entry/exit routes so the set reads as one connected flow.

## Quality bar

Before finishing, confirm:

- pin numbers continuous; every pin has a matching top-level annotation,
- the snapshot shows the most information-dense useful state,
- decomposition reached implementation depth where the domain warranted it (state machines, permission gates, validation, boundaries covered),
- combinatorial states (permission × state, role × scale, step × validation) enumerated, not collapsed,
- every hidden interaction result expanded into an enum; overlays modeled as trigger → result,
- role/permission differences explicit,
- runtime limits noted where they affect fidelity (e.g. `table` cell text is sampled from column names — describe exact data in the annotation),
- no forbidden product-UI HTML, scripts, event handlers, or external resources.
