<template>
  <section class="hero-section" id="home">
    <!-- Clean Gray Grid Background -->
    <div class="grid-background"></div>

    <!-- Floating Background Balls -->
    <div class="floating-balls">
      <img src="./assets/ball.png" class="bg-ball ball-1" alt="" />
      <img src="./assets/ball.png" class="bg-ball ball-2" alt="" />
      <img src="./assets/ball.png" class="bg-ball ball-3" alt="" />
    </div>

    <!-- Hero Content -->
    <div class="hero-content">
      <div class="badge">
        <img src="./assets/voltix-logo.png" alt="Voltix Logo" class="badge-logo" />
        VoltX Robotics
      </div>
      <h1 class="hero-title">
        We Are <span class="text-highlight">VoltX</span>
      </h1>
      <p class="hero-subtitle">
        A Türkiye Located FRC Robotics Team. 2026-2027 Season Rookies. We Don’t Spark, We Detonate <i class="fa-solid fa-bolt"></i>
      </p>
      
      <div class="hero-actions">
        <router-link to="/apply" class="btn btn-primary">Get Started <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span></router-link>
        <button class="btn btn-secondary">Documentation</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
  background-color: #ffffff;
}

/* Light Gray Grid */
.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
  z-index: 0;
  
  /* Fade grid at the edges for a smoother look */
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}

.floating-balls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.bg-ball {
  position: absolute;
  opacity: 0.9;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
  animation: float 12s ease-in-out infinite;
}

.ball-1 {
  width: clamp(100px, 15vw, 160px);
  top: 15%;
  left: 8%;
  rotate: -25deg;
  animation-delay: 0s;
}

.ball-2 {
  width: clamp(140px, 20vw, 220px);
  bottom: 12%;
  right: 15%;
  rotate: 75deg;
  animation-duration: 15s;
  animation-delay: -5s;
}

.ball-3 {
  width: clamp(70px, 10vw, 110px);
  top: 30%;
  right: 5%;
  rotate: -120deg;
  animation-duration: 18s;
  animation-delay: -9s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-40px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.badge-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.hero-title {
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  color: #111827;
}

.text-highlight {
  color: #000000;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: #a39ba8;
  max-width: 650px;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2.25rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  text-decoration: none;
}

.btn-primary {
  background: #111827;
  color: white;
  border: none;
}

.btn-primary:hover {  
  background: #F1E234;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn-primary .arrow {
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.btn-primary:hover .arrow {
  transform: translateX(4px);
}

.btn-secondary {
  background: white;
  color: #111827;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .btn {
    width: 100%;
  }
}
</style>
