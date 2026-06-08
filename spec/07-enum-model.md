# 07 — 枚举分支声明规范

## 基础用法

`<enum-el>` 是水平排列的状态卡片容器，每个 `<enum-item>` 表示一个互斥状态。

```xml
<enum-el>
  <enum-item label="待审核" description="提交后默认态，高亮黄色标签" />
  <enum-item label="审核中" description="审核员已认领，标签变蓝" />
  <enum-item label="已通过" description="绿色标签，操作区只保留归档按钮" />
  <enum-item label="已拒绝" description="红色标签，显示拒绝原因折叠块" />
</enum-el>
```

## 自动编号

运行时为每个 `enum-item` 添加黑色方块索引徽章（1、2、3…），注释文字可引用"状态 2"。

## 覆盖矩阵方法

对于多维度交叉场景，先建矩阵再删除不可能组合：

```
状态轴: 待办 / 进行中 / 已完成 / 逾期
选中轴: 未选 / 已选

→ 保留有视觉差异的组合（逾期+已选 vs 逾期+未选 不同），
  删除无差异组合（已完成+已选 与 已完成+未选 若样式相同则合并）
```

## description 属性

`description` 是 `enum-item` 的可选短注释，适合写**触发条件或渲染规则**，不适合长段落（长段落改用嵌套注释）。

## 嵌套位置

`<enum-el>` 可以放在：
- 顶级 `<annotation-el>` 体内（描述该区域的整体状态族）
- 嵌套 `<annotation-el>` 体内（描述子元素的状态族）

不要把 `<enum-el>` 放在 `<main-view>` 内。
