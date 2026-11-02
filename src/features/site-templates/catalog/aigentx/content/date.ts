import type { TemplateLocale } from '../../../types'
/** 文章日期是日历日期，显式使用 UTC，避免浏览器时区把日期移到前一天。 */
export function articleDate(date:string,locale:TemplateLocale):string {
 return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale==='zh'?'zh-CN':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'})
}
