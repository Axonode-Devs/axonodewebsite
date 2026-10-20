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

let ctx = null
let animationId = 0
let resizeObserver = null
let nodes = []
let width = 0
let height = 0
let dpr = 1
const mouse = { x: -9999, y: -9999 }

const LINK_DIST = 130
const MOUSE_DIST = 160

const reducedMotion = () =>
window.matchMedia('(prefers-reduced-motion: reduce)').matches

const nodeCount = () => {
  if (width < 640) return 25
  if (width < 1024) return 40
  return Math.min(65, Math.floor(width / 22))
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  const rect = canvas.parentElement.getBoundingClientRect()
  width = rect.width
  height = rect.height
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  createNodes()
}

const createNodes = () => {
  const count = nodeCount()
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
    const dist = Math.hypot(dx, dy)
    if (dist < MOUSE_DIST && dist > 0.01) {
      const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * 0.06
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
      const dist = Math.hypot(dx, dy)
      if (dist < LINK_DIST) {
        ctx.globalAlpha = 1 - dist / LINK_DIST
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

const drawStatic = () => {
  update()
  draw()
}

const onMouseMove = (e) => {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

const onMouseLeave = () => {
  mouse.x = -9999
  mouse.y = -9999
}

onMounted(() => {
  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvasRef.value.parentElement)
  if (reducedMotion()) {
    drawStatic()
  } else {
    animationId = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
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
