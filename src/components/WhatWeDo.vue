<template>
  <section class="about-section" id="whatwedo">
    <div class="container">
      <div class="header-content">
        <h2 class="title">
          {{ $t('what_we_do.title.main') }}
          <span class="gradient-text">{{ $t('what_we_do.title.gradient') }}</span>
        </h2>
      </div>

      <div class="cards-grid">
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
    </div>
  </section>
</template>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

/* ─── Section ────────────────────────────────────────────────────────────────── */

.about-section {
  position: relative;
  padding: 80px 0;
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

/* ─── Grid ───────────────────────────────────────────────────────────────────── */

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  perspective: 1000px;
}

/* ─── Cards ──────────────────────────────────────────────────────────────────── */

.feature-card {
  position: relative;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* Only transition transform — avoids triggering paint on box-shadow every frame */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
  z-index: 1;
  display: flex;
}

html.dark .feature-card {
  background: rgba(17, 24, 39, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* backdrop-filter is expensive — only apply where a blur background is actually visible */
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

/* ─── Glow background ────────────────────────────────────────────────────────── */

.card-blue   { --glow-color: #78dee7; }
.card-purple { --glow-color: #95b0eb; }
.card-pink   { --glow-color: #fe78b0; }
.card-orange { --glow-color: #ffa500; }

.glow-bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, var(--glow-color) 0%, transparent 60%);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
  /* Promote to its own compositing layer — rotates continuously */
  will-change: transform;
  animation: rotateGlow 8s linear infinite;
  transition: opacity 0.4s ease;
}

html.dark .glow-bg { opacity: 0.15; }

@keyframes rotateGlow {
  0%   { transform: rotate(0deg)   scale(1);   }
  50%  { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1);   }
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
}

.icon-wrapper.blue   { background: rgba(120, 222, 231, 0.15); color: #2ebbc5; }
.icon-wrapper.purple { background: rgba(149, 176, 235, 0.15); color: #6b8cd4; }
.icon-wrapper.pink   { background: rgba(254, 120, 176, 0.15); color: #e04b8b; }
.icon-wrapper.orange { background: rgba(255, 165, 0,   0.15); color: #ff8c00; }

/* ─── Card typography ────────────────────────────────────────────────────────── */

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
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
    transform: translateY(-10px) scale(1.02);
    z-index: 5;
  }

  .feature-card:hover .glow-bg {
    opacity: 0.35;
    animation-duration: 4s;
  }

  html.dark .feature-card:hover .glow-bg { opacity: 0.5; }

  .card-blue:hover   { box-shadow: 0 20px 50px -10px rgba(120, 222, 231, 0.5); border-color: rgba(120, 222, 231, 0.4); }
  .card-purple:hover { box-shadow: 0 20px 50px -10px rgba(149, 176, 235, 0.5); border-color: rgba(149, 176, 235, 0.4); }
  .card-pink:hover   { box-shadow: 0 20px 50px -10px rgba(254, 120, 176, 0.5); border-color: rgba(254, 120, 176, 0.4); }
  .card-orange:hover { box-shadow: 0 20px 50px -10px rgba(255, 165, 0,   0.5); border-color: rgba(255, 165, 0,   0.4); }

  .feature-card:hover .icon-wrapper {
    animation: bounceIcon 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes bounceIcon {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.2) translateY(-4px); }
    100% { transform: scale(1.05) translateY(-2px); }
  }
}

/* ─── Reduced motion ─────────────────────────────────────────────────────────── */

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
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .title { font-size: 1.1rem; }

  /* Kill glow animation on mobile — continuous GPU paint on 4 elements is costly */
  .glow-bg {
    animation: none;
    will-change: auto;
  }
}

@media (max-width: 640px) {
  /* Remove backdrop-filter entirely on mobile — expensive on low-end GPUs */
  .feature-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

@media (max-width: 420px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .feature-card { padding: 0; }
  .card-content { padding: 30px 20px; }
  .container    { padding: 20px 12px; }
}
</style>