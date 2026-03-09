<template>
  <section id="hero" ref="heroSection" class="hero-container">
    <div class="background-mesh" aria-hidden="true"></div>
    <div class="grid-overlay" aria-hidden="true"></div>

    <div class="content-wrapper">
      <div class="hero-content">
        <div class="text-column">
          <h1 class="hero-title">{{ $t('hero.background_title') }}</h1>
          <h2 class="headline">
            {{ $t('hero.headline.main') }} <br />
            <span class="gradient-text">{{ $t('hero.headline.brand') }}</span>
          </h2>

          <p class="subtext">{{ $t('hero.subtext') }}</p>

          <div class="action-group">
            <button class="btn btn-primary" @click="goToApply">
              <span>{{ $t('hero.buttons.join') }}</span>
              <span class="arrow" aria-hidden="true"><i class="fa-solid fa-angle-right"></i></span>
            </button>
            <button class="btn btn-secondary" @click="scrollToSection('about')">
              <span>{{ $t('hero.buttons.about') }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="visual-column">
        <div class="video-stack-container">
          <div class="hero-top-badge">
            <div class="gradient-badge">
              <span class="badge-inner" v-if="!isMobile">
                <img src="/sparkler.png" alt="Axonode" class="badge-icon" width="30" height="30" />
                {{ $t('hero.welcome') }}
              </span>
            </div>
          </div>

          <div class="video-placeholder-card">
            <video
              ref="videoRef"
              src="/video.mp4"
              class="hero-video"
              autoplay
              loop
              muted
              playsinline
              :preload="isMobile ? 'none' : 'auto'"
            ></video>

            <!-- Controls only rendered on non-touch devices -->
            <div v-if="!isMobile" class="video-controls" aria-label="Video controls">
              <button class="control-btn" @click="togglePlay" :title="isPlaying ? 'Pause' : 'Play'">
                <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
              </button>
              <button class="control-btn" @click="toggleMute" :title="isMuted ? 'Unmute' : 'Mute'">
                <i :class="isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const NAV_OFFSET = 80; // define once — was referenced but never declared in original

const router = useRouter();
const heroSection = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(true);
const isMuted = ref(true);
const isMobile = ref(false);

// ─── Navigation ──────────────────────────────────────────────────────────────

const goToApply = () => router.push('/join');

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[Hero] No element found with id="${id}"`);
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};

// ─── Video controls ───────────────────────────────────────────────────────────

const togglePlay = () => {
  const video = videoRef.value;
  if (!video) return;
  if (video.paused) {
    video.play();
    isPlaying.value = true;
  } else {
    video.pause();
    isPlaying.value = false;
  }
};

const toggleMute = () => {
  const video = videoRef.value;
  if (!video) return;
  video.muted = !video.muted;
  isMuted.value = video.muted;
};

// ─── Responsive / resize ─────────────────────────────────────────────────────

const MOBILE_BREAKPOINT = 768;

// Debounce avoids layout thrashing on every pixel during resize
let resizeTimer: ReturnType<typeof setTimeout> | null = null;
const checkScreen = () => {
  if (resizeTimer !== null) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
  }, 100);
};

// ─── Lifecycle ───────────────────────────────────────────────────────────────

onMounted(() => {
  const video = videoRef.value;
  if (video) isMuted.value = video.muted;

  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;

  // passive: true — never calls preventDefault, allows browser scroll optimisation
  window.addEventListener('resize', checkScreen, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
  if (resizeTimer !== null) clearTimeout(resizeTimer);
});
</script>

<style scoped>
/* ─── Layout ────────────────────────────────────────────────────────────────── */

.hero-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color, #F9FAFB);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  overflow-x: clip;
  z-index: 10;
  padding: 60px 40px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  /* CSS containment: isolates paint/layout from the rest of the page */
  contain: layout style;
}

/* ─── Backgrounds ────────────────────────────────────────────────────────────── */

.background-mesh {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(at 100% 0%,  rgba(144, 242, 255, 0.4) 0px, transparent 40%),
    radial-gradient(at 0%   100%, rgba(254, 120, 178, 0.4) 0px, transparent 40%);
  filter: blur(60px);
  z-index: 1;
  pointer-events: none;
  /* Static — no will-change needed */
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right,  rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 2;
  pointer-events: none;
}

html.dark .grid-overlay {
  background-image:
    linear-gradient(to right,  rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

/* ─── Content ────────────────────────────────────────────────────────────────── */

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1530px;
  width: 100%;
  padding-left: 8rem;
  padding-right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-content { flex: 1.2; }

.hero-title {
  font-size: 8rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: -4rem;
  left: 6rem;
  z-index: -1;
  user-select: none;
  /* Pure text, no GPU layer needed */
}

html.dark .hero-title { color: rgba(255, 255, 255, 0.05); }

.text-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
}

.headline {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  color: #111;
  margin-bottom: 24px;
}

html.dark .headline { color: #fff; }

.gradient-text {
  background: linear-gradient(to right, #bb85df, #fe78b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtext {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #4B5563;
  margin-bottom: 48px;
}

html.dark .subtext { color: #9CA3AF; }

/* ─── Buttons ────────────────────────────────────────────────────────────────── */

.action-group {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 16px 32px;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #bb85df 0%, #fe78b2 100%);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(254, 120, 178, 0.3);
}

.btn-primary .arrow {
  transition: transform 0.3s ease;
}

/* Hover animations — desktop/pointer only */
@media (hover: hover) and (pointer: fine) {
  .btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px rgba(254, 120, 178, 0.5);
  }

  .btn-primary:hover .arrow {
    transform: translateX(4px);
  }

  .btn-secondary:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: translateY(-3px) scale(1.02);
  }

  html.dark .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* Video card hover */
  .video-stack-container:hover::before {
    transform: translateX(-55px) rotate(-5deg);
  }

  .video-stack-container:hover::after {
    transform: translateX(55px) rotate(5deg);
  }

  .video-stack-container:hover .video-placeholder-card {
    transform: scale(1.02);
  }

  /* Control buttons */
  .control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
    border-color: #fe78b2;
  }

  /* Show controls on card hover */
  .video-placeholder-card:hover .video-controls {
    opacity: 1;
    visibility: visible;
  }
}

/* ─── Reduced motion ─────────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .btn,
  .btn-primary .arrow,
  .video-stack-container::before,
  .video-stack-container::after,
  .video-placeholder-card,
  .gradient-badge,
  .control-btn {
    transition: none !important;
    animation: none !important;
  }
}

/* ─── Secondary button ────────────────────────────────────────────────────────── */

.btn-secondary {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #111;
}

html.dark .btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* ─── Badge ──────────────────────────────────────────────────────────────────── */

.hero-top-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  z-index: 20;
}

.gradient-badge {
  padding: 2px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #bb85df, #8dedf5, #fe78b2);
  background-size: 200% auto;
  animation: gradientFlow 3s linear infinite;
  /* Promote to GPU layer — it animates continuously */
  will-change: background-position;
}

@keyframes gradientFlow {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0%   50%; }
}

.badge-inner {
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 20px;
  border-radius: 9999px;
  background: #ffffff;
  color: #111;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  position: relative;
}

.badge-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  position: absolute;
  top: -12px;
  left: -12px;
  transform: rotate(-10deg);
  z-index: 10;
}

html.dark .badge-inner {
  background: #080808;
  color: #fff;
}

/* ─── Visual column / video ──────────────────────────────────────────────────── */

.visual-column {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.video-stack-container {
  width: 100%;
  max-width: 680px;
  aspect-ratio: 16 / 9;
  position: relative;
}

.video-stack-container::before,
.video-stack-container::after {
  content: '';
  position: absolute;
  top: 8%;
  left: 5%;
  width: 90%;
  height: 84%;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  z-index: 0;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.video-stack-container::before {
  border: 1.5px solid rgba(138, 138, 138, 0.5);
  background: rgba(138, 138, 138, 0.15);
  transform: translateX(-45px) rotate(-3deg);
}

.video-stack-container::after {
  border: 1.5px solid rgba(138, 138, 138, 0.5);
  background: rgba(138, 138, 138, 0.15);
  transform: translateX(45px) rotate(3deg);
}

.video-placeholder-card {
  width: 100%;
  height: 100%;
  background: transparent;
  border: 1.5px solid #ffffff;
  border-radius: 24px;
  /* Only transition transform — avoids triggering paint on box-shadow */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 0 10px rgba(254, 120, 178, 0.1);
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 15;
}

.control-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  padding: 0;
}

.control-btn i {
  font-size: 1.1rem;
}

.video-placeholder-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(254, 120, 178, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */

@media (max-width: 1024px) {
  .content-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 100px;
  }

  .hero-title {
    font-size: 6rem;
    left: 2rem;
  }

  .headline { font-size: 3rem; }

  .visual-column {
    width: 100%;
    margin-top: 40px;
    justify-content: center;
  }

  .video-stack-container { max-width: 100%; }

  /* Disable stacked card pseudo-elements on tablet — saves compositing layers */
  .video-stack-container::before,
  .video-stack-container::after {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-title { display: none; }

  .headline { font-size: 2.5rem; }

  .subtext { font-size: 1.1rem; }

  .action-group {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  /* Kill backdrop-filter on mobile — expensive on low-end GPUs */
  .video-placeholder-card,
  .btn-secondary {
    backdrop-filter: none;
  }
}
</style>