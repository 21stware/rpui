## `rp-modal`

**分类**：overlay

**用途**：模态对话框，始终在注释枚举中展示，不放在主快照中。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 对话框标题 |
| `size` | enum | `md` | 宽度预设：`sm`、`md`、`lg`、`xl` |
| `state` | enum | `open` | `open`（展示内容）或 `closed`（仅供文档） |
| `has-footer` | boolean | — | 存在时显示底部按钮区 |

## 嵌套规则

- 允许的父元素：`rp-enum-item`（在注释中展示）
- 允许的子元素：任意 `rp-*` 元素

## 示例

```html
<!-- 在注释枚举中展示，不在主快照 -->
<rp-enum-item label="新建用户弹窗">
  <rp-modal title="新建用户" size="md" has-footer>
    <rp-form layout="vertical">
      <rp-form-item label="姓名" required><rp-input placeholder="请输入姓名"></rp-input></rp-form-item>
    </rp-form>
  </rp-modal>
</rp-enum-item>
```

## ARIA 语义参考

`dialog`；`aria-modal="true"`；`aria-labelledby` 指向标题
