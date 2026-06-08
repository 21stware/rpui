# 03 — 元素模型

## 元素分类

| 分类 | 标签 | 说明 |
|------|------|------|
| 画布元素 | `page` / `view` / `annotation` / `enum` | 文档结构骨架 |
| 快照原语 | 其余裸标签（如 `button`、`table`、`card`） | 静态 UI 积木 |

## 标签命名

RPML 使用简洁的裸标签名，没有前缀。单词标签直接使用名称本身（`button`、`table`、`logo`）；复合名称保留连字符（`list-item`、`table-row`、`enum-item`）；平台原语使用 `ios-*` / `macos-*` 前缀。

## 属性驱动

RPML 元素通过 HTML 属性传递所有显示状态，不接受子文本作为数据（注释块除外）。

```xml
<!-- 正确 -->
<button label="提交" variant="primary" state="loading" />

<!-- 错误：不要用文本内容传 label -->
<button>提交</button>
```

## 幂等渲染

实现层在 `connectedCallback` 中设置 `dataset.rpReady = 'true'`，防止重复 DOM 生成。外部代码不需要关心这个细节。

## 空元素写法

快照原语通常没有子元素，推荐自闭合写法：

```xml
<button label="确定" variant="primary" />
<avatar size="32" initials="LY" />
```

## 元素完整列表

见 [`spec/elements/`](./elements/) 目录，按分类组织，每个元素一份规格文档。
