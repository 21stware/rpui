## `rp-table-row`

**分类**：display

**用途**：独立的表格行切片，用于在注释中展示特定行状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cells` | csv | — | 逗号分隔的单元格文字 |
| `state` | enum | `default` | 行状态（见下表） |

## 状态

| 值 | 说明 |
|----|------|
| `default` | 普通行 |
| `selected` | 已选中（复选框勾选） |
| `unread` | 未读，加粗显示 |
| `highlighted` | 高亮行 |
| `disabled` | 禁用，灰显 |

## 嵌套规则

- 允许的父元素：`rp-table`、`rp-enum-item`
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-table-row cells="张三,zhang@example.com,管理员,激活" state="selected"></rp-table-row>
```

## ARIA 语义参考

`row`；`aria-selected="true"` 对应 selected 状态
