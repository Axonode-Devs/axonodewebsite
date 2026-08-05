<template>
  <Navbar />
  <section class="survey-section">
    <div class="container">
      <img class="survey-img" :src="surveyImage" />
    </div>
    <div v-if="!showResults">
      <div class="questions-container">
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
            :traits="[{ name: 'Enterprising', score: 5 }]"
          />
          <SliderQuestion
            v-model="q2"
            :question="$t('survey.q2')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Social', score: 5 }]"
          />
          <SliderQuestion
            v-model="q3"
            :question="$t('survey.q3')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Social', score: 3 }, { name: 'Enterprising', score: 3 }]"
          />
          <SliderQuestion
            v-model="q4"
            :question="$t('survey.q4')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Enterprising', score: 3 }, { name: 'Investigative', score: 2 }]"
          />
          <SliderQuestion
            v-model="q5"
            :question="$t('survey.q5')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Social', score: 5 }]"
          />
        </div>

        <div v-show="currentPage === 2">
          <SliderQuestion
            v-model="q6"
            :question="$t('survey.q6')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Investigative', score: 5 }]"
          />
          <SliderQuestion
            v-model="q7"
            :question="$t('survey.q7')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Investigative', score: 5 }]"
          />
          <SliderQuestion
            v-model="q8"
            :question="$t('survey.q8')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Investigative', score: 3 }, { name: 'Artistic', score: 2 }]"
          />
          <SliderQuestion
            v-model="q9"
            :question="$t('survey.q9')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Conventional', score: 5 }]"
            inverted
          />
          <SliderQuestion
            v-model="q10"
            :question="$t('survey.q10')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Investigative', score: 2 }, { name: 'Conventional', score: 3 }]"
          />
        </div>

        <div v-show="currentPage === 3">
          <SliderQuestion
            v-model="q11"
            :question="$t('survey.q11')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Artistic', score: 4 }]"
          />
          <SliderQuestion
            v-model="q12"
            :question="$t('survey.q12')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Artistic', score: 5 }]"
          />
          <SliderQuestion
            v-model="q13"
            :question="$t('survey.q13')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Artistic', score: 4 }, { name: 'Social', score: 1 }]"
          />
          <SliderQuestion
            v-model="q14"
            :question="$t('survey.q14')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Artistic', score: 3 }, { name: 'Realistic', score: 2 }]"
          />
          <SliderQuestion
            v-model="q15"
            :question="$t('survey.q15')"
            :leftLabel="$t('survey.a')"
            :rightLabel="$t('survey.b')"
            :traits="[{ name: 'Realistic', score: 5 }]"
          />
        </div>

        <div v-show="currentPage === 4">
          <MultipleChoiceQuestion
            v-model="mcq1"
            :question="$t('survey.mcq1')"
            name="mcq1"
            :options="[
              { label: $t('survey.mcq1_opt1'), value: 'yes' },
              { label: $t('survey.mcq1_opt2'), value: 'rarely' },
              { label: $t('survey.mcq1_opt3'), value: 'no' }
            ]"
          />
          <MultipleChoiceQuestion
            v-model="mcq2"
            :question="$t('survey.mcq2')"
            name="mcq2"
            :options="[
              { label: $t('survey.mcq2_opt1'), value: 'yes' },
              { label: $t('survey.mcq2_opt2'), value: 'maybe' },
              { label: $t('survey.mcq2_opt3'), value: 'no' }
            ]"
          />
          <MultipleChoiceQuestion
            v-model="mcq3"
            :question="$t('survey.mcq3')"
            name="mcq3"
            :options="[
              { label: $t('survey.mcq3_opt1'), value: 'software' },
              { label: $t('survey.mcq3_opt2'), value: 'design' },
              { label: $t('survey.mcq3_opt3'), value: 'entrepreneurship' }
            ]"
          />
          <MultipleChoiceQuestion
            v-model="mcq4"
            :question="$t('survey.mcq4')"
            name="mcq4"
            :options="[
              { label: $t('survey.mcq4_opt1'), value: '1-5' },
              { label: $t('survey.mcq4_opt2'), value: '5-10' },
              { label: $t('survey.mcq4_opt3'), value: '10+' }
            ]"
          />
          <MultipleChoiceQuestion
            v-model="mcq5"
            :question="$t('survey.mcq5')"
            name="mcq5"
            :options="[
              { label: $t('survey.mcq5_opt1'), value: 'social_media' },
              { label: $t('survey.mcq5_opt2'), value: 'friend' },
              { label: $t('survey.mcq5_opt3'), value: 'other' }
            ]"
          />
        </div>
      </div>
      <div class="button-container">
        <button class="back-button" @click="handleBack" v-if="currentPage > 1">
          {{ $t("survey.button-back") }}
        </button>
        <button class="submit-button" @click="handleNext">
          {{
            currentPage === 4
              ? $t("survey.button-send")
              : $t("survey.button-keep")
          }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import HDivider from "../components/HDivider.vue";
import Navbar from "../components/Navbar.vue";
import SliderQuestion from "../components/SliderQuestion.vue";
import InputQuestion from "../components/InputQuestion.vue";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion.vue";

const router = useRouter();

const { locale } = useI18n();

const surveyImage = computed(() => {
  return locale.value === "tr" ? "/letsfindouttr.png" : "/letsfindout.png";
});

const currentPage = ref(1);
const showResults = ref(false);

const email = ref("");

const q1 = ref({ value: 3, points: {} }); const q2 = ref({ value: 3, points: {} }); const q3 = ref({ value: 3, points: {} }); const q4 = ref({ value: 3, points: {} }); const q5 = ref({ value: 3, points: {} });
const q6 = ref({ value: 3, points: {} }); const q7 = ref({ value: 3, points: {} }); const q8 = ref({ value: 3, points: {} }); const q9 = ref({ value: 3, points: {} }); const q10 = ref({ value: 3, points: {} });
const q11 = ref({ value: 3, points: {} }); const q12 = ref({ value: 3, points: {} }); const q13 = ref({ value: 3, points: {} }); const q14 = ref({ value: 3, points: {} }); const q15 = ref({ value: 3, points: {} });

const mcq1 = ref("");
const mcq2 = ref("");
const mcq3 = ref("");
const mcq4 = ref("");
const mcq5 = ref("");

const allQuestions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15];

