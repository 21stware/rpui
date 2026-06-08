# RPUI Prototype Implementation Skill

Use this skill when converting product requirements, screenshots, existing UI code, or design notes into a static RPUI prototype.

## Goal

Produce one readable, static, self-contained HTML prototype that **completely** exposes a product page's UI structure, interaction states, permissions, loading/empty/error/validation states, state machines, and edge cases — at a level of detail engineering can implement from and QA can derive test cases from, without running the real app.

RPUI does not simulate interaction. It bakes time-based behavior into a spatial document: every state that would normally appear only after a click, a role change, or a server response is laid out at once. The two words that govern quality are **complex** (cover the real information density of a production page) and **complete** (no state, branch, permission, or edge case left implicit).

> If a reviewer finishes reading your prototype and still has to ask "but what happens when…", the prototype is not done.

## Complexity expectation

A realistic complex application page is **not** a few annotated regions. Calibrate to this baseline:

- **8–10 top-level annotations** (`<annotation id="N">`), one per meaningful pinned region.
- **3–5 levels of annotation nesting** where the domain warrants it: region → element → state family → per-state rule → boundary/exception.
- **Every conditional branch enumerated** with `<enum>` — states, permission variants, validation outcomes, async results.
- Annotation bodies written at **implementation depth**: trigger conditions, data source, state-machine transitions, permission gates, validation rules, error handling, boundary values.

`demo/golden.html` is the reference for this bar. Study it before authoring. The minimal template at the bottom of this file shows mechanics only — never treat it as a complexity target.

## Required inputs

Prefer these inputs, in priority order:

1. Product requirement or user story.
2. Screenshot or design draft.
3. Existing code with conditional rendering (read `v-if`/`&&`/ternaries/guards — each is a state to enumerate).
4. Permission matrix or role notes.
5. Known loading, empty, error, validation, and edge cases.

If inputs are missing, infer common SaaS/product states and make every assumption explicit in an annotation. Never silently omit a plausible state.

## Output contract

Output a complete HTML file that imports exactly one RPUI runtime file:

```html
<script type="module" src="./dist/rpui.js"></script>
```

The document must contain:

1. one `<page>` root with `title`, `route`, and `description` (the description should state which representative state the main snapshot captures),
2. exactly one `<view>` containing the main page snapshot,
3. snapshot content built with RPML primitives only,
4. numbered `data-pin="N"` anchors on every meaningful view region,
5. matching top-level `<annotation id="N" label="...">` blocks,
6. `<enum>` / `<enum-item>` for every conditional branch and state family.

## The recursive decomposition method

This is the core technique for reaching completeness. Decompose every pinned region top-down through up to five semantic levels. Stop at the level where further splitting adds no implementation value.

