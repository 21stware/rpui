# Examples

每个 `.rpml` 文件可在站点 Playground 中加载（`bun run site` 后打开 `docs/playground.html`），或直接用 `bun packages/validator/src/cli.ts <file>` 验证。

| 文件 | 复杂度 | 说明 |
|------|--------|------|
| [01-minimal.rpml](./01-minimal.rpml) | 入门 | 最小合法文件 |
| [02-form-page.rpml](./02-form-page.rpml) | 低 | 注册表单，客户端验证 |
| [03-list-with-filter.rpml](./03-list-with-filter.rpml) | 中 | 商品列表 + 多维筛选 |
| [04-ticket-desk.rpml](./04-ticket-desk.rpml) | 高 | 工单服务台（黄金范例） |
| [05-dashboard.rpml](./05-dashboard.rpml) | 中高 | 运营数据看板 |
| [06-multi-step-wizard.rpml](./06-multi-step-wizard.rpml) | 中 | 四步向导 |
| [07-task-management.rpml](./07-task-management.rpml) | 高 | 任务管理看板（原 demo/index.html）；`annotation-global` 承载权限矩阵 |
| [08-mobile-chat.rpml](./08-mobile-chat.rpml) | 中 | 移动端即时消息（原 demo/showcase.html） |
| [09-checkout-flow/](./09-checkout-flow/) | 中 | 两屏结算流程；`anchor` 跨页跳转 + `diagram` 流程图 + `annotation-global` 流程总览 |
| [10-doc-mode.rpml](./10-doc-mode.rpml) | 入门 | 文档模式（`mode="doc"`）：单栏自上而下的内容流，无 view / pin / 注释栏 |

## 打开方式

```
docs/playground.html?rpml=examples/04-ticket-desk.rpml
```
