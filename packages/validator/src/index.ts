import type { RpmlNode } from 'rpml-parser';

export interface ValidationError {
  path: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Validate an RPML AST. Returns list of errors/warnings. */
export function validate(root: RpmlNode): ValidationError[] {
  const errors: ValidationError[] = [];
  if (root.tag !== 'rp-page') {
    errors.push({ path: '/', message: 'Root element must be <rp-page>', severity: 'error' });
    return errors;
  }
  checkStructural(root, errors);
  checkPins(root, errors);
  return errors;
}

function checkStructural(root: RpmlNode, errors: ValidationError[]) {
  const mainViews = root.children.filter(c => c.tag === 'rp-main-view');
  if (mainViews.length === 0)
    errors.push({ path: '/rp-page', message: 'Missing <rp-main-view>', severity: 'error' });
  if (mainViews.length > 1)
    errors.push({ path: '/rp-page', message: 'Only one <rp-main-view> allowed', severity: 'error' });
  if (!root.attrs.title)
    errors.push({ path: '/rp-page', message: 'rp-page missing title attribute', severity: 'warning' });
}

function checkPins(root: RpmlNode, errors: ValidationError[]) {
  const mainView = root.children.find(c => c.tag === 'rp-main-view');
  if (!mainView) return;

  const pinIds = collectPins(mainView, []);
  const annotationIds = root.children
    .filter(c => c.tag === 'rp-annotation' && c.attrs.id)
    .map(c => c.attrs.id);

  for (const pin of pinIds) {
    if (!annotationIds.includes(pin))
      errors.push({ path: `/rp-main-view[data-pin="${pin}"]`, message: `data-pin="${pin}" has no matching <rp-annotation id="${pin}">`, severity: 'error' });
  }
  for (const id of annotationIds) {
    if (!pinIds.includes(id))
      errors.push({ path: `/rp-annotation[id="${id}"]`, message: `Annotation id="${id}" has no matching data-pin="${id}" in rp-main-view`, severity: 'warning' });
  }
}

function collectPins(node: RpmlNode, acc: string[]): string[] {
  if (node.attrs['data-pin']) acc.push(node.attrs['data-pin']);
  for (const child of node.children) collectPins(child, acc);
  return acc;
}

export { validate as default };
