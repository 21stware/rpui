## `page`

**分类**：structural

**用途**：原型文档的根容器，提供标题、路由、描述，并将主视图置于左侧、注释面板置于右侧。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 页面标题，显示在左侧头部 |
| `route` | string | — | 页面路由路径，如 `/users` |
| `description` | string | — | 页面简短说明 |

## 嵌套规则

- 允许的父元素：`<body>`（文档根）
- 允许的子元素：恰好一个 `view`；任意数量的顶层 `annotation`

## 示例

```html
<page title="用户管理" route="/users" description="管理系统用户">
  <view device="web" scale="0.65">
    <viewport device="web"><!-- snapshot --></viewport>
  </view>
  <annotation id="1" label="顶部导航">...</annotation>
</page>
```

## ARIA 语义参考

`main` + `complementary`（左侧主内容区 / 右侧注释面板）
