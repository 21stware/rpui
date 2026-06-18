/** RPML vocabulary: the mapping between the *language* and the *renderer*.
 *
 *  RPML the language speaks clean, curated names (`page`, `view`, `navigator`,
 *  `button`, …). The Web Components runtime needs tag names that contain a
 *  hyphen (an HTML custom-element requirement) and that avoid colliding with
 *  native HTML elements (`button`, `table`, `form`, …). This module is the
 *  single source of truth that bridges the two so the language is decoupled
 *  from the rendering technology.
 *
 *  - LANG_TO_COMPONENT: every language tag → its Web Component tag.
 *  - COMPONENT_TO_LANG: the inverse, derived (so the two can never drift).
 *  - toComponentTag / toLangTag: identity for anything not in the map
 *    (native HTML, comments, unknown tags pass through untouched).
 */

/** Primitive language names. Single words get an `-el` suffix at the component
 *  layer; names already containing a hyphen are used verbatim. This list is the
 *  authority the renderer's registry registers against. */
export const PRIMITIVES: readonly string[] = [
  // layout
  'viewport', 'layout', 'panel', 'sidebar', 'logo', 'split-pane', 'divider', 'spacer',
  // controls
  'search', 'input', 'textarea', 'select', 'button', 'button-group', 'checkbox', 'checkbox-group', 'radio', 'radio-group', 'toggle', 'password-input', 'tag-input', 'form', 'form-item', 'date-picker', 'upload', 'image-placeholder', 'progress', 'slider', 'range', 'number-input', 'rating', 'pin-input', 'color-swatch', 'autocomplete',
  // navigation
  'badge', 'avatar', 'list', 'list-item', 'tabs', 'tab', 'pagination', 'steps', 'breadcrumb', 'segmented', 'command-palette', 'context-menu', 'menu', 'menu-item', 'toc', 'kbd', 'anchor',
  // diagram
  'diagram',
  // data display
  'table', 'table-row', 'table-list-row', 'bulk-action-bar', 'empty', 'loading', 'alert', 'toast', 'dropdown', 'popover', 'tooltip', 'modal', 'drawer', 'card', 'stat-card', 'tag', 'chip', 'tree', 'tree-item', 'timeline', 'timeline-item', 'calendar', 'kanban', 'kanban-column', 'kanban-card', 'code-block', 'diff', 'image-grid', 'key-value', 'kv-row', 'accordion', 'accordion-item', 'banner', 'skeleton', 'countdown', 'result', 'permission-gate', 'quota-bar', 'api-key', 'audit-row', 'workflow-node', 'chart', 'avatar-group', 'comment', 'file-list', 'file-item',
  // iOS
  'ios-navbar', 'ios-tabbar', 'ios-list', 'ios-list-item', 'ios-action-sheet', 'ios-alert', 'ios-switch', 'ios-segmented', 'ios-button', 'ios-search', 'ios-stepper',
  // macOS
  'macos-window', 'macos-toolbar', 'macos-menubar', 'macos-sidebar', 'macos-source-item', 'macos-segmented', 'macos-popover', 'macos-sheet', 'macos-stepper', 'macos-disclosure', 'macos-table',
  // agent / conversational UI
  'chat', 'user-message', 'agent-message', 'system-message', 'tool-call', 'agent-output', 'reasoning', 'message-actions', 'suggestions', 'typing', 'composer', 'citation', 'token-usage',
  // document (doc-mode typography)
  'doc-heading', 'doc-paragraph', 'doc-list', 'doc-list-item', 'doc-quote',
  // form extras
  'form-field-description', 'radio-card',
  // design-system palettes
  'color-palette', 'font-palette', 'space-palette', 'radius-palette'
];

/** Component tag for a primitive: single words get `-el`, compounds are bare. */
function primitiveComponentTag(lang: string): string {
  return lang.includes('-') ? lang : `${lang}-el`;
}

/** Curated renames where the language name differs from the mechanical rule.
 *  Canvas tags plus the one primitive (`navigator`) that reads better than its
 *  component tag (`navbar-el`). */
const EXPLICIT: Record<string, string> = {
  // canvas
  page: 'page-el',
  view: 'main-view',
  annotation: 'annotation-el',
  'annotation-global': 'annotation-global-el',
  enum: 'enum-el',
  'enum-item': 'enum-item',
  viewport: 'viewport-el',
  // curated primitive rename
  navigator: 'navbar-el',
  // compound component tag that reads cleaner as a single word in the language
  diagram: 'diagram-block'
};

/** Language tag → Web Component tag. */
export const LANG_TO_COMPONENT: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const lang of PRIMITIVES) map[lang] = primitiveComponentTag(lang);
  // Explicit entries override the mechanical rule (and add canvas tags).
  for (const [lang, comp] of Object.entries(EXPLICIT)) map[lang] = comp;
  return map;
})();

/** Web Component tag → language tag (derived inverse). */
export const COMPONENT_TO_LANG: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [lang, comp] of Object.entries(LANG_TO_COMPONENT)) map[comp] = lang;
  return map;
})();

/** Translate a language tag to its component tag (identity if unmapped). */
export function toComponentTag(tag: string): string {
  return LANG_TO_COMPONENT[tag.toLowerCase()] ?? tag;
}

/** Translate a component tag back to its language tag (identity if unmapped). */
export function toLangTag(tag: string): string {
  return COMPONENT_TO_LANG[tag.toLowerCase()] ?? tag;
}
