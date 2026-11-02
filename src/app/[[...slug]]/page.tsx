import { notFound } from 'next/navigation'
import { aigentxTemplate } from '../../features/site-templates/catalog/aigentx/meta'
export default async function Page({params}:{params:Promise<{slug?:string[]}>}){
 const segments=(await params).slug??[],locale=segments[0]==='en'?'en':'zh',slug=(locale==='en'?segments.slice(1):segments).join('/')
 const page=aigentxTemplate.surfaces[0].pages.find(page=>page.slug===slug);if(!page)notFound()
 const {default:View}=await page.load();return <View basePath="" locale={locale}/>
}
