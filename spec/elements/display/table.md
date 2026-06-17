## `table`

**分类**：display

**用途**：静态数据表格。列名由 `columns` 驱动；行内容优先取自 `<row>` 子元素，否则由运行时根据列名采样生成（`rows` 控制采样行数）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `rows` | number | `5` | 采样行数（无 `<row>` 子元素时生效） |
| `columns` | csv | — | 逗号分隔的列标题，如 `姓名,邮箱,状态` |
| `has-checkbox` | boolean | — | 存在时在首列添加复选框 |
| `has-action` | boolean | — | 存在时在末列添加操作按钮 |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、任意 RPML 容器
- 允许的子元素：`table-row`（可选，显式声明行内容；存在时优先于 `rows` 采样）

## 示例

```html
<table rows="6" columns="发件人,消息预览,时间,状态" has-checkbox has-action></table>
```

显式行内容：

```html
<table columns="名称,负责人,状态" has-checkbox has-action>
  <table-row content="RPUI 重构,张三,进行中" checked></table-row>
  <table-row content="登录页改版,李四,已完成"></table-row>
</table>
```

## ARIA 语义参考

`table`；列标题为 `columnheader`
