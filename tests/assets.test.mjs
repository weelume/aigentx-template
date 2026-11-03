import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

test('连接图的十二个蒙版是有效的 SVG 文本，且与素材来源摘要一致', async () => {
  const base = new URL('../public/templates/aigentx/', import.meta.url)
  const sources = JSON.parse(await readFile(new URL('sources.json', base), 'utf8'))
  for (const name of ['slack', 'stripe', 'github', 'hubspot', 'notion', 'linear', 'openai', 'snowflake', 'salesforce', 'twilio', 'airtable', 'shopify']) {
    const file = `icons/${name}.svg`, bytes = await readFile(new URL(file, base)), svg = bytes.toString('utf8')
    assert.match(svg, /<svg[^>]+xmlns="http:\/\/www.w3.org\/2000\/svg"/)
    assert.doesNotMatch(svg, /\\"/)
    assert.match(svg, /<path[\s>]/)
    assert.equal(createHash('sha256').update(bytes).digest('hex'), sources.assets.find(asset => asset.file === file)?.sha256)
  }
})
