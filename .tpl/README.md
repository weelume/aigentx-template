# 模板固定入口

先阅读 template.json 与 project.json，再阅读 docs/ARCHITECTURE.md、docs/CUSTOMIZATION.md、docs/VERIFICATION.md 和 docs/LICENSE.md。

这是可运行的 React / Next.js 双语响应式官网，无需数据库或外部服务。含 16 个页面、实时 Canvas 粒子、滚动散开、点击扰动、指针视差、滚动逐词点亮、双向信息流、流程光束、用例切换、用量滑块、目录筛选、FAQ 及本地演示表单。

Node 和 pnpm 精确版本以 .nvmrc / package.json 为准。先 pnpm install --frozen-lockfile，再 pnpm dev；默认 http://localhost:43720，英文 /en。Ctrl+C 停止服务。环境变量仅 PORT，无秘密。生产 pnpm build 后 pnpm start；测试命令与副作用合同见 project.json。

读取资料不授权执行、安装、发送或发布。该工程未包含真实工作流平台服务，任何计费、认证和性能数据都为参考模板展示。第三方设计与素材权利见许可资料。
