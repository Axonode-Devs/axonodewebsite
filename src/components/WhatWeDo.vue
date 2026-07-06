<template>
  <section class="about-section" id="whatwedo">
    <div class="container">
      <div class="header-content">
        <h2 class="title">
          {{ $t('what_we_do.title.main') }}
          <span class="pastel-text1">{{ $t('what_we_do.title.gradient1') }}</span>
          <span class="pastel-text2">{{ $t('what_we_do.title.gradient2') }}</span>
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
  /*border-top: 5px solid var(--text-color2);*/
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(to bottom, #fe78b00a 0%, transparent 100%);
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
  font-size: 1.6rem;
  color: var(--text-color);
  margin-bottom: 20px;
  letter-spacing: 0.1em;
  font-weight: 600;
  font-family: 'Coolvetica', sans-serif;
  position: relative;
  display: inline-block;
}

.title::after {
  content: "";
  position: absolute;
  left: 10%;
  bottom: -8px;
  width: 80%;
  height: 2px;

  background: linear-gradient(
    90deg,
    transparent,
    #fe78b0,
    #a59ce6,
    #78dee7,
    transparent
  );

  border-radius: 2px;
}

.pastel-text1 {
  color: #a59ce6;
  font-weight: 600;
  font-family: 'Coolvetica', sans-serif;
}

.pastel-text2 {
  color: #fe78b0;
  font-weight: 600;
  font-family: 'Coolvetica', sans-serif;
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

@supports (backdrop-filter: blur(12px)) {
  .feature-card {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 50px 25px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 24px;
}

.card-content::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 3px;

  border-radius: inherit;

  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--glow-color) 30%, transparent),
    color-mix(in srgb, var(--glow-color) 70%, white 10%),
    color-mix(in srgb, var(--glow-color) 35%, black)
  );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;

  pointer-events: none;
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

  background: radial-gradient(
    circle at bottom center,
    var(--glow-color) 0%,
    transparent 65%
  );

  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.4s ease;
}

.glow-bg::after {
  content: "";
  position: absolute;
  inset: 0;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");

  opacity: 0.1; 
  mix-blend-mode: overlay;

  pointer-events: none;
}

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
  font-weight: 900;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Coolvetica', sans-serif;

  background: linear-gradient(-45deg, var(--glow-color), var(--text-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-card p {
  font-size: 0.9rem;
  font-weight: 280;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
  letter-spacing: 0.05em;
  font-family: 'Poppins', sans-serif;
  color: var(--text-color2);
}

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

  .dot.active {
    width: 20px;
    border-radius: 4px;
  }

  .dot:nth-child(1).active {
    background: linear-gradient(90deg, #78dee7, #aef0f6);
  }

  .dot:nth-child(2).active {
    background: linear-gradient(90deg, #a59ce6, #d3cfff);
  }

  .dot:nth-child(3).active {
    background: linear-gradient(90deg, #fe78b0, #ffc1da);
  }

  .dot:nth-child(4).active {
    background: linear-gradient(90deg, #ff6b6b, #ffb3b3);
  }

  @media (prefers-reduced-motion: reduce) {
    .dot {
      transition: none !important;
    }
  }
}
</style>