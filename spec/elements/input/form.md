## `form`

**分类**：input

**用途**：表单容器，管理 `form-item` 的布局方向。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layout` | enum | `vertical` | `vertical`（标签在上）或 `horizontal`（标签在左） |

## 嵌套规则

- 允许的父元素：`panel`、`modal`、`drawer`、`viewport`
- 允许的子元素：`form-item`

## 示例

```html
<form layout="vertical">
  <form-item label="用户名" required>
    <input placeholder="请输入用户名" state="filled" value="oboo"></input>
  </form-item>
  <form-item label="角色">
    <select options="管理员,编辑,只读" value="编辑"></select>
  </form-item>
</form>
```

## ARIA 语义参考

`form`
