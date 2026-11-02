import type { TemplateLocale } from '../../types'
export function hrefFor(basePath:string,locale:TemplateLocale,slug=''):string { return `${basePath.replace(/\/$/,'')}${locale==='en'?'/en':''}${slug?'/'+slug:''}`||'/' }
/** 只变更语言段，保持页面、查询参数和锚点。 */
export function alternateHref(basePath:string,locale:TemplateLocale,pathname:string,search='',hash=''):string {
 const root=hrefFor(basePath,locale)
 const slug=pathname===root?'':pathname.slice(root==='/'?1:root.length).replace(/^\//,'')
 return hrefFor(basePath,locale==='zh'?'en':'zh',slug)+search+hash
}
