## `breadcrumb-el`

**分类**：navigation

**用途**：面包屑导航，展示当前页面的层级路径。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | csv | — | 逗号分隔的路径层级，如 `首页,设置,用户管理` |

## 嵌套规则

- 允许的父元素：`navbar-el`、`panel-el`、`viewport-el`
- 允许的子元素：无（自闭合）

## 示例

```html
<breadcrumb-el items="首页,设置,用户管理"></breadcrumb-el>
```

## ARIA 语义参考

`navigation` + `aria-label="breadcrumb"`；末项为 `aria-current="page"`
