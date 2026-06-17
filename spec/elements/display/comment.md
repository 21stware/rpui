## `comment`

**分类**：display

**用途**：评论 / 讨论条目。带作者、头像、时间头，正文为子内容插槽；可嵌套形成楼层讨论串。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `author` | string | `用户` | 作者名 |
| `avatar` | string | 作者首字 | 头像缩写 |
| `time` | string | — | 时间文本 |
| `state` | enum | `default` | `me` 标记当前用户评论（主色高亮） |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、任意 RPML 容器、`comment`（形成讨论串）
- 允许的子元素：正文文本、任意 RPML 原语、`comment`（嵌套回复）

## 示例

```html
<comment author="张三" avatar="张" time="2 小时前">
  这块按钮在无权限时应隐藏而非置灰，请确认。
  <comment author="李四" avatar="李" time="1 小时前">
    已确认，按角色矩阵隐藏。
  </comment>
</comment>
```

## ARIA 语义参考

`article`（一条评论）；嵌套表示回复楼层
