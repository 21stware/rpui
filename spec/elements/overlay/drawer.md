## `drawer`

**分类**：overlay

**用途**：侧抽屉，从指定方向滑出，在注释枚举中展示；永久停靠的侧面板可放在主快照中。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 抽屉标题 |
| `placement` | enum | `right` | 弹出方向：`right`、`left`、`bottom` |
| `width` | number | `360` | 宽度（px），`bottom` 时为高度 |
| `state` | enum | `open` | `open` 或 `closed` |

## 嵌套规则

- 允许的父元素：`enum-item`（在注释中展示）
- 允许的子元素：任意 RPML 元素

## 示例

```html
<enum-item label="详情抽屉">
  <drawer title="任务详情" placement="right" width="480">
    <key-value>
      <kv-row label="负责人" value="张三"></kv-row>
    </key-value>
  </drawer>
</enum-item>
```

## ARIA 语义参考

`dialog`；`aria-modal="true"`
