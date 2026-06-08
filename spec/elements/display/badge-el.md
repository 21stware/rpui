## `badge-el`

**分类**：display

**用途**：通知计数气泡，超出最大值时显示 `max+`。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `count` | number | — | 实际计数 |
| `max` | number | `99` | 超出此值显示 `max+` |

## 嵌套规则

- 允许的父元素：`navbar-el`、`list-item`、任意 `rp-*` 容器
- 允许的子元素：无（自闭合）

## 示例

```html
<badge-el count="120" max="99"></badge-el>
```

## ARIA 语义参考

`status`（`aria-live="polite"` 用于动态更新场景）
