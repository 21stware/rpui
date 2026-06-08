## `sidebar-el`

**分类**：navigation

**用途**：左侧导航面板，通常包含导航列表。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | number | `260` | 侧边栏宽度（px） |
| `collapsed` | boolean | — | 存在时折叠为图标模式 |

## 嵌套规则

- 允许的父元素：`layout-el`、`viewport-el`
- 允许的子元素：`list-el`、`logo-el`

## 示例

```html
<sidebar-el width="260">
  <logo-el label="ACME"></logo-el>
  <list-el>
    <list-item label="仪表盘" icon="home" state="selected"></list-item>
    <list-item label="用户" icon="users"></list-item>
  </list-el>
</sidebar-el>
```

## ARIA 语义参考

`navigation`
