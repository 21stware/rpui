## `rp-form`

**分类**：input

**用途**：表单容器，管理 `rp-form-item` 的布局方向。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layout` | enum | `vertical` | `vertical`（标签在上）或 `horizontal`（标签在左） |

## 嵌套规则

- 允许的父元素：`rp-panel`、`rp-modal`、`rp-drawer`、`rp-viewport`
- 允许的子元素：`rp-form-item`

## 示例

```html
<rp-form layout="vertical">
  <rp-form-item label="用户名" required>
    <rp-input placeholder="请输入用户名" state="filled" value="oboo"></rp-input>
  </rp-form-item>
  <rp-form-item label="角色">
    <rp-select options="管理员,编辑,只读" value="编辑"></rp-select>
  </rp-form-item>
</rp-form>
```

## ARIA 语义参考

`form`
