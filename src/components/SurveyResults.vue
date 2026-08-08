<template>
  <div class="results-container">
    <p class="results-eyebrow">Your result</p>
    <h2 class="results-title">
      You're built for <span class="profession-name">{{ topProfession.name }}</span>
    </h2>
    <p class="results-subtitle">{{ professionBlurb }}</p>

    <div class="spectrum-rail" aria-hidden="true">
      <div class="spectrum-track"></div>
      <div
        class="spectrum-marker"
        :style="{ left: markerPosition + '%' }"
      ></div>
    </div>

    <div class="score-list">
      <div
        v-for="item in scoreItems"
        :key="item.id"
        class="score-row"
        :class="{ 'score-row--top': item.id === topProfession.id }"
      >
        <div class="score-row-header">
          <span class="score-label">{{ item.label }}</span>
          <span class="score-value"
            >{{ item.percent }}<span class="score-max">%</span></span
          >
        </div>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: item.percent + '%', background: item.color }"
          ></div>
        </div>
      </div>
    </div>

    <div class="trait-list">
      <p class="trait-list-title">Your trait breakdown</p>
      <div class="trait-grid">
        <div v-for="trait in traitItems" :key="trait.name" class="trait-chip">
          <span class="trait-name">{{ trait.name }}</span>
          <span class="trait-score">{{ trait.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SurveyResponse, ProfessionId, TraitName } from "../api/publicService";

const props = defineProps<{
  traitTotals: SurveyResponse["traitTotals"];
  professionScores: SurveyResponse["professionScores"];
  topProfession: SurveyResponse["topProfession"];
}>();

// Same three-stop gradient used across sliders and the brand name elsewhere
// in the survey — cyan / violet / pink — so each profession owns a fixed
// position on one continuous spectrum instead of three unrelated colors.
const SPECTRUM: Record<ProfessionId, { color: string; position: number }> = {
  marketing: { color: "#7ad5e4", position: 10 },
  software: { color: "#b29de4", position: 50 },
  designer: { color: "#f68cae", position: 90 },
};

const BLURBS: Record<ProfessionId, string> = {
  marketing:
    "You read people before they finish a sentence, and you know how to make an idea land.",
  software:
    "You want to know how the thing actually works, and you'd rather build the fix than wait for one.",
  designer:
    "You notice what everyone else scrolls past, and you can't unsee a misaligned pixel.",
};

const TRAIT_LABELS: Record<TraitName, string> = {
  Enterprising: "Enterprising",
  Social: "Social",
  Investigative: "Investigative",
  Artistic: "Artistic",
  Conventional: "Conventional",
  Realistic: "Realistic",
};

// Use the "absolute" variant (each profession's own /25 -> /100 scale) for
// the score bars — this answers "how strong are you in this profession",
// independent of the other two. The pie/relative variant lives elsewhere
// if a comparative view is needed later.
const scoreItems = computed(() => {
  return props.professionScores.absolute.map((p) => ({
    id: p.id,
    label: p.name,
    percent: p.percent,
    color: SPECTRUM[p.id]?.color ?? "#e2e8f0",
  }));
});

const traitItems = computed(() => {
  return (Object.keys(props.traitTotals) as TraitName[]).map((trait) => ({
    name: TRAIT_LABELS[trait] ?? trait,
    value: props.traitTotals[trait],
  }));
});

const markerPosition = computed(() => {
  return SPECTRUM[props.topProfession.id]?.position ?? 50;
});

const professionBlurb = computed(() => {
  return BLURBS[props.topProfession.id] ?? "";
});
</script>

<style scoped>
.results-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
  box-sizing: border-box;
  color: #e2e8f0;
}

.results-eyebrow {
  font-family: "Poppins", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.55;
  margin: 0 0 0.5rem;
}

.results-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.7rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
  line-height: 1.3;
}

.profession-name {
  background: linear-gradient(90deg, #7ad5e4 0%, #b29de4 50%, #f68cae 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.results-subtitle {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  opacity: 0.75;
  margin: 0 0 2.5rem;
  line-height: 1.5;
}

.spectrum-rail {
  position: relative;
  height: 28px;
  margin-bottom: 2.5rem;
}

.spectrum-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, #7ad5e4 0%, #b29de4 50%, #f68cae 100%);
  border-radius: 4px;
  opacity: 0.35;
}

.spectrum-marker {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e2e8f0;
  box-shadow: 0 0 14px 4px rgba(226, 232, 240, 0.45);
  transform: translate(-50%, -50%);
  transition: left 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.score-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.score-row {
  text-align: left;
  opacity: 0.65;
  transition: opacity 0.3s ease;
}

.score-row--top {
  opacity: 1;
}

.score-row-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
}

.score-label {
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
}

.score-row--top .score-label {
  font-weight: 600;
}

.score-value {
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.score-max {
  font-weight: 300;
  opacity: 0.5;
  font-size: 0.8rem;
}

.score-bar-bg {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.trait-list-title {
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.5;
  text-align: left;
  margin: 0 0 0.9rem;
}

.trait-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.trait-chip {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.7rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  text-align: left;
}

.trait-name {
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  opacity: 0.6;
}

.trait-score {
  font-family: "Poppins", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  .spectrum-marker,
  .score-bar-fill {
    transition: none;
  }
}

@media (max-width: 480px) {
  .results-container {
    padding: 1.75rem 1.25rem;
    border-radius: 18px;
  }
  .results-title {
    font-size: 1.35rem;
  }
  .trait-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>