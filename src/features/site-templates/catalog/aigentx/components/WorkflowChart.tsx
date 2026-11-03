'use client'
import { motion } from 'framer-motion'
import { useId } from 'react'
import type { TemplateLocale } from '../../../types'
import { text, type Localized } from '../content/common'

export function WorkflowChart({ steps, apps, locale }: { steps: Localized[]; apps: string[]; locale: TemplateLocale }) {
  const id = useId().replaceAll(':', '')
  const path = 'M60 280C110 280 150 210 210 210S310 140 370 140S470 70 530 70'
  return <div className="ax-workflow-chart"><div className="ax-workflow-caption"><small>{text('工作流', 'The workflow')[locale]}</small><span>▪ 1.9s total</span></div>
    <svg viewBox="0 0 620 340" role="img" aria-label={steps.map(step => step[locale]).join(' · ')}>
      <defs><filter id={`${id}-glow`} x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="6" /></filter><radialGradient id={`${id}-aura`}><stop stopColor="#55f1c5" stopOpacity=".12" /><stop offset="1" stopColor="#bca8f8" stopOpacity="0" /></radialGradient></defs>
      <ellipse cx="350" cy="210" rx="260" ry="130" fill={`url(#${id}-aura)`} />
      <path d={path} stroke="#ffffff22" fill="none" />
      <path className="ax-chart-signal" d={path} stroke="#a1fbe0" fill="none" strokeWidth="1.5" />
      <path d="M20 320H600" stroke="#ffffff0a" />
      {steps.map((step, i) => {
        const x = [60, 210, 370, 530][i], y = [280, 210, 140, 70][i], color = i === 0 || i === 3 ? '#55f1c5' : '#c6b2fc'
        const labelX = i === 3 ? x - 28 : x + 28
        return <motion.g key={step.en} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * .15, duration: .6 }}>
          <path d={`M${x} ${y}V320`} stroke={color} opacity=".23" />
          <ellipse cx={x} cy="320" rx="19" ry="3" fill={color} opacity=".5" filter={`url(#${id}-glow)`} />
          <circle cx={x} cy={y} r={i === 2 ? 30 : 20} fill={color} opacity=".4" filter={`url(#${id}-glow)`} />
          <circle cx={x} cy={y} r={i === 2 ? 24 : 16} fill={color} opacity=".85" />
          <circle cx={x} cy={y} r="9" fill="#080815" /><circle className="ax-chart-node" cx={x} cy={y} r="3" fill={color} style={{ animationDelay: `${i * .5}s` }} />
          <text x={labelX} y={y - 2} textAnchor={i === 3 ? 'end' : 'start'} fill="#eeeef6" fontSize="13">{step[locale]}</text>
          <text x={labelX} y={y + 14} textAnchor={i === 3 ? 'end' : 'start'} fill={color} fontFamily="AxPoppins,AxMiSans,sans-serif" letterSpacing=".5" fontSize="10">{apps[i]}</text>
        </motion.g>
      })}
    </svg>
  </div>
}
