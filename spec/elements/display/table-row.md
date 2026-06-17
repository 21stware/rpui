## `table-row`

**分类**：display

**用途**：`table` 的子元素，显式声明一行数据。单元格内容由 `content` 属性以逗号分隔提供，运行时按列顺序填充；存在时优先于 `rows` 自动采样。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|--------|
| `content` | csv | — | 逗号分隔的单元格文字，数量应与 `table` 的 `columns` 一致 |
| `checked` | boolean | — | 存在时勾选该行复选框（需 `table` 设置 `has-checkbox`） |
| `state` | enum | `default` | 选中态：`selected` 等价于 `checked` |

## 嵌套规则

- 允许的父元素：`table`
- 允许的子元素：无（自闭合）

## 示例

```html
<table columns="名称,负责人,状态" has-checkbox has-action>
  <table-row content="RPUI 重构,张三,进行中" checked></table-row>
  <table-row content="登录页改版,李四,已完成"></table-row>
</table>
```

## ARIA 语义参考

`row`
