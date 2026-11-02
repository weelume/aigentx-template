import type { SiteTemplate } from '../../types'
import { createElement } from 'react'
import articles from './content/articles.json'
import metadata from './metadata.json'
export const aigentxTemplate:SiteTemplate={
 ...metadata,
 screenshots:metadata.screenshots as SiteTemplate['screenshots'],
 surfaces:[{id:'site',name:'智能自动化官网',platform:'pc',locales:['zh','en'],pages:[
 {slug:'',title:'首页',localizedTitles:{en:'Home'},load:()=>import('./pages/HomePage')},
 {slug:'integrations',title:'应用集成',localizedTitles:{en:'Integrations'},load:()=>import('./pages/IntegrationsPage')},
 {slug:'recipes',title:'流程配方',localizedTitles:{en:'Recipes'},load:()=>import('./pages/RecipesPage')},
 {slug:'pricing',title:'价格方案',localizedTitles:{en:'Pricing'},load:()=>import('./pages/PricingPage')},
 {slug:'blog',title:'博客',localizedTitles:{en:'Blog'},load:()=>import('./pages/BlogPage')},
 {slug:'contact',title:'联系我们',localizedTitles:{en:'Contact'},load:()=>import('./pages/ContactPage')},
 ...articles.map(article=>({slug:'blog/'+article.slug,title:article.title.zh,localizedTitles:{en:article.title.en},load:async()=>{const {default:Article}=await import('./pages/ArticlePage');return {default:(props:import('../../types').SiteTemplatePageProps)=>createElement(Article,{...props,slug:article.slug})}}})),
 ]}],
}
