## `rp-sidebar`

**分类**：navigation

**用途**：左侧导航面板，通常包含导航列表。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | number | `260` | 侧边栏宽度（px） |
| `collapsed` | boolean | — | 存在时折叠为图标模式 |

## 嵌套规则

- 允许的父元素：`rp-layout`、`rp-viewport`
- 允许的子元素：`rp-list`、`rp-logo`

## 示例

```html
<rp-sidebar width="260">
  <rp-logo label="ACME"></rp-logo>
  <rp-list>
    <rp-list-item label="仪表盘" icon="home" state="selected"></rp-list-item>
    <rp-list-item label="用户" icon="users"></rp-list-item>
  </rp-list>
</rp-sidebar>
```

## ARIA 语义参考

`navigation`
