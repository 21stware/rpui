# 02 — 文档结构

## 顶层结构

```xml
<page title="..." route="..." description="...">

  <!-- 1. 主快照区（必须，且只有一个） -->
  <view device="web" scale="0.65">
    <viewport device="web">
      <!-- RPML 快照原语 -->
    </viewport>
  </view>

  <!-- 2. 顶级注释（零个或多个，与 data-pin 一一对应） -->
  <annotation id="1" label="导航栏">...</annotation>
  <annotation id="2" label="筛选栏">...</annotation>

</page>
```

运行时将主快照渲染在左侧，注释渲染在右侧可独立滚动的面板。

## page 属性

| 属性 | 必须 | 说明 |
|------|------|------|
| `title` | ✓ | 页面标题，显示在文档头部 |
| `route` | 推荐 | 对应的路由路径，如 `/projects/:id/tasks`（快照模式；文档模式不使用） |
| `description` | 推荐 | 一句话说明主快照捕获的是哪个代表性状态 |
| `mode` | 可选 | `snapshot`（默认）\| `doc`；`doc` 切换为单栏文档流，详见下文 |

## view 属性

| 属性 | 说明 |
|------|------|
| `device` | `web`（默认 1440px）\| `ipad`（834px）\| `mobile`（390px） |
| `scale` | 缩放比例，如 `0.65`，用于在文档中完整展示宽屏快照 |
| `width` | 覆盖设备预设宽度（px 数字字符串） |
| `height` | 显式数字则启用固定高度裁剪；省略或 `auto` 则自适应高度 |

## viewport

`<viewport>` 是快照内容的直接容器，`device` 属性应与 `view` 一致。

## 双栏布局

渲染器自动将文档拆成两栏：

- **左栏**：标题头 + 主快照（`view`）
- **右栏**：顶级 `<annotation>` 列表，独立滚动

顶级注释**不需要**也**不应该**手动放入任何布局容器，运行时负责移动它们。

## 文档模式（`mode="doc"`）

当内容本质上是线性的说明文字（发布说明、规格说明、需求文档）时，给 `<page>` 加上 `mode="doc"`，渲染器会切换成**单栏、自上而下**的文档流：

- 没有缩放的 `<view>` 主快照画布；
- 没有 pin 水滴标记；
- 没有右侧独立滚动的注释栏；
- 没有 `route` 路由徽标（文档不对应某个具体屏幕）。

所有子元素按**源码顺序**排布，形态接近 Markdown，但每一块都是 RPML 原语：

```xml
<page title="发布说明" mode="doc">
  <doc-heading level="1">RPUI 0.9 发布说明</doc-heading>
  <doc-paragraph>文档模式把页面渲染成单栏可读文档。</doc-paragraph>
  <doc-list type="bullet">
    <doc-list-item>新增 <code>doc-*</code> 排版原语。</doc-list-item>
    <doc-list-item>页面级 <code>mode="doc"</code> 切换文档流。</doc-list-item>
  </doc-list>
  <doc-quote cite="设计原则">文档模式用来排布说明，而非绘制 UI。</doc-quote>
</page>
```

### 文档排版原语

| 标签 | 属性 | 说明 |
|------|------|------|
| `doc-heading` | `level`（1–6，默认 1） | 标题，`level="2"` 起带分隔线 |
| `doc-paragraph` | — | 段落；可内嵌 `strong` / `em` / `code` / `a` |
| `doc-list` | `type`（`bullet` \| `number`，默认 `bullet`） | 列表容器 |
| `doc-list-item` | — | 列表项 |
| `doc-quote` | `cite`（可选来源） | 引用块，`cite` 渲染为「— 来源」 |

文档流中也可以直接放普通快照原语（如 `<alert>`、`<table>`、`<chart>`）来举例，它们同样按源码顺序排布。

文档模式下校验器**跳过** `view` / pin / annotation 的结构要求，只保留 `title` 检查。仍需要展示交互状态、权限变体、隐藏 UI 时，请使用默认的快照模式。
