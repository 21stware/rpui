## `date-picker`

**分类**：input

**用途**：日期选择器，静态展示选中日期或各种交互状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | string | — | 选中日期，格式 `YYYY-MM-DD` |
| `state` | enum | `default` | `default`、`focus`、`filled`、`error`、`disabled` |

## 嵌套规则

- 允许的父元素：`form-item`、`panel-el`、`viewport-el`
- 允许的子元素：无（自闭合）

## 示例

```html
<form-item label="截止日期" required>
  <date-picker value="2026-06-30" state="filled"></date-picker>
</form-item>
```

## ARIA 语义参考

`combobox`（触发器）+ `dialog`（弹出日历）
