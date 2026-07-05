<template>
  <section class="about-section" id="whatwedo">
    <div class="container">
      <div class="header-content">
        <h2 class="title">
          {{ $t('what_we_do.title.main') }}
          <span class="gradient-text">{{ $t('what_we_do.title.gradient') }}</span>
        </h2>
      </div>

      <div class="cards-grid" ref="trackRef" @scroll="onScroll">
        <div class="feature-card card-1">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="fa-solid fa-code"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.software.title') }}</h3>
            <p>{{ $t('what_we_do.cards.software.text') }}</p>
          </div>
        </div>

        <div class="feature-card card-2">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="fa-solid fa-paint-brush"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.designers.title') }}</h3>
            <p>{{ $t('what_we_do.cards.designers.text') }}</p>
          </div>
        </div>

        <div class="feature-card card-3">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="fa-solid fa-people-group"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.entrepreneurs.title') }}</h3>
            <p>{{ $t('what_we_do.cards.entrepreneurs.text') }}</p>
          </div>
        </div>

        <div class="feature-card card-4">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="fa-solid fa-lightbulb"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.other.title') }}</h3>
            <p>{{ $t('what_we_do.cards.other.text') }}</p>
          </div>
        </div>
      </div>

      <div class="carousel-dots" role="tablist" :aria-label="$t('what_we_do.title.main')">
        <button
          v-for="n in 4"
          :key="n"
          class="dot"
          :class="{ active: activeIndex === n - 1 }"
          role="tab"
          :aria-selected="activeIndex === n - 1"
          :aria-label="`Slide ${n}`"
          @click="scrollToCard(n - 1)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const trackRef = ref(null);
const activeIndex = ref(0);


let scrollTimer = null;
const onScroll = () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const track = trackRef.value;
    if (!track) return;
    const cardWidth = track.firstElementChild?.offsetWidth || 1;
    const gap = 16; // matches mobile .cards-grid gap
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    activeIndex.value = Math.max(0, Math.min(3, index));
  }, 80);
};

const scrollToCard = (index) => {
  const track = trackRef.value;
  if (!track) return;
  const card = track.children[index];
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }
};
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }
.about-section {
  position: relative;
  padding: 0px 0 80px 0;
  display: block;
  overflow: visible;
  font-family: 'Inter', sans-serif;
  width: 100%;
  contain: layout style;
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 0 20px;
  pointer-events: none;
}

.feature-card,
.header-content {
  pointer-events: auto;
}


.header-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
}

@media (max-width: 768px) {
  .header-content {
    margin-bottom: 35px;
  }
}

@media (max-width: 420px) {
  .header-content {
    margin-bottom: 25px;
  }
}

.title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

html.dark .title { color: #9ca3af; }

.gradient-text {
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  perspective: 1000px;
}

.carousel-dots {
  display: none;
  pointer-events: auto;
}

.feature-card {
  position: relative;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
  z-index: 1;
  display: flex;
}

html.dark .feature-card {
  background: #1f1f1f;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@supports (backdrop-filter: blur(12px)) {
  .feature-card {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 40px 30px;
  width: 100%;
  height: 100%;
}

/* ─── Icon wrappers ──────────────────────────────────────────────────────────── */

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 10px;
  position: relative;
  z-index: 10;
  background: rgba(150, 150, 150, 0.1);
  color: var(--text-color);
}

html.dark .icon-wrapper {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* ─── Card typography ────────────────────────────────────────────────────────── */

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #272727;
  margin-bottom: 15px;
  position: relative;
  z-index: 10;
}

html.dark .feature-card h3 { color: #e2e8f0; }

.feature-card p {
  color: #4B5563;
  line-height: 1.6;
  font-size: 0.95rem;
  position: relative;
  z-index: 10;
}

html.dark .feature-card p { color: #cbd5e1; }

/* ─── Hover — desktop/pointer only ──────────────────────────────────────────── */

@media (hover: hover) and (pointer: fine) {
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--text-color);
  }

  html.dark .feature-card:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .feature-card.card-1:hover .icon-wrapper { background: #78dee7; color: #111; }
  .feature-card.card-2:hover .icon-wrapper { background: #95b0eb; color: #111; }
  .feature-card.card-3:hover .icon-wrapper { background: #fe78b2; color: #fff; }
  .feature-card.card-4:hover .icon-wrapper { background: #ffa500; color: #111; }
  
  html.dark .feature-card.card-1:hover .icon-wrapper { background: #78dee7; color: #111; }
  html.dark .feature-card.card-2:hover .icon-wrapper { background: #95b0eb; color: #111; }
  html.dark .feature-card.card-3:hover .icon-wrapper { background: #fe78b2; color: #fff; }
  html.dark .feature-card.card-4:hover .icon-wrapper { background: #ffa500; color: #111; }

  .feature-card:hover .icon-wrapper {
    animation: bounceIcon 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes bounceIcon {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.2) translateY(-4px); }
    100% { transform: scale(1.05) translateY(-2px); }
  }
}

/* Touch-only tap feedback — mirrors the hover lift without ever
   triggering on/persisting for pointer devices. */
@media (hover: none) and (pointer: coarse) {
  .feature-card:active {
    transform: scale(0.98);
  }
}

/* ─── Reduced motion ─────────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .icon-wrapper {
    transition: none !important;
    animation: none !important;
  }

  .cards-grid {
    scroll-behavior: auto;
  }
}

/* ─── Responsive: tablet ─────────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .title { font-size: 1.1rem; }

  .feature-card {
    transition: none !important;
  }

  .cards-grid {
    gap: 20px;
  }

  .card-content {
    padding: 30px 24px;
  }

  .feature-card h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .feature-card p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

@media (max-width: 640px) {
  .feature-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* ─── Responsive: mobile carousel ────────────────────────────────────────────── */

@media (max-width: 420px) {
  .container {
    padding: 16px 0;
  }

  .header-content {
    padding: 0 16px;
  }

  .cards-grid {
    display: flex;
    grid-template-columns: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    gap: 12px;
    padding: 4px 24px 20px;
    margin: 4px 0;
    scroll-padding-inline: 16px;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .cards-grid::-webkit-scrollbar {
    display: none;
  }

  .feature-card {
    flex: 0 0 82%;
    scroll-snap-align: start;
    padding: 0;
    margin-left: 6px;
    margin-right: 6px;
  }

  /* Peek the next card slightly so it reads as swipeable, not paginated */
  .feature-card:first-child {
    margin-left: 0;
  }

  .feature-card:last-child {
    margin-right: 8%;
  }

  .card-content {
    padding: 20px 16px;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  .feature-card h3 {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  .feature-card p {
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: rgba(107, 114, 128, 0.3);
    cursor: pointer;
    transition: background 0.25s ease, width 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }

  html.dark .dot {
    background: rgba(255, 255, 255, 0.2);
  }

  .dot.active {
    width: 20px;
    border-radius: 4px;
    background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  }

  @media (prefers-reduced-motion: reduce) {
    .dot {
      transition: none !important;
    }
  }
}
</style>