# 06 — 权限模型

## 核心思路

RPML 通过**注释文字 + rp-permission-gate + rp-enum** 组合描述权限差异，不通过条件渲染实现。

## rp-permission-gate

```xml
<rp-permission-gate role="admin" label="仅管理员可见">
  <rp-button label="删除项目" variant="danger" />
</rp-permission-gate>
```

| 属性 | 说明 |
|------|------|
| `role` | 允许访问的角色标识（字符串，可以是任意 domain 定义的值） |
| `label` | 权限说明文字，渲染为视觉提示框 |

## 权限 × 状态矩阵

当权限与状态组合时，用 `rp-enum` 穷举乘积：

```xml
<rp-annotation label="操作按钮区权限矩阵">
  <rp-enum>
    <rp-enum-item label="管理员·进行中" description="显示编辑、转移、删除" />
    <rp-enum-item label="管理员·已完成" description="只显示归档" />
    <rp-enum-item label="成员·进行中" description="只显示编辑，无删除" />
    <rp-enum-item label="成员·已完成" description="只读，无操作按钮" />
    <rp-enum-item label="访客" description="全部按钮隐藏" />
  </rp-enum>
</rp-annotation>
```

## 最佳实践

1. 在注释中明确列出角色名称（不用"有权限用户"这类模糊描述）
2. 对每个权限差异点单独建一个 `rp-enum`
3. 主快照选取权限最高的角色视角（通常是管理员），其他角色差异在枚举中说明
