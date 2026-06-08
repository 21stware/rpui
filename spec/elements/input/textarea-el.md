## `textarea-el`

**分类**：input

**用途**：多行文本输入区域，静态展示各种输入状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `placeholder` | string | — | 占位文字 |
| `value` | string | — | 填充内容 |
| `rows` | number | `3` | 可见行数 |
| `state` | enum | `default` | `default`、`focus`、`filled`、`error`、`disabled` |

## 嵌套规则

- 允许的父元素：`form-item`、`panel-el`、`viewport-el`
- 允许的子元素：无（自闭合）

## 示例

```html
<form-item label="备注">
  <textarea-el placeholder="请输入备注" rows="4" state="filled" value="这是一段备注内容。"></textarea-el>
</form-item>
```

## ARIA 语义参考

`textbox` + `aria-multiline="true"`
