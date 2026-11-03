import test from 'node:test'
import assert from 'node:assert/strict'
import { spherePoints, scatterProgress } from '../src/features/site-templates/catalog/aigentx/components/orbGeometry.ts'
test('球壳采样可复现、覆盖前后半球，半径噪声不超出球壳', () => {
  const points = spherePoints(4500)
  assert.deepEqual(spherePoints(10), points.slice(0, 10))
  assert.ok(points.filter(p => p.z > 0).length > 2100); assert.ok(points.filter(p => p.z < 0).length > 2100)
  for (const point of points) assert.ok(Math.abs(Math.hypot(point.x, point.y, point.z) - 1) <= .05)
})
test('散开错峰随滚动单调，回顶完全重组，末端全部散开', () => {
  for (const seed of [0, .2, .5, .99]) {
    assert.equal(scatterProgress(0, seed), 0); assert.equal(scatterProgress(1, seed), 1)
    let last = 0
    for (let progress = 0; progress < 1; progress += .01) { const value = scatterProgress(progress, seed); assert.ok(value >= last); last = value }
  }
})
