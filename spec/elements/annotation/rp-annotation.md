## `rp-annotation`

**分类**：annotation

**用途**：注释块，与 `data-pin="N"` 形成对应关系，描述快照区域的行为、规则和状态。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | number | — | 顶层注释时必填，与 `data-pin="N"` 对应；嵌套注释时省略 |
| `label` | string | — | 注释标题，简短描述区域职责 |

## 嵌套规则

- 允许的父元素：`rp-page`（顶层）或另一个 `rp-annotation`（嵌套）
- 允许的子元素：文本、内联 HTML、`rp-enum`、`rp-*` 快照原语（作为说明切片）、嵌套 `rp-annotation`

## 嵌套标记规则

| 层级 | 标记样式 |
|------|---------|
| 顶层（`id` 存在） | 蓝色水滴，显示 id |
| 嵌套深度 1 | 紫色圆圈，显示局部索引 |
| 嵌套深度 ≥2 | 绿色三角，显示局部索引 |

## 示例

```html
<rp-annotation id="2" label="用户列表">
  列表默认展示最近 30 天内活跃用户，按最后活跃时间降序排列。
  <rp-enum>
    <rp-enum-item label="空态"><rp-empty title="暂无用户"></rp-empty></rp-enum-item>
    <rp-enum-item label="加载态"><rp-loading rows="3"></rp-loading></rp-enum-item>
  </rp-enum>
  <rp-annotation label="行操作">
    鼠标悬停时右侧出现操作按钮组。
  </rp-annotation>
</rp-annotation>
```

## ARIA 语义参考

`complementary`（顶层注释面板）；嵌套注释为 `section`
