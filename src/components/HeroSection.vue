<template>
  <section id="homepage" ref="heroSection" class="hero-container">
    <div class="background-mesh"></div>
    
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
            <button class="btn btn-primary" @click="goToAbout">About Us</button>
            <button class="btn btn-secondary" @click="goToApply">
              <span>Join Us</span>
              <span class="arrow"><i class="fa-solid fa-angle-right"></i></span>
            </button>
          </div>
        </div>
      </div>

      <div class="visual-column">
        <div class="video-placeholder-card">
          <img src="/vpreview.jpeg" alt="Video Preview" class="preview-image">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const heroSection = ref(null);

const goToApply = () => {
  router.push('/join');
};
const goToAbout = () => {
  router.push('/about');
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
  overflow: visible; 
  overflow-x: clip; 
  z-index: 10; 
  padding: 60px 40px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
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
  filter: blur(60px); 
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
    linear-gradient(to right, rgba(18, 18, 18, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(18, 18, 18, 0.05) 1px, transparent 1px);
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
  max-width: 1530px; 
  width: 100%;
  padding-left: 8rem;
  padding-right: 0; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-content {
  flex: 1.2; 
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

.visual-column {
  flex: 1;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  position: relative;
}

.video-placeholder-card {
  width: 100%;
  max-width: 680px;
  aspect-ratio: 16 / 9;
  background: transparent; 
  border: 1.5px solid #ffffff; 
  border-radius: 24px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.video-placeholder-card:hover {
  transform: scale(1.02); 
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-placeholder-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(254, 120, 178, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

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
  .headline {
    font-size: 3rem;
  }
  .visual-column {
    width: 100%;
    margin-top: 40px;
    justify-content: center; 
  }
  .video-placeholder-card {
    max-width: 100%;
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
</style>
