<template>
  <section class="about-section" id="about">
    <div class="purple-glow" aria-hidden="true"></div>
    
    <div class="about-container" ref="triggerRef" :class="{ visible: cardsVisible }">

      <div class="about-column left-col">
        <div class="vision-header">
          <div class="vision-header-content">
            <svg class="icon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <h3>{{ $t('about_us.vision.title') }}</h3>
          </div>
          <div class="vision-underline"></div>
        </div>
        <div class="vision-body">
          <div class="vision-bar"></div>
          <p class="vision-text">{{ $t('about_us.vision.description') }}</p>
        </div>
      </div>

      <div class="about-column center-col">
        <h2 class="middle-title">
          {{ $t('about_us.header.title_start') }}<span class="our-text">{{ $t('about_us.header.title_end') }}</span>
        </h2>
        <p class="middle-subtitle">{{ $t('about_us.header.subtitle') }}</p>
      </div>

      <div class="about-column right-col">
        <div class="mission-header">
          <div class="mission-header-content">
            <h3>{{ $t('about_us.mission.title') }}</h3>
            <svg class="icon-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="10" cy="14" r="8" />
              <circle cx="10" cy="14" r="4.5" />
              <circle cx="10" cy="14" r="1.5" fill="currentColor" />
              <line x1="12.5" y1="12.5" x2="18.5" y2="6.5" />
              <path d="M17 7.5l2.5-2.5M16.5 9.5l1.5-1.5M18.5 7.5l1.5-1.5" />
            </svg>
          </div>
          <div class="mission-underline"></div>
        </div>
        <div class="mission-body">
          <div class="mission-bar"></div>
          <p class="mission-text">{{ $t('about_us.mission.description') }}</p>
        </div>
      </div>

    </div>
    <div class="bottom-divider" aria-hidden="true"></div>
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

.about-section {
  position: relative;
  padding: 40px 0 80px; 
  background-color: #141414;
  overflow: hidden;
  width: 100%;
  min-height: 58vh; 
}

.bottom-divider {
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 3px;
  pointer-events: none;
}

.bottom-divider::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(75, 85, 99, 0.2) 15%,
    rgba(75, 85, 99, 0.6) 35%,
    rgba(75, 85, 99, 1) 50%,
    rgba(75, 85, 99, 0.6) 65%,
    rgba(75, 85, 99, 0.2) 85%,
    transparent 100%
  );

  mask: radial-gradient(ellipse at center, #000 75%, transparent 100%);
  -webkit-mask: radial-gradient(ellipse at center, #000 75%, transparent 100%);
}

.purple-glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 40%);
  width: 900px;
  height: 250px;
  background: radial-gradient(circle, #a59ce69a 0%, #141414 60%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 1;
}

.about-container {
  max-width: 1590px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 100px;
  position: relative;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.about-container.visible {
  opacity: 1;
}

.about-column {
  flex: 1;
  min-width: 0;
}

.left-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.about-container.visible .left-col {
  opacity: 1;
  transform: translateX(0);
}

.vision-header {
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 24px;
  font-family: 'Coolvetica', sans-serif;
}

.vision-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vision-header h3 {
  font-size: clamp(1.8rem, 3.5vw, 2.2rem);
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
}

.icon-cyan {
  color: #78dee7;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.vision-underline {
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #c2faff 0%, #78dee7 100%);
  border-radius: 2px;
}

.vision-body {
  display: flex;
  align-items: stretch;
  gap: 20px;
}

.vision-bar {
  width: 4px;
  background: linear-gradient(0deg, #c2faff 0%, #78dee7 100%);
  flex-shrink: 0;
  border-radius: 2px;
}

.vision-text {
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  color: #adadad;
  margin: 0;
  text-align: left;
  max-width: 350px;
}

.center-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 0 0 auto;
  align-self: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.15s;
}

.about-container.visible .center-col {
  opacity: 1;
  transform: translateY(0);
}

.middle-title {
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  line-height: 0.7;
  letter-spacing: -0.03em;
  white-space: nowrap;
  font-family: 'Poppins', sans-serif;
}

.pink-text {
  color: #fe78b2;
}

.purple-text {
  color: #a59ce6;
}

.cyan-text {
  color: #78dee7;
}

.our-text {
  color: #fe78b2;
}

.middle-subtitle {
  font-size: clamp(1rem, 2vw, 1.35rem);
  color: #555555;
  margin: 12px 0 0 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: 'Poppins', sans-serif;
}

.right-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: 0;
  transform: translateX(60px);
  transition: opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.about-container.visible .right-col {
  opacity: 1;
  transform: translateX(0);
}

.mission-header {
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 24px;
  align-items: flex-end;
}

.mission-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mission-header h3 {
  font-size: clamp(1.8rem, 3.5vw, 2.2rem);
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
}

.icon-pink {
  color: #fe78b2;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.mission-underline {
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #ffe5ed 0%, #fe78b2 100%);
  border-radius: 2px;
}

.mission-body {
  display: flex;
  align-items: stretch;
  gap: 20px;
}

.mission-bar {
  width: 4px;
  background: linear-gradient(0deg, #ffe5ed 0%, #fe78b2 100%);
  flex-shrink: 0;
  border-radius: 2px;
  order: 2;
}

.mission-text {
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  color: #adadad;
  margin: 0;
  text-align: right;
  order: 1;
  max-width: 350px;
}

@media (max-width: 991px) {
  .about-container {
    flex-direction: column;
    gap: 60px;
    align-items: stretch;
    padding: 0 50px;
    height: 100%;
  }

  .center-col {
    order: 1;
    flex: none;
    margin-bottom: -30px;
  }

  .purple-glow {
    display: none;
  }

  .left-col {
    order: 2;
    transform: translateX(-30px);
  }

  .right-col {
    order: 3;
    align-items: flex-start;
    transform: translateX(30px);
  }

  .mission-header {
    align-items: flex-start;
  }

  .mission-header-content {
    flex-direction: row-reverse;
  }

  .mission-body {
    align-items: stretch;
  }

  .mission-bar {
    order: 1;
  }

  .mission-text {
    text-align: left;
    order: 2;
  }
}
</style>