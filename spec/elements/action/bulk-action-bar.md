## `bulk-action-bar`

**分类**：action

**用途**：批量操作栏，当列表中有条目被选中时显示，展示选中数量和可执行的批量操作。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `count` | number | — | 当前已选中的条目数 |
| `actions` | csv | — | 逗号分隔的操作名，如 `标为已读,归档,删除` |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`
- 允许的子元素：无（自闭合）

## 示例

```html
<bulk-action-bar count="3" actions="标为已读,归档,删除"></bulk-action-bar>
```

## ARIA 语义参考

`toolbar`；`aria-label="已选 N 项"` 描述操作上下文
