<template>
  <div class="projects-page">
    <Navbar />

    <div class="container">

      <!-- Hero -->
      <section class="hero">
        <p class="eyebrow">
          <span class="eyebrow-line" />
          Axonode Organization
          <span class="eyebrow-line" />
        </p>
        <h1>
          {{ $t('projects.section_title_main') }}
          <span class="gradient-text">{{ $t('projects.section_title_gradient') }}</span>
        </h1>
      </section>

      <!-- Loading -->
      <div v-if="loading" class="state-box">
        <div class="spinner" />
        <p>Loading projects…</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-box state-error">
        <p>{{ error }}</p>
        <button @click="fetchProjects">Retry</button>
      </div>

      <!-- Grid -->
      <div v-else class="proj-grid">
        <template v-for="project in projects" :key="project.id">

          <!-- Featured -->
          <div v-if="project.featured" class="feat-card">
            <div class="feat-thumb" :style="{ background: project.thumbnail_bg }">
              <img
                :src="resolveLogoSrc(project.logo)"
                :alt="project.logo.alt"
                class="thumb-logo thumb-logo--bleed"
              />
              <div class="feat-thumb-content">
                <span class="badge badge-teal">{{ project.badge }}</span>
              </div>
            </div>
            <div class="feat-body">
              <p class="feat-pill">{{ localized(project, 'subtitle') }}</p>
              <h2>{{ localized(project, 'title') }}</h2>
              <p>{{ localized(project, 'description') }}</p>
              <div class="feat-actions">
                <a v-if="project.links.live"   class="feat-cta" :href="project.links.live"   target="_blank">Visit →</a>
                <a v-if="project.links.github" class="feat-cta" :href="project.links.github" target="_blank">GitHub →</a>
              </div>
            </div>
          </div>

          <!-- Regular -->
          <div v-else class="proj-card">
            <div class="card-thumb" :style="{ background: project.thumbnail_bg }">
              <img
                :src="resolveLogoSrc(project.logo)"
                :alt="project.logo.alt"
                class="thumb-logo thumb-logo--bleed"
              />
              <div class="card-thumb-content">
                <span class="badge badge-teal">{{ project.badge }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3>{{ localized(project, 'title') }}</h3>
              <p>{{ localized(project, 'description') }}</p>
              <div class="card-links">
                <a v-if="project.links.live"   class="card-link" :href="project.links.live"   target="_blank">Visit →</a>
                <a v-if="project.links.github" class="card-link" :href="project.links.github" target="_blank">GitHub →</a>
              </div>
            </div>
          </div>

        </template>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'

const { locale } = useI18n()  
const projects   = ref([])
const loading    = ref(true)
const error      = ref(null)

// Asset imports — add one line here for every "type": "asset" logo in projects.json
const assetMap = {
  '../assets/wavefys.png': new URL('../assets/wavefys.png', import.meta.url).href,
}

function resolveLogoSrc(logo) {
  if (logo.type === 'asset') return assetMap[logo.src] ?? logo.src
  return logo.src // 'url' type — already a public URL
}

function localized(project, field) {
  return project.i18n[locale.value]?.[field] ?? project.i18n['en'][field]
}

async function fetchProjects() {
  loading.value = true
  error.value   = null
  try {
    const res = await fetch('/projects.json')
    if (!res.ok) throw new Error(`Failed to load projects (${res.status})`)
    const data = await res.json()
    projects.value = data.projects
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchProjects)
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background-color: var(--bg-color);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 5rem;
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
.hero {
  text-align: center;
  padding: 7rem 0 3rem;
}

.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-color);
  opacity: 0.4;
  margin: 0 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.eyebrow-line {
  display: block;
  width: 32px;
  height: 0.5px;
  background: currentColor;
}

.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 600;
  margin: 0 0 1.1rem;
  line-height: 1.12;
  color: var(--text-color);
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(120deg, var(--accent-color) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 14.5px;
  color: var(--text-color);
  opacity: 0.55;
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.75;
}

/* ── Loading / Error ──────────────────────────────────────────────────────── */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 5rem 0;
  color: var(--text-color);
  opacity: 0.5;
  font-size: 14px;
}
.state-error { opacity: 1; color: var(--error-color); }

.spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Grid ─────────────────────────────────────────────────────────────────── */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* ── Featured card ────────────────────────────────────────────────────────── */
.feat-card {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  border-radius: 16px;
  border: 0.5px solid var(--border-color);
  overflow: hidden;
  background: var(--bg-color);
  transition: border-color 0.2s;
}
.feat-card:hover { border-color: var(--accent-color); }

.feat-thumb {
  position: relative;
  min-height: 250px;
  overflow: hidden;
}

/* ── Logo — full bleed ────────────────────────────────────────────────────── */
.thumb-logo--bleed {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feat-thumb-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 18px;
}

.feat-body {
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feat-pill {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-color);
  opacity: 0.4;
  margin: 0 0 10px;
}

.feat-body h2 {
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.feat-body > p {
  font-size: 13.5px;
  color: var(--text-color);
  opacity: 0.6;
  line-height: 1.72;
  margin: 0 0 22px;
}

.feat-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.feat-cta {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
  text-decoration: none;
  border: 0.5px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 8px;
  width: fit-content;
  transition: background 0.15s, border-color 0.15s;
}
.feat-cta:hover {
  background: var(--hover-bg);
  border-color: var(--accent-color);
  color: var(--text-color);
}

/* ── Regular cards ────────────────────────────────────────────────────────── */
.proj-card {
  border-radius: 16px;
  border: 0.5px solid var(--border-color);
  overflow: hidden;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.18s, border-color 0.2s;
}
.proj-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-color);
}

.card-thumb {
  height: 175px;
  position: relative;
  overflow: hidden;
}

.card-thumb-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 14px;
}

.card-body {
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-body h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--text-color);
  letter-spacing: -0.01em;
}

.card-body > p {
  font-size: 13px;
  color: var(--text-color);
  opacity: 0.58;
  margin: 0 0 14px;
  line-height: 1.62;
  flex: 1;
}

.card-links {
  display: flex;
  gap: 10px;
}

.card-link {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--accent-color);
  text-decoration: none;
  transition: opacity 0.15s;
}
.card-link:hover { opacity: 0.7; }

/* ── Badges ───────────────────────────────────────────────────────────────── */
.badge {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  width: fit-content;
}
.badge-teal {
  background: rgba(120, 222, 231, 0.15);
  color: #78dee7;
  border: 0.5px solid rgba(120, 222, 231, 0.3);
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .proj-grid    { grid-template-columns: 1fr; }
  .feat-card    { grid-template-columns: 1fr; }
  .feat-thumb   { min-height: 200px; }
  .feat-body    { padding: 20px; }
  .feat-body h2 { font-size: 1.3rem; }
  .hero         { padding-top: 6rem; }
}
</style>