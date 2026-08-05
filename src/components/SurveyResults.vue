<template>
  <div class="results-container">
    <h2>Your Best Match: {{ topProfession.name }}!</h2>
    <p>Here is the breakdown of your personality scores:</p>

    <div class="score-card">
      <h3>Marketing</h3>
      <div class="score-bar-bg">
        <div class="score-bar-fill" :style="{ width: scores.marketing + '%' }"></div>
      </div>
      <p>{{ scores.marketing }} / 100</p>
    </div>

    <div class="score-card">
      <h3>Software</h3>
      <div class="score-bar-bg">
        <div class="score-bar-fill" :style="{ width: scores.software + '%' }"></div>
      </div>
      <p>{{ scores.software }} / 100</p>
    </div>

    <div class="score-card">
      <h3>Design / Art</h3>
      <div class="score-bar-bg">
        <div class="score-bar-fill" :style="{ width: scores.design + '%' }"></div>
      </div>
      <p>{{ scores.design }} / 100</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SurveyResponse } from "../api/publicService";

defineProps<{
  scores: SurveyResponse["scores"];
  topProfession: SurveyResponse["topProfession"];
}>();
</script>

<style scoped>
/* move .results-container, .score-card, .score-bar-bg, .score-bar-fill here from the parent */
</style>