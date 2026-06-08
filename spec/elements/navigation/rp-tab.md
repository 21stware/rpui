## `rp-tab`

**分类**：navigation

**用途**：单个选项卡项，必须作为 `rp-tabs` 的直接子元素使用。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 选项卡显示文字 |
| `badge` | number | — | 徽章数字，显示在标签旁 |

## 嵌套规则

- 允许的父元素：`rp-tabs`（必须）
- 允许的子元素：无（自闭合）

## 示例

```html
<rp-tabs active="未读">
  <rp-tab label="全部"></rp-tab>
  <rp-tab label="未读" badge="5"></rp-tab>
</rp-tabs>
```

## ARIA 语义参考

`tab`；激活项 `aria-selected="true"`
