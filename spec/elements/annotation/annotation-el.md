## `annotation-el`

**分类**：annotation

**用途**：注释块，与 `data-pin="N"` 形成对应关系，描述快照区域的行为、规则和状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | number | — | 顶层注释时必填，与 `data-pin="N"` 对应；嵌套注释时省略 |
| `label` | string | — | 注释标题，简短描述区域职责 |

## 嵌套规则

- 允许的父元素：`page-el`（顶层）或另一个 `annotation-el`（嵌套）
- 允许的子元素：文本、内联 HTML、`enum-el`、`rp-*` 快照原语（作为说明切片）、嵌套 `annotation-el`

## 嵌套标记规则

| 层级 | 标记样式 |
|------|---------|
| 顶层（`id` 存在） | 蓝色水滴，显示 id |
| 嵌套深度 1 | 紫色圆圈，显示局部索引 |
| 嵌套深度 ≥2 | 绿色三角，显示局部索引 |

## 示例

```html
<annotation-el id="2" label="用户列表">
  列表默认展示最近 30 天内活跃用户，按最后活跃时间降序排列。
  <enum-el>
    <enum-item label="空态"><empty-el title="暂无用户"></empty-el></enum-item>
    <enum-item label="加载态"><loading-el rows="3"></loading-el></enum-item>
  </enum-el>
  <annotation-el label="行操作">
    鼠标悬停时右侧出现操作按钮组。
  </annotation-el>
</annotation-el>
```

## ARIA 语义参考

`complementary`（顶层注释面板）；嵌套注释为 `section`
