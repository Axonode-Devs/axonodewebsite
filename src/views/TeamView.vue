<template>
  <div class="team-page">
    <div class="team-hero">
      <h1 class="team-id">{{ teamId.toUpperCase() }}</h1>
      <p class="team-subtitle">FRC Team Profile</p>
    </div>

    <div class="team-content" v-if="team">
      <div class="team-card">
        <h2>{{ team.name }}</h2>
        <ul class="team-meta">
          <li><span>Location</span> {{ team.city }}, {{ team.state_prov }}, {{ team.country }}</li>
          <li><span>Rookie Year</span> {{ team.rookie_year }}</li>
          <li><span>Nickname</span> {{ team.nickname }}</li>
          <li v-if="team.website"><span>Website</span>
            <a :href="team.website" target="_blank" rel="noopener">{{ team.website }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="team-loading" v-else-if="loading">
      <div class="spinner"></div>
      <p>Loading team data…</p>
    </div>

    <div class="team-error" v-else>
      <p>Team <strong>{{ teamId }}</strong> could not be found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route  = useRoute()
const teamId = route.params.teamId

const team    = ref(null)
const loading = ref(true)

onMounted(async () => {
  const number = teamId.replace(/[^0-9]/g, '')
  try {
    const res = await fetch(`https://www.thebluealliance.com/api/v3/team/frc${number}`, {
      headers: { 'X-TBA-Auth-Key': import.meta.env.VITE_TBA_AUTH_KEY ?? '' },
    })
    if (res.ok) {
      team.value = await res.json()
    }
  } catch (_) {
    /* network error — shows the error block */
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.team-page {
  min-height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.team-hero {
  text-align: center;
  padding: 3rem 1rem 2rem;
}

.team-id {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: 0.05em;
  margin: 0;
}

.team-subtitle {
  opacity: 0.6;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.team-card {
  background: var(--surface, #1a1a2e);
  border: 1px solid rgba(255 255 255 / 0.08);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
}

.team-card h2 {
  margin: 0 0 1.25rem;
  font-size: 1.6rem;
}

.team-meta {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.team-meta li {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
}

.team-meta span {
  font-weight: 600;
  min-width: 110px;
  opacity: 0.5;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.team-meta a {
  color: inherit;
  text-decoration: underline;
  word-break: break-all;
}

.team-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0.6;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255 255 255 / 0.15);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.team-error {
  opacity: 0.7;
  font-size: 1.1rem;
}
</style>
