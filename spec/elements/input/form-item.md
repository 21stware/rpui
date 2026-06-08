## `form-item`

**分类**：input

**用途**：表单项包装器，为内部输入原语提供标签、必填标记、错误提示和辅助说明。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 字段标签 |
| `required` | boolean | — | 存在时显示必填星号 |
| `error` | string | — | 错误提示文字（显示在输入框下方） |
| `hint` | string | — | 辅助说明文字 |

## 嵌套规则

- 允许的父元素：`form-el`（必须）
- 允许的子元素：恰好一个输入原语：`input-el`、`textarea-el`、`select-el`、`date-picker`、`toggle-el` 等

## 示例

```html
<form-item label="邮箱" required error="请输入有效的邮箱地址">
  <input-el placeholder="请输入邮箱" state="error"></input-el>
</form-item>
```

## ARIA 语义参考

隐式 `group`；`label` 关联子输入的 `aria-labelledby`；`error` 关联 `aria-describedby`
