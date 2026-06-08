## `rp-dropdown`

**分类**：overlay

**用途**：下拉菜单，在注释枚举中展示展开态；主快照中仅展示触发按钮。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | csv | — | 逗号分隔的菜单项，如 `编辑,复制,删除` |
| `state` | enum | `open` | `open`（在枚举中展示）或 `closed` |
| `width` | number | `200` | 宽度（px） |
| `title` | string | — | 可选标题 |

## 嵌套规则

- 允许的父元素：`rp-enum-item`（在注释中展示）
- 允许的子元素：无（自闭合）或 `rp-menu-item`

## 示例

```html
<rp-enum-item label="行操作菜单">
  <rp-dropdown items="编辑,复制,归档,删除" width="180"></rp-dropdown>
</rp-enum-item>
```

## ARIA 语义参考

`menu`；每项为 `menuitem`；`aria-expanded` 对应 open/closed
