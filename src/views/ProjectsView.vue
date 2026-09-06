<template>
  <div class="projects-page">
    <Navbar />

    <section class="projects-hero">
      <p class="eyebrow">{{ $t('projects_page.eyebrow') }}</p>
      <h1 class="title">
        {{ $t('projects_page.title') }}
        <span class="gradient-text">{{ $t('projects_page.title_gradient') }}</span>
      </h1>
      <p class="subtitle">{{ $t('projects_page.subtitle') }}</p>
    </section>

    <section class="projects-section">
      <div v-if="loading" class="state-message">{{ $t('projects_page.loading') }}</div>
      <div v-else-if="error" class="state-message">{{ $t('projects_page.error') }}</div>
      <div v-else-if="projects.length === 0" class="state-message">{{ $t('projects_page.empty') }}</div>

      <div v-else class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          :class="{ featured: project.featured }"
          :style="{ '--card-bg': project.thumbnail_bg || 'var(--sc-color)' }"
        >
          <div class="card-glow" aria-hidden="true"></div>

          <div class="card-top">
            <div class="logo-frame">
              <img
                v-if="!brokenLogos.has(project.id) && logoSrc(project)"
                :src="logoSrc(project)"
                :alt="content(project).title + ' logo'"
                class="project-logo"
                @error="brokenLogos.add(project.id)"
              />
              <span v-else class="logo-fallback">{{ content(project).title.charAt(0) }}</span>
            </div>
            <span v-if="project.badge" class="badge">{{ project.badge }}</span>
          </div>

          <h2 class="project-title">{{ content(project).title }}</h2>
          <p class="project-subtitle">{{ content(project).subtitle }}</p>
          <p class="project-description">{{ content(project).description }}</p>

          <div v-if="project.stack && project.stack.length" class="stack-list">
            <span v-for="tech in project.stack" :key="tech" class="stack-chip">{{ tech }}</span>
          </div>

          <div v-if="hasLinks(project)" class="link-row">
            <a
              v-if="project.links.live"
              :href="project.links.live"
              target="_blank"
              rel="noopener noreferrer"
              class="card-btn primary"
            >
              {{ $t('projects_page.visit') }}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 7h10v10M7 17L17 7" />
              </svg>
            </a>
            <a
              v-if="project.links.github"
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="card-btn"
            >
              {{ $t('projects_page.source') }}
            </a>
          </div>
        </article>
      </div>

      <div class="join-cta">
        <p class="join-cta-text">{{ $t('projects_page.cta_text') }}</p>
        <router-link to="/join" class="join-btn">{{ $t('projects_page.cta_button') }}</router-link>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const { locale } = useI18n();

interface Project {
  id: string;
  status: string;
  category: string;
  featured: boolean;
  badge?: string;
  stack: string[];
  links: { github: string | null; live: string | null };
  logo: { type: string; src: string; alt: string };
  thumbnail_bg?: string;
  i18n: Record<string, { title: string; subtitle: string; description: string }>;
}

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref(false);
const brokenLogos = reactive(new Set<string>());

const content = (project: Project) => project.i18n?.[locale.value] || project.i18n?.en || { title: project.id, subtitle: '', description: '' };

const logoSrc = (project: Project) => {
  const src = project.logo?.src || '';
  return src.startsWith('http') ? src : src.replace(/^(\.\.\/)+/, '/');
};

const hasLinks = (project: Project) => Boolean(project.links?.live || project.links?.github);

onMounted(async () => {
  try {
    const res = await fetch('/projects.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list: Project[] = data.projects || [];
    projects.value = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.projects-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
}

.projects-hero {
  padding: 8rem 20px 2rem;
  text-align: center;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--main2-color);
  margin: 0 0 8px;
}

.title {
  font-size: 2.6rem;
  font-weight: 500;
  margin: 0;
  color: var(--text-color);
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(90deg, var(--main1-color) 0%, var(--main2-color) 50%, var(--main3-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.subtitle {
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--text-color2);
  max-width: 560px;
  margin: 14px auto 0;
  line-height: 1.6;
}

.projects-section {
  flex: 1;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 20px 80px;
  box-sizing: border-box;
}

.state-message {
  text-align: center;
  color: var(--text-color2);
  padding: 60px 0;
  font-weight: 300;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--sc-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 28px 24px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--main1-color);
}

.project-card.featured {
  border-color: color-mix(in srgb, var(--main1-color) 50%, var(--border-color));
}

.card-glow {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: var(--main1-color);
  filter: blur(90px);
  opacity: 0.12;
  pointer-events: none;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.logo-frame {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-logo {
  max-width: 48px;
  max-height: 48px;
  object-fit: contain;
}

.logo-fallback {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--main1-color), var(--main3-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.badge {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--main1-color);
  border: 1px solid color-mix(in srgb, var(--main1-color) 45%, transparent);
  padding: 5px 12px;
  border-radius: 999px;
}

.project-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

.project-subtitle {
  font-size: 0.92rem;
  font-weight: 400;
  color: var(--main2-color);
  margin: 0;
}

.project-description {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--text-color2);
  margin: 0;
  flex: 1;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stack-chip {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-color2);
  background: var(--trd-color);
  border-radius: 999px;
  padding: 4px 12px;
}

.link-row {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.card-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  color: var(--text-color2);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.card-btn:hover {
  color: var(--text-color);
  border-color: var(--main1-color);
}

.card-btn.primary {
  background: linear-gradient(90deg, var(--main1-color), var(--main3-color));
  border-color: transparent;
  color: #101010;
}

.card-btn.primary:hover {
  color: #101010;
  box-shadow: 0 8px 24px color-mix(in srgb, var(--main1-color) 25%, transparent);
}

.join-cta {
  text-align: center;
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.join-cta-text {
  color: var(--text-color2);
  font-weight: 300;
  margin: 0;
}

.join-btn {
  display: inline-flex;
  align-items: center;
  height: 50px;
  padding: 0 32px;
  background: linear-gradient(90deg, var(--main1-color), var(--main3-color));
  color: #101010;
  font-weight: 600;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.join-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--main1-color) 25%, transparent);
}

@media (max-width: 768px) {
  .projects-hero {
    padding: 6rem 16px 1.5rem;
  }

  .title {
    font-size: 1.9rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .projects-section {
    padding: 24px 16px 64px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .project-card {
    padding: 22px 18px;
  }
}
</style>
