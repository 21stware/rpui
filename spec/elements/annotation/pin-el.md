## Pin 系统（`data-pin`）

**分类**：annotation

**注意**：Pin 不是一个组件，`data-pin` 是一个可加在任意 `rp-*` 元素上的 HTML 属性。运行时自动渲染水滴标记，作者不得手动写 Pin DOM。

## 用法

在 `main-view` 内任意有意义的区域元素上添加 `data-pin="N"`：

- N 从 1 开始，不留空位，按视觉从上到下、从左到右编号。
- 每个 `data-pin="N"` 必须有一个对应的顶层 `<annotation-el id="N" label="...">` 放在 `page-el` 内。

## 规则摘要

| 规则 | 说明 |
|------|------|
| 从 1 开始 | 第一个 pin 为 `data-pin="1"` |
| 不留空位 | 不得跳号，如 1、2、4 |
| 必须有对应注释 | `data-pin="3"` → `<annotation-el id="3">` |
| 不手写 Pin DOM | 运行时负责渲染水滴图标 |
| 仅在 `main-view` 内 | 注释面板中的元素不加 `data-pin` |

## 示例

```html
<main-view device="web" scale="0.65">
  <viewport-el device="web">
    <navbar-el height="64" data-pin="1">...</navbar-el>
    <table-el rows="8" columns="姓名,邮箱,状态" data-pin="2"></table-el>
  </viewport-el>
</main-view>

<annotation-el id="1" label="顶部导航">...</annotation-el>
<annotation-el id="2" label="用户列表">...</annotation-el>
```

## 深链接

运行时将每个顶层注释挂载到 `?section=N`，嵌套注释挂载到 `?section=N-M-K`（最多 3–5 层）。点击 Pin 或注释标题会更新 URL 并高亮对应注释。
