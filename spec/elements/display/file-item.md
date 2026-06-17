## `file-item`

**分类**：display

**用途**：`file-list` 的子元素，单个文件条目。根据扩展名显示图标，按 `state` 显示大小 / 上传进度 / 失败。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | string | `document.pdf` | 文件名（决定图标） |
| `size` | string | — | 大小文本，如 `1.2 MB` |
| `state` | enum | `uploaded` | `uploaded`、`uploading`、`error` |
| `progress` | number | `60` | 上传进度百分比（`uploading` 时生效） |

## 嵌套规则

- 允许的父元素：`file-list`
- 允许的子元素：无（自闭合）

## 示例

```html
<file-item name="方案.pdf" size="1.2 MB"></file-item>
<file-item name="截图.png" size="480 KB" state="uploading" progress="60"></file-item>
<file-item name="数据.xlsx" state="error"></file-item>
```

## ARIA 语义参考

`listitem`
