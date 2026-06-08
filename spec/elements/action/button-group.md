## `button-group`

**分类**：action

**用途**：水平排列一组按钮，使其视觉上连成一体。

## 属性

无属性。

## 嵌套规则

- 允许的父元素：`panel-el`、`navbar-el`、`viewport-el`、任意 `rp-*` 容器
- 允许的子元素：`button-el`

## 示例

```html
<button-group>
  <button-el label="编辑" variant="secondary" icon="pencil"></button-el>
  <button-el label="复制" variant="secondary" icon="copy"></button-el>
  <button-el label="删除" variant="danger" icon="trash"></button-el>
</button-group>
```

## ARIA 语义参考

`group`（`role="group"` 包裹相关按钮集合）
