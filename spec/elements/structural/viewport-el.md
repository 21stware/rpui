## `viewport-el`

**分类**：structural

**用途**：快照视口，固定宽度、自动高度，是 `main-view` 内主快照的直接容器。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `device` | enum | `web` | 设备预设：`web`（1440px）、`ipad`（834px）、`mobile`（390px） |
| `width` | number | 由 device 决定 | 覆盖预设宽度（px） |
| `height` | string | `auto` | 高度：`auto` 或数字（px），数字会裁剪内容 |

## 嵌套规则

- 允许的父元素：`main-view`
- 允许的子元素：任意 `rp-*` 快照原语

## 示例

```html
<main-view device="web" scale="0.65">
  <viewport-el device="web">
    <layout-el columns="260px 1fr">
      <sidebar-el width="260"></sidebar-el>
      <panel-el padding="24"><!-- content --></panel-el>
    </layout-el>
  </viewport-el>
</main-view>
```

## ARIA 语义参考

无特定角色；作为布局容器使用。
