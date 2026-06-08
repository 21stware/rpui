import { define } from './core/dom';
import { toComponentTag } from 'rpml-parser';
import { RpAnnotation, RpEnum, RpEnumItem } from './canvas/annotation';
import { RpMainView } from './canvas/main-view';
import { RpPage } from './canvas/page';
import { DividerElement, GenericElement, LayoutElement, LogoElement, NavbarElement, PanelElement, SidebarElement, SpacerElement, SplitPaneElement, ViewportElement } from './primitives/layout';
import { AutocompleteElement, ButtonElement, CheckboxElement, ColorSwatchElement, DatePickerElement, FieldElement, FormElement, FormItemElement, ImagePlaceholderElement, NumberInputElement, PinInputElement, ProgressElement, RadioElement, RangeElement, RatingElement, SelectElement, SliderElement, TextareaElement, ToggleElement, UploadElement } from './primitives/controls';
import { AvatarElement, BadgeElement, BreadcrumbElement, CommandPaletteElement, ContextMenuElement, KbdElement, ListElement, ListItemElement, MenuElement, MenuItemElement, PaginationElement, SegmentedElement, StepsElement, TabElement, TabsElement, TocElement } from './primitives/navigation';
import { AccordionElement, AccordionItemElement, AlertElement, ApiKeyElement, AuditRowElement, BannerElement, BulkActionBarElement, CalendarElement, CardElement, ChipElement, CodeBlockElement, CountdownElement, DiffElement, DrawerElement, EmptyElement, ImageGridElement, KanbanCardElement, KanbanColumnElement, KanbanElement, KeyValueElement, KvRowElement, LoadingElement, ModalElement, OverlayElement, PermissionGateElement, QuotaBarElement, ResultElement, SkeletonElement, StatCardElement, TableElement, TableRowElement, TagElement, TimelineElement, TimelineItemElement, TooltipElement, TreeElement, TreeItemElement, WorkflowNodeElement } from './primitives/data-display';
import { IosActionSheetElement, IosAlertElement, IosButtonElement, IosListElement, IosListItemElement, IosNavbarElement, IosSearchElement, IosSegmentedElement, IosStepperElement, IosSwitchElement, IosTabbarElement } from './primitives/ios';
import { MacDisclosureElement, MacMenubarElement, MacPopoverElement, MacSegmentedElement, MacSheetElement, MacSidebarElement, MacSourceItemElement, MacStepperElement, MacTableElement, MacToolbarElement, MacWindowElement } from './primitives/macos';
import { AgentOutputElement, AssistantMessageElement, ChatElement, CitationElement, ComposerElement, MessageActionsElement, ReasoningElement, SuggestionsElement, SystemMessageElement, TokenUsageElement, ToolCallElement, TypingElement, UserMessageElement } from './primitives/agent';

/** Map a language tag to its Web Component tag via the shared vocabulary. */

