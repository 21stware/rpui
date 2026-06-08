# RPML Element Index

All ~109 elements registered by the RPUI runtime. Each available as `rp-<tag>` (and `snap-<tag>` alias for primitives, `proto-<tag>` alias for canvas tags).

## Canvas elements

| Element | Category | Description |
|---------|----------|-------------|
| rp-page | Canvas | Root document shell; holds title, route, description; layouts main view left, annotations right |
| rp-main-view | Canvas | Scaled snapshot frame; device preset sets fixed width; scale attribute zooms the canvas |
| rp-annotation | Canvas | Specification block; top-level (id=N) links to data-pin="N"; nested adds sub-region spec |
| rp-enum | Canvas | Horizontal row of mutually exclusive state/variant cards |
| rp-enum-item | Canvas | One state card with label and optional description; auto-numbered with a black square badge |

## Layout primitives

| Element | Category | Description |
|---------|----------|-------------|
| rp-viewport | Layout | Fixed-width snapshot viewport matching a device preset |
| rp-layout | Layout | CSS grid container with columns, rows, and gap attributes |
| rp-panel | Layout | White panel/card shell with optional padding and elevation |
| rp-navbar | Layout | Top navigation bar container |
| rp-sidebar | Layout | Side navigation container; supports collapsed state |
| rp-logo | Layout | Logo placeholder with size and label |
| rp-split-pane | Layout | Two-column split layout |
| rp-divider | Layout | Horizontal or vertical divider line |
| rp-spacer | Layout | Empty space with explicit size |

## Control primitives

| Element | Category | Description |
|---------|----------|-------------|
| rp-search | Controls | Search field with state (default/focus/filled/error/disabled) and optional clear button |
| rp-input | Controls | Text input field with label, state, value, error-message |
| rp-textarea | Controls | Multi-line text input with rows and state |
| rp-select | Controls | Dropdown select; state collapsed/expanded/disabled; options as CSV |
| rp-button | Controls | Action button with variant (primary/secondary/ghost/danger/link), state, icon, size |
| rp-button-group | Controls | Container grouping related buttons |
| rp-checkbox | Controls | Checkbox with state (unchecked/checked/indeterminate/disabled) |
| rp-radio | Controls | Radio button with state (unchecked/checked/disabled) |
| rp-toggle | Controls | Toggle switch with state (on/off/disabled) |
| rp-form | Controls | Form container with layout (vertical/horizontal) |
| rp-form-item | Controls | Labeled form field wrapper with required and error attributes |
| rp-date-picker | Controls | Date picker input with state and value |
| rp-upload | Controls | File upload zone with state (empty/has-file/uploading) and progress |
| rp-image-placeholder | Controls | Placeholder for images; use instead of external image URLs |
| rp-progress | Controls | Progress bar or circle with value, kind, and status |
| rp-slider | Controls | Single-thumb slider with value, min, max |
| rp-range | Controls | Dual-thumb range slider with low, high, min, max |
| rp-number-input | Controls | Numeric input with increment/decrement steppers |
| rp-rating | Controls | Star rating display with value and max |
| rp-pin-input | Controls | OTP/PIN cell input with length and value |
| rp-color-swatch | Controls | Color swatch chip with hex value and label |
| rp-autocomplete | Controls | Autocomplete input showing options; open attribute shows the list |

## Navigation primitives

| Element | Category | Description |
|---------|----------|-------------|
| rp-badge | Navigation | Numeric badge/count indicator with max cap |
| rp-avatar | Navigation | User avatar circle with initials and size |
| rp-list | Navigation | Generated list; auto-creates items when no children provided |
| rp-list-item | Navigation | List row with label, icon, badge, and state |
| rp-tabs | Navigation | Tabbed navigation container with active tab |
| rp-tab | Navigation | Individual tab with label and optional badge |
| rp-pagination | Navigation | Pagination control with total, current, and page-size |
| rp-steps | Navigation | Step indicator for multi-step flows with active step |
| rp-breadcrumb | Navigation | Breadcrumb trail from comma-separated items |
| rp-segmented | Navigation | Segmented control (button group acting as radio) |
| rp-command-palette | Navigation | Command palette overlay with query and results |
| rp-context-menu | Navigation | Context menu with comma-separated items |
| rp-menu | Navigation | Menu container |
| rp-menu-item | Navigation | Menu row with label, icon, shortcut, and state |
| rp-toc | Navigation | Table of contents from comma-separated items |
| rp-kbd | Navigation | Keyboard shortcut chip(s) |

## Data display primitives

