## `file-list`

**分类**：display

**用途**：文件附件列表容器。放入 `<file-item>` 子元素，或用 `items` 自动生成占位文件。用于邮件附件、工单附件、上传区已完成列表等。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | number | — | 无 `<file-item>` 子元素时自动生成的条数 |

## 嵌套规则

- 允许的父元素：`panel`、`viewport`、任意 RPML 容器
- 允许的子元素：`file-item`

## 示例

```html
<file-list items="3"></file-list>
<file-list>
  <file-item name="方案.pdf" size="1.2 MB"></file-item>
  <file-item name="截图.png" size="480 KB" state="uploading" progress="60"></file-item>
  <file-item name="数据.xlsx" state="error"></file-item>
</file-list>
```

## ARIA 语义参考

`list`
