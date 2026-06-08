## `rp-layout`

**分类**：structural

**用途**：CSS Grid 布局容器，用于在快照中划分列/行区域。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columns` | string | `1fr` | CSS grid-template-columns 值，如 `260px 1fr` |
| `rows` | string | `auto` | CSS grid-template-rows 值 |
| `gap` | number | `16` | 格间距（px） |

## 嵌套规则

- 允许的父元素：`rp-viewport`、`rp-panel`、`rp-layout`、任意 `rp-*` 容器
- 允许的子元素：任意 `rp-*` 元素

## 示例

```html
<rp-layout columns="260px 1fr" gap="0">
  <rp-sidebar width="260"></rp-sidebar>
  <rp-panel padding="24"><!-- main content --></rp-panel>
</rp-layout>
```

## ARIA 语义参考

无特定角色；子元素各自承载语义。
