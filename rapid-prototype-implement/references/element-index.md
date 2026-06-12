# RPML Element Index

All ~109 elements registered by the RPUI runtime. RPML authoring uses the bare language tag names listed below; the runtime maps each to its Web Component tag.

## Canvas elements

| Element | Category | Description |
|---------|----------|-------------|
| page | Canvas | Root document shell; holds title, route, description; layouts main view left, annotations right |
| view | Canvas | Scaled snapshot frame; device preset sets fixed width; scale attribute zooms the canvas |
| annotation | Canvas | Specification block; top-level (id=N) links to data-pin="N"; nested adds sub-region spec |
| annotation-global | Canvas | Page-level, pin-less note for cross-cutting concerns; renders at top of pane; no id/pin |
| enum | Canvas | Horizontal row of mutually exclusive state/variant cards |
| enum-item | Canvas | One state card with label and optional description; auto-numbered with a black square badge |
| anchor | Canvas | Cross-page link (to, optional section) to another screen in the file set |
| diagram | Canvas | Renders Mermaid text (flow/state/sequence/ER) to inline SVG inside an annotation |

## Layout primitives

| Element | Category | Description |
|---------|----------|-------------|
| viewport | Layout | Fixed-width snapshot viewport matching a device preset |
| layout | Layout | CSS grid container with columns, rows, and gap attributes |
| panel | Layout | White panel/card shell with optional padding and elevation |
| navigator | Layout | Top navigation bar container |
| sidebar | Layout | Side navigation container; supports collapsed state |
| logo | Layout | Logo placeholder with size and label |
| split-pane | Layout | Two-column split layout |
| divider | Layout | Horizontal or vertical divider line |
| spacer | Layout | Empty space with explicit size |

## Control primitives

| Element | Category | Description |
|---------|----------|-------------|
| search | Controls | Search field with state (default/focus/filled/error/disabled) and optional clear button |
| input | Controls | Text input field with label, state, value, error-message |
| textarea | Controls | Multi-line text input with rows and state |
| select | Controls | Dropdown select; state collapsed/expanded/disabled; options as CSV |
| button | Controls | Action button with variant (primary/secondary/ghost/danger/link), state, icon, size |
| button-group | Controls | Container grouping related buttons |
| checkbox | Controls | Checkbox with state (unchecked/checked/indeterminate/disabled) |
| radio | Controls | Radio button with state (unchecked/checked/disabled) |
| toggle | Controls | Toggle switch with state (on/off/disabled) |
| form | Controls | Form container with layout (vertical/horizontal) |
| form-item | Controls | Labeled form field wrapper with required and error attributes |
| date-picker | Controls | Date picker input with state and value |
| upload | Controls | File upload zone with state (empty/has-file/uploading) and progress |
| image-placeholder | Controls | Placeholder for images; use instead of external image URLs |
| progress | Controls | Progress bar or circle with value, kind, and status |
| slider | Controls | Single-thumb slider with value, min, max |
| range | Controls | Dual-thumb range slider with low, high, min, max |
| number-input | Controls | Numeric input with increment/decrement steppers |
| rating | Controls | Star rating display with value and max |
| pin-input | Controls | OTP/PIN cell input with length and value |
| color-swatch | Controls | Color swatch chip with hex value and label |
| autocomplete | Controls | Autocomplete input showing options; open attribute shows the list |

## Navigation primitives

| Element | Category | Description |
|---------|----------|-------------|
| badge | Navigation | Numeric badge/count indicator with max cap |
| avatar | Navigation | User avatar circle with initials and size |
| list | Navigation | Generated list; auto-creates items when no children provided |
| list-item | Navigation | List row with label, icon, badge, and state |
| tabs | Navigation | Tabbed navigation container with active tab |
| tab | Navigation | Individual tab with label and optional badge |
| pagination | Navigation | Pagination control with total, current, and page-size |
| steps | Navigation | Step indicator for multi-step flows with active step |
| breadcrumb | Navigation | Breadcrumb trail from comma-separated items |
| segmented | Navigation | Segmented control (button group acting as radio) |
| command-palette | Navigation | Command palette overlay with query and results |
| context-menu | Navigation | Context menu with comma-separated items |
| menu | Navigation | Menu container |
| menu-item | Navigation | Menu row with label, icon, shortcut, and state |
| toc | Navigation | Table of contents from comma-separated items |
| kbd | Navigation | Keyboard shortcut chip(s) |

## Data display primitives

