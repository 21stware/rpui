## `select-el`

**分类**：input

**用途**：下拉选择器，快照中保持折叠态；展开列表在注释枚举中展示。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | csv | — | 逗号分隔的选项，如 `A,B,C` |
| `value` | string | — | 当前选中值 |
| `label` | string | — | 选择器标签 |
| `state` | enum | `collapsed` | 选择器状态（见下表） |

## 状态

| 值 | 说明 |
|----|------|
| `collapsed` | 折叠（默认在快照中使用） |
| `expanded` | 展开（在注释枚举中展示） |
| `disabled` | 禁用 |
| `error` | 校验错误 |

## 嵌套规则

- 允许的父元素：`form-item`、`panel-el`、`viewport-el`
- 允许的子元素：无（自闭合）

## 示例

```html
<select-el label="角色" options="管理员,编辑,只读" value="编辑" state="collapsed"></select-el>
```

## ARIA 语义参考

`combobox`；`aria-expanded` 对应 expanded/collapsed 状态
