<template>
  <Navbar />
  <section class="result-section">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <p>{{ $t("surveyResult.loading") }}</p>
      </div>

      <div v-else-if="error" class="error-state">
        <h2 class="title">{{ $t("surveyResult.notFound") }}</h2>
        <p class="subtitle">{{ error }}</p>
        <a href="/survey" class="cta-button">{{ $t("navbar.joinUs") }}</a>
      </div>

      <template v-else-if="result">
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
            {{ $t("surveyResult.titlePrefix") }}
            <span
              class="prof-text"
              :style="{ color: getProfColor(dominantProf.name) }"
            >
              {{ profDisplayName }} </span
            >!
          </h1>
          <p class="subtitle">{{ profDesc }}</p>
        </div>

        <div class="pie-chart-container">
          <div class="pie-chart" :style="pieChartStyle"></div>
          <div class="pie-legend">
            <div
              class="legend-item"
              v-for="prof in relativeProfessions"
              :key="prof.name"
            >
              <span
                class="legend-color"
                :style="{ background: getProfColor(prof.name) }"
              ></span>
              <span class="legend-name">
                {{ $t(`surveyResult.professions.${profKey(prof.name)}`) }}
              </span>
              <span class="legend-percent">%{{ prof.percent }}</span>
            </div>
          </div>
        </div>

        <div class="professions-card">
          <h2 class="card-title">{{ $t("surveyResult.professionsMatch") }}</h2>
          <div class="score-list">
            <div
              class="score-item"
              v-for="prof in absoluteProfessions"
              :key="prof.name"
            >
              <div class="score-header">
                <span class="score-name">
                  {{ $t(`surveyResult.professions.${profKey(prof.name)}`) }}
                </span>
                <span class="score-percent">%{{ prof.percent }}</span>
              </div>
              <div class="score-bar-bg">
                <div
                  class="score-bar-fill"
                  :style="{
                    width: prof.percent + '%',
                    background: getBarGradient(prof.name),
                  }"
                ></div>
              </div>
              <span class="score-details">{{ prof.sum.toFixed(1) }}</span>
            </div>
          </div>
        </div>

        <div class="share-card">
          <h3 class="share-title">{{ $t("surveyResult.shareTitle") }}</h3>
          <div class="share-buttons">
            <button
              v-for="share in shareOptions"
              :key="share.id"
              :class="['share-btn', share.id]"
              @click="handleShare(share.platform)"
            >
              <font-awesome-icon :icon="share.icon" class="share-icon" />
              <span class="share-label">{{ share.label }}</span>
            </button>

            <button class="share-btn copy" @click="copyLink">
              <font-awesome-icon :icon="['fas', 'link']" class="share-icon" />
              <span class="share-label">{{ $t("surveyResult.copyLink") }}</span>
            </button>
          </div>
          <p v-if="copied" class="copy-feedback">
            {{ $t("surveyResult.linkCopied") }}
          </p>
        </div>

        <div class="traits-card traits-locked">
          <div class="traits-overlay">
            <h2 class="overlay-title">
              {{ $t("surveyResult.fullAnalysisCta") }}
            </h2>
            <p class="overlay-desc">
              {{ $t("surveyResult.fullAnalysisDesc") }}
            </p>
            <a href="/join" class="cta-button">{{ $t("navbar.joinUs") }}</a>
          </div>
          <div class="traits-blurred">
            <div class="traits-grid">
              <div
                class="trait-box"
                v-for="(score, trait) in traitTotals"
                :key="trait"
              >
                <span class="trait-name">
                  {{ $t(`surveyResult.traits.${String(trait).toLowerCase()}`) }}
                </span>
                <span class="trait-value">{{ Number(score).toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useHead } from "@vueuse/head";
import Navbar from "../components/Navbar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { publicService } from "../api/publicService";

const { t } = useI18n({ useScope: "global" });
const route = useRoute();

const loading = ref(true);
const error = ref("");
const result = ref(null);

const PROFESSION_NAME_MAP = {
  Software: "developer",
  Designer: "designer",
  Marketing: "marketing",
};

const profKey = (name) => PROFESSION_NAME_MAP[name] || name.toLowerCase();

onMounted(async () => {
  try {
    const data = await publicService.getSurveyResult(route.params.id);
    result.value = data;
  } catch (err) {
    error.value =
      err?.response?.status === 404
        ? "This result link is invalid or has expired."
        : "Failed to load results. Please try again.";
  } finally {
    loading.value = false;
  }
});

const traitTotals = computed(() => result.value?.traitTotals ?? {});
const absoluteProfessions = computed(
  () => result.value?.professionScores?.absolute ?? [],
);
const relativeProfessions = computed(
  () => result.value?.professionScores?.relative ?? [],
);

const dominantProf = computed(() => absoluteProfessions.value[0] ?? null);

const profDisplayName = computed(() => {
  if (!dominantProf.value) return "";
  return t(`surveyResult.professions.${profKey(dominantProf.value.name)}`);
});

const profDesc = computed(() => {
  if (!dominantProf.value) return "";
  return t(`surveyResult.desc_${profKey(dominantProf.value.name)}`);
});

const videoSrc = computed(() => {
  if (!dominantProf.value) return "";
  const name = dominantProf.value.name.toLowerCase();
  return `/${name}video.mp4`;
});

const pieChartStyle = computed(() => {
  if (relativeProfessions.value.length === 0) return {};

  let currentPercent = 0;
  const stops = relativeProfessions.value.map((prof) => {
    const start = currentPercent;
    currentPercent += prof.percent;
    return `${getProfColor(prof.name)} ${start}% ${currentPercent}%`;
  });

  return { background: `conic-gradient(${stops.join(", ")})` };
});

const getBarGradient = (name) => {
  if (name === "Software")
    return "linear-gradient(90deg, #78dee7 0%, #46aeb8 100%)";
  if (name === "Designer")
    return "linear-gradient(90deg, #fe78b0 0%, #9e4168 100%)";
  return "linear-gradient(90deg, #a59ce6 0%, #7068a3 100%)";
};

useHead({
  title: computed(() => {
    if (!profDisplayName.value) return "Axonode | Survey Result";
    return `${profDisplayName.value} | Axonode Survey Result`;
  }),
  meta: [
    {
      name: "description",
      content: computed(
        () =>
          profDesc.value ||
          "Take the Axonode personality survey to discover what suits you.",
      ),
    },
    {
      property: "og:title",
      content: computed(() =>
        profDisplayName.value
          ? `${profDisplayName.value} | Axonode Survey Result`
          : "Axonode | Survey Result",
      ),
    },
    {
      property: "og:description",
      content: computed(
        () =>
          profDesc.value ||
          "Take the Axonode personality survey to discover your career path.",
      ),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});

const getProfColor = (name) => {
  if (name === "Software") return "#78dee7";
  if (name === "Designer") return "#fe78b0";
  return "#a59ce6";
};

const shareOptions = [
  {
    id: "whatsapp",
    icon: ["fab", "whatsapp"],
    label: "WhatsApp",
    platform: "whatsapp",
  },
  {
    id: "instagram",
    icon: ["fab", "instagram"],
    label: "Instagram",
    platform: "instagram",
  },
  {
    id: "twitter",
    icon: ["fab", "twitter"],
    label: "Twitter",
    platform: "twitter",
  },
];

const copied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => (copied.value = false), 3000);
  } catch {
    alert($t("surveyResult.linkCopied"));
  }
};

