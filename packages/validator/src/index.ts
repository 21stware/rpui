import type { RpmlNode } from 'rpml-parser';

export interface ValidationError {
  path: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Validate an RPML AST. Returns list of errors/warnings.
 *  The AST carries Web Component tag names (the parser rewrites language tags);
 *  user-facing messages map them back to language names via toLangTag. */
export function validate(root: RpmlNode): ValidationError[] {
  const errors: ValidationError[] = [];
  if (root.tag !== 'page-el') {
    errors.push({ path: '/', message: 'Root element must be <page>', severity: 'error' });
    return errors;
  }
  checkStructural(root, errors);
  checkPins(root, errors);
  return errors;
}

function checkStructural(root: RpmlNode, errors: ValidationError[]) {
  const mainViews = root.children.filter(c => c.tag === 'main-view');
  if (mainViews.length === 0)
    errors.push({ path: '/page', message: 'Missing <view>', severity: 'error' });
  if (mainViews.length > 1)
    errors.push({ path: '/page', message: 'Only one <view> allowed', severity: 'error' });
  if (!root.attrs.title)
    errors.push({ path: '/page', message: 'page missing title attribute', severity: 'warning' });
}

function checkPins(root: RpmlNode, errors: ValidationError[]) {
  const mainView = root.children.find(c => c.tag === 'main-view');
  if (!mainView) return;

  const pinIds = collectPins(mainView, []);
  // Only numbered top-level <annotation id="N"> take part in pin parity.
  // <annotation-global> is intentionally pin-less (cross-cutting notes) and is
  // never matched against a data-pin.
  const annotationIds = root.children
    .filter(c => c.tag === 'annotation-el' && c.attrs.id)
    .map(c => c.attrs.id);

  for (const pin of pinIds) {
    if (!annotationIds.includes(pin))
      errors.push({ path: `/view[data-pin="${pin}"]`, message: `data-pin="${pin}" has no matching <annotation id="${pin}">`, severity: 'error' });
  }
  for (const id of annotationIds) {
    if (!pinIds.includes(id))
      errors.push({ path: `/annotation[id="${id}"]`, message: `Annotation id="${id}" has no matching data-pin="${id}" in view (cross-cutting notes belong in <annotation-global>)`, severity: 'warning' });
  }
  // <annotation-global> must not carry an id or a pin — that's a numbered
  // annotation, not a global one.
  for (const g of root.children.filter(c => c.tag === 'annotation-global-el')) {
    if (g.attrs.id)
      errors.push({ path: '/annotation-global', message: 'annotation-global must not have an id (it is pin-less by design)', severity: 'error' });
  }
}

function collectPins(node: RpmlNode, acc: string[]): string[] {
  if (node.attrs['data-pin']) acc.push(node.attrs['data-pin']);
  for (const child of node.children) collectPins(child, acc);
  return acc;
}

export { validate as default };
