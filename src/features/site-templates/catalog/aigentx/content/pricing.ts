import { text } from './common'
export const plans=[
 {name:'Starter',price:'$0',runs:'1,000',description:text('适合探索自动化的独立构建者','For solo builders testing the waters.'),features:[text('每月 1,000 次运行','1,000 runs / month'),text('3 个活跃工作流','3 active workflows'),text('社区支持','Community support'),text('核心集成','Core integrations')]},
 {name:'Growth',price:'$79',runs:'10,000',description:text('适合将工作流投入生产的团队','For teams running production workflows.'),features:[text('每月 10,000 次运行','10,000 runs / month'),text('不限工作流数量','Unlimited workflows'),text('优先支持','Priority support'),text('包含单点登录','SSO included')]},
 {name:'Scale',price:'$249',runs:'50,000',description:text('适合有更高运行用量的团队','For teams with serious volume.'),features:[text('每月 50,000 次运行','50,000 runs / month'),text('专属支持','Dedicated support'),text('SOC 2 报告访问','SOC 2 report access'),text('数据驻留选项','Data residency options')]},
]
export const comparison=[
 {label:text('每月运行次数','Runs per month'),values:['1,000','10,000','50,000']},
 {label:text('活跃工作流','Active workflows'),values:['3',text('不限','Unlimited'),text('不限','Unlimited')]},
 {label:text('支持方式','Support'),values:[text('社区','Community'),text('优先','Priority'),text('专属','Dedicated')]},
 {label:text('单点登录','Single sign-on'),values:['—','✓','✓']},
 {label:text('SOC 2 报告访问','SOC 2 report access'),values:['—','—','✓']},
 {label:text('数据驻留选项','Data residency options'),values:['—','—','✓']},
]