const shareUrl = encodeURIComponent(window.location.href);
const shareTitle = `I am ${profDisplayName.value} | Axonode Survey Result`;
const shareText = encodeURIComponent(shareTitle);

const handleShare = async (platform) => {
  switch (platform) {
    case "whatsapp":
      window.open(
        `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
        "_blank",
      );
      break;

    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
        "_blank",
      );
      break;

    case "instagram":
      // Mobile native share (opens Instagram app options)
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Axonode Survey",
            text: shareTitle,
            url: window.location.href,
          });
          return;
        } catch (err) {
          // User closed share sheet, do nothing
          return;
        }
      }

      // Desktop fallback: copy link and notify user
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied! Paste it in an Instagram Direct Message or Story.");
      window.open("https://instagram.com", "_blank");
      break;
  }
};
</script>

<style scoped>
.result-section {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: var(--bg-color);
  color: var(--text-color);
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 0;
}

.error-state .cta-button {
  display: inline-block;
  margin-top: 1.5rem;
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

.result-header {
  text-align: center;
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
  align-items: flex-start;
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
  font-family: "Poppins", sans-serif;
}

.score-name {
  font-size: 1rem;
  font-weight: 300;
}

.score-percent {
  color: var(--text-color);
  font-family: "Poppins", sans-serif;
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

/* --- Locked traits section --- */
.traits-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: var(--sc-color);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.traits-blurred {
  filter: blur(12px);
  pointer-events: none;
  user-select: none;
  padding: 2.5rem;
}

.traits-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.35);
}

.overlay-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.overlay-desc {
  font-size: 0.95rem;
  font-weight: 300;
  opacity: 0.85;
  max-width: 420px;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, #7ad5e4 0%, #b29de4 50%, #f68cae 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.cta-button:hover {
  opacity: 0.85;
}

/* --- Share section --- */
.share-card {
  background: var(--sc-color);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
}

.share-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.share-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.share-btn.whatsapp {
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
}

.share-btn.instagram {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  color: white;
}

.share-btn.twitter {
  background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
  color: white;
}

.share-btn.copy {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.share-btn .share-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.copy-feedback {
  margin-top: 1rem;
  color: #7ad5e4;
  font-weight: 500;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.trait-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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

@media (max-width: 600px) {
  .pie-chart-container {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  .title {
    font-size: 1.8rem;
  }
}
</style>
