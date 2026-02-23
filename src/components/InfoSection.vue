<template>
  <section class="info-section" id="info">
    <div class="background-mesh"></div>
    
    <div class="container">
      <div class="info-grid">
        <div class="text-content">
          <div class="mini-label">THE ECOSYSTEM</div>
          <h2 class="title">Growing <span class="gradient-text">Exponentially</span></h2>
          <p class="description">
            Axonode is constantly evolving. Our diverse community contributes code, design, and ideas daily, creating a ripple effect of innovation across the open-source world.
          </p>
          
          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-number">5+</span>
              <span class="stat-label">Active Projects</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5+</span>
              <span class="stat-label">Contributors</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">2+</span>
              <span class="stat-label">Commits</span>
            </div>
          </div>
        </div>

        <div class="visual-content">
          <div class="info-card main-card">
            <div class="card-icon">
              <i class="fa-solid fa-globe"></i>
            </div>
            <h3>Global Impact</h3>
            <p>Developers from 15+ countries collaborating in real-time.</p>
          </div>

          <div class="info-card sub-card-1">
            <div class="card-icon purple">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <h3>Fast Shipping</h3>
          </div>

          <div class="info-card sub-card-2">
            <div class="card-icon pink">
              <i class="fa-solid fa-heart"></i>
            </div>
            <h3>Open Source</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.info-section {
  position: relative;
  padding: 120px 20px;
  background-color: var(--bg-color);
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.background-mesh {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  background-image: 
    radial-gradient(at 0% 100%, rgba(120, 222, 231, 0.2) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(254, 120, 178, 0.2) 0px, transparent 50%);
  filter: blur(90px);
  z-index: 0;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  width: 100%;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.mini-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #9CA3AF;
  letter-spacing: 0.05em;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 25px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

html.dark .title {
  color: #f1f5f9;
}

.gradient-text {
  background: linear-gradient(90deg, #95b0eb 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1.125rem;
  color: #4B5563;
  line-height: 1.7;
  margin-bottom: 40px;
}

html.dark .description {
  color: #cbd5e1;
}

.stats-row {
  display: flex;
  gap: 50px;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 30px;
}

html.dark .stats-row {
  border-color: rgba(255,255,255,0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
}

html.dark .stat-number {
  color: #fff;
}

.stat-label {
  font-size: 0.9rem;
  color: #6B7280;
  font-weight: 500;
}

.visual-content {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease;
}

html.dark .info-card {
  background: rgba(30, 30, 30, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.3);
}

.main-card {
  z-index: 2;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main-card:hover {
  transform: translate(-50%, -55%);
}

.sub-card-1 {
  z-index: 1;
  width: 200px;
  top: 20%;
  right: 10%;
  padding: 20px;
  animation: float 6s ease-in-out infinite;
}

.sub-card-2 {
  z-index: 3;
  width: 220px;
  bottom: 15%;
  left: 5%;
  padding: 20px;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.card-icon {
  width: 48px;
  height: 48px;
  background: rgba(120, 222, 231, 0.2);
  color: #2ebbc5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 15px;
}

.card-icon.purple { background: rgba(149, 176, 235, 0.2); color: #6b8cd4; }
.card-icon.pink { background: rgba(254, 120, 176, 0.2); color: #e04b8b; }

.info-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

html.dark .info-card h3 { color: #f1f5f9; }

.info-card p {
  font-size: 0.9rem;
  color: #6B7280;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 960px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
  
  .stats-row {
    justify-content: center;
  }
  
  .text-content {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  
  .visual-content {
    height: 400px;
  }
  
  .sub-card-1 { right: 0; }
  .sub-card-2 { left: 0; }
}
</style>