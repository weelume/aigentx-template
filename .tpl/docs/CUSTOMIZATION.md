# 修改指南

品牌：修改 config/brand.ts 的双语名称、Logo 和年份。内容：修改 content/common.ts、home.ts、pricing.ts、integrations.ts、recipes.json、articles.json，保持语言结构配对。注意首页任务计费演示与价格页的金额、额度是参考站两套不同展示。

主题：tokens.css 集中调整颜色、字体、字号、容器、圆角和滚动条；theme.css 管布局与响应式。不要另写页面级颜色副本。字体使用 MiSans 400/700、Poppins 400/600/700，本地许可在字体目录。

动效：ParticleOrb.tsx 管聚拢、旋转、滚动散开、点击与视差；Motion.tsx 管入场与逐词滚动；Ticker.tsx 管循环与暂停；HomeInteractive.tsx 管用例与滑块。新增页面需同时更新 meta.ts、metadata.json 和 .tpl/template.json。

表单保持本地演示。若接入真实服务，需要明确数据合同、错误语义、安全要求和测试，不得静默发送。修改后按 project.json 执行适用检查。
