# RPML Agent Guide

## 1. Inputs to gather before generating

Collect in priority order:

1. **Product requirement / user story** — the feature, route, and user goal.
2. **Screenshot or design draft** — identifies regions, layout, and density.
3. **Existing code with conditionals** — read every `v-if`, `&&`, ternary, and guard; each is a state to enumerate.
4. **Permission matrix / role notes** — which roles exist and what differs per role.
5. **Known async states** — loading, empty, error, retry, partial-failure, timeout.

If any input is missing, infer common SaaS/product states and make every assumption explicit in an annotation. Never silently omit a plausible state.

## 2. Recursive decomposition (L1–L5)

Apply this top-down to every pinned region. Stop when further splitting adds no implementation value.

| Level | Element | Purpose |
|-------|---------|---------|
| L1 | `<rp-annotation id="N">` (pinned) | Structural area of the page: navbar, sidebar, filter bar, table, drawer |
| L2 | Nested `<rp-annotation>` | Distinct responsibility inside the region: one column, a form field group, the bulk-action bar |
| L3 | `<rp-enum>` or nested annotation containing one | Mutually exclusive states for that element: default/focus/filled/error; collapsed/expanded |
| L4 | `<rp-enum-item>` + `description` | What each state means: trigger, threshold, transition, permission gate |
| L5 | Deepest annotation/enum | Extremes and failure modes: 0/empty/overflow values, race conditions, permission denials |

A simple stat card may stop at L3. A data table with a detail drawer routinely reaches L5. Let the domain decide depth; let completeness decide breadth.

For combinatorial states, build the product of axes rather than listing each axis independently:
- permission × state
- role × data-size
- flow-step × validation
- read-state × SLA × selection

Drop impossible cells; create one `<rp-enum-item>` per surviving combination.

## 3. Quality bar

A prototype meets the bar when a reviewer reading it has no remaining "but what happens when…" questions.

Concrete targets:
- **8–10 top-level annotations**, one per meaningful pinned region.
- **3–5 nesting levels** where the domain warrants it.
- **Every conditional branch** in `<rp-enum>` — states, permission variants, validation outcomes, async results.
- **Implementation-depth annotation bodies**: trigger conditions, data source, state-machine transitions, permission gates, validation rules, error handling, boundary values.

Reference: `demo/golden.html` — 9 top-level annotations, 3–5 levels deep.

## 4. What NOT to do

- Do not use `div`, `button`, `input`, or `table` for product UI. Use `rp-*` primitives only.
- Do not add `onclick`, hover behavior, runtime focus, timers, API calls, or framework state.
- Do not import external CSS, image CDNs, or icon CDNs. The runtime provides inline SVG icons.
- Do not use `position:absolute` or `position:fixed` in snapshot content. RPUI owns pin positioning.
- Do not place overlays (`rp-modal`, `rp-drawer`, `rp-dropdown`, `rp-popover`, `rp-tooltip`, `rp-toast`) in the main snapshot. Pin the trigger; render the overlay inside its annotation enum.
- Do not stack mutually exclusive states (empty + loading + modal) side by side in the snapshot.
- Do not use `proto-*` or `snap-*` for new work; those are compatibility aliases only.
- Do not omit a plausible state because the input didn't mention it; infer and annotate.

## 5. Validation

Run the validator CLI after generating:

```
bun run --cwd packages/validator cli <file.rpml>
```

The validator checks:
- Every `data-pin="N"` has a matching top-level `<rp-annotation id="N">`.
- Pin numbers are continuous from 1 with no gaps.
- XSD structural constraints (rp-page root, exactly one rp-main-view, etc.).

Fix all reported errors before delivering the file.
