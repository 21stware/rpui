## `rp-enum`

**分类**：annotation

**用途**：状态/变体卡片的水平容器，用于并排展示互斥的 UI 状态或权限变体。

## 属性

无属性。

## 嵌套规则

- 允许的父元素：`rp-annotation`
- 允许的子元素：`rp-enum-item`

## 示例

```html
<rp-annotation id="3" label="搜索框">
  <rp-enum>
    <rp-enum-item label="默认态"><rp-input state="default" placeholder="搜索…"></rp-input></rp-enum-item>
    <rp-enum-item label="聚焦态"><rp-input state="focus" placeholder="搜索…"></rp-input></rp-enum-item>
    <rp-enum-item label="有结果"><rp-input state="filled" value="张三"></rp-input></rp-enum-item>
    <rp-enum-item label="无结果" description="显示空状态提示。"><rp-empty title="无匹配结果"></rp-empty></rp-enum-item>
  </rp-enum>
</rp-annotation>
```

## ARIA 语义参考

`list`（状态卡片集合）
