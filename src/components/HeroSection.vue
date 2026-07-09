<template>
  <section id="hero" class="hero-container">
    <div class="grid-text-bg" aria-hidden="true"></div>
    <div class="grid-bottom-bg" aria-hidden="true"></div>
    <div class="bottom-gradient" aria-hidden="true"></div>

    <div class="content-wrapper">
      <div class="hero-content">
        <div class="text-column">
          
          <h1 class="headline" :class="{ revealed: textRevealed }">
            <span class="reveal-line">
              <span class="white-text">{{ $t("hero.headline.main") }}</span>
            </span>
            <br />
            <span class="reveal-line" style="--delay: 0.12s">
              <span class="gradient-text">{{ $t("hero.headline.brand") }}</span>
            </span>
          </h1>

          <p class="subtext" :class="{ revealed: textRevealed }">
            {{ $t("hero.subtext") }}
          </p>

          <div class="action-group" :class="{ revealed: textRevealed }">
            <button class="btn btn-primary" @click="goToRoute('join')">
              {{ $t("hero.buttons.about") }}
            </button>
            <button class="btn btn-text" @click="scrollToSection('about')">
              {{ $t("hero.buttons.learn") }}
            </button>
          </div>
        </div>
      </div>

      <div class="visual-column">
        <div class="video-container">
          <video
            src="/video.mp4"
            class="hero-video"
            autoplay
            loop
            muted
            playsinline
          ></video>
        </div>
      </div>
    </div>
    
    <div class="marquee-wrapper">
      <TeamMarquee />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TeamMarquee from './TeamMarquee.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const NAV_OFFSET = 80;
const textRevealed = ref(false);

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};

const goToRoute = (route: string) => {
  router.push(route);
}

onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      textRevealed.value = true;
    }, 100);
  });
});
</script>

<style scoped>

.hero-container {
  background-color: #141414;
  min-height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 80px 40px;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.grid-text-bg {
  position: absolute;
  top: 10%;
  left: -23rem;
  width: 90%;
  height: 65%;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.082) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.082) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 15%);
  mask-image: radial-gradient(circle at center, black 0%, transparent 42%);
  z-index: 1;
  pointer-events: none;
}

/*.grid-bottom-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 100%);
  mask-image: linear-gradient(to top, black 0%, transparent 100%);
  z-index: 1;
  pointer-events: none;
}*/

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to top, #fe78b00a 0%, #141414 80%, transparent 100%);
  z-index: 15;
  pointer-events: none;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 80px;
  z-index: 10;
  position: relative;
  margin-bottom: 6rem;
}

.hero-content {
  flex: 1;
  max-width: 500px;
}

.dots-container {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot-cyan { background-color: #78dee7; }
.dot-lavender { background-color: #9d8df1; }
.dot-pink { background-color: #ff7ab8; }

.reveal-line {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}

.reveal-line > span,
.reveal-line > .gradient-text {
  display: inline-block;
  transform: translateY(110%);
  opacity: 0;
  transition:
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.headline.revealed .reveal-line > span,
.headline.revealed .reveal-line > .gradient-text {
  transform: translateY(0);
  opacity: 1;
}

.subtext {
  color: var(--text-color2);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
  font-weight: 280;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
}

.subtext.revealed {
  opacity: 1;
  transform: translateY(0);
}

.action-group {
  display: flex;
  align-items: center;
  gap: 24px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease 0.6s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s;
}

.action-group.revealed {
  opacity: 1;
  transform: translateY(0);
}


.headline {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 25px;
  letter-spacing: -0.03em;
  font-family: 'Coolvetica', sans-serif;
}

.white-text {
  color: var(--text-color);
  font-family: 'Coolvetica', sans-serif;
  letter-spacing: 1px;
}

.gradient-text {
  background: linear-gradient(90deg, #78dee7, #a59ce6, #fe78b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Coolvetica', sans-serif;
  letter-spacing: 2px;
}

.gradient-text-cyan {
  color: #78dee7;
}

.btn {
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(45deg, #fe78b0, #fe78e1);
  color: var(--text-color);
  padding: 10px 30px;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

.btn-text {
  background: transparent;
  color: var(--text-color);
  padding: 14px 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 280;
}

.visual-column {
  flex: 1.3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.video-container {
  width: 80%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.marquee-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 20;
}

@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    padding: 40px 20px;
    gap: 60px;
  }

  .subtex{
    font-size: 12px;
    line-height: 0px;
  }
  
  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  .text-column {
    align-items: center;
  }

  .headline {
    font-size: 4rem;
  }

  .visual-column {
    width: 100%;
  }

  .video-container {
    max-width: 100%;
    display: none;
  }
}

@media (max-width: 768px) {
  .headline {
    font-size: 3rem;
  }
  .subtex{
    font-size: 12px;
    line-height: 0px;
  }
  .mock-ui-layout {
    flex-direction: column;
    padding: 30px 20px;
  }

  p{
    font-size: 12px;
    line-height: 0px;
  }
  
  .mock-title {
    font-size: 2.5rem;
  }

  .video-container {
    aspect-ratio: auto;
    min-height: 250px;
  }
}

@media (max-width: 480px) {
  .headline {
    font-size: 2.5rem;
  }
  p{
    font-size: 12px;
    line-height: 0px;
  }
  .action-group {
    flex-direction: column;
    width: 100%;
  }
  .btn-primary, .btn-text {
    width: 100%;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal-line > span,
  .reveal-line > .gradient-text,
  .subtext,
  .action-group {
    transition: none;
    transform: none;
    opacity: 1;
  }
}
</style>