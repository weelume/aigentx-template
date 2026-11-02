'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
/** 使用确定性球面采样绘制粒子；不加载外部动画引擎，离屏与后台暂停。 */
export function ParticleOrb() {
  const ref=useRef<HTMLCanvasElement>(null),reduced=useReducedMotion()
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return
    const ctx=canvas.getContext('2d');if(!ctx){console.error('[aigentx:orb] Canvas 2D unavailable');return}
    let frame=0,visible=true,time=0,last=0,width=600,height=600,ratio=1,scatter=0,pointerX=0,pointerY=0,targetX=0,targetY=0
    const count=window.innerWidth<768?2250:4500
    const random=(i:number)=>{const v=Math.sin(i*127.1+7)*43758.5453;return v-Math.floor(v)}
    const points=Array.from({length:count},(_,i)=>{const y=1-2*random(i+1),r=Math.sqrt(1-y*y),a=random(i+count)*Math.PI*2;return{x:Math.cos(a)*r,y,z:Math.sin(a)*r,seed:(i*0.61803398875)%1}})
    const bursts:{x:number;y:number;time:number}[]=[]
    const pointer=(event:PointerEvent)=>{const rect=canvas.getBoundingClientRect();targetX=(event.clientX-rect.left-rect.width/2)/(rect.width/2);targetY=(event.clientY-rect.top-rect.height/2)/(rect.height/2)}
    const burst=(event:PointerEvent)=>{if(reduced)return;const rect=canvas.getBoundingClientRect(),x=(event.clientX-rect.left-rect.width/2)/rect.width,y=(event.clientY-rect.top-rect.height/2)/rect.height;if(x*x+y*y<.16){bursts.push({x,y,time});if(bursts.length>3)bursts.shift();console.debug('[aigentx:orb] pointer burst',{active:bursts.length})}}
    window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('pointerdown',burst,{passive:true})
    const glyph=document.createElement('canvas');glyph.width=260;glyph.height=160
    const gc=glyph.getContext('2d');const letters:{x:number;y:number;seed:number}[]=[]
    if(gc){gc.font='700 118px Arial';gc.fillStyle='#fff';gc.textAlign='center';gc.fillText('AI',130,119);const data=gc.getImageData(0,0,260,160).data;for(let y=0;y<160;y+=3)for(let x=0;x<260;x+=3)if(data[(y*260+x)*4+3]>80)letters.push({x:(x-130)/260,y:(y-80)/260,seed:((x*31+y*17)%101)/101})}
    const resize=new ResizeObserver(entries=>{const rect=entries[0].contentRect;width=rect.width;height=rect.height;ratio=Math.min(devicePixelRatio,2);canvas.width=width*ratio;canvas.height=height*ratio;if(reduced)draw(performance.now())})
    resize.observe(canvas)
    function draw(now:number){
      if(!ctx||!canvas)return
      if(visible&&!document.hidden){if(last)time+=Math.min(now-last,32)/1000;ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height)
        const rect=canvas.getBoundingClientRect(),targetScatter=reduced?0:Math.max(0,Math.min(1,-rect.top/rect.height))
        scatter+=(targetScatter-scatter)*.14;pointerX+=(Math.max(-1,Math.min(1,targetX))-pointerX)*.08;pointerY+=(Math.max(-1,Math.min(1,targetY))-pointerY)*.08
        const assembly=reduced?1:Math.max(0,Math.min(1,(time-.15)/1.8)),entrance=(1-assembly)**3*1.25
        const kick=bursts.reduce((value,b)=>value+Math.exp(-(time-b.time)*2)*.8,0)
        const form=reduced?1:Math.max(0,Math.min(1,(time-1.1)/1.7)),radius=Math.min(width,height)*.36,cx=width/2,cy=height/2,angle=reduced?0:-time*.105+pointerX*.105+kick
        const tilt=reduced?-.14:-.14+pointerY*.105+Math.sin(time*.15)*.035
        for(const p of points){
          const scatterStep=Math.max(0,Math.min(1,(scatter-p.seed*.45)/.55)),spread=1+entrance*(1+p.seed)+scatterStep*1.9
          const x=p.x*Math.cos(angle)+p.z*Math.sin(angle),rawZ=-p.x*Math.sin(angle)+p.z*Math.cos(angle),y=p.y*Math.cos(tilt)-rawZ*Math.sin(tilt),z=p.y*Math.sin(tilt)+rawZ*Math.cos(tilt)
          let px=cx+x*radius*spread*(1+z*.12),py=cy+y*radius*spread*(1+z*.12)+scatterStep*height*.15
          for(const b of bursts){const age=time-b.time,dx=px-(cx+b.x*width),dy=py-(cy+b.y*height),distance=Math.hypot(dx,dy),wave=Math.exp(-(((distance/radius-age*2.2)/.3)**2))*Math.exp(-age*1.1)*.6;px+=dx*wave;py+=dy*wave}
          const twinkle=reduced?1:1+Math.sin(time*.6+p.seed*40)*.18,alpha=(z+1.2)/2.6*(.4+.6*p.seed)*(1-scatterStep)*Math.min(1,assembly*3)*twinkle
          ctx.fillStyle=`rgba(112,255,217,${alpha})`;ctx.beginPath();ctx.arc(px,py,(.4+p.seed*1.15)*Math.min(1,width/500),0,Math.PI*2);ctx.fill()
        }
        for(const p of letters){const jitter=reduced?0:Math.sin(time*1.3+p.seed*30)*.9,spread=1+(1-form)**2*2+scatter*2,flash=bursts.reduce((n,b)=>n+Math.exp(-(time-b.time)*5)*.4,0);ctx.fillStyle=`rgba(166,255,230,${Math.min(1,(.45+p.seed*.55+flash)*form*(1-scatter))})`;ctx.beginPath();ctx.arc(cx+p.x*radius*1.55*spread+jitter+pointerX*5,cy+p.y*radius*1.55*spread+jitter+pointerY*5,(.6+p.seed*.9)*Math.min(1,width/450),0,Math.PI*2);ctx.fill()}
        while(bursts.length&&time-bursts[0].time>5)bursts.shift()
        canvas.dataset.motionState=JSON.stringify({time:Number(time.toFixed(2)),scatter:Number(scatter.toFixed(3)),assembly:Number(assembly.toFixed(3)),form:Number(form.toFixed(3)),bursts:bursts.length,pointer:[Number(pointerX.toFixed(2)),Number(pointerY.toFixed(2))]})
      }last=now;if(!reduced)frame=requestAnimationFrame(draw)
    }
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(reduced&&visible)frame=requestAnimationFrame(draw)});observer.observe(canvas)
    frame=requestAnimationFrame(draw)
    console.debug('[aigentx:orb] ready',{particles:points.length,glyphParticles:letters.length,reducedMotion:!!reduced})
    return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();window.removeEventListener('pointermove',pointer);window.removeEventListener('pointerdown',burst)}
  },[reduced])
  return <canvas ref={ref} className="ax-orb" aria-hidden="true"/>
}
