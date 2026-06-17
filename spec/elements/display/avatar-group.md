## `avatar-group`

**分类**：display

**用途**：重叠头像组，常见于「指派人 / 参与者 / 评论者」等需要展示多人且空间有限的场景。可放入 `<avatar>` 子元素，或用 `items` 自动生成。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | number | `3` | 无 `<avatar>` 子元素时自动生成的头像数 |
| `overflow` | number | — | 末尾「+N」溢出计数 |
| `size` | number | `32` | 头像尺寸（px） |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、任意 RPML 容器
- 允许的子元素：`avatar`（可选，覆盖 `items` 自动生成）

## 示例

```html
<avatar-group items="3" overflow="5"></avatar-group>
<avatar-group size="28">
  <avatar initials="张"></avatar>
  <avatar initials="李"></avatar>
  <avatar initials="王"></avatar>
</avatar-group>
```

## ARIA 语义参考

`group`（一组头像，无交互）
