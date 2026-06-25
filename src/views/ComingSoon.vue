<template>
  <div class="coming-soon-page">
    <Navbar />

    <div class="container">
      <div class="content">

        <!-- Animated orbs -->
        <div class="orb orb--teal" />
        <div class="orb orb--pink" />

        <!-- Tag -->
        <p class="eyebrow">
          <span class="eyebrow-line" />
          {{ $t('projects.soon.tag') }}
          <span class="eyebrow-line" />
        </p>

        <!-- Headline -->
        <h1>
          <span class="gradient-text">{{ $t('projects.soon.title') }}</span>
        </h1>

        <p class="sub">{{ $t('projects.soon.leftDesc') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.coming-soon-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  overflow: hidden;
  position: relative;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Content ──────────────────────────────────────────────────────────────── */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
}

/* ── Orbs ─────────────────────────────────────────────────────────────────── */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}
.orb--teal {
  width: 600px;
  height: 600px;
  background: var(--accent-color);
  top: -100px;
  left: -200px;
  animation: driftA 14s ease-in-out infinite alternate;
}
.orb--pink {
  width: 500px;
  height: 500px;
  background: var(--accent-secondary);
  bottom: -100px;
  right: -150px;
  animation: driftB 18s ease-in-out infinite alternate-reverse;
}

@keyframes driftA {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(60px, 40px) scale(1.1); }
}
@keyframes driftB {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-40px, -30px) scale(1.08); }
}

/* ── Eyebrow ──────────────────────────────────────────────────────────────── */
.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-color);
  opacity: 0.4;
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.eyebrow-line {
  display: block;
  width: 28px;
  height: 0.5px;
  background: currentColor;
}

/* ── Headline ─────────────────────────────────────────────────────────────── */
h1 {
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem;
}

.gradient-text {
  background: linear-gradient(
    135deg,
    var(--accent-color)     0%,
    var(--accent-secondary) 50%,
    var(--accent-color)     100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}

/* ── Subtitle ─────────────────────────────────────────────────────────────── */
.sub {
  font-size: 15px;
  color: var(--text-color);
  opacity: 0.5;
  max-width: 420px;
  line-height: 1.75;
  margin: 0 0 2.5rem;
}

/* ── Status pill ──────────────────────────────────────────────────────────── */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.6;
  border: 0.5px solid var(--border-color);
  background: var(--hover-bg);
  padding: 7px 16px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-color);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.75); }
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  h1 { font-size: clamp(2.8rem, 14vw, 4rem); }
  .orb--teal { width: 350px; height: 350px; }
  .orb--pink { width: 300px; height: 300px; }
}
</style>