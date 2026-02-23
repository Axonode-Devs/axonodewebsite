<template>
  <section class="projects-section" id="projects">
    <div class="background-mesh"></div>

    <div class="container">
      
      <div class="section-header">
        <div class="mini-label">OUR PORTFOLIO</div>
        <h2 class="title">Latest <span class="gradient-text">Works</span></h2>
        <p class="description">
          Explore the innovative solutions built by the Axonode community. Open source, collaborative, and cutting-edge.
        </p>
      </div>

      <div class="filters">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          :class="['filter-btn', { active: activeCategory === cat }]"
        >
          {{ cat }}
        </button>
      </div>

      <div class="projects-grid">
        <transition-group name="fade-list">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="project-card"
          >
            <div class="card-image-wrapper">
              <span v-if="project.inProgress" class="status-badge in-progress">
                In Progress
              </span>

              <div v-if="project.image" class="image-wrapper">
                <img :src="project.image" alt="" class="card-image" />
                <i :class="project.icon" class="project-icon-overlay"></i>
              </div>

              <div v-else class="image-placeholder" :style="{ background: project.placeholderColor }">
                <i :class="project.icon" class="project-icon-overlay"></i>
              </div>

              <div class="hover-overlay">
                <a :href="project.links.github" target="_blank" class="overlay-btn" title="View Code">
                  <i class="fa-brands fa-github"></i>
                </a>
                <a :href="project.links.demo" target="_blank" class="overlay-btn" title="Live Demo">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>

            <div class="card-content">
              <div class="content-top">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-desc">{{ project.desc }}</p>
              </div>

              <div class="content-bottom">
                <div class="tech-stack">
                  <span v-for="tech in project.stack" :key="tech" class="tech-badge">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeCategory = ref('All');
const categories = ['All', 'Web App', 'Mobile', 'AI Tools'];

const projects = ref([
  {
    id: 1,
    title: 'Axonode Dashboard',
    desc: 'A comprehensive analytics dashboard for community management and event tracking.',
    category: 'Mobile',
    stack: ['Flutter', 'Mobile', 'Desktop', 'Dart'],
    placeholderColor: 'linear-gradient(135deg, #78dee7 0%, #95b0eb 100%)',
    image: '../src/assets/project1.png',
    links: { github: '#', demo: '#' },
    inProgress: true 
  },
  {
    id: 2,
    title: 'Coming Soon App',
    desc: 'Currently under development. We are preparing something great for you.',
    category: 'AI Tools',
    stack: ['Coming', 'Soon'],
    placeholderColor: 'linear-gradient(135deg, #c9c9c9 0%, #ffffff 100%)',
    image: '',
    icon: 'fa-solid fa-gear',
    links: { github: '#', demo: '#' },
    inProgress: true 
  },
  {
    id: 3,
    title: 'Coming Soon App',
    desc: 'Currently under development. We are preparing something great for you.',
    category: 'Web App',
    stack: ['Coming', 'Soon'],
    placeholderColor: 'linear-gradient(135deg, #c9c9c9 0%, #ffffff 100%)',
    image: '',
    icon: 'fa-solid fa-gear',
    links: { github: '#', demo: '#' },
    inProgress: true 
  },
  {
    id: 4,
    title: 'Coming Soon App',
    desc: 'Currently under development. We are preparing something great for you.',
    category: 'Web App',
    stack: ['Coming', 'Soon'],
    placeholderColor: 'linear-gradient(135deg, #c9c9c9 0%, #ffffff 100%)',
    image: '',
    icon: 'fa-solid fa-gear',
    links: { github: '#', demo: '#' },
    inProgress: true 
  },
  {
    id: 5,
    title: 'Coming Soon App',
    desc: 'Currently under development. We are preparing something great for you.',
    category: 'AI Tools',
    stack: ['Coming', 'Soon'],
    placeholderColor: 'linear-gradient(135deg, #c9c9c9 0%, #ffffff 100%)',
    image: '',
    icon: 'fa-solid fa-gear',
    links: { github: '#', demo: '#' },
    inProgress: true 
  },
  {
    id: 6,
    title: 'Coming Soon App',
    desc: 'Currently under development. We are preparing something great for you.',
    category: 'Mobile',
    stack: ['Coming', 'Soon'],
    placeholderColor: 'linear-gradient(135deg, #c9c9c9 0%, #ffffff 100%)',
    image: '',
    icon: 'fa-solid fa-gear',
    links: { github: '#', demo: '#' },
    inProgress: true 
  },
]);

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects.value;
  }
  return projects.value.filter(p => p.category === activeCategory.value);
});
</script>

<style scoped>
.projects-section {
  position: relative;
  padding: 100px 20px;
  background-color: #F9FAFB; 
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
    width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw; 
  margin-right: -50vw;
  box-sizing: border-box;
}

html.dark .projects-section {
  background-color: #0c0c0c;
}

.background-mesh {
  position: absolute;
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(149, 176, 235, 0.1) 0%, rgba(120, 222, 231, 0.05) 50%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}


.section-header {
  text-align: center;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
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
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 20px;
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


.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.filter-btn {
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.filter-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.filter-btn.active {
  background: #111827;
  color: white;
  box-shadow: 0 10px 20px -5px rgba(0,0,0,0.2);
  border-color: #111827;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
}

.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

html.dark .project-card {
  background: #1b1b1b;
  border-color: rgba(255,255,255,0.1);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.2);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.status-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 5; 
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.status-badge.in-progress {
  background-color: #EF4444; 
  color: white;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
}

.project-card:hover .image-placeholder {
  transform: scale(1.05);
}

.project-icon-overlay {
  font-size: 3rem;
  color: rgba(255,255,255,0.8);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.image-wrapper { width: 100%; height: 100%; }
.card-image { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-image-wrapper .project-icon-overlay { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); font-size: 3rem; color: rgba(255,255,255,0.85); z-index: 1; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12)); }

.hover-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10; 
}

.project-card:hover .hover-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.overlay-btn:hover {
  transform: scale(1.1);
  background: #78dee7;
  color: white;
}

.card-content {
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-top {
  margin-bottom: 20px;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 10px 0;
}

html.dark .project-title {
  color: #f1f5f9;
}

.project-desc {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: #F3F4F6;
  color: #4B5563;
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

html.dark .tech-badge {
  background-color: #2c2c2c;
  color: #9ca3af;
  border-color: rgba(255,255,255,0.1);
}

.project-card:hover .tech-badge {
  background-color: rgba(120, 222, 231, 0.15);
  color: #2ebbc5;
  border-color: rgba(120, 222, 231, 0.2);
}

.fade-list-move,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-list-leave-active {
  position: absolute;
}

@media (max-width: 768px) {
  .title { font-size: 2rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .filters { gap: 10px; }
  .filter-btn { padding: 8px 16px; font-size: 0.9rem; }
}
</style>