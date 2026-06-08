## `rp-card`

**分类**：display

**用途**：通用内容卡片，带标题、副标题和可选图片/底部区域。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 卡片标题 |
| `subtitle` | string | — | 副标题或摘要 |
| `padding` | number | `16` | 内边距（px） |
| `has-image` | boolean | — | 存在时在顶部显示图片占位 |
| `has-footer` | boolean | — | 存在时显示底部操作区 |

## 嵌套规则

- 允许的父元素：`rp-layout`、`rp-panel`、`rp-viewport`
- 允许的子元素：任意 `rp-*` 元素

## 示例

```html
<rp-card title="任务标题" subtitle="截止：2026-06-30" has-footer>
  <rp-tag label="进行中" variant="info"></rp-tag>
</rp-card>
```

## ARIA 语义参考

`article`（独立内容单元）
