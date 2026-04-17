<script setup>
// About Component for VoltX Robotics
</script>

<template>
  <section class="about-section" id="about">
    <div class="about-container">
      
      <!-- Left Content -->
      <div class="about-content">
        <div class="section-tag">About Us</div>
        <h2 class="about-title">
          Building the Future,<br> 
          <span class="highlight">One Robot at a Time.</span>
        </h2>
        
        <p class="about-description">
          We are <strong>VoltX Robotics</strong>, a passionate and dedicated team striving for excellence in robotics. 
          Our mission is to innovate, learn, and inspire the next generation through hands-on engineering and teamwork.
        </p>

        <p class="about-description secondary">
          By combining mechanical design, software development, and electrical engineering, we turn abstract ideas into functional realities on the field. We believe in overcoming challenges together and leaving a lasting impact in our community.
        </p>

        <div class="stats-container">
          <div class="stat-item">
            <h3 class="stat-number">#1</h3>
            <span class="stat-label">Motivation</span>
          </div>
          <div class="stat-item">
            <h3 class="stat-number">100%</h3>
            <span class="stat-label">Dedication</span>
          </div>
          <div class="stat-item">
            <h3 class="stat-number">∞</h3>
            <span class="stat-label">Innovation</span>
          </div>
        </div>
      </div>

      <!-- Right Graphic / Image -->
      <div class="about-visual">
        <div class="visual-wrapper">
          <div class="shape shape-main"></div>
          <div class="shape shape-accent"></div>
          <div class="shape shape-dots"></div>
          
          <div class="image-box">
             <i class="fa-solid fa-robot"></i>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-section {
  background-color: #ffffff;
  padding: 8rem 2rem;
  overflow: hidden;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

/* --- LEft Content --- */
.about-content {
  flex: 1;
  max-width: 600px;
}

.section-tag {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a39ba8;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2rem;
}

.section-tag::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 2px;
  background-color: #f1e234;
}

.about-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: #272d2d;
  margin-bottom: 1.5rem;
}

.about-title .highlight {
  position: relative;
  display: inline-block;
  z-index: 1;
}

.about-title .highlight::after {
  content: "";
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: rgba(241, 226, 52, 0.4);
  z-index: -1;
  transform: skewX(-15deg);
}

.about-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #272d2d;
  margin-bottom: 1rem;
}

.about-description.secondary {
  color: #a39ba8;
  font-size: 1rem;
  margin-bottom: 2.5rem;
}

.stats-container {
  display: flex;
  gap: 3rem;
  border-top: 1px solid rgba(163, 155, 168, 0.2);
  padding-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.25rem;
  font-weight: 800;
  color: #272d2d;
  margin: 0 0 0.25rem 0;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #a39ba8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* --- Right Visual --- */
.about-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.visual-wrapper {
  position: relative;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1;
}

.shape {
  position: absolute;
  border-radius: 24px;
}

.shape-main {
  width: 80%;
  height: 80%;
  right: 0;
  top: 0;
  background-color: #f1e234;
  transform: rotate(6deg);
  z-index: 1;
  transition: transform 0.5s ease;
}

.shape-accent {
  width: 60%;
  height: 60%;
  left: 0;
  bottom: 0;
  background-color: #a39ba8;
  opacity: 0.15;
  border-radius: 50%;
  z-index: 2;
}

.shape-dots {
  width: 100px;
  height: 100px;
  left: -20px;
  top: -20px;
  background-image: radial-gradient(#a39ba8 2px, transparent 2px);
  background-size: 15px 15px;
  z-index: 3;
}

.image-box {
  position: absolute;
  top: 5%;
  right: 5%;
  width: 85%;
  height: 85%;
  background-color: #272d2d;
  border-radius: 20px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(39, 45, 45, 0.2);
  transition: transform 0.5s ease;
}

.image-box i {
  font-size: 8rem;
  color: #f1e234;
  opacity: 0.8;
}

/* Hover Effects */
.visual-wrapper:hover .shape-main {
  transform: rotate(10deg) scale(1.05);
}

.visual-wrapper:hover .image-box {
  transform: translate(-10px, -10px);
}

/* Responsive */
@media (max-width: 992px) {
  .about-container {
    flex-direction: column;
    text-align: center;
  }

  .about-content {
    margin: 0 auto;
  }

  .section-tag {
    padding-left: 0;
  }

  .section-tag::before {
    display: none;
  }

  .stats-container {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .about-title {
    font-size: 2.25rem;
  }
  
  .stats-container {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
}
</style>
