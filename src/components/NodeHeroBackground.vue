<template>
  <canvas ref="canvasRef" class="node-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'NodeHeroBackground'
})

const canvasRef = ref(null)

const styles = getComputedStyle(document.documentElement)
const CSS_COLORS = [
  styles.getPropertyValue('--main1-color').trim() || '#78dee7',
  styles.getPropertyValue('--main2-color').trim() || '#a59ce6',
  styles.getPropertyValue('--main3-color').trim() || '#fe78b0'
]
const LINE_COLOR = 'rgba(255, 255, 255, 1)'
const MOUSE_DIST = 160

let ctx = null
let animationId = 0
let running = false
let isVisible = true
let isTabVisible = true
let linkDist = 130
let linkDistSq = linkDist * linkDist
let nodeCountFn = () => 60
let resizeObserver = null
let interactionObserver = null
let nodes = []
let width = 0
let height = 0
let dpr = 1
let mouseDist = MOUSE_DIST
let mouseDistSq = mouseDist * mouseDist
const mouse = { x: -9999, y: -9999 }

const reducedMotion = () =>
window.matchMedia('(prefers-reduced-motion: reduce)').matches

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  const rect = canvas.parentElement.getBoundingClientRect()
  width = rect.width
  height = rect.height
  const isMobile = width < 640
  linkDist = isMobile ? 110 : 130
  linkDistSq = linkDist * linkDist
  mouseDist = isMobile ? MOUSE_DIST * 0.85 : MOUSE_DIST
  mouseDistSq = mouseDist * mouseDist
  nodeCountFn = () => {
    if (width < 640) return 25
    if (width < 1024) return 40
    return Math.min(65, Math.floor(width / 22))
  }
  // Mobile: cap DPR to 1 — fillRate is the main mobile cost
  dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  createNodes()
}

const createNodes = () => {
  const count = nodeCountFn()
  nodes = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 1.2,
    color: CSS_COLORS[i % CSS_COLORS.length]
  }))
}

const update = () => {
  for (const n of nodes) {
    const dx = mouse.x - n.x
    const dy = mouse.y - n.y
    const dRefSq = dx * dx + dy * dy
    if (dRefSq < mouseDistSq && dRefSq > 0.0001) {
      const dist = Math.sqrt(dRefSq)
      const force = ((mouseDist - dist) / mouseDist) * 0.06
      n.vx += (dx / dist) * force
      n.vy += (dy / dist) * force
    }
    n.x += n.vx
    n.y += n.vy
    n.vx *= 0.995
    n.vy *= 0.995
    const minSpeed = 0.06
    const speed = Math.hypot(n.vx, n.vy)
    if (speed < minSpeed) {
      n.x += (Math.random() - 0.5) * 0.2
      n.y += (Math.random() - 0.5) * 0.2
    }
    if (n.x < -20) n.x = width + 20
    if (n.x > width + 20) n.x = -20
    if (n.y < -20) n.y = height + 20
    if (n.y > height + 20) n.y = -20
  }
}

const draw = () => {
  ctx.clearRect(0, 0, width, height)
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dRefSq = dx * dx + dy * dy
      if (dRefSq < linkDistSq) {
        const dist = Math.sqrt(dRefSq)
        ctx.globalAlpha = 1 - dist / linkDist
        ctx.strokeStyle = LINE_COLOR
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }
  for (const n of nodes) {
    ctx.globalAlpha = 1
    ctx.fillStyle = n.color
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

const loop = () => {
  update()
  draw()
  animationId = requestAnimationFrame(loop)
}

const start = () => {
  if (running) return
  running = true
  animationId = requestAnimationFrame(loop)
}

const stop = () => {
  if (!running) return
  running = false
  cancelAnimationFrame(animationId)
}

const syncAnimation = () => {
  const isActive = isVisible && isTabVisible
  if (isActive) start()
  else stop()
}

const drawStatic = () => {
  update()
  draw()
}

const onPointerMove = (e) => {
  if (e.pointerType !== 'mouse' && e.buttons === 0) return
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

const onPointerLeave = (e) => {
  if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
    mouse.x = -9999
    mouse.y = -9999
  }
}

const onPointerUp = (e) => {
  if (e.pointerType === 'touch') {
    mouse.x = -9999
    mouse.y = -9999
  }
}

const onVisibility = () => {
  isTabVisible = !document.hidden
  syncAnimation()
}

onMounted(() => {
  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvasRef.value.parentElement)

  interactionObserver = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0]?.isIntersecting ?? true
      syncAnimation()
    },
    { threshold: 0.05 }
  )
  interactionObserver.observe(canvasRef.value.parentElement)

  if (reducedMotion()) {
    drawStatic()
  } else {
    start()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerUp, { passive: true })
  }

  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  stop()
  if (resizeObserver) resizeObserver.disconnect()
  if (interactionObserver) interactionObserver.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerleave', onPointerLeave)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
})
</script>

<style scoped>
.node-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
}
</style>
