## `alert`

**分类**：feedback

**用途**：页面内嵌提示横幅，展示信息、成功、警告或错误消息。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `message` | string | — | 提示文字 |
| `variant` | enum | `info` | 语义变体：`info`、`success`、`warning`、`error` |
| `title` | string | — | 可选标题 |
| `has-close` | boolean | — | 存在时显示关闭按钮 |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、`enum-item`
- 允许的子元素：无（自闭合）

## 示例

```html
<alert variant="warning" title="即将到期" message="您的订阅将在 3 天后过期。" has-close></alert>
```

## ARIA 语义参考

`alert`（warning/error）或 `status`（info/success）
