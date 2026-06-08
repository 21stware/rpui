## `rp-table`

**分类**：display

**用途**：静态数据表格，列名和行数由属性驱动，单元格内容由运行时根据列名采样生成。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `rows` | number | `5` | 生成的行数 |
| `columns` | csv | — | 逗号分隔的列标题，如 `姓名,邮箱,状态` |
| `has-checkbox` | boolean | — | 存在时在首列添加复选框 |
| `has-action` | boolean | — | 存在时在末列添加操作按钮 |

## 嵌套规则

- 允许的父元素：`rp-panel`、`rp-viewport`、任意 `rp-*` 容器
- 允许的子元素：`rp-table-row`（可选，覆盖生成行）

## 示例

```html
<rp-table rows="6" columns="发件人,消息预览,时间,状态" has-checkbox has-action></rp-table>
```

## ARIA 语义参考

`table`；列标题为 `columnheader`
