## `rp-toast`

**分类**：overlay

**用途**：瞬时通知提示，在注释枚举中展示；不放在主快照中。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `message` | string | — | 提示文字 |
| `variant` | enum | `info` | 语义变体（见下表） |
| `title` | string | — | 可选标题 |
| `closable` | boolean | — | 存在时显示关闭按钮 |

## 状态

| 值 | 说明 |
|----|------|
| `info` | 信息（蓝色） |
| `success` | 成功（绿色） |
| `warning` | 警告（橙色） |
| `error` | 错误（红色） |

## 嵌套规则

- 允许的父元素：`rp-enum-item`（在注释中展示）
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-enum-item label="保存成功 Toast">
  <rp-toast variant="success" message="修改已保存" closable></rp-toast>
</rp-enum-item>
```

## ARIA 语义参考

`status`（info/success）或 `alert`（warning/error）
