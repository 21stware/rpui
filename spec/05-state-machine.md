# 05 — 状态机声明规范

RPML 不运行状态机，它**把状态机展开为空间**。每个状态都显式呈现，不依赖运行时跳转。

## 声明方式

用 `<enum>` + `<enum-item>` 表达互斥状态集合：

```xml
<annotation label="搜索框状态">
  <enum>
    <enum-item label="默认" description="显示 placeholder，无输入" />
    <enum-item label="聚焦" description="高亮边框，历史搜索下拉展开" />
    <enum-item label="filled" description="有输入值，显示清空按钮" />
    <enum-item label="无结果" description="显示空状态插图 + 清空建议" />
  </enum>
</annotation>
```

## 异步状态的标准集合

对于任何从服务端加载数据的区域，至少覆盖：

| 状态 | 触发条件 |
|------|----------|
| loading | 请求发出，响应未返回 |
| loaded | 正常数据，信息密度高的代表帧 |
| empty | 数据为空（首次使用 / 筛选后无结果） |
| error | 网络错误 / 服务端 5xx，含重试入口 |
| partial | 部分数据加载失败（如表格某列数据源不可用） |

## 状态组合

当两个轴相交时，枚举乘积：

```xml
<!-- 行状态 × 选中状态 -->
<enum>
  <enum-item label="默认·未选" description="..." />
  <enum-item label="默认·已选" description="复选框勾选，行高亮" />
  <enum-item label="已读·未选" description="字体色变浅" />
  <enum-item label="逾期·未选" description="截止日期红色警示" />
  <enum-item label="逾期·已选" description="红色警示 + 行高亮叠加" />
</enum>
```

删去不可能的组合，保留所有有差异呈现的组合。

## 在快照中选择代表态

主快照应选择**信息密度最高的代表态**：有数据、有选中、有展开的面板、激活的筛选。不选空态或 loading 态作为主快照（把它们放进 `enum`）。
