<template>
  <section class="founders-section">
    <header class="component-header">
      <div class="container">
        <h1 class="component-title">Our Team</h1>
      </div>
    </header>
    <div class="container">
      <h2 class="section-title">Founders</h2>
      <div class="founders-grid">
        <div v-for="(founder, index) in founders" :key="index" class="founder-card-item">
          <div class="avatar-wrapper">
            <img :src="`https://github.com/${founder.username}.png`" :alt="founder.name" class="avatar">
          </div>

          <div class="text-group info">
            <h4 class="founder-name">{{ founder.name }}</h4>
            <span :class="founder.role === 'Head Community Director' ? 'founder-director-role' : 'founder-executive-role'">{{ founder.role }}</span>
          </div>

          <a :href="`https://github.com/${founder.username}`" target="_blank" class="github-link">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        
        
      </div>
      <h2 class="section-title">Core Team</h2>
      <div class="founders-grid">
        <div v-for="(thanks, index) in thanks" :key="index" class="founder-card-item">
          <div class="avatar-wrapper">
            <img :src="`https://github.com/${thanks.username}.png`" :alt="thanks.name" class="avatar">
          </div>

          <div class="text-group info">
            <h4 class="founder-name">{{ thanks.name }}</h4>
            <span class="thanks-role">{{ thanks.role }}</span>
          </div>

          <a :href="`https://github.com/${thanks.username}`" target="_blank" class="github-link">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const founders = ref([
  { 
    name: 'kaiross12',   
    role: 'Head Community Director',        
    username: 'kaiross12',
  },
  { 
    name: 'BersisSe',   
    role: 'Head Executive',  
    username: 'bersisse',
  },
  
]);

const thanks = ref([
  { 
    name: 'lofnyy',  
    role: 'Deputy Community Director',    
    username: 'lofnyy',
  },
  { 
    name: 'Kaan610',   
    role: 'Head of Media',     
    username: 'Kaan610',
  },
])

</script>

<style scoped>
.founders-section {
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  padding-bottom: 5rem;
}

.component-header {
  padding: 0;
  text-align: center;
}
.component-title {
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 800;
  color: #0f172a;
}
.component-subtitle {
  margin: 0.35rem 0 0;
  color: #6b7280;
  font-size: 0.95rem;
}

html.dark .component-header {
  background: transparent;
}
html.dark .component-title {
  color: #e6eef8;
}
html.dark .component-subtitle {
  color: #cbd5e1;
}

@media (max-width: 600px) {
  .component-title { font-size: 2.25rem; }
}


html.dark .founders-section {
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}


.component-header .container {
  max-width: 700px;
  margin: 0 auto 48px;
}

.component-title { letter-spacing: -0.02em; }

.section-title {
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}
html.dark .section-title {
  color: #e2e8f0;
}
.founders-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0 40px;
}

.founder-card-item {
  background: white;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;
  flex: 1 1 260px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.04);
  transition: transform 0.2s ease;
}

html.dark .founder-card-item {
  background: var(--sc-color);
  border: 1px solid rgba(255,255,255,0.06);
}

.founder-card-item .info { flex-direction: column; align-items: flex-start; }
.founder-card-item .avatar-wrapper { width: 56px; height: 56px; }
.founder-card-item .avatar { border-radius: 50%; }
.founder-card-item .github-link { margin-left: auto; }


.founder-card-item:hover {
 transform: scale(1.03); 
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: flex-start;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 30px;
}

.founders-card {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: visible;
}

html.dark .founders-card {
  background: var(--sc-color);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}

.star-decoration {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  color: #FFBD2E;
  font-size: 1.5rem;
  z-index: 5;
  animation: pulseStar 3s infinite ease-in-out;
}

html.dark .star-decoration {
  background: var(--sc-color);
  box-shadow: 0 4px 15px rgba(255,255,255,0.1);
}

.founders-list {
  display: flex;
  flex-direction: column;
}

.founder-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 30px;
  border-bottom: 1px solid rgba(0,0,0,0.03);
  transition: background-color 0.2s ease;
}

.founder-row:last-child {
  border-bottom: none;
}

.founder-row:hover {
  background-color: #f9fafb;
}

html.dark .founder-row:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.founder-info-group {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  max-width: 85%;
}

.avatar-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  flex-shrink: 0;
  margin-top: 2px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  background-color: #f3f4f6;
}

html.dark .avatar {
  background-color: #374151;
  border: var(--sc-color);
}

.text-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.name-badge-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

html.dark .founder-name {
  color: #e2e8f0;
}

.founder-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.badges-container {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.custom-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: Inter, Arial, Helvetica, sans-serif;

  background-color: rgba(15, 23, 42, 0.04);
  color: #334155;
  border: 1px solid rgba(15, 23, 42, 0.06);

  white-space: nowrap;
  letter-spacing: 0.01em;
}

html.dark .custom-badge {
  background-color: rgba(255, 255, 255, 0.04);
  color: #d0d7ee;
  border: 1px solid rgba(255,255,255,0.06);
}

.founder-executive-role {
  font-size: 1rem;
  color: #d5400a;
  font-weight: 500;
  display: block;
}
.founder-director-role {
  font-size: 1rem;
  color: #19e09a;
  font-weight: 500;
  display: block;
}
.thanks-role {
  font-size: 1rem;
  color: #78bfda;
  font-weight: 500;
  display: block;
}

.text-group { align-items: flex-start; min-width: 0; }
.name-badge-row { justify-content: flex-start; }
.founder-role { text-align: left; max-width: 100%; white-space: normal; }

.github-link {
  color: #9CA3AF;
  font-size: 1.25rem;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.github-link:hover {
  color: #111827;
  background-color: rgba(0,0,0,0.05);
}

@keyframes pulseStar {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(15deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@media (max-width: 900px) {
  .split-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .left-column { gap: 30px; }
  .star-decoration { right: 10px; }
}

@media (max-width: 480px) {
  .founder-row { padding: 16px; }
  .founder-info-group { gap: 12px; }
  

  .name-badge-row { align-items: flex-start; }
  .text-group { margin-top: 4px; }
}
</style>