## `rp-enum-item`

**分类**：annotation

**用途**：`rp-enum` 中的单个状态卡片，承载一种 UI 状态或变体的快照和说明。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 状态名称，如 `空态`、`加载中`、`管理员视图` |
| `description` | string | — | 对该状态的简短补充说明 |

## 嵌套规则

- 允许的父元素：`rp-enum`（必须）
- 允许的子元素：任意 `rp-*` 快照原语

运行时自动为每个 `rp-enum-item` 编号（黑色方块徽章 1、2、3…），注释正文可通过"状态 2"引用。

## 示例

```html
<rp-enum>
  <rp-enum-item label="只读" description="非管理员仅可查看，操作按钮隐藏。">
    <rp-table rows="3" columns="姓名,邮箱,角色"></rp-table>
  </rp-enum-item>
  <rp-enum-item label="管理员" description="可编辑和删除行。">
    <rp-table rows="3" columns="姓名,邮箱,角色" has-action></rp-table>
  </rp-enum-item>
</rp-enum>
```

## ARIA 语义参考

`listitem`
