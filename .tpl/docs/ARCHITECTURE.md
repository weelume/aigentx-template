# 架构

src/app/[[...slug]]/page.tsx 选择页面与语言，不承载业务。src/features/site-templates/catalog/aigentx 是功能模块：config/ 管品牌；content/ 管双语与可编辑集合；tokens.css 管主题；components/ 管粒子、信息流、FAQ、目录等通用交互；pages/ 组合页面；meta.ts 注册页面；routing.ts 保留语言切换的页面、查询和锚点。

host.tsx 仅定义通用品牌、图标、附加入口及备案注入接口。独立运行无需宿主。运行图片和字体在 public/templates/aigentx，展示截图位于 .tpl/assets。

Canvas 在卸载时清理动画帧与监听，离屏和后台暂停，减少动态效果时显示稳定终态。目录不请求外部 API；表单通过浏览器原生约束校验并显示未发送、未保存，不记录输入正文或邮箱。整页滚动条仅在当前模板挂载期间设置。
