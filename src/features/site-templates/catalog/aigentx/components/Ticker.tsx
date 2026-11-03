'use client'
import { useState } from 'react'
import { text } from '../content/common'
import type { TemplateLocale } from '../../../types'
import { AppIcon } from './HomeVisuals'
export function Ticker({items,label,reverse=false,locale,icons}:{items:string[];label?:string;reverse?:boolean;locale:TemplateLocale;icons?:string[]}) {
 const [paused,setPaused]=useState(false)
 return <div className="ax-ticker-wrap">{label&&<div className="ax-live"><i/>{label}<button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?text('继续','Play')[locale]:text('暂停','Pause')[locale]}</button></div>}<div className="ax-ticker" role="region" aria-label={label??text('动态信息流','Live activity')[locale]} tabIndex={0}><div className={`ax-ticker-track ${reverse?'ax-reverse':''}`} style={{animationPlayState:paused?'paused':undefined}}>{[0,1].map(copy=><div className="ax-ticker-copy" key={copy} aria-hidden={copy===1}>{items.map((item,i)=><span className="ax-glass" key={i}><i/>{icons&&<AppIcon name={icons[i]}/>}<span>{icons?item.split(' · ')[0]:item}</span>{icons&&item.includes(' · ')&&<small>{item.split(' · ').slice(1).join(' · ')} {text('前','ago')[locale]}</small>}</span>)}</div>)}</div></div></div>
}
