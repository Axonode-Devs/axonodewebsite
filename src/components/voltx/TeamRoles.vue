<script setup>
import { ref } from 'vue'

const getImageUrl = (imgPath) => {
  if (imgPath.startsWith('http')) return imgPath;
  return new URL(`./assets/${imgPath}`, import.meta.url).href;
}

const teamMembers = ref([
  {
    role: 'Lead Mentor',
    name: 'Yaser Durubi',
    image: 'yaser.jpeg'
  },
  {
    role: 'Team Captain',
    name: 'Büşra Zeynep Doyranlı',
    image: 'busra.jpeg'
  },
  {
    role: 'Captain Helper',
    name: 'Ayça Yüksel Adıgüzel',
    image: 'ayca.png'
  },
  {
    role: 'Captain Helper',
    name: 'Zümra Zeynep Bayrak',
    image: 'https://ui-avatars.com/api/?name=Zümra+Zeynep+Bayrak&background=F1E234&color=111827&size=150'
  },
  {
    role: 'Captain Helper',
    name: 'Nisa Sancak',
    image: 'nisa.jpeg'
  },
])
</script>

<template>
  <div class="team-roles" id="team">
    <div class="section-header">
      <h2>Our Mentors and Captains</h2>
      <p>Meet the passionate individuals behind VoltX Robotics!</p>
    </div>
    
    <div class="roles-grid">
      <div v-for="(member, index) in teamMembers" :key="index" class="role-item">
        <div class="role-photo">
          <img :src="getImageUrl(member.image)" :alt="member.name" />
        </div>
        <div class="role-info">
          <h3 class="member-name">{{ member.name }}</h3>
          <span class="role-title">{{ member.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-roles {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-header p {
  font-size: 1.125rem;
  color: #4b5563;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem 2rem;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  justify-content: flex-start;
}

.role-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 4px solid #F1E234;
}

.role-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.role-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.member-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.role-title {
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280; /* Gri ince yazı */
}

@media (max-width: 768px) {
  .roles-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
