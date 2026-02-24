<template>
  <div class="about-page">
    <Navbar />

    <header class="about-hero">
      <div class="hero-inner">
        <h1>About Axonode</h1>
        <p class="lead">We bring creators, builders and thinkers together to learn, ship projects, and grow—together.</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="goToApply">Join Us</button>
          <button class="btn-ghost" @click="scrollTo('#about')">Learn More</button>
        </div>
      </div>
    </header>

    <main>
      <About />

      <section class="goals-section">
        <div class="container">
          <h2>Our Goals</h2>
          <p class="intro">Axonode is a community-first initiative focused on three practical goals that help members level up and build together.</p>

          <div class="goals-grid">
            <div class="goal-card">
              <h3>Learn & Mentor</h3>
              <p>Host workshops, code-alongs and study groups so everyone—beginners to experts—can learn and teach.</p>
            </div>

            <div class="goal-card">
              <h3>Build Projects</h3>
              <p>Create real projects in small cross-disciplinary teams to gain practical experience and ship portfolio pieces.</p>
            </div>

            <div class="goal-card">
              <h3>Connect & Grow</h3>
              <p>Foster meaningful professional relationships, collaborations, and opportunities inside a friendly community.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="howto-section">
        <div class="container">
          <h2>How to get involved</h2>
          <ul class="steps">
            <li><strong>1.</strong> Apply or drop in to our chat — tell us what you like to build.</li>
            <li><strong>2.</strong> Join a group or start a project thread—find collaborators.</li>
            <li><strong>3.</strong> Share progress, get feedback, and help others grow.</li>
          </ul>
          <div class="cta-row">
            <button class="btn-primary" @click="goToApply">Apply Now</button>
            <button class="btn-outline" @click="scrollTo('#about')">Explore Community</button>
          </div>
        </div>
      </section>

      <Founders />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import About from '../components/About.vue';
import Founders from '../components/Founders.vue';
import ContactSection from '../components/ContactSection.vue';

const router = useRouter();

const goToApply = () => router.push('/form');

const scrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
.about-hero {
  padding-top: 100px;
  padding-bottom: 60px;
  background: linear-gradient(180deg, rgba(120,222,231,0.08), transparent 60%);
  display: flex;
  align-items: center;
}
.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: left;
}
.about-hero h1 {
  font-size: 2.6rem;
  margin: 0 0 12px 0;
  font-weight: 800;
}
.lead { color: #374151; font-size: 1.125rem; margin-bottom: 18px; }
.hero-actions { display:flex; gap:12px; }
.btn-primary { background:#111; color:#fff; padding:12px 18px; border-radius:10px; border:none; cursor:pointer; }
.btn-ghost { background:transparent; border:1px solid rgba(0,0,0,0.08); padding:10px 16px; border-radius:10px; cursor:pointer; }

.goals-section { padding: 60px 20px; }
.goals-section .container { max-width:1100px; margin:0 auto; }
.goals-section h2 { font-size:1.75rem; margin-bottom:6px; }
.goals-section .intro { color:#6b7280; margin-bottom:24px; }
.goals-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px; }
.goal-card { padding:20px; border-radius:12px; background:rgba(255,255,255,0.04); backdrop-filter:blur(8px); border:1px solid rgba(0,0,0,0.06); }
.goal-card h3 { margin:0 0 8px 0; font-size:1.1rem; }

.howto-section { padding: 40px 20px; background: linear-gradient(180deg, transparent, rgba(254,120,178,0.03)); }
.howto-section .steps { list-style:none; padding:0; margin:12px 0 20px 0; color:#374151; }
.howto-section .steps li { margin:10px 0; display:flex; gap:12px; align-items:flex-start; }
.cta-row { display:flex; gap:12px; }

@media (max-width:720px) {
  .hero-inner { text-align:center; }
  .hero-actions { justify-content:center; flex-direction:column; }
}
</style>