- **L1 — Region** (`<annotation id="N">`, pinned): a structural area of the page (navbar, sidebar, filter bar, table, drawer). One per `data-pin`.
- **L2 — Element / concern** (nested `<annotation>`): a distinct responsibility inside the region (search behavior, a single column, the bulk-action bar, one form field group).
- **L3 — State family** (`<enum>` or a nested annotation containing one): the set of mutually exclusive states for that element (default/focus/filled/error; collapsed/expanded; the rows' read×SLA×selected matrix).
- **L4 — Per-state rule** (`<enum-item>` + `description`, or a deeper annotation): what each state _means_ and the rule behind it — trigger, threshold, transition, gate.
- **L5 — Boundary / exception** (deepest annotation/enum): extremes and failure modes — 0/empty/overflow values, race conditions, permission denials, irreversible actions.

Not every region needs all five levels. A simple stat card may stop at L3. A data table with a detail drawer will routinely reach L5. Let the domain decide depth; let completeness decide breadth.

## Annotation content structure

L1/L2 annotation bodies must read like a spec, not a caption. For a non-trivial region, cover the relevant subset of these dimensions in plain prose:

- **Trigger / entry condition** — what causes this to appear or activate.
- **Data source & refresh** — where values come from, polling/refresh cadence.
- **State enumeration** — which states exist (then expand them in `<enum>`).
- **Permission gate** — which roles see/use it, what changes per role.
- **Validation rule** — required fields, formats, cross-field constraints.
- **Error / async handling** — loading, empty, partial-failure, retry behavior.
- **Boundary values** — limits, overflow, truncation, zero/critical states.

Keep each dimension to one or two precise sentences. "Compact" means no padding and no waffle — it does **not** mean omitting a dimension that matters. Completeness wins over brevity; precision wins over length.

## Coverage matrix method

Completeness in complex apps is combinatorial, not a flat list. When two or more axes interact, enumerate the product, not each axis alone:

- **permission × state** — e.g. detail-drawer buttons differ by role _and_ by ticket status.
- **role × data-size** — admin view of 5000 rows vs agent view of 7 rows.
- **flow-step × validation** — each wizard step × (valid / invalid / pending).
- **read-state × SLA × selection** — a table row's appearance is the product of all three.

Build the matrix mentally, drop impossible cells, and create one `<enum-item>` for each surviving combination. If a cell is intentionally out of scope, say so in an annotation rather than leaving it blank.

## Implementation steps

1. Identify route, title, and a one-sentence description naming the representative state the snapshot captures.
2. Choose a device preset: `web` desktop/admin, `ipad` tablet, `mobile` phone. Prefer fixed-width, auto-height.
3. Choose the **most information-dense representative state** for the main snapshot: loaded data, an active selection, an open drawer/expanded panel central to the page, role-specific controls, active validation. The snapshot should look like the page on a busy day, not an empty shell.
4. Build the snapshot inside `<view device="…">` using only RPML primitives, usually inside `<viewport device="…">`.
5. Add `data-pin="N"` to every meaningful region. Number from 1, no gaps.
6. For every pin create one top-level `<annotation id="N" label="…">`.
7. Apply the recursive decomposition method to each region (L1→L5 as warranted).
8. For every conditional branch, build a coverage matrix and expand it with `<enum>` / `<enum-item label="…" description="…">`.
9. Write annotation bodies at implementation depth using the content-structure dimensions.
10. Verify no interactive JS, event attributes, external images, external CSS, or CDN icons are used.

## Section addressing, markers & deep links

The runtime auto-assigns a `data-rp-section` path to every annotation: top-level = its `id` (e.g. `3`); nested = parent path + 1-based sibling index (e.g. `3-2`, `3-2-1`). Authors do not write these.

Every annotation also gets a **marker showing its local index** (the last segment of its section path):

- Top-level (has `id`): blue water-drop showing the id (`1`, `2`, …), matching its pin.
- Nested depth 1: purple circle showing its local index (`3-2` shows **2**).
- Nested depth ≥2: green triangle showing its local index (`3-2-1` shows **1**).

So a nested annotation at `1-1` is marked simply **1** — the number is local to its parent, not the full path. This lets you annotate a UI slice one level deeper and still reference it unambiguously ("see ① under 区域 3").

- Clicking a pin, or any annotation title, updates the URL `?section=<path>` and scrolls/focuses that annotation (dashed outline).
- Opening a URL with `?section=3-2-1` focuses that nested annotation on load.
- `<enum-item>` cards are auto-numbered with a black square index badge (1, 2, 3…) so prose can refer to "state 2".

Use stable, intentional nesting order — index-based addresses and markers depend on sibling order.

### Annotating a UI slice further

When a UI slice rendered inside an annotation needs its own explanation, do not flatten it into prose. Nest another `<annotation>` around or after the slice: it receives its own numbered marker (circle/triangle) and its body indents one level. The chain reads:

```
main view  →  ⬤ annotation 1 (pinned)  →  UI slice  →  ① nested annotation (marked "1")  →  detail
```

Example — a slice that itself has sub-rules:

```html
<annotation id="3" label="筛选区">
  触发条件、数据来源……
  <enum>
    <enum-item label="展开浮层"><select state="expanded" options="全部,P1,P2"></select></enum-item>
  </enum>
  <annotation label="排序规则">      <!-- marked ① (purple circle), indented -->
    点击列头切换升/降序，默认按 SLA 剩余时间升序。
    <annotation label="多列排序">    <!-- marked ① (green triangle), indented again -->
      按住 Shift 点击追加次级排序键。
    </annotation>
  </annotation>
</annotation>
```

## Mid-level composition patterns

Complex pages are built from recurring composite modules. Assemble these from primitives rather than reinventing per page:

- **Data table module**: `tabs` (status filter) + filter row (`select`/`date-picker`/`toggle`) + `bulk-action-bar` + `table` (`has-checkbox has-action`) + `pagination`.
- **Master–detail**: `layout columns="minmax(0,1fr) <w>"` with the list on the left and a detail panel on the right. If the detail panel opens on row click (transient), apply the overlay trigger pattern; only keep it open in the snapshot when it is a permanently docked region.
- **Dashboard header**: `layout columns="repeat(N,1fr)"` of `stat-card`.
- **Multi-step flow**: `steps` + per-step `form` / `form-item`, each step's validation enumerated.
- **Form with validation**: `form` + `form-item label required error` + control in `error`/`filled` states enumerated side by side.

## Component families

RPUI ships a broad primitive set. Pick the smallest primitive that conveys the intent. See `llms.txt` for the full attribute reference; for a visual catalog of every component and its states, run `npm run dev` and open the source-mode preview at `/preview/`.

- **Layout**: viewport, layout, panel, card, split-pane, divider, spacer, sidebar, navbar.
- **Data input**: input, search, textarea, select, date-picker, checkbox, radio, toggle, slider, range, number-input, rating, pin-input, color-swatch, autocomplete, upload, button, button-group, form, form-item.
- **Data display**: table, table-row, list, list-item, tree, timeline, calendar, kanban, code-block, diff, image-grid, key-value, accordion, stat-card, tag, chip, badge, avatar, image-placeholder, progress.
- **Navigation**: tabs, breadcrumb, pagination, steps, segmented, menu, context-menu, command-palette, toc, kbd.
- **Feedback / overlays**: alert, toast, banner, empty, loading, skeleton, countdown, result, progress, tooltip, dropdown, popover, modal, drawer.
- **Enterprise / SaaS**: permission-gate, quota-bar, api-key, audit-row, workflow-node.

### Platform primitives (Apple HIG)

For native-feeling iOS / macOS prototypes, prefer the platform-prefixed primitives over the generic web ones:

- **iOS** (`ios-*`): ios-navbar, ios-tabbar, ios-list / ios-list-item, ios-action-sheet, ios-alert, ios-switch, ios-segmented, ios-button, ios-search, ios-stepper. Use with `device="mobile"`.
- **macOS** (`macos-*`): macos-window, macos-toolbar, macos-menubar, macos-sidebar / macos-source-item, macos-segmented, macos-popover, macos-sheet, macos-stepper, macos-disclosure, macos-table. Use with `device="web"`.

Choose the platform that matches the product: a generic web SaaS page uses the plain RPML primitive set; a native iOS app uses `ios-*` inside a `device="mobile"` viewport; a native macOS app wraps content in `macos-window`. Do not mix platform styles within one snapshot.

> ARIA note: component states (checked/expanded/selected/disabled/current) mirror the structure ARIA APG expects, so annotations can describe accessibility intent. RPUI stays static and does **not** emit runtime `role`/`aria-*` — treat ARIA as a design reference for *which states to document*, not as something the runtime manages.

## Overlay trigger pattern (critical)

Overlays and transient feedback are **interaction results, not page regions**. This includes `modal`, `drawer`, `dropdown`, `popover`, `tooltip`, and `toast`. Do **not** place them in the main snapshot — a snapshot showing an open modal or a live toast is a frozen mid-interaction frame, which contradicts RPUI's "space replaces time" model. Worse, never stack mutually exclusive overlays (empty + loading + modal + toast) side by side in the snapshot as if they coexist.

Instead, model each overlay as a **trigger → result** pair:

1. **Pin the trigger** in the main snapshot — the button, row, field, or menu entry that opens the overlay (e.g. an action button, a table row, a `…` menu). The snapshot shows only this resting trigger.
2. **State the trigger condition** in the annotation body: what action or system event opens it, any precondition, and the permission gate.
3. **Render the overlay inside the annotation**, normally as an `<enum>` showing the closed→open transition or the overlay's own variants (e.g. confirm vs. irreversible, success vs. partial-failure vs. error toast).

```html
<!-- main snapshot: only the trigger is pinned -->
<button label="批量关闭" variant="danger" data-pin="5"></button>

<!-- annotation: trigger condition + overlay rendered here -->
<annotation id="5" label="批量关闭">
  触发条件：勾选 ≥1 行后点击「批量关闭」，仅主管/坐席可见。点击弹出二次确认。
  <enum>
    <enum-item label="确认弹窗" description="列出影响范围与可逆性。">
      <modal title="批量关闭确认" has-footer>
        <alert type="warning" title="将关闭 3 条工单" message="客户 7 天内可重开。"></alert>
      </modal>
    </enum-item>
    <enum-item label="关闭成功" description="3s 自动消失，列表刷新。">
      <toast type="success" title="已关闭 3 条工单"></toast>
    </enum-item>
  </enum>
</annotation>
```

Narrow exception: when a side panel is a **permanently docked structural region** of the page (not a transiently opened overlay), it may appear open in the snapshot as the representative state — but its open/close trigger and conditions must still be documented in its annotation. When unsure, treat it as an overlay and use the trigger pattern.

## Authoring rules

- Use bare RPML tags (e.g. `button`, `table`, `card`). Single-word elements have no suffix; compound names keep their hyphen (`list-item`, `table-row`); platform primitives use `ios-*` / `macos-*`.
- Use `<page>` as root; exactly one `<view>` per page.
- Use RPML primitives for both the snapshot and UI slices inside annotations. Never use raw `div`/`button`/`input`/`table` for product UI; plain text and simple inline markup in annotations is fine.
- No CSS or JS in the prototype; no `position:absolute`/`fixed` in snapshot content (RPUI owns pin positioning).
- Do not hide important content behind interactions — expand it into `<enum>`.
- Overlays and transient feedback (`modal`, `drawer`, `dropdown`, `popover`, `tooltip`, `toast`) are interaction results: do not place them in the main snapshot. Pin the trigger and render the overlay inside its annotation (see Overlay trigger pattern). Plain collapsed `select` in the snapshot is fine; its expanded list belongs in an annotation enum.
- Note runtime limits honestly: `table` cell text is sampled by the runtime from column names — for exact data, describe it in the annotation rather than expecting the table to render it.

## Multi-page applications

One `<page>` = one screen. For an application with several screens:

- Produce one RPUI HTML file per screen; name files by route.
- If a single page exceeds ~12 pins, it is too dense — split a sub-area into its own page and note in the description that it details a region of the parent.
- For cross-screen flows (wizard, drill-down), state the entry/exit routes in each page's description so the set reads as a connected flow.

## Minimal template (mechanics only — not a complexity target)

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script type="module" src="./dist/rpui.js"></script>
  </head>
  <body>
    <page title="页面标题" route="/route" description="主快照取『…』代表态">
      <view device="web" scale="0.65">
        <viewport device="web">
          <!-- main snapshot -->
        </viewport>
      </view>

      <annotation id="1" label="区域说明">
        触发条件、数据来源、权限与校验在此用一两句说清。
        <enum>
          <enum-item label="默认" description="正常数据态。"
            ><empty label="示例"></empty
          ></enum-item>
          <enum-item label="加载中" description="首次进入或刷新。"
            ><loading rows="3"></loading
          ></enum-item>
          <enum-item label="错误" description="服务端或网络异常。"
            ><alert type="error" title="加载失败" message="请重试"></alert
          ></enum-item>
        </enum>
      </annotation>
    </page>
  </body>
</html>
```

For a realistic complex page, see `demo/golden.html` (9 top-level annotations, 3–5 levels deep, implementation-level bodies).

## Quality bar

A good RPUI prototype is reviewable by engineering, product, design, and QA without running the app. QA derives test cases from annotations; engineering derives conditional-rendering and state-machine logic from enum items; design sees whether any hidden state was missed.

Before finishing, check:

- pin numbers continuous; every pin has a matching top-level annotation,
- the snapshot shows the most information-dense useful state,
- decomposition reached implementation depth where the domain warranted it (state machines, permission gates, validation, boundaries all covered),
- combinatorial states (permission × state, role × scale, step × validation) are enumerated, not collapsed,
- every hidden interaction result is expanded into an enum,
- role/permission differences are explicit,
- runtime limits (e.g. table sampling) are noted where they affect fidelity,
- no forbidden product-UI HTML, scripts, event handlers, or external resources.
