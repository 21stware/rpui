## `rp-toggle`

**分类**：input

**用途**：开关控件，静态展示开/关/禁用状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `state` | enum | `off` | 开关状态（见下表） |
| `label` | string | — | 开关标签文字 |

## 状态

| 值 | 说明 |
|----|------|
| `on` | 开启（蓝色） |
| `off` | 关闭（灰色） |
| `disabled` | 禁用 |

## 嵌套规则

- 允许的父元素：`rp-form-item`、`rp-panel`、`rp-list-item`
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-toggle label="接收通知" state="on"></rp-toggle>
```

## ARIA 语义参考

`switch`；`aria-checked="true|false"`；`aria-disabled` 对应 disabled
