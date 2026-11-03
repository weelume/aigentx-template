import type { TemplateLocale } from '../../../types'
import { asset } from '../config/brand'
import { text } from '../content/common'
import { Reveal } from './Motion'

export function AppIcon({ name }: { name: string }) {
  const icon = name.toLowerCase() === 'gpt-5' ? 'openai' : name.toLowerCase()
  return <span className="ax-app-icon" aria-hidden="true" style={{ maskImage: `url("${asset(`icons/${icon}.svg`)}")` }} />
}

export function StepIcon({ index }: { index: number }) {
  return <svg className="ax-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {index === 0 ? <path d="m14 2-10 12h7l-1 8 10-13h-7z" /> : index === 1 ? <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v13c0 4 16 4 16 0V5M4 11c0 4 16 4 16 0" /></> : index === 2 ? <><circle cx="6" cy="4" r="2" /><circle cx="18" cy="4" r="2" /><circle cx="6" cy="20" r="2" /><path d="M6 6v12m0-7h7c5 0 5-2 5-5" /></> : <><circle cx="7" cy="16" r="4" /><path d="m10 13 10-10m-6 6 3 3m0-6 3 3" /></>}
  </svg>
}

export function IntegrationMap({ locale }: { locale: TemplateLocale }) {
  const sources = ['Slack', 'Stripe', 'GitHub', 'HubSpot', 'Notion', 'Linear']
  const actions = ['OpenAI', 'Snowflake', 'Salesforce', 'Twilio', 'Airtable', 'Shopify']
  const row = (apps: string[]) => <div className="ax-wiring-row">{apps.map((name, i) => <Reveal key={name} delay={i * .06}><div className="ax-wiring-tile ax-glass"><AppIcon name={name} /><span>{name}</span></div></Reveal>)}</div>
  return <div className="ax-wiring-panel ax-cross">
    <div className="ax-wiring-caption"><span>{text('来源应用', 'SOURCES')[locale]}</span><small>{text('06 项已连接', '06 connected')[locale]}</small></div>
    {row(sources)}
    <div className="ax-wiring-bridge">
      <svg className="ax-wiring-lines" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
        {[100, 300, 500, 700, 900, 1100].map((x, i) => <g key={x}><path d={`M${x} 0V42H600V78M600 122V158H${x}V200`} /><path className="ax-wire-signal" d={`M${x} 0V42H600V78M600 122V158H${x}V200`} style={{ animationDelay: `${-i * .6}s` }} /></g>)}
      </svg>
      <div className="ax-wiring-core ax-glass"><i />AIGENT CORE</div>
    </div>
    {row(actions)}
    <div className="ax-wiring-caption"><span>{text('执行操作', 'ACTIONS')[locale]}</span><small>{text('12 种类型', '12 types')[locale]}</small></div>
  </div>
}
