'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import type { TemplateLocale } from '../../../types'
import { useAigentxHost } from '../host'
import { brand } from '../config/brand'
import { navigation, start, text } from '../content/common'
import '../theme.css'
import { hrefFor, alternateHref } from '../routing'
export { hrefFor } from '../routing'
export type PageContext = { locale: TemplateLocale; basePath: string }
export function ButtonLink({children,slug='contact',locale,basePath}:{children?:ReactNode;slug?:string}&PageContext) { return <Link className="ax-button" href={hrefFor(basePath,locale,slug)}>{children??start[locale]}</Link> }
export function SectionTitle({label,title,description}:{label:string;title:string;description?:string}) {return <div className="ax-section-title"><div><span className="ax-eyebrow">{label}</span><h2>{title}</h2></div>{description&&<p>{description}</p>}</div>}
export function PageHero({label,title,description}:{label:string;title:string;description:string}) {return <header className="ax-page-hero"><SectionTitle label={label} title={title} description={description}/></header>}
export function CTA({locale,basePath,title,description}:PageContext&{title?:string;description?:string}) {return <section className="ax-cta ax-cross"><span className="ax-core-mark" aria-hidden>✣</span><h2>{title??text('最后一步，交给你','You are the last step.')[locale]}</h2><p>{description??text('从一个配方开始，连接你的工具，让工作流自行运转。无需信用卡。','Fork a recipe, point it at your stack, and let the runs start. No card needed until you cross 10,000 tasks.')[locale]}</p><ButtonLink locale={locale} basePath={basePath}/></section>}
export function Shell({children,locale,basePath}:PageContext&{children:ReactNode}) {
  const host=useAigentxHost(),pathname=usePathname(),router=useRouter(),[open,setOpen]=useState(false)
  const brandName=host.brandName??brand.name,logo=host.lightLogoSrc??brand.logo
  useEffect(()=>{
    const root=document.documentElement,previous=root.dataset.scrollBehavior
    root.dataset.aigentx='true';root.dataset.scrollBehavior='smooth'
    return()=>{delete root.dataset.aigentx;if(previous===undefined)delete root.dataset.scrollBehavior;else root.dataset.scrollBehavior=previous}
  },[])
  useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',key);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key)}},[open])
  const changeLanguage=()=>{
    return alternateHref(basePath,locale,window.location.pathname,window.location.search,window.location.hash)
  }
  const languageHref=alternateHref(basePath,locale,pathname)
  return <MotionConfig reducedMotion="user"><div className="ax" lang={locale==='zh'?'zh-CN':'en'}>
    <a className="ax-skip" href="#ax-content">{text('跳至正文','Skip to content')[locale]}</a>
    <nav className="ax-nav ax-glass" aria-label={text('主导航','Main navigation')[locale]}>
      <Link className="ax-brand" href={hrefFor(basePath,locale)}><img src={logo} width="28" height="28" alt=""/>{brandName[locale]}</Link>
      <div className="ax-nav-links">{navigation.map(item=><Link key={item.slug} aria-current={pathname.endsWith('/'+item.slug)?'page':undefined} href={hrefFor(basePath,locale,item.slug)}>{item.label[locale]}</Link>)}</div>
      <div className="ax-nav-actions"><Link className="ax-language" href={languageHref} onClick={event=>{event.preventDefault();router.push(changeLanguage());setOpen(false)}} aria-label={text('切换到英文','Switch to Chinese')[locale]}>{locale==='zh'?'EN':'中'}</Link><span className="ax-nav-cta"><ButtonLink locale={locale} basePath={basePath}/></span><button className="ax-menu-toggle" aria-label={text('切换导航菜单','Toggle navigation menu')[locale]} aria-expanded={open} aria-controls="ax-mobile-menu" onClick={()=>setOpen(!open)}>{open?'×':'☰'}</button></div>
    </nav>
    <AnimatePresence>{open&&<motion.div id="ax-mobile-menu" className="ax-mobile-menu" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.25}}><nav aria-label={text('移动导航','Mobile navigation')[locale]}>{navigation.map(item=><Link key={item.slug} href={hrefFor(basePath,locale,item.slug)} onClick={()=>setOpen(false)}>{item.label[locale]}</Link>)}<Link href={hrefFor(basePath,locale,'contact')} onClick={()=>setOpen(false)}>{start[locale]}</Link></nav></motion.div>}</AnimatePresence>
    <main id="ax-content" className="ax-main"><motion.div key={pathname} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>{children}</motion.div></main>
    <footer className="ax-footer ax-container"><div className="ax-footer-grid"><div><Link className="ax-brand" href={hrefFor(basePath,locale)}><img src={logo} width="28" height="28" alt=""/>{brandName[locale]}</Link><p>{text('让智能工作流从想法走向可靠运行','The workflow automation platform for teams shipping AI agents to production, not just prototypes.')[locale]}</p></div><div><span>{text('产品','Product')[locale]}</span>{[{slug:'',label:text('首页','Home')},...navigation].map(item=><Link key={item.slug} href={hrefFor(basePath,locale,item.slug)}>{item.label[locale]}</Link>)}</div><div><span>{text('资源','Resources')[locale]}</span><Link href={hrefFor(basePath,locale,'contact')}>{text('联系','Contact')[locale]}</Link><Link href={hrefFor(basePath,locale)+'#trust'}>{text('安全','Security')[locale]}</Link><Link href={hrefFor(basePath,locale,'pricing')+'#faq'}>FAQ</Link>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}</div><div><span>{text('开始构建','Get started')[locale]}</span><ButtonLink locale={locale} basePath={basePath}/></div></div><div className="ax-footer-bottom"><small>© {brand.year} {brandName[locale]}. {text('保留所有权利','All rights reserved.')[locale]}</small>{host.filing}</div></footer>
    {host.marketplaceHref&&<Link className="ax-market" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]}><img src={logo} alt="" width="24" height="24"/><span>{brandName[locale]}</span></Link>}
  </div></MotionConfig>
}
