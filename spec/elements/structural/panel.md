## `panel`

**分类**：structural

**用途**：白色卡片面板，提供内边距与阴影层级，作为内容分组的视觉容器。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `padding` | number | `16` | 内边距（px） |
| `elevation` | enum | `1` | 阴影层级：`1`（轻）或 `2`（重） |

## 嵌套规则

- 允许的父元素：`viewport`、`layout`、任意 RPML 容器
- 允许的子元素：任意 RPML 元素

## 示例

```html
<panel padding="24" elevation="1">
  <stat-card label="活跃用户" value="12,480" trend="up" change="+12%"></stat-card>
</panel>
```

## ARIA 语义参考

`region`（当包含独立内容区块时）
