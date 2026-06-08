# 10 — 语言版本策略

## 当前版本

**RPML 1.0** — 与 RPUI `@bracken/rpui` v0.x 对齐。

## 版本标识

`.rpml` 文件不需要显式声明版本（渲染器透明处理兼容性）。  
XSD 命名空间：`https://rpml.dev/schema/1.0`

## 演进规则

| 变更类型 | 版本策略 |
|----------|----------|
| 新增元素或属性 | Patch（向后兼容，旧文件不受影响） |
| 修改属性语义（兼容） | Minor |
| 删除元素/属性、破坏性语义变更 | Major（新 spec 版本，旧文件显示兼容警告） |

## 语言与渲染器解耦

RPML 语言只使用简洁的裸标签名（`page`、`view`、`button`、`navigator` 等）。解析器在解析时把这些语言标签映射为渲染器实际注册的 Web Components 标签名（如 `page-el`、`main-view`）——后者是实现细节，**不是**受支持的书写语法。早期草案曾直接书写带 `-el` 后缀或 `rp-`/`proto-`/`snap-` 前缀的标签名；这些写法已不再是合法的 RPML，新文档一律使用裸标签名。

## 渲染器版本关系

```
RPML spec 1.x  →  @bracken/rpui 0.x / 1.x
RPML spec 2.0  →  @bracken/rpui 2.x（破坏性版本独立发布）
```
