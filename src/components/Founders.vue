<template>
  <section class="founders-section">
    <div class="container">
      
      <div class="split-layout">
        
        <div class="left-column">
  <div class="video-wrapper">
    <FoundersImage :founders="founders" />
  </div>
</div>

        <div class="right-column">
          <div class="founders-card">
            <div class="star-decoration">
              <i class="fa-solid fa-star"></i>
            </div>

            <div class="founders-list">
              <div v-for="(founder, index) in founders" :key="index" class="founder-row">
                
                <div class="founder-info-group">
                  <div class="avatar-wrapper">
                    <img :src="`https://github.com/${founder.username}.png`" :alt="founder.name" class="avatar">
                  </div>
                  
                  <div class="text-group">
                    
                    <div class="name-badge-row">
                      <h4 class="founder-name">{{ founder.name }}</h4>
                      
                      <div class="badges-container" v-if="founder.badges && founder.badges.length">
                        <span v-for="badge in founder.badges" :key="badge" class="custom-badge">
                          {{ badge }}
                        </span>
                      </div>
                    </div>

                    <span class="founder-role">{{ founder.role }}</span>
                  </div>
                </div>

                <a :href="`https://github.com/${founder.username}`" target="_blank" class="github-link">
                  <i class="fa-brands fa-github"></i>
                </a>

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import FoundersImage from './FoundersImage.vue';

const founders = ref([
  { 
    name: 'kaiross12',   
    role: 'Fullstack Dev. & Designer',        
    username: 'kaiross12',
    badges: ['Graphics', 'UI/UX', 'Full Stack'] 
  },
  { 
    name: 'BersisSe',   
    role: 'Head of Development',  
    username: 'bersisse',
    badges: ['Backend', 'Databases'] 
  },
  { 
    name: 'lofnyy',  
    role: 'Head of AI & Community Admin',    
    username: 'lofnyy',
    badges: ['AI Research', 'Python', 'Analysis']
  },
  { 
    name: 'Kaan610',   
    role: 'Head of Planning & PR',     
    username: 'Kaan610',
    badges: ['Management', 'Strategy']
  },
]);
</script>

<style scoped>
.founders-section {
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  padding-bottom: 5rem;
}

html.dark .founders-section {
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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
  font-size: 1.05rem;
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

html.dark .custom-badge {
  background-color: rgba(149, 176, 235, 0.2); 
  color: #d0d7ee;   
}

.custom-badge {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;
  
  background-color: rgba(149, 176, 235, 0.1);
  color: #5b7bb2;
  border: 1px solid rgba(149, 176, 235, 0.2);
  
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.founder-role {
  font-size: 0.85rem;
  color: #6B7280;
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