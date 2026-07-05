<template>
  <section class="about-section" id="about">
    <div class="container">

      <div class="header-content">
        <p class="eyebrow">{{ $t('about_us.header.eyebrow') }}</p>
        <h2 class="title">
          {{ $t('about_us.header.title') }}
        </h2>
      </div>

      <div class="split-layout" ref="triggerRef" :class="{ visible: cardsVisible }">
        
        <div class="split-item left-item">
          <div class="item-header">
            <div class="icon-wrapper accent-cyan">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2.5"/>
                <path d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
              </svg>
            </div>
            <h3>{{ $t('about_us.vision.title') }}</h3>
          </div>
          <p>{{ $t('about_us.vision.description') }}</p>
        </div>

        <div class="divider"></div>

        <div class="split-item right-item">
          <div class="item-header">
            <div class="icon-wrapper accent-pink">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M24 4L28.5 18H44L31.75 26.5L36.25 40.5L24 32L11.75 40.5L16.25 26.5L4 18H19.5L24 4Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>{{ $t('about_us.mission.title') }}</h3>
          </div>
          <p>{{ $t('about_us.mission.description') }}</p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const triggerRef = ref<HTMLElement | null>(null);
const cardsVisible = ref(false);
let observer: IntersectionObserver | null = null;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (prefersReducedMotion) {
    cardsVisible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        cardsVisible.value = true;
        observer?.disconnect();
        observer = null;
      }
    },
    { threshold: 0.15 }
  );

  if (triggerRef.value) observer.observe(triggerRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

/* ─── Section ────────────────────────────────────────────────────────────────── */

.about-section {
  position: relative;
  padding: 80px 0;
  overflow: visible;
  font-family: 'Inter', sans-serif;
  width: 100%;
  contain: layout style;
}

/* ─── Container ──────────────────────────────────────────────────────────────── */

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  padding: 0 20px;
}

/* ─── Header ─────────────────────────────────────────────────────────────────── */

.header-content {
  text-align: center;
  margin: 0 auto 40px;
  animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin: 0 0 5px;
}

.title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.15;
}

.gradient-text {
  background: linear-gradient(90deg, var(--accent-color) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
}

/* ─── Split Layout ──────────────────────────────────────────────────────────── */

.split-layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.split-layout.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 800px) {
  .split-layout {
    flex-direction: row;
    align-items: stretch;
    gap: 0;
  }
}

.split-item {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 800px) {
  .left-item {
    padding-right: 4rem;
  }
  .right-item {
    padding-left: 4rem;
  }
}

.divider {
  display: none;
  width: 1px;
  background: linear-gradient(180deg, rgba(120,222,231,0) 0%, var(--border-color) 50%, rgba(254,120,178,0) 100%);
}

@media (min-width: 800px) {
  .divider {
    display: block;
  }
}

/* ─── Content Elements ──────────────────────────────────────────────────────── */

.item-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.item-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  letter-spacing: -0.01em;
}

.split-item p {
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.8;
  font-size: 1.05rem;
  margin: 0;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.icon-wrapper svg {
  width: 32px;
  height: 32px;
}

.icon-wrapper.accent-cyan {
  background: rgba(120, 222, 231, 0.15);
  color: #2ebbc5;
}

html.dark .icon-wrapper.accent-cyan {
  color: #78dee7;
}

.icon-wrapper.accent-pink {
  background: rgba(254, 120, 176, 0.15);
  color: #e04b8b;
}

html.dark .icon-wrapper.accent-pink {
  color: #fe78b2;
}

@media (hover: hover) and (pointer: fine) {
  .split-item:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .header-content { animation: none; }
  .split-layout { transition: none; opacity: 1; transform: none; }
  .split-item:hover .icon-wrapper { transform: none; }
}
</style>