# 元素定义模板

每个元素规格文档遵循此结构。

---

## `rp-元素名`

**分类**：structural / navigation / display / input / action / overlay / feedback / annotation

**用途**：一句话说明这个元素表达什么 UI 概念。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `attr-name` | string / enum / number / boolean / csv | — | 说明 |

## 嵌套规则

- 允许的父元素：`tag-name`
- 允许的子元素：`tag-name`，或无子元素（自闭合）

## 状态

列出 `state` 属性的合法值（如有）：

| 值 | 说明 |
|----|------|
| `default` | 默认态 |

## 示例

```xml
<rp-元素名 attr="value" />
```

## ARIA 语义参考

对应的 WAI-ARIA 角色 / 属性，供注释作者描述可访问性意图。
