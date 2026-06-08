## `sidebar`

**分类**：navigation

**用途**：左侧导航面板，通常包含导航列表。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | number | `260` | 侧边栏宽度（px） |
| `collapsed` | boolean | — | 存在时折叠为图标模式 |

## 嵌套规则

- 允许的父元素：`layout`、`viewport`
- 允许的子元素：`list`、`logo`

## 示例

```html
<sidebar width="260">
  <logo label="ACME"></logo>
  <list>
    <list-item label="仪表盘" icon="home" state="selected"></list-item>
    <list-item label="用户" icon="users"></list-item>
  </list>
</sidebar>
```

## ARIA 语义参考

`navigation`
