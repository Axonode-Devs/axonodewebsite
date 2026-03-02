<template>
  <div class="about-page">
    <Navbar />

    <header class="about-hero">
      <div class="hero-background"></div>
      <div class="hero-inner">
        <div class="hero-badge"><- About Us -></div>
        <h1>Building Together, Growing Together</h1>
        <p class="hero-description">Axonode is where developers, designers, and everyone with a passion connect to learn, collaborate, and create projects that matter.</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">Community</span>
            <span class="stat-label">Driven</span>
          </div>
          <div class="stat">
            <span class="stat-value">Growing</span>
            <span class="stat-label">Focused</span>
          </div>
          <div class="stat">
            <span class="stat-value">Mentor</span>
            <span class="stat-label">Oriented</span>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section class="goals-section">
        <div class="container">
          <div class="section-header">
            <h2>Our Mission</h2>
            <p class="intro">We believe in the power of community driven learning and collaborative building. Here's how we make it happen.</p>
          </div>

          <div class="goals-grid">
            <div class="goal-card">
              <div class="goal-icon">
                <div class="icon-bg">📚</div>
              </div>
              <h3>Learn & Mentor</h3>
              <p>Host workshops, and study groups so everyone beginners to experts can learn and teach together.</p>
              <a href="#" class="goal-link">Learn more →</a>
            </div>

            <div class="goal-card">
              <div class="goal-icon">
                <div class="icon-bg">🛠️</div>
              </div>
              <h3>Gain Skills</h3>
              <p>Participate in real projects in small cross disciplinary teams to gain practical experience and ship portfolio pieces.</p>
              <a href="#" class="goal-link">Learn more →</a>
            </div>

            <div class="goal-card">
              <div class="goal-icon">
                <div class="icon-bg">🌟</div>
              </div>
              <h3>Connect & Grow</h3>
              <p>Foster meaningful professional relationships, collaborations, and opportunities inside a friendly community.</p>
              <a href="#" class="goal-link">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      <section class="howto-section">
        <div class="container">
          <div class="section-header">
            <h2>Getting Started</h2>
            <p class="intro">Join the community in just three simple steps.</p>
          </div>
          <div class="steps-wrapper">
            <ul class="steps">
              <li>
                <span class="step-number">1</span>
                <div class="step-content">
                  <strong>Share Your Story</strong>
                  <p>Send your application form and tell us about your interests and goals!</p>
                </div>
              </li>
              <li>
                <span class="step-number">2</span>
                <div class="step-content">
                  <strong>Find Your Team</strong>
                  <p>Connect with like-minded developers to form groups or join existing projects.</p>
                </div>
              </li>
              <li>
                <span class="step-number">3</span>
                <div class="step-content">
                  <strong>Glow Together</strong>
                  <p>Create amazing projects, share progress, get feedback, and grow together with the community.</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="cta-row">
            <button class="btn-primary" @click="goToApply">Apply Now</button>
            <button class="btn-secondary" @click="scrollTo('#about')">Explore Community</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';


const router = useRouter();

const goToApply = () => router.push('/join');

const scrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
:root {
  --accent-color: #78dee7;
  --accent-secondary: #95b0eb;
  --text-primary: #fff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
}

.about-page {
  width: 100%;
  overflow: hidden;
}

/* HERO SECTION */
.about-hero {
  position: relative;
  padding: 100px 20px 140px 20px;
  background: linear-gradient(135deg, rgba(120, 222, 231, 0.08) 0%, rgba(149, 176, 235, 0.05) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(187, 133, 223, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(120, 222, 231, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-block;
  background: rgba(120, 222, 231, 0.15);
  border: 1px solid rgba(120, 222, 231, 0.3);
  color: var(--accent-color);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
}

.about-hero h1 {
  font-size: 3.5rem;
  margin: 0 0 20px 0;
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(135deg, #78dee7 0%, #95b0eb 50%, #bb85df 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0 0 48px 0;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 48px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* MAIN CONTENT */
main {
  width: 100%;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  margin-bottom: 60px;
  text-align: center;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.3px;
}

.intro {
  color: var(--text-secondary);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* GOALS SECTION */
.goals-section {
  padding: 100px 20px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.01));
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.goal-card {
  padding: 40px 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.6s ease-out forwards;
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.goal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.goal-card:nth-child(1) {
  animation-delay: 0.1s;
}

.goal-card:nth-child(2) {
  animation-delay: 0.2s;
}

.goal-card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.goal-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(120, 222, 231, 0.5);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(120, 222, 231, 0.15);
}

.goal-card:hover::before {
  opacity: 1;
}

.goal-icon {
  margin-bottom: 20px;
}

.icon-bg {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(120, 222, 231, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(120, 222, 231, 0.2);
  transition: all 0.3s ease;
}

.goal-card:hover .icon-bg {
  background: rgba(120, 222, 231, 0.15);
  border-color: rgba(120, 222, 231, 0.4);
  transform: scale(1.05);
}

.goal-card h3 {
  margin: 0 0 12px 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
}

.goal-card p {
  margin: 0 0 20px 0;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.goal-link {
  display: inline-block;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.goal-link:hover {
  color: var(--accent-secondary);
  transform: translateX(4px);
}

/* HOW-TO SECTION */
.howto-section {
  padding: 100px 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), transparent);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.steps-wrapper {
  margin-bottom: 60px;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 28px;
}

.steps li {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 32px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.steps li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--accent-color), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.steps li:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(120, 222, 231, 0.4);
  transform: translateX(8px);
}

.steps li:hover::before {
  opacity: 1;
}

.step-number {
  min-width: 56px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  border-radius: 50%;
  color: #000;
  font-weight: 800;
  font-size: 1.3rem;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(120, 222, 231, 0.2);
}

.step-content strong {
  display: block;
  font-size: 1.15rem;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 700;
}

.step-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* CTA BUTTONS */
.cta-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  letter-spacing: 0.3px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  color: #000;
  box-shadow: 0 12px 24px rgba(120, 222, 231, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(120, 222, 231, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--accent-color);
  border: 1.5px solid var(--accent-color);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(120, 222, 231, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(120, 222, 231, 0.15);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .about-hero {
    padding: 60px 20px 100px 20px;
    min-height: auto;
  }

  .about-hero h1 {
    font-size: 2.2rem;
    margin-bottom: 16px;
  }

  .hero-description {
    font-size: 1.05rem;
    margin-bottom: 32px;
  }

  .hero-stats {
    gap: 40px;
    margin-top: 32px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .intro {
    font-size: 1rem;
  }

  .goals-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .goal-card {
    padding: 28px 20px;
  }

  .steps li {
    gap: 20px;
    padding: 24px 20px;
  }

  .step-number {
    min-width: 48px;
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
  }

  .cta-row {
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .about-hero {
    padding: 50px 16px 80px 16px;
  }

  .about-hero h1 {
    font-size: 1.8rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .hero-stats {
    gap: 30px;
    flex-wrap: wrap;
  }

  .goals-grid {
    gap: 16px;
  }

  .goal-card {
    padding: 20px 16px;
  }

  .steps li {
    flex-direction: column;
    gap: 16px;
    padding: 20px 16px;
  }
}
</style>
