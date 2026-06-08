## `loading-el`

**分类**：feedback

**用途**：加载状态指示器，骨架屏或旋转 spinner，用于替代尚未加载的内容区域。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 加载说明文字 |
| `rows` | number | `3` | 骨架行数（`kind="skeleton"` 时有效） |
| `kind` | enum | `skeleton` | `skeleton`（行状占位）或 `spinner`（旋转图标） |

## 嵌套规则

- 允许的父元素：`panel-el`、`enum-item`、`viewport-el`
- 允许的子元素：无（自闭合）

## 示例

```html
<loading-el kind="skeleton" rows="4"></loading-el>
<loading-el kind="spinner" label="数据加载中…"></loading-el>
```

## ARIA 语义参考

`status` + `aria-live="polite"`；`aria-label` 描述加载内容
