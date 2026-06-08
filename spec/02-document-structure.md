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
| `route` | 推荐 | 对应的路由路径，如 `/projects/:id/tasks` |
| `description` | 推荐 | 一句话说明主快照捕获的是哪个代表性状态 |

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
