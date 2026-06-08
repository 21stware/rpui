## `navbar-el`

**分类**：navigation

**用途**：顶部导航栏容器，承载 Logo、面包屑、搜索、按钮、徽章、头像等。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `height` | number | `64` | 导航栏高度（px） |

## 嵌套规则

- 允许的父元素：`viewport-el`、`layout-el`
- 允许的子元素：`logo-el`、`breadcrumb-el`、`search-el`、`button-el`、`badge-el`、`avatar-el`

## 示例

```html
<navbar-el height="64" data-pin="1">
  <logo-el label="ACME"></logo-el>
  <breadcrumb-el items="首页,用户管理"></breadcrumb-el>
  <avatar-el size="32" initials="OC"></avatar-el>
</navbar-el>
```

## ARIA 语义参考

`banner`（顶部导航区域）
