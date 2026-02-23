<template>
  <section id="homepage" ref="heroSection" class="hero-container">
    <video 
      ref="heroVideo"
      autoplay 
      loop 
      muted 
      playsinline 
      class="hero-bg-video" 
    >
      <source src="../assets/a.webm" type="video/webm">
    </video>

    <div class="background-mesh"></div>
    
    <!-- Grid Background -->
    <div class="grid-overlay"></div>

    <div class="content-wrapper">
      <div class="hero-content">
        <div class="text-column">
          <h1 class="hero-title">HERO</h1>
          <h2 class="headline">
            Meet With <br />
            <span class="gradient-text">Axonode</span>
          </h2>

          <p class="subtext">
            We are a welcoming community uniting our skills to share knowledge, create projects, and have fun together.
            Join us to connect with like-minded individuals!
          </p>

          <div class="action-group">
            <button class="btn btn-primary" @click="scrollToSection('#about')">About Us</button>
            <button class="btn btn-secondary">
              <span>Join Us</span>
              <span class="arrow"><i class="fa-solid fa-angle-right"></i></span>
            </button>
          </div>
        </div>
      </div>

      <div class="right-column-placeholder"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const heroSection = ref(null);
const heroVideo = ref(null);
let observer = null;

onMounted(() => {
  // Intersection Observer to pause video when not visible
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (heroVideo.value) {
        if (entry.isIntersecting) {
          heroVideo.value.play();
        } else {
          heroVideo.value.pause();
        }
      }
    });
  }, { threshold: 0.1 });

  if (heroSection.value) {
    observer.observe(heroSection.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const scrollToSection = (id) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
  min-height: 105vh;
  background-color: var(--bg-color, #F9FAFB);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible; /* Allow intersection card to spill into next section */
  overflow-x: clip; /* Prevent horizontal scrollbars from background elements */
  z-index: 10; /* Ensure this section stays above the one below it */
  padding: 60px 40px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.hero-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 99; /* User explicitly set this in last turn */
  will-change: transform;
}

.background-mesh {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(at 100% 0%, rgba(144, 242, 255, 0.4) 0px, transparent 40%),
    radial-gradient(at 0% 100%, rgba(254, 120, 178, 0.4) 0px, transparent 40%);
  filter: blur(60px); /* Slightly reduced blur for performance */
  z-index: 1;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 2;
  pointer-events: none;
}

html.dark .grid-overlay {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  width: 100%;
  padding-left: 8rem;
  pointer-events: none;
}

.hero-content {
  pointer-events: auto;
}

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
}

html.dark .hero-title {
  color: rgba(255, 255, 255, 0.05);
}

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

html.dark .headline {
  color: #fff;
}

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

html.dark .subtext {
  color: #9CA3AF;
}

.action-group {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 16px 32px;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #111;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

html.dark .btn-primary {
  background: #fff;
  color: #111;
}

.btn-secondary {
  background: transparent;
  border: 1px solid #E5E7EB;
  color: #111;
}

html.dark .btn-secondary {
  border-color: rgba(255,255,255,0.2);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(0,0,0,0.02);
  border-color: #111;
}

html.dark .btn-secondary:hover {
  background: rgba(255,255,255,0.05);
  border-color: #fff;
}


@media (max-width: 1024px) {
  .content-wrapper {
    padding-left: 2rem;
  }
  .hero-title {
    font-size: 6rem;
    left: 2rem;
  }
  .headline {
    font-size: 3rem;
  }
}

@media (max-width: 640px) {
  .hero-title {
    display: none;
  }
  .headline {
    font-size: 2.5rem;
  }
  .subtext {
    font-size: 1.1rem;
  }
  .action-group {
    flex-direction: column;
    width: 100%;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
}
.intersection-card-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-left: 8rem; /* Align with content-wrapper padding */
  box-sizing: border-box;
  transform: translateY(70%);
  z-index: 9999;
  pointer-events: none;
}

.intersection-card {
  width: 600px;
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid #bb85df;
  border-radius: 20px;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(187, 133, 223, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

html.dark .intersection-card {
  background: rgba(17, 24, 39, 0.4);
  border-color: rgba(187, 133, 223, 0.6);
}

@media (max-width: 1024px) {
  .intersection-card-wrapper {
    padding-left: 2rem;
  }
  .intersection-card {
    width: 80%;
    max-width: 400px;
  }
}

@media (max-width: 640px) {
  .intersection-card-wrapper {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: center;
  }
  .intersection-card {
    width: 100%;
  }
}
</style>
