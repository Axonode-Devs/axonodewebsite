<template>
  <div class="marquee-container">
    <div class="marquee-label"><span>{{ $t('team.label.founders') }}</span>& {{ $t('team.label.team_members') }}</div>
    <div class="marquee-content" @mouseenter="pause = true" @mouseleave="pause = false">
      <div class="marquee-track" :class="{ paused: pause }">
        <a :href="`https://github.com/${member.username}`" target="_blank" title="View Github Profile" v-for="(member, index) in combinedTeam" :key="'A'+index" class="team-card">
          <img :src="member.avatarUrl || `https://github.com/${member.username}.png`" :alt="member.name" class="avatar" />
          <div class="info">
            <h4 class="name">{{ member.name }}</h4>
            <span class="role" :style="{ color: member.color }">{{ $t(member.role) }}</span>
          </div>
        </a>
      </div>
      <div class="marquee-track" :class="{ paused: pause }" aria-hidden="true">
        <a :href="`https://github.com/${member.username}`" target="_blank" title="View Github Profile" v-for="(member, index) in combinedTeam" :key="'B'+index" class="team-card">
          <img :src="member.avatarUrl || `https://github.com/${member.username}.png`" :alt="member.name" class="avatar" />
          <div class="info">
            <h4 class="name">{{ member.name }}</h4>
            <span class="role" :style="{ color: member.color }">{{ $t(member.role) }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const pause = ref(false);

const baseTeam = [
  { name: 'kaiross12', role: 'team.roles.head_community', username: 'kaiross12', color: '#BEECF0' },
  { name: 'BersisSe', role: 'team.roles.head_executive', username: 'bersisse', color: '#A59CE6' },
  { name: 'lofnyy', role: 'team.roles.deputy_community', username: 'lofnyy', color: '#78bfda' },
  { name: 'Kaan610', role: 'team.roles.head_media', username: 'Kaan610', color: '#fe78b2' },
];

const combinedTeam = ref([...baseTeam, ...baseTeam, ...baseTeam]);

onMounted(async () => {
  const fetchedTeam = await Promise.all(
    baseTeam.map(async (member) => {
      try {
        const res = await fetch(`https://api.github.com/users/${member.username}`);
        if (!res.ok) return member;
        const data = await res.json();
        return {
          ...member,
          name: data.login || member.username,
          avatarUrl: data.avatar_url || `https://github.com/${member.username}.png`
        };
      } catch (e) {
        return member;
      }
    })
  );
  combinedTeam.value = [...fetchedTeam, ...fetchedTeam, ...fetchedTeam];
});
</script>

<style scoped>
.marquee-container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 30px 0;
  background-color: transparent;
  position: relative;
  z-index: 20;
}

.marquee-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 30px;
  width: 100%;
}

.marquee-label span{
  margin-right: -10px;
}

.marquee-label span {
  color: #111827; /* Light mode contrast */
  font-weight: 700;
}

.marquee-label::before,
.marquee-label::after {
  content: "";
  height: 1px;
  flex-grow: 1;
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
}

html.dark .marquee-label {
  color: rgba(255, 255, 255, 0.5);
}

html.dark .marquee-label span {
  color: #ffffff;
}

html.dark .marquee-label::before,
html.dark .marquee-label::after {
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.marquee-content {
  display: flex;
  overflow: hidden;
  gap: 30px;
  padding: 60px 0;
  margin: -60px 0;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  pointer-events: none;
}

.marquee-track {
  display: flex;
  gap: 30px;
  animation: scroll 50s linear infinite;
  flex-shrink: 0;
  min-width: max-content;
  pointer-events: auto;
}

.marquee-track.paused {
  animation-play-state: paused;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 30px)); }
}

.team-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 24px 10px 10px;
  background: rgba(243, 244, 246, 0.9); /* Gri arka plan */
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  text-decoration: none;
}

html.dark .team-card {
  background: rgba(48, 48, 48, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.team-card:hover {
  background: #ffffff;
  border-color: rgba(254, 120, 178, 0.4);
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 15px 35px rgba(254, 120, 178, 0.15);
  z-index: 10;
}

html.dark .team-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.02) translateY(-2px);
  z-index: 10;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
}

html.dark .avatar {
  background: #374151;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0 0;
  white-space: nowrap;
}

html.dark .name {
  color: #f1f5f9;
}

.role {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .marquee-content {
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
}
</style>
