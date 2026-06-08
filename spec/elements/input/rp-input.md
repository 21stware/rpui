## `rp-input`

**分类**：input

**用途**：单行文本输入框，所有状态通过属性静态声明。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `placeholder` | string | — | 占位文字 |
| `value` | string | — | 填充值 |
| `state` | enum | `default` | 输入状态（见下表） |
| `label` | string | — | 输入框标签 |
| `error-message` | string | — | 错误提示文字，`state="error"` 时显示 |
| `has-clear-button` | boolean | — | 存在时显示清除按钮 |

## 状态

| 值 | 说明 |
|----|------|
| `default` | 默认空态 |
| `focus` | 聚焦态（蓝色边框） |
| `filled` | 已填写 |
| `error` | 校验错误 |
| `disabled` | 禁用 |

## 嵌套规则

- 允许的父元素：`rp-form-item`、`rp-panel`、`rp-viewport`
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-form-item label="邮箱" required>
  <rp-input placeholder="请输入邮箱" state="error" error-message="邮箱格式不正确"></rp-input>
</rp-form-item>
```

## ARIA 语义参考

`textbox`；`aria-invalid="true"` 对应 error 状态；`aria-disabled="true"` 对应 disabled
