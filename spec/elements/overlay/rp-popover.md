## `rp-popover`

**分类**：overlay

**用途**：内联弹出提示，展示触发元素附近的额外信息，在注释枚举中展示。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 弹出框标题 |
| `content` | string | — | 弹出框正文（纯文本） |
| `width` | number | `300` | 宽度（px） |

## 嵌套规则

- 允许的父元素：`rp-enum-item`（在注释中展示）
- 允许的子元素：任意 `rp-*` 元素（用于富内容）

## 示例

```html
<rp-enum-item label="权限说明 Popover">
  <rp-popover title="权限说明" content="管理员可查看所有数据并修改系统配置。"></rp-popover>
</rp-enum-item>
```

## ARIA 语义参考

`tooltip` 或 `dialog`（视内容交互性而定）
