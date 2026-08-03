<template>
  <Navbar />
  <section class="survey-section">
    <div class="container">
      <img class="survey-img" :src="surveyImage" />
    </div>
    <div v-if="!showResults">
      <div class="questions-container">
        <!-- PAGE 1 -->
        <div v-show="currentPage === 1">
          <InputQuestion
            v-model:answer="email"
            :placeholder="$t('survey.mail')"
          />
          <div class="divider-container">
            <HDivider />
          </div>
          <SliderQuestion
            v-model="q1"
            :question="$t('survey.q1')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q2"
            :question="$t('survey.q2')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            inverted
          />
          <SliderQuestion
            v-model="q3"
            :question="$t('survey.q3')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            inverted
          />
          <SliderQuestion
            v-model="q4"
            :question="$t('survey.q4')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q5"
            :question="$t('survey.q5')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
        </div>

        <!-- PAGE 2 -->
        <div v-show="currentPage === 2">
          <SliderQuestion
            v-model="q6"
            :question="$t('survey.q6')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q7"
            :question="$t('survey.q7')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q8"
            :question="$t('survey.q8')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            inverted
          />
          <SliderQuestion
            v-model="q9"
            :question="$t('survey.q9')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            inverted
          />
          <SliderQuestion
            v-model="q10"
            :question="$t('survey.q10')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
        </div>

        <!-- PAGE 3 -->
        <div v-show="currentPage === 3">
          <SliderQuestion
            v-model="q11"
            :question="$t('survey.q11')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q12"
            :question="$t('survey.q12')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q13"
            :question="$t('survey.q13')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q14"
            :question="$t('survey.q14')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
          <SliderQuestion
            v-model="q15"
            :question="$t('survey.q15')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
          />
        </div>
      </div>
      <div class="button-container">
        <button class="back-button" @click="handleBack" v-if="currentPage > 1">
          {{ $t("survey.button-back") }}
        </button>
        <button class="submit-button" @click="handleNext">
          {{
            currentPage === 3
              ? $t("survey.button-send")
              : $t("survey.button-keep")
          }}
        </button>
      </div>
    </div>

    <div v-else class="results-container">
      <h2>Your Best Match: {{ topProfession.name }}!</h2>
      <p>Here is the breakdown of your personality scores:</p>

      <div class="score-card">
        <h3>Marketing</h3>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: marketingScore + '%' }"
          ></div>
        </div>
        <p>{{ marketingScore }} / 100</p>
      </div>

      <div class="score-card">
        <h3>Software</h3>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: softwareScore + '%' }"
          ></div>
        </div>
        <p>{{ softwareScore }} / 100</p>
      </div>

      <div class="score-card">
        <h3>Design / Art</h3>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: designScore + '%' }"
          ></div>
        </div>
        <p>{{ designScore }} / 100</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import HDivider from "../components/HDivider.vue";
import Navbar from "../components/Navbar.vue";
import SliderQuestion from "../components/SliderQuestion.vue";
import InputQuestion from "../components/InputQuestion.vue";

const { locale } = useI18n();

const surveyImage = computed(() => {
  return locale.value === "tr" ? "/letsfindouttr.png" : "/letsfindout.png";
});

const currentPage = ref(1);
const showResults = ref(false); // Controls the results view

const email = ref("");

// UPDATE 1: Set default values to 12 points (which equals slider position 3)
const q1 = ref(12); const q2 = ref(12); const q3 = ref(12); const q4 = ref(12); const q5 = ref(12);
const q6 = ref(12); const q7 = ref(12); const q8 = ref(12); const q9 = ref(12); const q10 = ref(12);
const q11 = ref(12); const q12 = ref(12); const q13 = ref(12); const q14 = ref(12); const q15 = ref(12);


// UPDATE 2: Remove `calcPoints`. Just add the values directly since 
// SliderQuestion.vue is already doing the * 4 and inversion math!

// PAGE 1: Marketing (Q1 - Q5) Max 100 points
const marketingScore = computed(() => {
  return q1.value + q2.value + q3.value + q4.value + q5.value;
});

// PAGE 2: Software (Q6 - Q10) Max 100 points
const softwareScore = computed(() => {
  return q6.value + q7.value + q8.value + q9.value + q10.value;
});

// PAGE 3: Design/Art (Q11 - Q15) Max 100 points
const designScore = computed(() => {
  return q11.value + q12.value + q13.value + q14.value + q15.value;
});

// Calculate the highest scoring profession
const topProfession = computed(() => {
  const scores = [
    { id: "marketing", name: "Marketing", score: marketingScore.value },
    { id: "software", name: "Software", score: softwareScore.value },
    { id: "design", name: "Design / Art", score: designScore.value },
  ];

  // Sort descending to get the highest score at index 0
  scores.sort((a, b) => b.score - a.score);
  return scores[0];
});

const handleNext = () => {
  if (currentPage.value < 3) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Finish survey and display results
    showResults.value = true;

    console.log("Survey Submitted:", {
      email: email.value,
      scores: {
        Marketing: marketingScore.value,
        Software: softwareScore.value,
        Design: designScore.value,
      },
      bestMatch: topProfession.value.name,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleBack = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<style scoped>
    .survey-section{
        height: 100%;
        padding-top: 6.2rem;
        padding-bottom: 4rem;
    }
    .container{
        max-width: 1213px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button-container{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .submit-button{
        width: 100%;
        max-width: 120px;
        padding: 12px 24px;
        background: #fe78b0;
        color: var(--text-color);
        font-size: 1rem;
        font-weight: 400;
        font-family: "Poppins", sans-serif;
        border: 1px solid transparent;
        border-radius: 9999px;
        transition: .25s ease;
        cursor: pointer;
    }
    .back-button{
        width: 100%;
        max-width: 120px;
        padding: 12px 24px;
        background: transparent;
        color: #a59ce6;
        font-size: 1rem;
        font-weight: 400;
        font-family: "Poppins", sans-serif;
        border: 1px solid #a59ce6;
        border-radius: 9999px;
        transition: .25s ease;
        cursor: pointer;
    }
    .back-button:hover {
        background: rgba(254, 120, 176, 0.1);
    }
    .survey-img{
        width: 100%;
        background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    }
    .divider-container{
        width: 40%;
        justify-content: center;
        margin: 0 auto;
        display: flex;
    }
    .questions-container {
        padding: 0 1rem;
    }
</style>
