# 03 — 元素模型

## 元素分类

| 分类 | 前缀 | 说明 |
|------|------|------|
| 画布元素 | `rp-page` / `rp-main-view` / `rp-annotation` / `rp-enum` | 文档结构骨架 |
| 快照原语 | `rp-*`（其余） | 静态 UI 积木 |

## 别名系统

```
rp-*       ← 当前推荐前缀（新文档使用）
snap-*     ← 快照原语的兼容别名
proto-*    ← 画布元素的早期兼容别名
```

三种前缀注册的是同一个 class，行为完全相同。

## 属性驱动

RPML 元素通过 HTML 属性传递所有显示状态，不接受子文本作为数据（注释块除外）。

```xml
<!-- 正确 -->
<rp-button label="提交" variant="primary" state="loading" />

<!-- 错误：不要用文本内容传 label -->
<rp-button>提交</rp-button>
```

## 幂等渲染

实现层在 `connectedCallback` 中设置 `dataset.rpReady = 'true'`，防止重复 DOM 生成。外部代码不需要关心这个细节。

## 空元素写法

快照原语通常没有子元素，推荐自闭合写法：

```xml
<rp-button label="确定" variant="primary" />
<rp-avatar size="32" initials="LY" />
```

## 元素完整列表

见 [`spec/elements/`](./elements/) 目录，按分类组织，每个元素一份规格文档。
