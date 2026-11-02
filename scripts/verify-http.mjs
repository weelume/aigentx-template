import {readFile} from 'node:fs/promises'
import assert from 'node:assert/strict'
const base=process.argv[2]
if(!base)throw new Error('必须指定已启动的本地服务 URL')
const origin=new URL(base)
if(!['localhost','127.0.0.1','[::1]'].includes(origin.hostname))throw new Error('验收只允许本地隔离服务')
const template=JSON.parse(await readFile(new URL('../.tpl/template.json',import.meta.url),'utf8'))
const results=[]
for(const locale of ['zh','en'])for(const page of template.surfaces[0].pages){
 const path=(locale==='en'?'/en':'')+(page.slug?'/'+page.slug:'')||'/'
 const response=await fetch(new URL(path,origin)),body=await response.text()
 assert.equal(response.status,200,path+' 状态必须为 200')
 assert.match(body,/<main[^>]*id="ax-content"/,path+' 必须渲染真实业务页面')
 assert.doesNotMatch(body,/Attempted to call the default export|Application error:|NEXT_HTTP_ERROR_FALLBACK/,path+' 不得包含服务端组件错误')
 results.push({path,status:response.status,bytes:body.length})
}
for(const path of ['/missing-page','/en/missing-page']){const response=await fetch(new URL(path,origin));assert.equal(response.status,404);results.push({path,status:404})}
console.log(JSON.stringify({checks:results.length,results},null,2))
