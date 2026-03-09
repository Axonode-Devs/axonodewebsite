<template>
  <section class="about-section" id="about">
    <div class="container">

      <!-- Header -->
      <div class="header-content">
        <p class="eyebrow">{{ $t('about_us.header.eyebrow') }}</p>
        <h2 class="title"><span class="gradient-text">< </span>{{ $t('about_us.header.title') }}<span class="gradient-text"> ></span></h2>
      </div>

      <!-- Cards -->
      <div class="cards-grid">

        <!-- Vision -->
        <div class="feature-card card-blue" :class="{ visible: cardsVisible }" ref="triggerRef">
          <div class="glow-bg"></div>
          <div class="card-content">
            <div class="card-index">01</div>
            <div class="icon-wrapper blue">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2.5"/>
                <path d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
              </svg>
            </div>
            <h3>{{ $t('about_us.vision.title') }}</h3>
            <p>{{ $t('about_us.vision.description') }}</p>
          </div>
        </div>

        <!-- Mission -->
        <div class="feature-card card-pink" :class="{ visible: cardsVisible }">
          <div class="glow-bg"></div>
          <div class="card-content">
            <div class="card-index">02</div>
            <div class="icon-wrapper pink">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L28.5 18H44L31.75 26.5L36.25 40.5L24 32L11.75 40.5L16.25 26.5L4 18H19.5L24 4Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>{{ $t('about_us.mission.title') }}</h3>
            <p>{{ $t('about_us.vision.description') }}</p>
          </div>
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

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) cardsVisible.value = true; },
    { threshold: 0.15 }
  );
  if (triggerRef.value) observer.observe(triggerRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

.about-section {
  position: relative;
  padding: 80px 0;
  overflow: visible;
  font-family: 'Inter', sans-serif;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  padding: 0 20px;
}

.header-content {
  text-align: center;
  margin: 0 auto 25px;
  animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #78dee7;
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
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  perspective: 1000px;
}

.feature-card {
  position: relative;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  opacity: 0;
  transform: translateY(32px);
  transition:
    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.4s ease,
    border-color 0.4s ease,
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

html.dark .feature-card {
  background: rgba(17, 24, 39, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:nth-child(1).visible { transition-delay: 0.08s; }
.feature-card:nth-child(2).visible { transition-delay: 0.22s; }

.glow-bg {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle at center, var(--glow-color) 0%, transparent 60%);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
  animation: rotateGlow 8s linear infinite;
  transition: opacity 0.4s ease;
}
html.dark .glow-bg { opacity: 0.15; }

.card-blue  { --glow-color: #78dee7; }
.card-pink  { --glow-color: #fe78b0; }


.feature-card:hover {
  transform: translateY(-8px) scale(1.01);
  z-index: 5;
}
.feature-card:hover .glow-bg {
  opacity: 0.35;
  animation-duration: 4s;
}
html.dark .feature-card:hover .glow-bg { opacity: 0.5; }

.card-blue:hover { box-shadow: 0 20px 50px -10px rgba(120,222,231,0.45); border-color: rgba(120,222,231,0.4); }
.card-pink:hover { box-shadow: 0 20px 50px -10px rgba(254,120,176,0.45); border-color: rgba(254,120,176,0.4); }

.feature-card:hover .icon-wrapper {
  animation: bounceIcon 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes bounceIcon {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.2) translateY(-4px); }
  100% { transform: scale(1.05) translateY(-2px); }
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 48px 36px;
  width: 100%;
}

.card-index {
  position: absolute;
  top: 20px; right: 28px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  opacity: 0.4;
  color: var(--text-color);
}

.icon-wrapper {
  width: 50px; height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
}
.icon-wrapper svg { width: 24px; height: 24px; }
.icon-wrapper.blue { background: rgba(120,222,231,0.15); color: #2ebbc5; }
.icon-wrapper.pink { background: rgba(254,120,176,0.15); color: #e04b8b; }

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 14px;
  position: relative;
  z-index: 10;
  letter-spacing: -0.01em;
}
html.dark .feature-card h3 { color: #e2e8f0; }

.feature-card p {
  color: #4B5563;
  line-height: 1.7;
  font-size: 0.95rem;
  position: relative;
  z-index: 10;
  margin: 0;
}
html.dark .feature-card p { color: #cbd5e1; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .cards-grid { grid-template-columns: 1fr; gap: 18px; }
  .card-content { padding: 36px 24px; }
}
</style>