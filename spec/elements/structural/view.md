## `view`

**分类**：structural

**用途**：缩放的原型画布帧，包裹主快照并渲染 `data-pin` 水滴标记。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `device` | enum | `web` | 设备预设：`web`、`ipad`、`mobile` |
| `scale` | number | `0.65` | 缩放比例，如 `0.65` |
| `width` | number | 由 device 决定 | 覆盖预设宽度（px） |
| `height` | string | `auto` | `auto` 或数字（px）；数字启用固定高度裁剪 |

## 嵌套规则

- 允许的父元素：`page`
- 允许的子元素：恰好一个 `viewport`

## 示例

```html
<view device="web" scale="0.65">
  <viewport device="web">
    <!-- RPML 快照原语 -->
  </viewport>
</view>
```

## ARIA 语义参考

`main`（页面主要内容区域）
