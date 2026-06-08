## `rp-list-item`

**分类**：display

**用途**：列表中的单行条目，支持图标、徽章和选中/禁用状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 条目文字 |
| `icon` | string | — | Lucide 图标名 |
| `badge` | number | — | 徽章数字 |
| `state` | enum | `default` | `default`、`selected`、`disabled` |

## 嵌套规则

- 允许的父元素：`rp-list`（必须）
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-list-item label="收件箱" icon="inbox" badge="12" state="selected"></rp-list-item>
```

## ARIA 语义参考

`listitem`；`aria-selected` / `aria-disabled` 对应各状态
