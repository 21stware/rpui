## `rp-stat-card`

**分类**：display

**用途**：单指标统计卡片，显示数值、趋势箭头和变化幅度。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 指标名称 |
| `value` | string | — | 主要数值，如 `12,480` |
| `trend` | enum | — | 趋势方向：`up`、`down`、`flat` |
| `change` | string | — | 变化幅度文字，如 `+12%` |

## 嵌套规则

- 允许的父元素：`rp-panel`、`rp-layout`、`rp-viewport`
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-stat-card label="活跃用户" value="12,480" trend="up" change="+12%"></rp-stat-card>
```

## ARIA 语义参考

`figure`（统计数据区块）