| Element | Category | Description |
|---------|----------|-------------|
| rp-table | Data display | Generated static table; columns CSV; has-checkbox and has-action add affordances |
| rp-table-row | Data display | Standalone table row with state (default/selected/unread/highlighted/disabled) |
| rp-bulk-action-bar | Data display | Bulk action bar shown when rows are selected; count and actions CSV |
| rp-empty | Data display | Empty state with label, description, and optional action |
| rp-loading | Data display | Loading placeholder; kind skeleton or spinner; rows count |
| rp-alert | Data display | Inline alert banner (info/success/warning/error) with title and message |
| rp-toast | Data display | Toast notification (info/success/warning/error) rendered in annotations |
| rp-dropdown | Data display | Static opened dropdown panel |
| rp-popover | Data display | Static opened popover panel |
| rp-tooltip | Data display | Visible tooltip bubble with text and position |
| rp-modal | Data display | Static opened modal dialog with title, width, optional footer |
| rp-drawer | Data display | Static opened side drawer with side, width, title |
| rp-card | Data display | Content card with title, subtitle, optional image and footer slots |
| rp-stat-card | Data display | KPI card with label, value, trend, and change |
| rp-tag | Data display | Colored label tag; closable variant |
| rp-chip | Data display | Compact token chip with label, icon, closable |
| rp-tree | Data display | Tree container |
| rp-tree-item | Data display | Tree node with label, icon, level, expanded/collapsed, state |
| rp-timeline | Data display | Timeline container |
| rp-timeline-item | Data display | Timeline event with label, time, and state |
| rp-calendar | Data display | Month grid calendar with selected date |
| rp-kanban | Data display | Kanban board container |
| rp-kanban-column | Data display | Kanban column with title and count |
| rp-kanban-card | Data display | Kanban card with label and tag |
| rp-code-block | Data display | Code placeholder with language and line count |
| rp-diff | Data display | Diff view with added/removed/context lines |
| rp-image-grid | Data display | Grid of image placeholders with count and columns |
| rp-key-value | Data display | Description list container |
| rp-kv-row | Data display | Key-value row with label and value |
| rp-accordion | Data display | Accordion container |
| rp-accordion-item | Data display | Expandable accordion section with label |
| rp-banner | Data display | Full-width page-level banner (info/success/warning/error) |
| rp-skeleton | Data display | Loading skeleton shape (line/block/card/list/avatar) |
| rp-countdown | Data display | Time-remaining chip with value |
| rp-result | Data display | Full-page result screen (success/error/empty) with title and optional action |
| rp-permission-gate | Enterprise | Locked content wrapper with reason label |
| rp-quota-bar | Enterprise | Usage bar that turns red at ≥90%; label, used, limit |
| rp-api-key | Enterprise | Masked API key display with copy affordance |
| rp-audit-row | Enterprise | Audit log row with actor, action, time |
| rp-workflow-node | Enterprise | Workflow step node with label and state |

## iOS platform primitives (use with device="mobile")

| Element | Category | Description |
|---------|----------|-------------|
| rp-ios-navbar | iOS | iOS-style navigation bar with title, large variant, back, trailing |
| rp-ios-tabbar | iOS | iOS tab bar with items, icons, active tab |
| rp-ios-list | iOS | iOS grouped list with header |
| rp-ios-list-item | iOS | iOS list row with label, detail, icon, chevron |
| rp-ios-action-sheet | iOS | iOS action sheet with title, actions, destructive action |
| rp-ios-alert | iOS | iOS alert dialog with title, message, actions |
| rp-ios-switch | iOS | iOS-style toggle switch |
| rp-ios-segmented | iOS | iOS segmented control |
| rp-ios-button | iOS | iOS-style button (filled/tinted/plain) |
| rp-ios-search | iOS | iOS search bar |
| rp-ios-stepper | iOS | iOS stepper control |

## macOS platform primitives (use with device="web")

| Element | Category | Description |
|---------|----------|-------------|
| rp-macos-window | macOS | macOS window chrome with traffic light buttons |
| rp-macos-toolbar | macOS | macOS toolbar strip |
| rp-macos-menubar | macOS | macOS menu bar with items |
| rp-macos-sidebar | macOS | macOS source list sidebar |
| rp-macos-source-item | macOS | macOS sidebar source item with label, icon, group, state |
| rp-macos-segmented | macOS | macOS segmented control |
| rp-macos-popover | macOS | macOS-style popover |
| rp-macos-sheet | macOS | macOS sheet dialog |
| rp-macos-stepper | macOS | macOS stepper control |
| rp-macos-disclosure | macOS | macOS disclosure triangle with label and expanded state |
| rp-macos-table | macOS | macOS-style table with sortable header look |

## Agent / conversational UI primitives

| Element | Category | Description |
|---------|----------|-------------|
| rp-chat | Agent | Conversation container wrapping the message stream |
| rp-user-message | Agent | Right-aligned user message bubble |
| rp-assistant-message | Agent | Left-aligned assistant message with optional rich children |
| rp-system-message | Agent | Centered system/context note |
| rp-tool-call | Agent | Tool/function call card with name, state (running/done/error), args |
| rp-agent-output | Agent | Command/code/tool output block (kind: text/code/terminal) |
| rp-reasoning | Agent | Collapsible thinking/reasoning block |
| rp-message-actions | Agent | Per-message action buttons (copy/retry/up/down/edit/share) |
| rp-suggestions | Agent | Suggested reply/prompt chips |
| rp-typing | Agent | Streaming typing indicator |
| rp-composer | Agent | Prompt input bar with state (idle/streaming) |
| rp-citation | Agent | Source reference chip with index and title |
| rp-token-usage | Agent | Token/context usage meter with used and limit |
