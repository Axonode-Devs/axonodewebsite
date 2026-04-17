<template>
  <div class="slider-section">
    <h2 class="section-title">PROJECTS</h2>
    <div class="carousel-wrapper">
      <!-- Sol Panel -->
      <div class="side-panel left-panel">
        <transition name="panel-fade" mode="out-in">
          <div :key="activeIndex" class="panel-content">
            <div class="panel-tag" :style="{ color: activeCard.accent, fontFamily: 'Outfit, sans-serif' }">{{ activeCard.tag }}</div>
            <h2 class="panel-title" :style="{ color: activeCard.leftTitleColor, fontFamily: 'Outfit, sans-serif' }">{{ activeCard.leftTitle }}</h2>
            <p class="panel-desc" :style="{ color: activeCard.leftDescColor, fontFamily: 'DM Sans, sans-serif' }">{{ activeCard.leftDesc }}</p>
            <ul class="panel-stats">
              <li v-for="stat in activeCard.stats" :key="stat.label">
                <span class="stat-value" :style="{ color: activeCard.accent, fontFamily: 'Outfit, sans-serif' }">{{ stat.value }}</span>
                <span class="stat-label" :style="{ fontFamily: 'DM Sans, sans-serif' }">{{ stat.label }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Carousel Track -->
      <div class="carousel-track-container">
        <div
          class="carousel-track"
          @wheel.prevent="onWheel"
          @touchstart="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            v-for="(card, index) in cards"
            :key="card.id"
            class="carousel-card"
            :class="getCardClass(index)"
            :style="{ backgroundColor: card.cardBg }"
            @click="goTo(index)"
          >
            <div class="card-inner">
              <!-- Tek logo fotoğrafı -->
              <div class="logo-box">
                <font-awesome-icon
                  v-if="card.logo.isIcon"
                  :icon="['fas', card.logo.iconName]"
                  class="logo-icon"
                  :style="{ color: card.accent }"
                />
                <img
                  v-else
                  :src="card.logo.src"
                  :alt="card.logo.alt"
                  class="logo-img"
                />
              </div>

              <div class="card-meta">
                <span class="card-title" :style="{ color: card.titleColor }">{{ card.title }}</span>
                <span class="card-sub" :style="{ color: card.subColor }">{{ card.subtitle }}</span>
              </div>
              <div class="card-badge" :style="{ background: card.accent, color: card.badgetext }">{{ card.badge }}</div>
            </div>
            <div class="card-glow" :style="{ background: card.accent }"></div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="nav-dots">
          <button
            v-for="(card, i) in cards"
            :key="i"
            class="nav-dot"
            :class="{ active: i === activeIndex }"
            :style="i === activeIndex
              ? { background: activeCard.accent, borderColor: activeCard.accent }
              : { borderColor: activeCard.accent }"
            @click="goTo(i)"
          ></button>
        </div>
      </div>

      <!-- Sağ Panel — sadece fotoğraf -->
      <div class="side-panel right-panel">
        <transition name="panel-fade" mode="out-in">
          <div :key="activeIndex" class="right-photo-wrap">
            <img
              :src="activeCard.rightPhoto"
              :alt="activeCard.title"
              class="right-photo"
            />
            <div
              class="right-photo-overlay"
              :style="{ background: `linear-gradient(135deg, ${activeCard.accent}22, ${activeCard.accent}08)` }"
            ></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeIndex = ref(1)

const cards = [
  {
    id: 1,
    title: 'Wavefy App',
    subtitle: 'A user-friendly music app',
    badge: 'BETA',
    accent: '#7b0828',
    cardBg: '#0f0e0e',
    tag: 'Wavefy',
    logo: {
      src: new URL('../assets/wavefy.png', import.meta.url),
      alt: 'DataStream Logo',
    },
    titleColor: '#ffffff',
    subColor: '#a0aec0',
    fontFamily: "'DM Sans', sans-serif",
    leftTitleColor: '#e2e8f0',
    leftDescColor: 'rgba(226, 232, 240, 0.6)',
    rightPhoto: new URL('../assets/wavefyaxonode.png', import.meta.url),
    leftTitle: 'Wavefy\nMusic App',
    leftDesc: 'A user friendly music app developed by Axonode Team.',
    stats: [
      { value: '30+', label: 'Users' },
      { value: '90%', label: 'Search Consistency' },
      { value: '100%', label: 'Uptime' },
    ],
    route: '/wavefy'
  },
  {
    id: 2,
    title: 'VoltX Robotics',
    subtitle: 'First Robotics Competition Team',
    badge: 'FRC',
    accent: '#252e2d',
    cardBg: '#ffff',
    badgetext: '#ffffff',
    tag: 'Robotics',
    logo: {
      src: new URL('../assets/voltx-logo.png', import.meta.url),
      alt: 'VoltX Logo',
    },
    titleColor: '#a39baa',
    subColor: '#252e2d',
    fontFamily: "'DM Sans', sans-serif",
    leftTitleColor: '#a39baa',
    leftDescColor: 'rgba(163, 155, 170, 0.8)',
    rightPhoto: new URL('../assets/b1.png', import.meta.url),
    leftTitle: 'VoltX\nRobotics',
    leftDesc: 'A Turkiye located FRC team powered by Axonode Team.',
    stats: [
      { value: '2027', label: 'Season' },
      { value: '20+', label: 'Members' },
      { value: 'with/3', label: 'Companies' },
    ],
    route: '/teams/frc0000'
  },
  {
    id: 3,
    title: 'In Development',
    subtitle: 'Next project is under development',
    badge: 'SOON',
    accent: '#9C9C9C',
    cardBg: '#212121',
    tag: 'COMING SOON',
    logo: {
      isIcon: true,
      iconName: 'gear',
      alt: 'VaultSecure Logo',
    },
    titleColor: '#ffffff',
    subColor: '#a0aec0',
    fontFamily: "'DM Sans', sans-serif",
    leftTitleColor: '#e2e8f0',
    leftDescColor: 'rgba(226, 232, 240, 0.6)',
    rightPhoto: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
    leftTitle: 'In\nDevelopment',
    leftDesc: 'Axonode will keep developing new projects.',
    stats: [
      { value: '0+', label: 'In' },
      { value: '0%', label: 'Development' },
      { value: '0', label: 'Project' },
    ],
    route: '/teams'
  },
]

const activeCard = computed(() => cards[activeIndex.value])

function getCardClass(index) {
  const diff = index - activeIndex.value
  if (diff === 0) return 'is-active'
  if (diff === -1) return 'is-prev'
  if (diff === 1) return 'is-next'
  if (diff < -1) return 'is-far-prev'
  return 'is-far-next'
}

function goTo(index) {
  if (index >= 0 && index < cards.length) {
    if (activeIndex.value === index) {
      // Navigate if clicked card is already active
      const route = cards[index].route
      if (route) router.push(route)
    } else {
      activeIndex.value = index
    }
  }
}

let wheelTimeout = null
function onWheel(e) {
  if (wheelTimeout) return
  if (e.deltaY > 0) goTo(activeIndex.value + 1)
  else goTo(activeIndex.value - 1)
  wheelTimeout = setTimeout(() => { wheelTimeout = null }, 600)
}

let touchStartY = 0
function onTouchStart(e) { touchStartY = e.touches[0].clientY }
function onTouchMove(e) {}
function onTouchEnd(e) {
  const diff = touchStartY - e.changedTouches[0].clientY
  if (Math.abs(diff) > 40) {
    if (diff > 0) goTo(activeIndex.value + 1)
    else goTo(activeIndex.value - 1)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.slider-section {
  background-color: var(--bg-color, #141414);
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 42px;
  font-weight: 800;
  color: #e2e8f0;
  margin-bottom: 60px;
  letter-spacing: -0.02em;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  height: 60vh;
  min-height: 600px;
  font-family: 'DM Sans', sans-serif;
  padding: 0 24px;
  box-sizing: border-box;
}

/* ─── Side Panels ─────────────────────────────── */
.side-panel {
  width: 220px;
  min-width: 180px;
  flex-shrink: 0;
}

/* Sol panel içerik */
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.8;
}

.panel-title {
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color, #e2e8f0);
  margin: 0;
  line-height: 1.1;
  white-space: pre-line;
}

.panel-desc {
  font-size: 13px;
  color: var(--text-color, #e2e8f0);
  opacity: 0.6;
  margin: 0;
  line-height: 1.6;
}

.panel-stats {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel-stats li {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color, #e2e8f0);
  opacity: 0.45;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ─── Sağ Panel — Fotoğraf ────────────────────── */
.right-photo-wrap {
  position: relative;
  width: 220px;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color, #4b5563);
}

.right-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.right-photo-wrap:hover .right-photo {
  transform: scale(1.04);
}

.right-photo-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* ─── Carousel Track ──────────────────────────── */
.carousel-track-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.carousel-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: grab;
  user-select: none;
}

/* ─── Cards ───────────────────────────────────── */
.carousel-card {
  position: relative;
  width: 480px;
  height: 110px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.4s ease,
    filter 0.4s ease,
    box-shadow 0.4s ease,
    height 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  /* cardBg comes from :style binding */
}

.carousel-card.is-active {
  opacity: 1;
  filter: none;
  box-shadow: 0 0 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
  height: 130px;
}

.carousel-card.is-prev,
.carousel-card.is-next {
  transform: scale(0.88);
  opacity: 0.5;
  filter: blur(0.5px);
  z-index: 5;
}

.carousel-card.is-far-prev,
.carousel-card.is-far-next {
  transform: scale(0.76);
  opacity: 0.22;
  filter: blur(1px);
  z-index: 1;
}

.card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  gap: 20px;
}

/* ─── Logo Kutusu (tek görsel) ────────────────── */
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
  overflow: hidden;
  backdrop-filter: blur(4px);
  transition: background 0.3s;
}

.carousel-card.is-active .logo-box {
  background: rgba(255, 255, 255, 0.14);
}

.logo-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: block;
}

.logo-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.carousel-card.is-active .logo-icon {
  transform: rotate(45deg);
}

/* ─── Card Meta ───────────────────────────────── */
.card-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color, #e2e8f0);
}

.card-sub {
  font-size: 11px;
  color: var(--text-color, #e2e8f0);
  opacity: 0.45;
  font-family: 'Space Mono', monospace;
}

/* ─── Card Badge ──────────────────────────────── */
.card-badge {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.15em;
  padding: 4px 8px;
  border-radius: 4px;
  color: #0a0a0a;
  font-weight: 700;
  flex-shrink: 0;
}

/* ─── Glow Effect ─────────────────────────────── */
.card-glow {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 60px;
  border-radius: 50%;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s ease;
  z-index: 1;
}

.carousel-card.is-active .card-glow {
  opacity: 0.35;
}

/* ─── Nav Dots ────────────────────────────────── */
.nav-dots {
  display: flex;
  gap: 6px;
}

.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-dot.active {
  transform: scale(1.4);
}

/* ─── Panel Transition ────────────────────────── */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ─── Responsive ──────────────────────────────── */
@media (max-width: 900px) {
  .carousel-wrapper {
    flex-direction: column;
    height: auto;
    gap: 40px;
    padding: 0 16px;
  }

  .side-panel {
    width: 100%;
    min-width: unset;
  }

  .left-panel .panel-content {
    align-items: center;
    text-align: center;
  }

  .panel-stats {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .carousel-card { 
    width: 100%;
    max-width: 400px;
  }

  .carousel-card.is-active { height: 120px; }

  .right-photo-wrap {
    width: 100%;
    height: 250px;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 40px;
  }
}
</style>