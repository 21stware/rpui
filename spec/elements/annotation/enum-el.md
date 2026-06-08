## `enum-el`

**分类**：annotation

**用途**：状态/变体卡片的水平容器，用于并排展示互斥的 UI 状态或权限变体。

## 属性

无属性。

## 嵌套规则

- 允许的父元素：`annotation-el`
- 允许的子元素：`enum-item`

## 示例

```html
<annotation-el id="3" label="搜索框">
  <enum-el>
    <enum-item label="默认态"><input-el state="default" placeholder="搜索…"></input-el></enum-item>
    <enum-item label="聚焦态"><input-el state="focus" placeholder="搜索…"></input-el></enum-item>
    <enum-item label="有结果"><input-el state="filled" value="张三"></input-el></enum-item>
    <enum-item label="无结果" description="显示空状态提示。"><empty-el title="无匹配结果"></empty-el></enum-item>
  </enum-el>
</annotation-el>
```

## ARIA 语义参考

`list`（状态卡片集合）
