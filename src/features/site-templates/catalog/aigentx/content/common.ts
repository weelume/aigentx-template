export type Localized = { zh: string; en: string }
export const text = (zh: string, en: string): Localized => ({ zh, en })
export const navigation = [
  { slug: 'integrations', label: text('应用集成', 'Integrations') }, { slug: 'recipes', label: text('流程配方', 'Recipes') },
  { slug: 'pricing', label: text('价格方案', 'Pricing') }, { slug: 'blog', label: text('博客', 'Blog') },
]
export const headings = {
  integrations: { label: text('应用集成目录', 'Integrations Directory'), title: text('团队信赖的每个工具\n现在都能连接', 'Every tool your team already trusts, wired in.'), description: text('300 多种原生连接器，提供明确类型的触发器和操作。搜索、筛选，几分钟即可连接。', '300+ native connectors, each with typed triggers and actions. Search, filter, and connect in minutes.') },
  recipes: { label: text('流程配方库', 'Recipes Library'), title: text('已经有人搭好的自动化\n直接从这里开始', 'Automations someone already built. Copy them in.'), description: text('覆盖销售、支持、营销、工程、运营和财务的现成配方。几分钟即可适配你的团队。', 'Ready-made recipes across sales, support, marketing, engineering, ops, and finance. Adapt in minutes, not days.') },
  pricing: { label: text('价格方案', 'Pricing'), title: text('只为真正运行的任务付费', 'Pay for what actually runs.'), description: text('按工作流用量灵活扩展，无论团队人数多少，始终不收席位费。', 'Usage-based tiers that scale with your workflows, not your headcount. No seat fees, ever.') },
  blog: { label: text('博客', 'Blog'), title: text('关于构建可靠自动化\n我们的一些实践', 'Notes on building automation that holds up.'), description: text('产品更新、工程深度解析，以及团队将自动化投入实际运行的故事。', 'Product updates, engineering deep dives, and stories from teams running Aigent in production.') },
  contact: { label: text('联系我们', 'Contact'), title: text('一起连接你的第一个工作流', "Let's wire up your first workflow."), description: text('与销售预约演示，或直接向支持团队提问。工作时间平均首次回复少于 4 小时。', 'Book a demo with sales, or get a straight answer from support. Average first reply under 4 business hours.') },
}
export const start = text('免费开始构建', 'Start building free')
export const all = text('全部', 'All')
export const teams = [text('销售','Sales'),text('支持','Support'),text('营销','Marketing'),text('工程','Engineering'),text('运营','Operations'),text('财务','Finance')]
export const pricingFaq = [
  [text('按席位收费吗？','Do you charge per seat?'),text('不收。价格取决于工作流运行次数，而非团队人数。','No. Pricing is based on workflow runs, not the number of people on your team.')],
  [text('什么算一次运行？','What counts as a run?'),text('工作流从触发开始，到最后一个操作结束，计为一次运行。重试包含在本次运行中。','One run is a workflow from its trigger to its final action. Retries are included in that run.')],
  [text('随时可以变更方案吗？','Can I change plans anytime?'),text('可以。你可以随用量调整方案，没有长期绑定。','Yes. Change your plan as your volume changes, without a long-term commitment.')],
  [text('超出运行额度会怎样？','What happens if I go over my run limit?'),text('接近额度时会收到提示，你可以调整用量或升级方案。','You are notified as you approach your limit so you can manage usage or upgrade.')],
  [text('可以免费试用吗？','Do you offer a free trial?'),text('可以从 Starter 免费方案开始，无需信用卡。','Start with the free Starter plan. No credit card required.')],
  [text('按年付费有优惠吗？','Is there a discount for annual billing?'),text('联系销售团队，了解适合你用量的年度方案。','Contact sales to discuss annual billing for your volume.')],
]
export const contactFaq = [
  [text('你们实际多久回复？','How fast do you actually reply?'),text('支持请求在工作时间平均 4 小时内回复，通常更快。演示请求一般当天收到预约入口。','Under 4 business hours for support, usually much sooner. Sales demo requests get a calendar link within the same day.')],
  [text('提供入门指导吗？','Do you offer onboarding help?'),text('可以。我们会和你一起梳理触发器、操作和第一个工作流。','Yes. We can help map your triggers, actions, and first workflow.')],
  [text('可以申请新功能或集成吗？','Can I request a feature or integration?'),text('可以在支持面板说明你的工具和场景，帮助团队评估需求。','Describe your tool and use case in the support panel so the team can scope it.')],
  [text('联系销售前能免费试用吗？','Is there a free trial before I talk to sales?'),text('可以先体验免费方案，再根据实际用量讨论。','Start free and discuss your needs once you know your volume.')],
  [text('故障或事件应联系哪里？','Where do I go for an outage or incident?'),text('请在支持面板描述发生时间、运行编号和影响范围。此模板仅作本地演示，不会发送消息。','Describe the time, run ID, and impact in the support panel. This template is a local demo and does not send messages.')],
]