const traitTotals = computed(() => {
  const totals = {
    Enterprising: 0,
    Social: 0,
    Investigative: 0,
    Artistic: 0,
    Conventional: 0,
    Realistic: 0
  };

  allQuestions.forEach(q => {
    if (q.value.points) {
      for (const [trait, score] of Object.entries(q.value.points)) {
        if (totals[trait] !== undefined) {
          totals[trait] += score;
        }
      }
    }
  });

  return totals;
});

const maxScores = {
  Enterprising: 12,
  Social: 12,
  Investigative: 16,
  Artistic: 17,
  Conventional: 9,
  Realistic: 11
};

// Mevcut professionScores hesaplaması (Her biri kendi içinde %100) - DOKUNULMADI
const professionScores = computed(() => {
  const t = traitTotals.value;
  
  const devSum = (t.Investigative || 0) + (t.Conventional || 0);
  const desSum = (t.Artistic || 0) + (t.Realistic || 0);
  const marSum = (t.Enterprising || 0) + (t.Social || 0);
  
  const devPercent = Math.min(100, Math.round((devSum / 25) * 100));
  const desPercent = Math.min(100, Math.round((desSum / 25) * 100));
  const marPercent = Math.min(100, Math.round((marSum / 25) * 100));

  const profs = [
    { name: 'Developer', sum: devSum, percent: devPercent },
    { name: 'Designer', sum: desSum, percent: desPercent },
    { name: 'Marketing', sum: marSum, percent: marPercent }
  ];
  
  return profs.sort((a, b) => b.percent - a.percent);
});

// YENİ: Toplamı %100 yapan oransal (göreli) dağılım hesaplaması
const relativeProfessions = computed(() => {
  const t = traitTotals.value;
  
  const devSum = (t.Investigative || 0) + (t.Conventional || 0);
  const desSum = (t.Artistic || 0) + (t.Realistic || 0);
  const marSum = (t.Enterprising || 0) + (t.Social || 0);
  
  const totalSum = devSum + desSum + marSum;

  if (totalSum === 0) {
    return [
      { name: 'Developer', sum: 0, percent: 33 },
      { name: 'Designer', sum: 0, percent: 33 },
      { name: 'Marketing', sum: 0, percent: 34 }
    ];
  }

  const devPercent = Math.round((devSum / totalSum) * 100);
  const desPercent = Math.round((desSum / totalSum) * 100);
  // Toplamın tam %100 yapması için kalan oran marketing'e verilir
  const marPercent = 100 - (devPercent + desPercent);

  const profs = [
    { name: 'Developer', sum: devSum, percent: devPercent },
    { name: 'Designer', sum: desSum, percent: desPercent },
    { name: 'Marketing', sum: marSum, percent: marPercent }
  ];

  return profs.sort((a, b) => b.percent - a.percent);
});

const handleNext = () => {
  if (currentPage.value === 1 && !email.value) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  
  if (currentPage.value < 4) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    localStorage.setItem("survey_results", JSON.stringify({
      scores: traitTotals.value,
      professions: professionScores.value,
      relativeProfessions: relativeProfessions.value,
      mcqAnswers: {
        mcq1: mcq1.value,
        mcq2: mcq2.value,
        mcq3: mcq3.value,
        mcq4: mcq4.value,
        mcq5: mcq5.value
      }
    }));

    router.push("/survey-result");
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
