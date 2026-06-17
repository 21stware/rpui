## `table-list-row`

**分类**：display

**用途**：独立的行切片，用于在注释或枚举中展示特定行状态（如选中、未读、高亮、禁用）。内容通过 `content` 属性以逗号分隔提供。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|--------|
| `content` | csv | — | 逗号分隔的单元格文字，如 `张三,zhang@example.com,管理员,激活` |
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

- 允许的父元素：`enum-item`、任意 RPML 容器
- 允许的子元素：无（自闭合）

## 示例

```html
<table-list-row content="张三,zhang@example.com,管理员,激活" state="selected"></table-list-row>
```

## ARIA 语义参考

`row`；`aria-selected="true"` 对应 selected 状态
