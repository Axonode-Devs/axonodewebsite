<template>
  <section class="what-is-section" id="what-is">
    <div class="container">
      <div class="what-card" ref="cardRef">
        <svg class="node-motif" viewBox="0 0 120 100" aria-hidden="true">
          <line class="motif-line" x1="20" y1="30" x2="62" y2="58"></line>
          <line class="motif-line" x1="62" y1="58" x2="98" y2="38"></line>
          <line class="motif-line" x1="62" y1="58" x2="88" y2="84"></line>
          <circle class="motif-node pulse-1" cx="20" cy="30" r="4"></circle>
          <circle class="motif-node pulse-2" cx="98" cy="38" r="5"></circle>
          <circle class="motif-node pulse-3" cx="88" cy="84" r="3"></circle>
          <circle class="motif-node motif-hub" cx="62" cy="58" r="6"></circle>
        </svg>
        <h2 class="brand-line">
          <span class="ax">{{ t('what_is.part1') }}</span>
          <span class="plus">+</span>
          <span class="node">{{ t('what_is.part2') }}</span>
        </h2>
        <p class="story">
          <span class="def-line">
            <span class="ax">{{ t('what_is.defs.axon_term') }}</span><em>{{ t('what_is.defs.axon') }}</em>
          </span>
          <span class="def-line">
            <span class="node">{{ t('what_is.defs.node_term') }}</span><em>{{ t('what_is.defs.node') }}</em>
          </span>
          <span class="story-line">{{ t('what_is.rest') }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'WhatIsAxonode'
})

const { t } = useI18n()

const cardRef = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  if (cardRef.value) observer.observe(cardRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.what-is-section {
  padding: 30px 0 10px;
  width: 100%;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.what-card {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0) 0 0 / 22px 22px,
    #1a1a1a;
  border: 1px dashed var(--border-color);
  border-radius: 24px;
  padding: 36px 40px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out,
    border-color 0.3s ease;
}

.what-card:hover {
  border-color: color-mix(in srgb, var(--main2-color) 45%, var(--border-color));
}

.node-motif {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 92px;
  height: auto;
  opacity: 0.45;
  pointer-events: none;
}

.motif-line {
  stroke: var(--border-color);
  stroke-width: 1;
}

.motif-node {
  fill: var(--main2-color);
}

.motif-hub {
  fill: var(--main1-color);
}

@media (prefers-reduced-motion: no-preference) {
  .motif-node {
    animation: motif-pulse 3.2s ease-in-out infinite;
  }

  .pulse-2 {
    animation-delay: 0.8s;
  }

  .pulse-3 {
    animation-delay: 1.6s;
  }

  @keyframes motif-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }
  }
}

.what-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.brand-line {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
  font-family: 'Coolvetica', sans-serif;
  font-size: 2.2rem;
  font-weight: 400;
  margin: 0 0 14px;
  color: var(--text-color);
}

.plus {
  color: var(--text-color2);
  font-weight: 300;
}

.ax {
  color: var(--main1-color);
}

.node {
  color: var(--main2-color);
}

.story {
  font-family: 'Poppins', sans-serif;
  font-size: 0.92rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--text-color2);
  margin: 0 auto 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
  max-width: 640px;
}

.story-line {
  display: block;
  margin-top: 10px;
}

.def-line .ax,
.def-line .node {
  margin-right: 0.35em;
}

@media (max-width: 768px) {
  .what-card {
    padding: 26px 22px;
    border-radius: 20px;
  }

  .node-motif {
    width: 64px;
    top: 10px;
    right: 12px;
    opacity: 0.35;
  }

  .brand-line {
    font-size: 1.7rem;
    gap: 9px;
  }

  .story {
    font-size: 0.92rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .what-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
