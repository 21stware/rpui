## `rp-button-group`

**分类**：action

**用途**：水平排列一组按钮，使其视觉上连成一体。

## 属性

无属性。

## 嵌套规则

- 允许的父元素：`rp-panel`、`rp-navbar`、`rp-viewport`、任意 `rp-*` 容器
- 允许的子元素：`rp-button`

## 示例

```html
<rp-button-group>
  <rp-button label="编辑" variant="secondary" icon="pencil"></rp-button>
  <rp-button label="复制" variant="secondary" icon="copy"></rp-button>
  <rp-button label="删除" variant="danger" icon="trash"></rp-button>
</rp-button-group>
```

## ARIA 语义参考

`group`（`role="group"` 包裹相关按钮集合）
