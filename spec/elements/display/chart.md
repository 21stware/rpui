## `chart`

**分类**：display

**用途**：静态数据可视化。由 `data` 属性驱动，渲染内联 SVG（离线、无 CDN，与 `<diagram>` 同一套自包含理念）。用于 dashboard、指标趋势、占比分布等。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `kind` | enum | `bar` | `bar`、`line`、`area`、`donut`、`sparkline` |
| `data` | csv | `10,24,18,30,22` | 逗号分隔的数值序列 |
| `labels` | csv | — | 逗号分隔的轴标签（bar/line/area 生效） |
| `height` | number | `160` | 图表高度（px） |
| `color` | color | 主题色 | bar/line/area/sparkline 的主色（CSS 颜色值或 `var(--rp-*)`） |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、任意 RPML 容器
- 允许的子元素：无（自闭合）

## 示例

```html
<chart kind="bar" data="12,28,18,34,22" labels="Q1,Q2,Q3,Q4,Q5"></chart>
<chart kind="line" data="4,8,6,12,10,14" labels="1月,2月,3月,4月,5月,6月"></chart>
<chart kind="donut" data="45,30,25"></chart>
<chart kind="sparkline" data="3,5,4,8,7,9,8" height="32"></chart>
```

## ARIA 语义参考

`img`（静态图示，无交互）
