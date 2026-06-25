<template>
  <div class="slider-section">
    <h2 class="section-title">
      {{ $t('projects.section_title_main') }}
      <span class="gradient-text">{{ $t('projects.section_title_gradient') }}</span>
    </h2>
    <div class="carousel-wrapper">
      <button class="nav-btn" @click="goTo(activeIndex - 1)" :disabled="activeIndex === 0">&#8592;</button>

      <div class="carousel-track-container">
        <div
          class="carousel-track"
          @wheel.prevent="onWheel"
          @touchstart="onTouchStart"
          @touchmove.prevent
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
              <div class="logo-box">
                <font-awesome-icon
                  v-if="card.logo.isIcon"
                  :icon="['fas', card.logo.iconName]"
                  class="logo-icon"
                  :style="{ color: card.accent }"
                />
                <img v-else :src="card.logo.src" :alt="card.logo.alt" class="logo-img" />
              </div>
              <div class="card-meta">
                <span class="card-title" :style="{ color: card.titleColor }">{{ $t(card.titleKey) }}</span>
                <span class="card-sub" :style="{ color: card.subColor }">{{ $t(card.subKey) }}</span>
              </div>
              <div class="card-badge" :style="{ background: card.accent, color: card.badgetext || '#0a0a0a' }">
                {{ $t(card.badgeKey) }}
              </div>
            </div>
            <div class="card-glow" :style="{ background: card.accent }"></div>
          </div>
        </div>

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

      <button class="nav-btn" @click="goTo(activeIndex + 1)" :disabled="activeIndex === cards.length - 1">&#8594;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const activeIndex = ref(1)

const cards = [
  {
    id: 1,
    titleKey: 'projects.wavefy.title',
    subKey: 'projects.wavefy.subtitle',
    badgeKey: 'projects.wavefy.badge',
    accent: '#7b0828',
    cardBg: '#0f0e0e',
    logo: {
      src: new URL('../assets/wavefys.png', import.meta.url),
      alt: 'Wavefy Logo',
    },
    titleColor: '#ffffff',
    subColor: '#a0aec0',
    route: '/wavefy'
  },
  {
    id: 2,
    titleKey: 'projects.voltx.title',
    subKey: 'projects.voltx.subtitle',
    badgeKey: 'projects.voltx.badge',
    accent: '#ff8800',
    cardBg: '#ffffff',
    badgetext: '#ffffff',
    logo: {
      src: new URL('../assets/voltx-logo.png', import.meta.url),
      alt: 'VoltX Logo',
    },
    titleColor: '#a39baa',
    subColor: '#252e2d',
    route: '/teams/frc0000'
  },
  {
    id: 3,
    titleKey: 'projects.intent.title',
    subKey: 'projects.intent.subtitle',
    badgeKey: 'projects.intent.badge',
    accent: '#4A6B4A',
    cardBg: '#D8EAD3',
    logo: {
      src: new URL('https://intent.axonode.org/assets/INTENT-6M9P_T1Q.png'),
      alt: 'Intent Logo',
    },
    titleColor: '#5C5A56',
    subColor: '#5C5A56',
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
  if (e.deltaX > 0 || e.deltaY > 0) goTo(activeIndex.value + 1)
  else goTo(activeIndex.value - 1)
  wheelTimeout = setTimeout(() => { wheelTimeout = null }, 600)
}

let touchStartX = 0
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 40) {
    if (diff > 0) goTo(activeIndex.value + 1)
    else goTo(activeIndex.value - 1)
  }
}
</script>
<style scoped>

.slider-section {
  background-color: var(--bg-color, #141414);
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: #c9c9c9;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.gradient-text {
  font-weight: 600;
  color: #c9c9c9;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 24px;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

.nav-btn:disabled {
  opacity: 0.25;
  cursor: default;
}

.carousel-track-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  cursor: grab;
  user-select: none;
}

.carousel-card {
  position: relative;
  width: 200px;
  height: 130px; 
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1),
    opacity 0.4s ease,
    width 0.4s ease,
    box-shadow 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.carousel-card.is-active {
  width: 300px;   
  height: 130px;
  opacity: 1;
  box-shadow: 0 0 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.carousel-card.is-prev,
.carousel-card.is-next {
  transform: scale(0.88);
  opacity: 0.5;
  z-index: 5;
}

.carousel-card.is-far-prev,
.carousel-card.is-far-next {
  transform: scale(0.76);
  opacity: 0.22;
  z-index: 1;
}

.card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  gap: 16px;
}

.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
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
  width: 42px;
  height: 42px;
  object-fit: contain;
  display: block;
}

.logo-icon {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.carousel-card.is-active .logo-icon {
  transform: rotate(45deg);
}

.card-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.card-title {
  font-size: 16px; 
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-sub {
  font-size: 12px;  
  opacity: 0.45;
  font-family: 'Space Mono', monospace;
}

.card-badge {
  font-family: 'Space Mono', monospace;
  font-size: 11px;  
  letter-spacing: 0.15em;
  padding: 4px 10px; 
  border-radius: 4px;
  font-weight: 700;
  flex-shrink: 0;
  white-space: nowrap;
}

.card-glow {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60%;
  border-radius: 50%;
  opacity: 0;
  filter: blur(18px);
  transition: opacity 0.4s ease;
  z-index: 1;
}

.carousel-card.is-active .card-glow {
  opacity: 0.3;
}

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

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.panel-fade-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}

.panel-fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

@media (max-width: 600px) {
  .carousel-card {
    width: 170px;  
    height: 120px; 
  }

  .carousel-card.is-active {
    width: 240px;  
  }

  .carousel-wrapper {
    gap: 10px;
    padding: 0 12px;
  }

  .section-title {
    font-size: 1.4rem;
  }
}
</style>