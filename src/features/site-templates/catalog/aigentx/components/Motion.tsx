'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}) {
  const reduced=useReducedMotion()
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:28,filter:'blur(5px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:0.12}} transition={{duration:0.7,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div>
}
export function ScrollWords({words}:{words:string[]}) {
  const ref=useRef<HTMLParagraphElement>(null),reduced=useReducedMotion()
  const {scrollYProgress}=useScroll({target:ref,offset:['start 85%','end 40%']})
  return <p ref={ref} className="ax-manifesto">{words.map((word,index)=><Word key={`${index}-${word}`} progress={scrollYProgress} range={[index/words.length,(index+1)/words.length]} reduced={!!reduced}>{word}</Word>)}</p>
}
function Word({children,progress,range,reduced}:{children:string;progress:ReturnType<typeof useScroll>['scrollYProgress'];range:number[];reduced:boolean}) {
  const opacity=useTransform(progress,range,[0.18,1])
  return <motion.span style={{opacity:reduced?1:opacity}}>{children} </motion.span>
}
