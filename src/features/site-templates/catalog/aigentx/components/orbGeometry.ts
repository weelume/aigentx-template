export type OrbPoint = { x: number; y: number; z: number; seed: number; size: number }
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296 }
}
export function spherePoints(count: number): OrbPoint[] {
  const random = seededRandom(7)
  return Array.from({ length: count }, () => {
    const y = random() * 2 - 1, angle = random() * Math.PI * 2
    const shell = 1 + (random() - .5) * .1, radial = Math.sqrt(1 - y * y)
    return { x: Math.cos(angle) * radial * shell, y: y * shell, z: Math.sin(angle) * radial * shell, seed: random(), size: .45 + random() * 1.1 }
  })
}
/** 聚拢与滚动共用错峰曲线；回顶必须完全重组，避免残留散点。 */
export function scatterProgress(progress: number, seed: number): number {
  const value = Math.max(0, Math.min(1, (progress - seed * .45) / .55))
  return value * value * (3 - 2 * value)
}

/** 路由挂起/切换时 DOM 可暂时没有布局，此状态不能参与滚动比例计算。 */
export function heroExitProgress(top: number, height: number): number | null {
  if (height <= 0 || !Number.isFinite(top) || !Number.isFinite(height)) return null
  return Math.max(0, Math.min(1, -top / height))
}
