import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {taskEstimate} from '../src/features/site-templates/catalog/aigentx/content/calculator.ts'
import {hrefFor,alternateHref} from '../src/features/site-templates/catalog/aigentx/routing.ts'
import {articleDate} from '../src/features/site-templates/catalog/aigentx/content/date.ts'
test('文章日历日期不受本机时区影响',()=>{assert.equal(articleDate('2026-08-05','zh'),'2026年8月5日');assert.equal(articleDate('2026-08-05','en'),'Aug 5, 2026')})
test('用量计算覆盖完整范围，单调增长并在包含额度处正确切换',()=>{
 assert.deepEqual(taskEstimate(0),{tasks:1000,tier:0});assert.deepEqual(taskEstimate(1000),{tasks:5000000,tier:3});assert.equal(taskEstimate(433).tasks,40000)
 let previous=0
 for(let position=0;position<=1000;position++){const {tasks,tier}=taskEstimate(position);assert.ok(tasks>=previous);assert.equal(tier,tasks<=10000?0:tasks<=50000?1:tasks<=500000?2:3);previous=tasks}
})
test('独立与宿主路径切换语言时保留页面、查询和锚点',()=>{
 assert.equal(hrefFor('','zh'),'/');assert.equal(hrefFor('','en','blog/post'),'/en/blog/post')
 for(const base of ['', '/templates/aigentx/site'])for(const slug of ['', 'integrations','blog/introducing-the-workflow-canvas']){
  const zh=hrefFor(base,'zh',slug),en=hrefFor(base,'en',slug)
  assert.equal(alternateHref(base,'zh',zh,'?source=preview','#faq'),en+'?source=preview#faq')
  assert.equal(alternateHref(base,'en',en,'?source=preview','#faq'),zh+'?source=preview#faq')
 }
})
test('十篇文章的中英文块、封面无障碍描述和内容完整配对',async()=>{
 const articles=JSON.parse(await readFile(new URL('../src/features/site-templates/catalog/aigentx/content/articles.json',import.meta.url),'utf8'))
 assert.equal(articles.length,10);assert.equal(new Set(articles.map(a=>a.slug)).size,10)
 for(const article of articles){for(const locale of ['zh','en']){assert.ok(article.title[locale]);assert.ok(article.summary[locale]);assert.ok(article.imageAlt[locale]);assert.ok(article.blocks.every(b=>b[locale]?.length>0))}assert.ok(article.blocks.filter(b=>b.kind==='heading').length>=2)}
})
