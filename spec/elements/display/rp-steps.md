## `rp-steps`

**分类**：display

**用途**：步骤条，展示多步骤流程中的当前进度。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `steps` | csv | — | 逗号分隔的步骤名，如 `填写信息,确认,完成` |
| `current` | number | `0` | 当前激活步骤的索引（从 0 开始）或 `active` 别名 |
| `layout` | enum | `horizontal` | `horizontal` 或 `vertical` |

## 嵌套规则

- 允许的父元素：`rp-panel`、`rp-viewport`
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-steps steps="填写信息,确认订单,支付,完成" current="2"></rp-steps>
```

## ARIA 语义参考

`list`；当前步骤 `aria-current="step"`
