# Aigent 自动化官网模板

深色青绿 AI 工作流官网，包含首页、28 项集成目录、15 个流程配方、价格、博客、10 篇文章和联系页。中文默认，英文路径 /en。页面支持桌面、平板和手机。

首读 .tpl/README.md、.tpl/template.json、.tpl/project.json。Node 24.16.0、pnpm 9.15.4；无真实后端、数据库、消息发送或支付能力。所有示例指标和安全声明都是展示文案，不能视为实际服务承诺。

## 运行

pnpm install --frozen-lockfile
pnpm dev

默认地址 http://localhost:43720，环境变量 PORT 可覆盖。Ctrl+C 停止本次服务，不终止其他进程。生产预览先 pnpm build，再 pnpm start。构建与依赖安装使用本地 Linux 文件系统。

检查：pnpm run typecheck、pnpm run lint、pnpm test、pnpm build、pnpm tpl:check。bundle 从干净已提交源码生成共享运行包；完整源码通过 Git 交付。

修改入口见 .tpl/docs/CUSTOMIZATION.md。素材、参考来源和许可见 .tpl/docs/LICENSE.md 与 public/templates/aigentx/sources.json。未获得第三方设计及图片的商业再分发授权，listed=false。