export function registerAll() {
  define('page-el', RpPage);
  define('main-view', RpMainView);
  define('annotation-el', RpAnnotation);
  define('enum-el', RpEnum);
  define('enum-item', RpEnumItem);
  const pairs: Array<[string, CustomElementConstructor]> = [
    // layout
    ['viewport', ViewportElement], ['layout', LayoutElement], ['panel', PanelElement], ['navigator', NavbarElement], ['sidebar', SidebarElement], ['logo', LogoElement], ['split-pane', SplitPaneElement], ['divider', DividerElement], ['spacer', SpacerElement],
    // controls
    ['search', FieldElement], ['input', FieldElement], ['textarea', TextareaElement], ['select', SelectElement], ['button', ButtonElement], ['button-group', GenericElement], ['checkbox', CheckboxElement], ['radio', RadioElement], ['toggle', ToggleElement], ['form', FormElement], ['form-item', FormItemElement], ['date-picker', DatePickerElement], ['upload', UploadElement], ['image-placeholder', ImagePlaceholderElement], ['progress', ProgressElement], ['slider', SliderElement], ['range', RangeElement], ['number-input', NumberInputElement], ['rating', RatingElement], ['pin-input', PinInputElement], ['color-swatch', ColorSwatchElement], ['autocomplete', AutocompleteElement],
    // navigation
    ['badge', BadgeElement], ['avatar', AvatarElement], ['list', ListElement], ['list-item', ListItemElement], ['tabs', TabsElement], ['tab', TabElement], ['pagination', PaginationElement], ['steps', StepsElement], ['breadcrumb', BreadcrumbElement], ['segmented', SegmentedElement], ['command-palette', CommandPaletteElement], ['context-menu', ContextMenuElement], ['menu', MenuElement], ['menu-item', MenuItemElement], ['toc', TocElement], ['kbd', KbdElement],
    // data display
    ['table', TableElement], ['table-row', TableRowElement], ['bulk-action-bar', BulkActionBarElement], ['empty', EmptyElement], ['loading', LoadingElement], ['alert', AlertElement], ['toast', AlertElement], ['dropdown', OverlayElement], ['popover', OverlayElement], ['tooltip', TooltipElement], ['modal', ModalElement], ['drawer', DrawerElement], ['card', CardElement], ['stat-card', StatCardElement], ['tag', TagElement], ['chip', ChipElement], ['tree', TreeElement], ['tree-item', TreeItemElement], ['timeline', TimelineElement], ['timeline-item', TimelineItemElement], ['calendar', CalendarElement], ['kanban', KanbanElement], ['kanban-column', KanbanColumnElement], ['kanban-card', KanbanCardElement], ['code-block', CodeBlockElement], ['diff', DiffElement], ['image-grid', ImageGridElement], ['key-value', KeyValueElement], ['kv-row', KvRowElement], ['accordion', AccordionElement], ['accordion-item', AccordionItemElement], ['banner', BannerElement], ['skeleton', SkeletonElement], ['countdown', CountdownElement], ['result', ResultElement], ['permission-gate', PermissionGateElement], ['quota-bar', QuotaBarElement], ['api-key', ApiKeyElement], ['audit-row', AuditRowElement], ['workflow-node', WorkflowNodeElement],
    // iOS
    ['ios-navbar', IosNavbarElement], ['ios-tabbar', IosTabbarElement], ['ios-list', IosListElement], ['ios-list-item', IosListItemElement], ['ios-action-sheet', IosActionSheetElement], ['ios-alert', IosAlertElement], ['ios-switch', IosSwitchElement], ['ios-segmented', IosSegmentedElement], ['ios-button', IosButtonElement], ['ios-search', IosSearchElement], ['ios-stepper', IosStepperElement],
    // macOS
    ['macos-window', MacWindowElement], ['macos-toolbar', MacToolbarElement], ['macos-menubar', MacMenubarElement], ['macos-sidebar', MacSidebarElement], ['macos-source-item', MacSourceItemElement], ['macos-segmented', MacSegmentedElement], ['macos-popover', MacPopoverElement], ['macos-sheet', MacSheetElement], ['macos-stepper', MacStepperElement], ['macos-disclosure', MacDisclosureElement], ['macos-table', MacTableElement],
    // agent / conversational UI
    ['chat', ChatElement], ['user-message', UserMessageElement], ['assistant-message', AssistantMessageElement], ['system-message', SystemMessageElement], ['tool-call', ToolCallElement], ['agent-output', AgentOutputElement], ['reasoning', ReasoningElement], ['message-actions', MessageActionsElement], ['suggestions', SuggestionsElement], ['typing', TypingElement], ['composer', ComposerElement], ['citation', CitationElement], ['token-usage', TokenUsageElement]
  ];
  // Guard against vocabulary drift: every primitive must be in the shared map.
  // (A miss would silently register under the wrong tag via identity fallback.)
  for (const [suffix] of pairs) {
    if (toComponentTag(suffix) === suffix && !suffix.includes('-'))
      console.warn(`[rpui] registry tag "${suffix}" missing from RPML vocabulary`);
  }
  for (const [suffix, ctor] of pairs) { define(toComponentTag(suffix), ctor); }
}
