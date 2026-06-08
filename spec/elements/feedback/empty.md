## `empty`

**分类**：feedback

**用途**：空状态占位，当列表或区域没有数据时展示。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 空状态标题，如 `暂无数据` |
| `description` | string | — | 补充说明文字 |
| `action` | string | — | 操作按钮文字，如 `立即创建` |

## 嵌套规则

- 允许的父元素：`panel`、`enum-item`、`viewport`
- 允许的子元素：无（自闭合）

## 示例

```html
<empty title="暂无任务" description="创建第一个任务，开始协作。" action="新建任务"></empty>
```

## ARIA 语义参考

`status`（空状态提示区）
