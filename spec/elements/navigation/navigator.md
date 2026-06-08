## `navigator`

**分类**：navigation

**用途**：顶部导航栏容器，承载 Logo、面包屑、搜索、按钮、徽章、头像等。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `height` | number | `64` | 导航栏高度（px） |

## 嵌套规则

- 允许的父元素：`viewport`、`layout`
- 允许的子元素：`logo`、`breadcrumb`、`search`、`button`、`badge`、`avatar`

## 示例

```html
<navigator height="64" data-pin="1">
  <logo label="ACME"></logo>
  <breadcrumb items="首页,用户管理"></breadcrumb>
  <avatar size="32" initials="OC"></avatar>
</navigator>
```

## ARIA 语义参考

`banner`（顶部导航区域）
