<template>
  <Navbar />
  <section class="result-section">
    <div class="container">
      <div class="video-container" v-if="dominantProf">
        <video 
          :src="videoSrc" 
          autoplay 
          muted 
          playsinline 
          class="result-video"
        ></video>
      </div>
      
      <div class="result-header" v-if="dominantProf">
        <h1 class="title">
          {{ $t('surveyResult.titlePrefix') }}
          <span class="prof-text" :style="{ color: getProfColor(dominantProf.name) }">
            {{ $t(`surveyResult.professions.${dominantProf.name.toLowerCase()}`) }}
          </span>!
        </h1>
        <p class="subtitle">{{ $t(`surveyResult.desc_${dominantProf.name.toLowerCase()}`) }}</p>
        
        <a href="#" @click.prevent="addToProfile" class="add-profile-link" :style="{color: getProfColor(dominantProf.name)}">
          {{ $t("surveyResult.addToProfile") }}
        </a>
      </div>
      <div class="traits-card">
        <div class="traits-grid">
          <div class="trait-box" v-for="(score, trait) in scores" :key="trait">
            <span class="trait-name">
              {{ $t(`surveyResult.traits.${trait.toLowerCase()}`) }}
            </span>
            <span class="trait-value">{{ score.toFixed(1) }}</span>
          </div>
        </div>
      </div>
      <div class="pie-chart-container">
        <div class="pie-chart" :style="pieChartStyle"></div>

        <div class="pie-legend">
          <div class="legend-item" v-for="prof in relativeProfessions" :key="prof.name">
            <span class="legend-color" :style="{ background: getProfColor(prof.name) }"></span>
            <span class="legend-name">
              {{ $t(`surveyResult.professions.${prof.name.toLowerCase()}`) }}
            </span>
            <span class="legend-percent">%{{ prof.percent }}</span>
          </div>
        </div>
      </div>

      <div class="professions-card">
        <h2 class="card-title">{{ $t('surveyResult.professionsMatch') }}</h2>
        <div class="score-list">
          <div class="score-item" v-for="prof in professions" :key="prof.name">
            <div class="score-header">
              <span class="score-name">
                {{ $t(`surveyResult.professions.${prof.name.toLowerCase()}`) }}
              </span>
              <span class="score-percent">%{{ prof.percent }}</span>
            </div>
            <div class="score-bar-bg">
              <div 
                class="score-bar-fill" 
                :style="{ 
                  width: prof.percent + '%',
                  background: getBarGradient(prof.name)
                }"
              ></div>
            </div>
            <span class="score-details">{{ prof.sum.toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from '../components/Navbar.vue';

const { t } = useI18n({ useScope: 'global' });

const scores = ref({
  Enterprising: 0,
  Social: 0,
  Investigative: 0,
  Artistic: 0,
  Conventional: 0,
  Realistic: 0
});

const professions = ref([]);
const relativeProfessions = ref([]);

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('survey_results') || '{}');
  if (savedData.scores) {
    scores.value = savedData.scores;
  }
  if (savedData.professions) {
    professions.value = savedData.professions;
  }
  if (savedData.relativeProfessions) {
    relativeProfessions.value = savedData.relativeProfessions;
  }
});

const dominantProf = computed(() => {
  if (!professions.value || professions.value.length === 0) return null;
  return professions.value[0];
});

const videoSrc = computed(() => {
  if (!dominantProf.value) return '';
  const name = dominantProf.value.name.toLowerCase();
  return `/${name}video.mp4`;
});

const pieChartStyle = computed(() => {
  if (!relativeProfessions.value || relativeProfessions.value.length === 0) return {};

  let currentPercent = 0;
  const stops = relativeProfessions.value.map(prof => {
    const start = currentPercent;
    currentPercent += prof.percent;
    const end = currentPercent;
    const color = getProfColor(prof.name);
    return `${color} ${start}% ${end}%`;
  });

  return {
    background: `conic-gradient(${stops.join(', ')})`
  };
});

const getBarGradient = (name) => {
  if (name === 'Developer') {
    return 'linear-gradient(90deg, #78dee7 0%, #46aeb8 100%)'; 
  } else if (name === 'Designer') {
    return 'linear-gradient(90deg, #fe78b0 0%, #9e4168 100%)'; 
  } else {
    return 'linear-gradient(90deg, #a59ce6 0%, #7068a3 100%)'; 
  }
};

const getProfColor = (name) => {
  if (name === 'Developer') {
    return '#78dee7';
  } else if (name === 'Designer') {
    return '#fe78b0';
  } else {
    return '#a59ce6'; 
  }
};

const addToProfile = () => {
  console.log('Profiline eklendi!');
  alert('Profilinize başarıyla eklendi!');
};
</script>

<style scoped>
.result-section {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: var(--bg-color);
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.result-header {
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.prof-text {
  font-weight: 700;
  transition: color 0.3s ease;
}

.subtitle {
  color: #8d8d8d;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
  line-height: 1.6;
}

.add-profile-link {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-profile-link:hover {
  color: #a59ce6;
  transform: translateY(-1px);
}

.video-container {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.result-video {
  width: 100%;
  height: auto;
  display: block;
}

.professions-card {
  background: var(--sc-color);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
}

.pie-chart-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
  background: var(--sc-color);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
}

.pie-chart {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.pie-chart:hover {
  transform: scale(1.04);
}

.pie-legend {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: left;
  gap: 1.5rem 2rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.legend-name {
  font-weight: 300;
}

.legend-percent {
  font-weight: 200;
  color: var(--text-color);
}

.score-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.score-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.score-header {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.score-name {
  font-size: 1rem;
  font-weight: 300;
}

.score-percent {
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
}

.score-bar-bg {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.score-details {
  font-size: 0.85rem;
  color: #8d8d8d;
  text-align: right;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.trait-box {
  background: var(--sc-color);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
}

.trait-box:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.04);
}

.trait-name {
  font-size: 0.85rem;
  color: #8d8d8d;
  font-weight: 300;
}

.trait-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e2e8f0;
}
</style>