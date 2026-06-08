## `rp-tag`

**分类**：display

**用途**：状态标签/标记，表示类别、标识或状态变体。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 标签文字 |
| `variant` | enum | `default` | 颜色语义变体（见下表） |
| `closable` | boolean | — | 存在时显示关闭按钮 |

## 状态

| 值 | 说明 |
|----|------|
| `default` | 中性灰色 |
| `success` | 绿色，表示成功/启用 |
| `warning` | 橙色，表示警告/待处理 |
| `danger` | 红色，表示危险/错误 |
| `info` | 蓝色，表示信息/进行中 |

## 嵌套规则

- 允许的父元素：任意 `rp-*` 容器
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-tag label="已启用" variant="success"></rp-tag>
<rp-tag label="待审核" variant="warning" closable></rp-tag>
```

## ARIA 语义参考

`status` 或 `mark`（视语境而定）
