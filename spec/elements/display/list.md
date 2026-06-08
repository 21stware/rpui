## `list`

**分类**：display

**用途**：列表容器，包裹一组 `list-item`，也可通过 `items` 属性自动生成条目。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | number | — | 自动生成的条目数（无子元素时使用） |
| `state` | string | — | 快捷预设，如 `first-selected` |

## 嵌套规则

- 允许的父元素：`sidebar`、`panel`、`viewport`
- 允许的子元素：`list-item`

## 示例

```html
<list>
  <list-item label="收件箱" icon="inbox" badge="12" state="selected"></list-item>
  <list-item label="已发送" icon="send"></list-item>
  <list-item label="垃圾箱" icon="trash" state="disabled"></list-item>
</list>
```

## ARIA 语义参考

`list`
