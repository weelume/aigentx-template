'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { asset } from '../config/brand'
import { seededRandom, spherePoints, scatterProgress } from './orbGeometry'

type MarkPoint = { x: number; y: number; seed: number; size: number }
type Burst = { x: number; y: number; time: number }

/** 用柔边精灵加色叠加还原发光粒子，真实蒙版采样保持 AI 轮廓与原设计一致。 */
export function ParticleOrb() {
  const ref = useRef<HTMLCanvasElement>(null), reduced = useReducedMotion()
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) { console.error('[aigentx:orb] Canvas 2D unavailable'); return }
    let frame = 0, visible = true, time = 0, last = 0, width = 1400, height = 1400, ratio = 1, scatter = 0
    let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0, disposed = false
    const points = spherePoints(window.innerWidth < 768 ? 2250 : 4500), mark: MarkPoint[] = [], bursts: Burst[] = []
    const sprites = ['#ffffff', '#7cf5ce', '#1fbf8f'].map(color => {
      const sprite = document.createElement('canvas'); sprite.width = sprite.height = 64
      const paint = sprite.getContext('2d')!
      const gradient = paint.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, color); gradient.addColorStop(.12, color + 'ee'); gradient.addColorStop(.36, color + '70')
      gradient.addColorStop(.7, color + '14'); gradient.addColorStop(1, color + '00')
      paint.fillStyle = gradient; paint.fillRect(0, 0, 64, 64)
      return sprite
    })
    const image = new Image()
    image.onload = () => {
      if (disposed) return
      const mask = document.createElement('canvas'); mask.width = mask.height = 180
      const paint = mask.getContext('2d')!
      paint.drawImage(image, 0, 0, 180, 180)
      const pixels = paint.getImageData(0, 0, 180, 180).data, candidates: { x: number; y: number }[] = []
      for (let y = 0; y < 180; y++) for (let x = 0; x < 180; x++) {
        const index = (y * 180 + x) * 4
        if (pixels[index + 3] > 128 && pixels[index] > 180) candidates.push({ x, y })
      }
      if (!candidates.length) { console.error('[aigentx:orb] Particle mask has no opaque pixels'); return }
      const random = seededRandom(19)
      for (let i = 0; i < 1300; i++) {
        const point = candidates[Math.floor(random() * candidates.length)]
        mark.push({ x: (point.x / 180 - .5) * 2 + (random() - .5) * .024, y: (point.y / 180 - .5) * 2 + (random() - .5) * .024, seed: random(), size: .45 + random() })
      }
      console.debug('[aigentx:orb] mask sampled', { particles: mark.length })
      if (reduced) draw(performance.now())
    }
    image.onerror = () => console.error('[aigentx:orb] Particle mark failed to load', { asset: 'O0gbfceGGSvgl5lAM7Dllno7dVo.png' })
    image.src = asset('O0gbfceGGSvgl5lAM7Dllno7dVo.png')
    const pointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = (event.clientX - rect.left - rect.width / 2) / (window.innerWidth / 2)
      targetY = (event.clientY - rect.top - rect.height / 2) / (window.innerHeight / 2)
    }
    const burst = (event: PointerEvent) => {
      if (reduced) return
      const rect = canvas.getBoundingClientRect(), radius = Math.min(rect.width, rect.height) * .155
      const x = (event.clientX - rect.left - rect.width / 2) / radius, y = (event.clientY - rect.top - rect.height / 2) / radius
      if (x * x + y * y < 1.15) { bursts.push({ x, y, time }); if (bursts.length > 3) bursts.shift(); console.debug('[aigentx:orb] pointer burst', { active: bursts.length }) }
    }
    window.addEventListener('pointermove', pointer, { passive: true }); window.addEventListener('pointerdown', burst, { passive: true })
    function draw(now: number) {
      if (!ctx || !canvas) return
      if (visible && !document.hidden) {
        if (last) time += Math.min(now - last, 50) / 1000
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height)
        const bounds = canvas.parentElement!.getBoundingClientRect(), targetScatter = reduced ? 0 : Math.max(0, Math.min(1, -bounds.top / bounds.height))
        scatter += (targetScatter - scatter) * .12; pointerX += (Math.max(-1, Math.min(1, targetX)) - pointerX) * .08; pointerY += (Math.max(-1, Math.min(1, targetY)) - pointerY) * .08
        const assembly = reduced ? 1 : Math.max(0, Math.min(1, (time - .15) / 1.8)), entrance = (1 - assembly * assembly * (3 - 2 * assembly)) * 1.25
        const form = reduced ? 1 : Math.max(0, Math.min(1, (time - 1.1) / 1.7)), morph = form * form * (3 - 2 * form)
        const radius = Math.min(width, height) * .155, cx = width / 2, cy = height / 2, dot = 6 * (width / 2) / 640
        const kick = bursts.reduce((n, b) => n + Math.exp(-(time - b.time) / .45) * .35, 0), angle = reduced ? 0 : -time * .105 * (1 + scatter * 1.8) + pointerX * .105 + kick
        const tilt = -.14 + (reduced ? 0 : pointerY * .105 + Math.sin(time * .15 * Math.PI * 2) * .035)
        ctx.globalCompositeOperation = 'lighter'
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.5)
        glow.addColorStop(0, `rgba(43,217,164,${.2 * assembly * (1 - scatter)})`); glow.addColorStop(.4, `rgba(43,217,164,${.05 * assembly * (1 - scatter)})`); glow.addColorStop(1, '#2bd9a400')
        ctx.fillStyle = glow; ctx.fillRect(cx - radius * 1.5, cy - radius * 1.5, radius * 3, radius * 3)
        for (const point of points) {
          const step = scatterProgress(Math.max(scatter, entrance), point.seed), spread = 1 + step * 1.9
          const x = point.x * Math.cos(angle) + point.z * Math.sin(angle), rawZ = point.z * Math.cos(angle) - point.x * Math.sin(angle)
          const y = point.y * Math.cos(tilt) - rawZ * Math.sin(tilt), z = point.y * Math.sin(tilt) + rawZ * Math.cos(tilt), perspective = 2.6 / (2.6 - z * spread)
          if (perspective <= 0) continue
          let px = cx + x * radius * spread * perspective, py = cy + (y * spread + step * .15) * radius * perspective
          for (const b of bursts) {
            const age = time - b.time, dx = px - cx - b.x * radius, dy = py - cy - b.y * radius
            const strength = .6 * Math.exp(-(dx * dx + dy * dy) / (radius * radius * .16)) * (age / .3) * Math.exp(1 - age / .3)
            px += dx * strength; py += dy * strength
          }
          const depth = 1 - .55 * (.5 - z * .5), rim = 1 + .9 * (1 - Math.abs(z)), light = .45 + .55 * Math.max(0, x * .15 - y * .7 + z * .65)
          const twinkle = reduced ? 1 : .82 + .18 * (.5 + .5 * Math.sin(time * .6 * Math.PI * 2 + point.seed * Math.PI * 2))
          let alpha = (.35 + point.seed * .55) * .65 * depth * rim * light * twinkle * assembly * (1 - step)
          if (z > 0) alpha *= 1 - .45 * morph * Math.max(0, 1 - ((px - cx) ** 2 + (py - cy) ** 2) / (radius * .58) ** 2)
          const size = dot * point.size * perspective; ctx.globalAlpha = Math.min(1, alpha)
          ctx.drawImage(sprites[point.seed < .16 ? 0 : point.seed < .72 ? 1 : 2], px - size / 2, py - size / 2, size, size)
        }
        const breathe = reduced ? 1 : 1 + .03 * Math.sin(time * .35 * Math.PI * 2)
        for (const point of mark) {
          const step = scatterProgress(Math.max(scatter, entrance), point.seed), shell = points[Math.floor(point.seed * points.length)], glyphSize = radius * .46 * breathe
          const px = cx + shell.x * radius * (1 + step * 1.9) * (1 - morph) + point.x * glyphSize * morph + pointerX * radius * .03
          const py = cy + shell.y * radius * (1 + step * 1.9) * (1 - morph) + point.y * glyphSize * morph + pointerY * radius * .03
          const size = dot * point.size * 1.15, flash = bursts.reduce((n, b) => n + Math.exp(-(time - b.time) / .35) * .4, 0)
          ctx.globalAlpha = Math.min(1, (.5 + point.seed * .5) * 1.4 * assembly * (1 - step) * (1 + flash))
          ctx.drawImage(sprites[point.seed < .45 ? 0 : 1], px - size / 2, py - size / 2, size, size)
        }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
        while (bursts.length && time - bursts[0].time > 3) bursts.shift()
        canvas.dataset.motionState = JSON.stringify({ time: +time.toFixed(2), scatter: +scatter.toFixed(3), assembly: +assembly.toFixed(3), form: +morph.toFixed(3), bursts: bursts.length })
      }
      last = now; if (!reduced) frame = requestAnimationFrame(draw)
    }
    const resize = new ResizeObserver(entries => { const rect = entries[0].contentRect; width = rect.width; height = rect.height; ratio = Math.min(devicePixelRatio, 2); canvas.width = width * ratio; canvas.height = height * ratio; if (reduced) draw(performance.now()) })
    resize.observe(canvas)
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (reduced && visible) draw(performance.now()) }); observer.observe(canvas.parentElement!)
    frame = requestAnimationFrame(draw); console.debug('[aigentx:orb] ready', { particles: points.length, reducedMotion: !!reduced })
    return () => { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); window.removeEventListener('pointermove', pointer); window.removeEventListener('pointerdown', burst) }
  }, [reduced])
  return <div className="ax-orb"><canvas ref={ref} className="ax-orb-canvas" aria-hidden="true" /></div>
}
