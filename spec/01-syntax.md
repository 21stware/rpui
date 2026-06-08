# 01 — 基础语法规则

## 文件格式

`.rpml` 文件是 **类 HTML 的标记**，UTF-8 编码，根元素为 `<page>`。不需要 `<?xml?>` 声明，不需要 `<html>/<head>/<body>` 包装。

渲染器按 **HTML 规则**解析（而非严格 XML），因此：
- 布尔属性可省略值：`required`、`has-action`、`has-clear-button` 合法。
- 文本中的裸 `&` 不需要转义（但 `&amp;`/`&lt;`/`&gt;` 仍被识别）。
- 自闭合写法 `<button />` 与显式闭合 `<button></button>` 均可。

```html
<page title="页面标题" route="/route" description="说明">
  ...
</page>
```

## 标签命名

所有 RPML 元素使用简洁的裸标签名（kebab-case，小写），例如 `page`、`view`、`button`、`table`。单词标签直接使用名称本身；复合名称保留连字符，例如 `list-item`、`table-row`、`enum-item`。平台原语使用 `ios-*` / `macos-*` 前缀。

## 属性

属性值用双引号包裹，类型：

| 类型 | 示例 | 说明 |
|------|------|------|
| 字符串 | `label="提交"` | 普通文本 |
| 枚举 | `state="filled"` | 固定取值集合 |
| 数字 | `count="12"` | 整数或浮点数字符串 |
| CSV | `items="A,B,C"` | 逗号分隔列表 |
| 布尔 | `has-clear-button` | 属性存在即为 true |
| data-pin | `data-pin="3"` | 正整数，从 1 起，不跳号 |

## 嵌套规则

- `<page>` 是唯一合法的根元素。
- `<view>` 必须是 `<page>` 的直接子元素，且恰好一个。
- 快照原语（`viewport` 及其内部元素）嵌套在 `<view>` 内。
- `<annotation id="N">` 是 `<page>` 的直接子元素（顶级注释）。
- 嵌套注释写在另一个 `<annotation>` 内部。

## 文本内容

注释块内的文本内容（prose）直接写在元素体内，支持换行。快照原语不应有文本内容（通过属性传值）。

## 禁止事项

- 禁止 `<script>`、`<style>`、`onclick` 等任何 JS/CSS 注入
- 禁止 `position:absolute` / `position:fixed` 内联样式
- 禁止外部 `src`（图片 CDN、图标 CDN）
- 禁止直接 HTML 元素（`<div>`、`<button>` 等）表示产品 UI
