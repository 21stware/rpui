import { describe, expect, test } from 'bun:test';
import {
  rewriteTags,
  normalize,
  parseNode,
  toComponentTag,
  toLangTag,
  LANG_TO_COMPONENT,
  COMPONENT_TO_LANG
} from './index';

describe('vocabulary map', () => {
  test('canvas renames', () => {
    expect(toComponentTag('page')).toBe('page-el');
    expect(toComponentTag('view')).toBe('main-view');
    expect(toComponentTag('annotation')).toBe('annotation-el');
    expect(toComponentTag('enum')).toBe('enum-el');
    expect(toComponentTag('enum-item')).toBe('enum-item');
    expect(toComponentTag('viewport')).toBe('viewport-el');
    expect(toComponentTag('navigator')).toBe('navbar-el');
  });

  test('single-word primitives gain -el', () => {
    expect(toComponentTag('button')).toBe('button-el');
    expect(toComponentTag('table')).toBe('table-el');
    expect(toComponentTag('logo')).toBe('logo-el');
  });

  test('compounds pass through unchanged', () => {
    expect(toComponentTag('split-pane')).toBe('split-pane');
    expect(toComponentTag('command-palette')).toBe('command-palette');
    expect(toComponentTag('table-row')).toBe('table-row');
    expect(toComponentTag('ios-navbar')).toBe('ios-navbar');
    expect(toComponentTag('macos-window')).toBe('macos-window');
  });

  test('unknown / native tags are identity', () => {
    expect(toComponentTag('div')).toBe('div');
    expect(toComponentTag('h1')).toBe('h1');
    expect(toComponentTag('whatever')).toBe('whatever');
  });

  test('inverse is consistent', () => {
    for (const [lang, comp] of Object.entries(LANG_TO_COMPONENT)) {
      expect(COMPONENT_TO_LANG[comp]).toBe(lang);
      expect(toLangTag(comp)).toBe(lang);
    }
  });
});

describe('rewriteTags', () => {
  test('rewrites open and close tags', () => {
    expect(rewriteTags('<page></page>')).toBe('<page-el></page-el>');
    expect(rewriteTags('<view></view>')).toBe('<main-view></main-view>');
  });

  test('preserves attributes and text', () => {
    expect(rewriteTags('<button label="Go" size="lg">')).toBe('<button-el label="Go" size="lg">');
  });

  test('does not rewrite inside attribute values', () => {
    // a literal "<page" inside a value never starts with "<" at token position
    expect(rewriteTags('<annotation label="see <page below">'))
      .toBe('<annotation-el label="see <page below">');
  });

  test('word-boundary: enum vs enum-item', () => {
    const out = rewriteTags('<enum><enum-item></enum-item></enum>');
    expect(out).toBe('<enum-el><enum-item></enum-item></enum-el>');
  });

  test('word-boundary: table vs table-row, tab vs tabs', () => {
    expect(rewriteTags('<table><table-row></table-row></table>'))
      .toBe('<table-el><table-row></table-row></table-el>');
    expect(rewriteTags('<tabs><tab></tab></tabs>'))
      .toBe('<tabs-el><tab-el></tab-el></tabs-el>');
  });

  test('navigator does not collide with ios-navbar', () => {
    expect(rewriteTags('<navigator></navigator>')).toBe('<navbar-el></navbar-el>');
    expect(rewriteTags('<ios-navbar></ios-navbar>')).toBe('<ios-navbar></ios-navbar>');
  });

  test('native HTML in text passes through', () => {
    expect(rewriteTags('<annotation>see <b>bold</b> here</annotation>'))
      .toBe('<annotation-el>see <b>bold</b> here</annotation-el>');
  });

  test('comments are not rewritten', () => {
    expect(rewriteTags('<!-- page view button -->')).toBe('<!-- page view button -->');
  });
});

describe('normalize (expand + rewrite)', () => {
  test('self-closing expanded then rewritten', () => {
    expect(normalize('<logo label="App"/>')).toBe('<logo-el label="App"></logo-el>');
  });
});

describe('parseNode end-to-end', () => {
  const src = `<page title="T">
    <view device="web">
      <viewport device="web">
        <navigator height="56" data-pin="1"><logo label="App"/></navigator>
      </viewport>
    </view>
    <annotation id="1" label="nav">top bar</annotation>
  </page>`;

  test('emits component tags in AST', () => {
    const ast = parseNode(src);
    expect(ast.tag).toBe('page-el');
    const view = ast.children.find(c => c.tag === 'main-view');
    expect(view).toBeDefined();
    const viewport = view!.children[0];
    expect(viewport.tag).toBe('viewport-el');
    expect(viewport.children[0].tag).toBe('navbar-el');
    expect(viewport.children[0].attrs['data-pin']).toBe('1');
    expect(ast.children.some(c => c.tag === 'annotation-el')).toBe(true);
  });
});
