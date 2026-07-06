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
        <div class="feature-card card-blue">
          <div class="glow-bg" aria-hidden="true"></div>
          <div class="card-content">
            <div class="icon-wrapper blue">
              <i class="fa-solid fa-code"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.software.title') }}</h3>
            <p>{{ $t('what_we_do.cards.software.text') }}</p>
          </div>
        </div>

        <div class="feature-card card-purple">
          <div class="glow-bg" aria-hidden="true"></div>
          <div class="card-content">
            <div class="icon-wrapper purple">
              <i class="fa-solid fa-paint-brush"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.designers.title') }}</h3>
            <p>{{ $t('what_we_do.cards.designers.text') }}</p>
          </div>
        </div>

        <div class="feature-card card-pink">
          <div class="glow-bg" aria-hidden="true"></div>
          <div class="card-content">
            <div class="icon-wrapper pink">
              <i class="fa-solid fa-people-group"></i>
            </div>
            <h3>{{ $t('what_we_do.cards.entrepreneurs.title') }}</h3>
            <p>{{ $t('what_we_do.cards.entrepreneurs.text') }}</p>
          </div>
        </div>

        <div class="feature-card card-orange">
          <div class="glow-bg" aria-hidden="true"></div>
          <div class="card-content">
            <div class="icon-wrapper orange">
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
    const gap = 16;
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
@import url('https://fonts.cdnfonts.com/css/coolvetica-2');
@import url('https://fonts.cdnfonts.com/css/poppins');

*, *::before, *::after { box-sizing: border-box; }
.about-section {
  position: relative;
  padding: 80px 0 120px;
  font-family: 'Inter', sans-serif;
  width: 100%;
  overflow: hidden;
  background: transparent;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  /*background: linear-gradient(to bottom, #fe78b00a 0%, transparent 100%);*/
  z-index: 0;
  pointer-events: none;
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
  border-radius: 24px;
  background: #1a1a1a;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
  display: flex;
}

html.dark .feature-card {
  background: #1a1a1a;
  border: none;
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
  padding: 50px 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-blue   { --glow-color: #78dee7; }
.card-purple { --glow-color: #a59ce6; }
.card-pink   { --glow-color: #fe78b0; }
.card-orange { --glow-color: #ff6b6b; }

.glow-bg {
  position: absolute;
  bottom: -4rem;
  left: 0;
  width: 100%;
  height: 70%;
  background: radial-gradient(circle at bottom center, var(--glow-color) 0%, transparent 65%);
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.4s ease;
}

html.dark .glow-bg { opacity: 0.25; }

.icon-wrapper {
  font-size: 2rem;
  margin-bottom: -10px;
  position: relative;
  z-index: 10;
}

.icon-wrapper.blue   { color: #78dee7; }
.icon-wrapper.purple { color: #a59ce6; }
.icon-wrapper.pink   { color: #fe78b0; }
.icon-wrapper.orange { color: #ff6b6b; }

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Coolvetica', sans-serif;
}

html.dark .feature-card h3 { color: #ffffff; }

.feature-card p {
  color: #242424;
  font-size: 0.95rem;
  position: relative;
  z-index: 10;
  font-weight: 400;
  margin-bottom: 3rem;
  font-family: 'Poppins', sans-serif; 
  font-size: 14px;
}

html.dark .feature-card p { color: #7c7c7c; }

@media (hover: hover) and (pointer: fine) {
  .feature-card:hover {
    transform: translateY(-5px);
    z-index: 5;
  }
  .feature-card:hover .glow-bg {
    opacity: 0.4;
  }
}

@media (hover: none) and (pointer: coarse) {
  .feature-card:active {
    transform: scale(0.98);
  }

  .feature-card:active .glow-bg {
    opacity: 0.3;
  }

  html.dark .feature-card:active .glow-bg { opacity: 0.45; }
}

@media (prefers-reduced-motion: reduce) {
  .glow-bg {
    animation: none !important;
    will-change: auto;
  }

  .feature-card,
  .icon-wrapper {
    transition: none !important;
    animation: none !important;
  }

  .cards-grid {
    scroll-behavior: auto;
  }
}

@media (max-width: 768px) {
  .title { font-size: 1.1rem; }

  .glow-bg {
    animation: none !important;
    will-change: auto;
  }

  .feature-card {
    transition: none !important;
  }

  .cards-grid {
    gap: 20px;
  }

  .card-content {
    padding: 50px 24px;
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