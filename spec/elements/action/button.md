## `button`

**分类**：action

**用途**：操作按钮，通过属性声明样式变体、图标和状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 按钮文字 |
| `variant` | enum | `primary` | 样式变体（见下表） |
| `icon` | string | — | Lucide 图标名，显示在文字前 |
| `state` | enum | `default` | 按钮状态（见下表） |
| `size` | enum | `md` | `sm`、`md`、`lg` |

## 状态

| 值 | 说明 |
|----|------|
| `default` | 正常可点击 |
| `loading` | 加载中（显示 spinner） |
| `disabled` | 禁用 |

| variant | 说明 |
|---------|------|
| `primary` | 主要操作，填充色 |
| `secondary` | 次要操作，描边 |
| `ghost` | 幽灵按钮，无背景 |
| `danger` | 危险操作，红色 |
| `link` | 链接样式 |

## 嵌套规则

- 允许的父元素：`button-group`、`navigator`、`panel`、任意 RPML 容器
- 允许的子元素：无（自闭合）

## 示例

```html
<button label="新建任务" variant="primary" icon="plus"></button>
<button label="删除" variant="danger" state="loading"></button>
```

## ARIA 语义参考

`button`；`aria-disabled="true"` 对应 disabled；`aria-busy="true"` 对应 loading
