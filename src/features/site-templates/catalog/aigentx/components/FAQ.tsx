'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { Localized } from '../content/common'
import type { TemplateLocale } from '../../../types'
export function FAQ({items,locale}:{items:Localized[][];locale:TemplateLocale}) {
 const [open,setOpen]=useState<number|null>(0)
 return <div className="ax-faq">{items.map(([q,a],i)=><section key={q.en}><h3><button aria-expanded={open===i} aria-controls={`ax-answer-${i}`} onClick={()=>setOpen(open===i?null:i)}>{q[locale]}<span aria-hidden>{open===i?'−':'+'}</span></button></h3><AnimatePresence initial={false}>{open===i&&<motion.div id={`ax-answer-${i}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}><p>{a[locale]}</p></motion.div>}</AnimatePresence></section>)}</div>
}