| Element | Category | Description |
|---------|----------|-------------|
| table | Data display | Generated static table; columns CSV; has-checkbox and has-action add affordances |
| table-row | Data display | Standalone table row with state (default/selected/unread/highlighted/disabled) |
| bulk-action-bar | Data display | Bulk action bar shown when rows are selected; count and actions CSV |
| empty | Data display | Empty state with label, description, and optional action |
| loading | Data display | Loading placeholder; kind skeleton or spinner; rows count |
| alert | Data display | Inline alert banner (info/success/warning/error) with title and message |
| toast | Data display | Toast notification (info/success/warning/error) rendered in annotations |
| dropdown | Data display | Static opened dropdown panel |
| popover | Data display | Static opened popover panel |
| tooltip | Data display | Visible tooltip bubble with text and position |
| modal | Data display | Static opened modal dialog with title, width, optional footer |
| drawer | Data display | Static opened side drawer with side, width, title |
| card | Data display | Content card with title, subtitle, optional image and footer slots |
| stat-card | Data display | KPI card with label, value, trend, and change |
| tag | Data display | Colored label tag; closable variant |
| chip | Data display | Compact token chip with label, icon, closable |
| tree | Data display | Tree container |
| tree-item | Data display | Tree node with label, icon, level, expanded/collapsed, state |
| timeline | Data display | Timeline container |
| timeline-item | Data display | Timeline event with label, time, and state |
| calendar | Data display | Month grid calendar with selected date |
| kanban | Data display | Kanban board container |
| kanban-column | Data display | Kanban column with title and count |
| kanban-card | Data display | Kanban card with label and tag |
| code-block | Data display | Code placeholder with language and line count |
| diff | Data display | Diff view with added/removed/context lines |
| image-grid | Data display | Grid of image placeholders with count and columns |
| key-value | Data display | Description list container |
| kv-row | Data display | Key-value row with label and value |
| accordion | Data display | Accordion container |
| accordion-item | Data display | Expandable accordion section with label |
| banner | Data display | Full-width page-level banner (info/success/warning/error) |
| skeleton | Data display | Loading skeleton shape (line/block/card/list/avatar) |
| countdown | Data display | Time-remaining chip with value |
| result | Data display | Full-page result screen (success/error/empty) with title and optional action |
| permission-gate | Enterprise | Locked content wrapper with reason label |
| quota-bar | Enterprise | Usage bar that turns red at ≥90%; label, used, limit |
| api-key | Enterprise | Masked API key display with copy affordance |
| audit-row | Enterprise | Audit log row with actor, action, time |
| workflow-node | Enterprise | Workflow step node with label and state |

## iOS platform primitives (use with device="mobile")

| Element | Category | Description |
|---------|----------|-------------|
| ios-navbar | iOS | iOS-style navigation bar with title, large variant, back, trailing |
| ios-tabbar | iOS | iOS tab bar with items, icons, active tab |
| ios-list | iOS | iOS grouped list with header |
| ios-list-item | iOS | iOS list row with label, detail, icon, chevron |
| ios-action-sheet | iOS | iOS action sheet with title, actions, destructive action |
| ios-alert | iOS | iOS alert dialog with title, message, actions |
| ios-switch | iOS | iOS-style toggle switch |
| ios-segmented | iOS | iOS segmented control |
| ios-button | iOS | iOS-style button (filled/tinted/plain) |
| ios-search | iOS | iOS search bar |
| ios-stepper | iOS | iOS stepper control |

## macOS platform primitives (use with device="web")

| Element | Category | Description |
|---------|----------|-------------|
| macos-window | macOS | macOS window chrome with traffic light buttons |
| macos-toolbar | macOS | macOS toolbar strip |
| macos-menubar | macOS | macOS menu bar with items |
| macos-sidebar | macOS | macOS source list sidebar |
| macos-source-item | macOS | macOS sidebar source item with label, icon, group, state |
| macos-segmented | macOS | macOS segmented control |
| macos-popover | macOS | macOS-style popover |
| macos-sheet | macOS | macOS sheet dialog |
| macos-stepper | macOS | macOS stepper control |
| macos-disclosure | macOS | macOS disclosure triangle with label and expanded state |
| macos-table | macOS | macOS-style table with sortable header look |

## Agent / conversational UI primitives

| Element | Category | Description |
|---------|----------|-------------|
| chat | Agent | Conversation container wrapping the message stream |
| user-message | Agent | Right-aligned user message bubble |
| assistant-message | Agent | Left-aligned assistant message with optional rich children |
| system-message | Agent | Centered system/context note |
| tool-call | Agent | Tool/function call card with name, state (running/done/error), args |
| agent-output | Agent | Command/code/tool output block (kind: text/code/terminal) |
| reasoning | Agent | Collapsible thinking/reasoning block |
| message-actions | Agent | Per-message action buttons (copy/retry/up/down/edit/share) |
| suggestions | Agent | Suggested reply/prompt chips |
| typing | Agent | Streaming typing indicator |
| composer | Agent | Prompt input bar with state (idle/streaming) |
| citation | Agent | Source reference chip with index and title |
| token-usage | Agent | Token/context usage meter with used and limit |
