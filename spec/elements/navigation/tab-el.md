## `tab-el`

**分类**：navigation

**用途**：单个选项卡项，必须作为 `tabs-el` 的直接子元素使用。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | string | — | 选项卡显示文字 |
| `badge` | number | — | 徽章数字，显示在标签旁 |

## 嵌套规则

- 允许的父元素：`tabs-el`（必须）
- 允许的子元素：无（自闭合）

## 示例

```html
<tabs-el active="未读">
  <tab-el label="全部"></tab-el>
  <tab-el label="未读" badge="5"></tab-el>
</tabs-el>
```

## ARIA 语义参考

`tab`；激活项 `aria-selected="true"`
