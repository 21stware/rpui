## `tabs`

**分类**：navigation

**用途**：选项卡组，切换同一页面内的不同内容视图。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `active` | string | `0` | 激活项的索引（数字）或标签文字 |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、任意 RPML 容器
- 允许的子元素：`tab`

## 示例

```html
<tabs active="全部">
  <tab label="全部" badge="24"></tab>
  <tab label="待处理" badge="3"></tab>
  <tab label="已完成"></tab>
</tabs>
```

## ARIA 语义参考

`tablist`；每个 `tab` 对应 `tab` 角色
