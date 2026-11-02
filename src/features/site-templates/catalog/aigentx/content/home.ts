import { text } from './common'
export const anatomy = [
 {title:text('触发','Trigger'),description:text('Webhook、计划任务或应用事件启动运行。','A webhook, schedule, or app event starts the run.'),tags:['webhook','cron · 1m']},
 {title:text('补充上下文','Enrich'),description:text('先从已有工具中获取上下文，再作决策。','Pull context from your stack before any decision is made.'),tags:['postgres','http fetch']},
 {title:text('决策','Decide'),description:text('按规则分支，或让带有护栏的模型作判断。','Branch on rules, or hand the call to a model with guardrails.'),tags:['if / else','gpt-5 · tools']},
 {title:text('执行','Act'),description:text('写回数据、通知相关人员，或启动下一个工作流。','Write back, notify a human, or start the next workflow.'),tags:['slack','retry ×3']},
]
export const live = [text('部署通过，团队已收到通知','Deploy passed, team notified'),text('问题已登记，文档已创建','Issue filed, doc created'),text('支付失败，财务已收到提醒','Payment failed, finance alerted'),text('合并请求通过，更新日志已生成','Pull request merged, changelog updated'),text('紧急对话已标记，工单已创建','Chat tagged urgent, ticket raised'),text('订单已创建，短信已发送','Order placed, SMS sent')]
export const liveReverse = [text('新联系人，线索已创建','New contact, lead created'),text('页面已编辑，摘要已发布','Page edited, summary posted'),text('查询已完成，流失评分已更新','Query finished, churn score updated'),text('退款已批准，款项已发出','Refund approved, payout issued'),text('费用已标记，正在等待审核','Expense flagged, sent for review'),text('回复已起草，客户已收到消息','Reply drafted, sent to customer')]
export const showcase = [
 {title:text('自动分流支持请求','Triage inbound support'),steps:4,apps:['slack','gpt-5','linear'],code:'slack.message > linear.issue.create'},
 {title:text('为新线索补全信息','Enrich every new lead'),steps:5,apps:['hubspot','gpt-5','salesforce'],code:'hubspot.contact > salesforce.lead'},
 {title:text('自动总结会议记录','Summarise call notes'),steps:3,apps:['notion','gpt-5','slack'],code:'notion.page > slack.message.post'},
 {title:text('识别高风险支付','Flag risky payments'),steps:4,apps:['stripe','gpt-5','slack'],code:'stripe.charge > slack.alert.send'},
 {title:text('起草版本更新说明','Draft release notes'),steps:4,apps:['github','gpt-5','notion'],code:'github.release > notion.page.create'},
 {title:text('分流退款请求','Route refund requests'),steps:5,apps:['shopify','gpt-5','twilio'],code:'shopify.order > twilio.sms.send'},
]
export const useCases = [
 {title:text('让每条线索都及时跟进','Never let a lead go cold.'),description:text('每次表单提交，都会自动补全信息、评分，并分配给合适的销售。','Every form fill is enriched, scored and routed to the right rep before the tab is even closed.'),metric:'4h to 90s',caption:text('首次响应','first response'),steps:[text('表单已提交','Form submitted'),text('信息已补全','Data enriched'),text('评分 87 / 100','Scored 87 of 100'),text('已分配给 Priya','Routed to Priya')],apps:['HUBSPOT · 0.2s','CLEARBIT · 0.6s','GPT-5 · 0.8s','SALESFORCE · 0.3s']},
 {title:text('让紧急问题先被看见','Get urgent tickets to the right human.'),description:text('自动识别紧急程度、补充客户背景，并把请求分配到正确的支持队列。','Classify urgency, enrich customer context, and route each ticket to the right queue.'),metric:'70%',caption:text('更短的解决时间','less resolution time'),steps:[text('工单已创建','Ticket received'),text('账户信息已补全','Account enriched'),text('紧急程度已识别','Urgency classified'),text('团队已收到提醒','Team notified')],apps:['ZENDESK · 0.2s','CRM · 0.4s','GPT-5 · 0.8s','SLACK · 0.3s']},
 {title:text('让每个想法更快成为内容','Turn a brief into something worth shipping.'),description:text('从创意开始，自动生成内容提纲、安排审核并同步发布计划。','Generate a brief, route it for review, and keep the publishing plan in sync.'),metric:'6×',caption:text('更快完成内容准备','faster content preparation'),steps:[text('主题已添加','Topic added'),text('背景资料已整理','Context gathered'),text('提纲已生成','Brief drafted'),text('等待人工审核','Ready for review')],apps:['NOTION · 0.2s','HTTP · 0.6s','GPT-5 · 0.8s','SLACK · 0.3s']},
 {title:text('发布完成，信息自然同步','Ship the release. Let the updates follow.'),description:text('代码合并后自动整理变更说明，同步问题状态并通知团队。','Draft release notes, update the linked issue, and notify your team when code ships.'),metric:'1.9s',caption:text('工作流运行时间','workflow runtime'),steps:[text('合并请求已通过','Pull request merged'),text('变更信息已读取','Changes enriched'),text('更新说明已生成','Release notes drafted'),text('更新日志已发布','Changelog published')],apps:['GITHUB · 0.2s','GIT · 0.6s','GPT-5 · 0.8s','NOTION · 0.3s']},
]
export const platform = [
 {image:'RIDTj3fmZeaLp1sbnqRl8IodmT8.png',title:text('多种模型，自由选择','Every model, no lock-in'),description:text('每一步都能切换提供方，工作流无需重建。','Swap providers per step. Your workflows do not change.')},
 {image:'seJqYzqrGTUbqUnyr2DEZ338vI.png',title:text('计划任务，自行运转','Schedules that run without you'),description:text('计划任务、Webhook 和应用事件，内置失败重试。','Cron, webhooks or app events, with retries built in.')},
 {image:'FRBnEf0IezYqbSzIIVFJacuXQQ.png',title:text('逐步观察每一次运行','Watch every run, step by step'),description:text('出现问题时，直接查看每一步收到的数据。','See the payload at each step when something breaks.')},
 {image:'sPeMrGaLwXZJtuorjDPaJkfXpPo.png',title:text('连接团队正在使用的工具','Connect what you already run'),description:text('340 多种原生连接器，也支持任何 HTTP 接口。','340 native connectors, plus any HTTP endpoint.')},
]
