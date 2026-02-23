<template>
  <section class="about-section" id="about">
    
    <div class="background-mesh"></div>
    <canvas ref="canvasRef" class="spline-bg"></canvas>
    <div class="container">
      <div class="header-content">
        <h2 class="title">Building the <span class="gradient-text">Future Together</span></h2>
      </div>

      <div class="cards-grid">
        <div class="feature-card">
          <div class="icon-wrapper blue">
            <i class="fa-solid fa-code"></i>
          </div>
          <h3>Software</h3>
          <p>We welcome all developers, from beginners to experts, to collaborate and share their knowledge and experiences!</p>
        </div>

        <div class="feature-card">
          <div class="icon-wrapper purple">
            <i class="fa-solid fa-paint-brush"></i>
          </div>
          <h3>Designers</h3>
          <p>We welcome all designers, from illustrators to 3D artists, to collaborate and share their art and ideas!</p>
        </div>

        <div class="feature-card">
          <div class="icon-wrapper pink">
            <i class="fa-solid fa-people-group"></i>
          </div>
          <h3>Entrepreneurs</h3>
          <p>Meet with like-minded people and build meaningful connections within our community!</p>
        </div>
        <div class="feature-card">
          <div class="icon-wrapper orange">
            <i class="fa-solid fa-lightbulb"></i>
          </div>
          <h3>And What Else?</h3>
          <p>Whatever you're passionate about, join us in building a vibrant community of creators and innovators!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

.about-section {
  position: relative;
  padding: 80px 0;
  min-height: auto;
  display: block;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  width: 100%;
}

.spline-bg {
  position: absolute;
  top: 0;
  left: 55rem;
  width: 100%;
  height: 100%;
  z-index: 10; /* En altta */
  
}

.background-mesh {
  position: absolute;
  left: -10%;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: var(--bg-color);

}

.feature-card, 
.header-content {
  pointer-events: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 40px 20px;
  pointer-events: none; 
}

.header-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px auto;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

html.dark .title {
  color: #f1f5f9;
}

.gradient-text {
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1.1rem;
  color: #4B5563;
  line-height: 1.6;
}

html.dark .description {
  color: #cbd5e1;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}


.feature-card {
  position: relative;
  padding: 40px 30px;
  border-radius: 16px;

  /* Glass */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.25);

  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 246, 227, 0.35),
    rgba(31, 16, 3, 0.233)
  );
  opacity: 0.6;
  pointer-events: none;
}

html.dark .feature-card {
  background: linear-gradient(
    135deg,
    rgba(15, 10, 0, 0.35),
    rgba(32, 18, 4, 0.137)
  );
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
}

.feature-card:hover::before {
  opacity: 0.85;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 5px;
}

.icon-wrapper.blue { background: rgba(120, 222, 231, 0.15); color: #2ebbc5; }
.icon-wrapper.purple { background: rgba(149, 176, 235, 0.15); color: #6b8cd4; }
.icon-wrapper.pink { background: rgba(254, 120, 176, 0.15); color: #e04b8b; }
.icon-wrapper.orange { background: rgba(255, 165, 0, 0.15); color: #ff8c00; }

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
}

html.dark .feature-card h3 {
  color: #e2e8f0;
}

.feature-card p {
  color: #6B7280;
  line-height: 1.5;
  font-size: 0.95rem;
}

html.dark .feature-card p {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .title { font-size: 2.25rem; }
}

@media (max-width: 420px) {
  .cards-grid { grid-template-columns: 1fr; gap: 18px; }
  .feature-card { padding: 20px 14px; }
  .container { padding: 20px 12px; }
}

</style>