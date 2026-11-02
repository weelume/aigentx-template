'use client'
import { useState } from 'react'
import { text } from '../content/common'
import type { TemplateLocale } from '../../../types'
export function Ticker({items,label,reverse=false,locale}:{items:string[];label?:string;reverse?:boolean;locale:TemplateLocale}) {
 const [paused,setPaused]=useState(false)
 return <div className="ax-ticker-wrap">{label&&<div className="ax-live"><i/>{label}<button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?text('继续','Play')[locale]:text('暂停','Pause')[locale]}</button></div>}<div className="ax-ticker" role="region" aria-label={label??text('动态信息流','Live activity')[locale]} tabIndex={0}><div className={`ax-ticker-track ${reverse?'ax-reverse':''}`} style={{animationPlayState:paused?'paused':undefined}}>{[0,1].map(copy=><div className="ax-ticker-copy" key={copy} aria-hidden={copy===1}>{items.map((item,i)=><span className="ax-glass" key={i}><i/>{item}</span>)}</div>)}</div></div></div>
}
