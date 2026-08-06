<template>
  <div class="survey-page-wrapper">
    <Navbar />
  <section class="survey-section">
    <div class="container">
      <img class="survey-img" :src="surveyImage" />
    </div>

    <HDivider style="padding-bottom: 40px; width:50%; margin: auto"/> 

    <Transition name="fade-slide" mode="out-in">
      <div
        v-if="stage === Stage.Welcome"
        key="welcome"
        class="survey-card welcome-stage"
      >
        <h2 class="card-title">
          <i18n-t keypath="survey.welcome.title" tag="span">
            <template #gr-name>
              <span class="brand-name">Axonode</span>
            </template>
          </i18n-t>
        </h2>

        <p class="card-subtitle">{{ $t("survey.welcome.subtitle") }}</p>

        <div class="button-container">
          <button class="submit-button" @click="handleWelcomeContinue">
            {{ $t("survey.welcome.go") }}
          </button>
        </div>

        <p class="welcome-acceptance">
          <i18n-t keypath="survey.welcome.acceptence" tag="span">
            <template #go>{{ $t("survey.welcome.go") }}</template>
            <template #survey-policy>
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener"
                class="policy-link"
              >
                {{ $t("survey.welcome.policyLinkText") }}
              </a>
            </template>
          </i18n-t>
        </p>
      </div>

      <div v-else-if="stage === Stage.Email" key="email" class="survey-card">
        <h2 class="card-title">{{ $t("survey.email.title") }}</h2>
        <p class="card-subtitle">{{ $t("survey.email.subtitle") }}</p>
        <InputQuestion
          v-model:answer="email"
          :placeholder="$t('survey.email.hint')"
          @blur="validateEmail"
        />
        <p v-if="attemptedNext && emailError" class="field-error">
          {{ emailError }}
        </p>
        <div class="button-container">
          <button class="submit-button" @click="handleEmailContinue">
            {{ $t("survey.button-keep") }}
          </button>
        </div>
      </div>

      <div
        v-else-if="stage === Stage.Questions"
        key="questions"
        class="survey-card"
      >
        <h2 class="card-title">{{ $t("survey.questions.title") }}</h2>
        <p class="card-subtitle">{{ $t("survey.questions.subtitle") }}</p>
        <div class="questions-container">
          <Transition name="fade-slide" mode="out-in">
            <div :key="currentPage">
              <div v-if="currentPage === 1">
                <SliderQuestion
                  v-model="q1"
                  :question="$t('survey.questions.q1')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q2"
                  :question="$t('survey.questions.q2')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                  inverted
                />

                <SliderQuestion
                  v-model="q3"
                  :question="$t('survey.questions.q3')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                  inverted
                />

                <SliderQuestion
                  v-model="q4"
                  :question="$t('survey.questions.q4')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q5"
                  :question="$t('survey.questions.q5')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />
              </div>

              <div v-else-if="currentPage === 2">
                <SliderQuestion
                  v-model="q6"
                  :question="$t('survey.questions.q6')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q7"
                  :question="$t('survey.questions.q7')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q8"
                  :question="$t('survey.questions.q8')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                  inverted
                />

                <SliderQuestion
                  v-model="q9"
                  :question="$t('survey.questions.q9')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                  inverted
                />

                <SliderQuestion
                  v-model="q10"
                  :question="$t('survey.questions.q10')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />
              </div>

              <div v-else-if="currentPage === 3">
                <SliderQuestion
                  v-model="q11"
                  :question="$t('survey.questions.q11')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q12"
                  :question="$t('survey.questions.q12')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q13"
                  :question="$t('survey.questions.q13')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q14"
                  :question="$t('survey.questions.q14')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />

                <SliderQuestion
                  v-model="q15"
                  :question="$t('survey.questions.q15')"
                  :leftLabel="$t('survey.a')"
                  :rightLabel="$t('survey.b')"
                />
              </div>
            </div>
          </Transition>
        </div>

        <p v-if="submitError" class="field-error">{{ submitError }}</p>
        <div class="button-container">
          <button
            class="back-button"
            @click="handleBack"
            v-if="currentPage > 1"
          >
            {{ $t("survey.button-back") }}
          </button>
          <button
            class="submit-button"
            @click="handleNext"
            :disabled="isSubmitting"
          >
            {{
              isSubmitting
                ? "Submitting..."
                : currentPage === 3
                  ? $t("survey.button-send")
                  : $t("survey.button-keep")
            }}
          </button>
        </div>
      </div>

      <div v-else key="results" class="results-container">
        <SurveyResults
          v-if="serverScores && serverTopProfession"
          :scores="serverScores"
          :topProfession="serverTopProfession"
        />
      </div>
    </Transition>
  </section>
  <Footer :style="{backgroundColor: 'transparent'}"/>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, Ref } from "vue";
import { useI18n } from "vue-i18n";
import Navbar from "../components/Navbar.vue";
import SliderQuestion from "../components/SliderQuestion.vue";
import InputQuestion from "../components/InputQuestion.vue";
import SurveyResults from "../components/SurveyResults.vue";
import HDivider from "../components/HDivider.vue";
import Footer from "../components/Footer.vue";
import {
  SurveyPayload,
  SurveyResponse,
  publicService,
} from "../api/publicService.ts";
const { locale } = useI18n({ useScope: 'global' });

const surveyImage = computed(() => {
  return locale.value === "tr" ? "/letsfindouttr.png" : "/letsfindout.png";
});

enum Stage {
  Welcome,
  Email,
  Questions,
  Results,
}

const stage: Ref<Stage> = ref(Stage.Welcome);
const currentPage = ref(1);

const email = ref("");
const emailError = ref("");
const attemptedNext = ref(false);

type QuestionNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

const isSubmitting = ref(false);
const submitError = ref("");
const serverScores = ref<SurveyResponse["scores"] | null>(null);
const serverTopProfession = ref<SurveyResponse["topProfession"] | null>(null);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = () => {
  if (!email.value.trim()) {
    emailError.value = "Email is required.";
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.value = "Please enter a valid email address.";
  } else {
    emailError.value = "";
  }
  return emailError.value === "";
};

const q1 = ref(12);
const q2 = ref(12);
const q3 = ref(12);
const q4 = ref(12);
const q5 = ref(12);
const q6 = ref(12);
const q7 = ref(12);
const q8 = ref(12);
const q9 = ref(12);
const q10 = ref(12);
const q11 = ref(12);
const q12 = ref(12);
const q13 = ref(12);
const q14 = ref(12);
const q15 = ref(12);



const getAllAnswers = (): Record<`q${QuestionNumber}`, number> => ({
  q1: q1.value,
  q2: q2.value,
  q3: q3.value,
  q4: q4.value,
  q5: q5.value,
  q6: q6.value,
  q7: q7.value,
  q8: q8.value,
  q9: q9.value,
  q10: q10.value,
  q11: q11.value,
  q12: q12.value,
  q13: q13.value,
  q14: q14.value,
  q15: q15.value,
});

const handleWelcomeContinue = () => {
  stage.value = Stage.Email;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleEmailContinue = () => {
  attemptedNext.value = true;
  if (!validateEmail()) return;
  attemptedNext.value = false;
  stage.value = Stage.Questions;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const handleNext = async () => {
  attemptedNext.value = true;

  attemptedNext.value = false;

  if (currentPage.value < 3) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  isSubmitting.value = true;
  submitError.value = "";

  try {
    const payload: SurveyPayload = {
      email: email.value,
      answers: getAllAnswers(),
    };
    const result = await publicService.submitSurvey(payload);

    serverScores.value = result.scores;
    serverTopProfession.value = result.topProfession;

    stage.value = Stage.Results;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    submitError.value =
      err instanceof Error
        ? err.message
        : "Submission failed. Please try again.";
  } finally {
    isSubmitting.value = false;
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
.survey-page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.field-error {
  color: #e0435c;
  font-size: 0.85rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
.survey-section {
  flex-grow: 1;
  height: 100%;
  padding-top: 6.2rem;
  padding-bottom: 4rem;
}
.container {
  max-width: 1213px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  background: var(--bg-color);
  border-radius: 20px;
  overflow: hidden;
}
.survey-img {
  display: block;  
  width: 100%;     
  height: auto;
}
.button-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.submit-button {
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
  transition: 0.25s ease;
  cursor: pointer;
  text-align: center;
}
.back-button {
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
  transition: 0.25s ease;
  cursor: pointer;
}
.back-button:hover {
  background: rgba(254, 120, 176, 0.1);
}

.divider-container {
  width: 40%;
  justify-content: center;
  margin: 0 auto;
  display: flex;
}
.questions-container {
  padding: 0 1rem;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
.survey-card {
  width: 45%;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  border-radius: 24px;
  text-align: center;
  background: var(--bg-color);

  border: 2px dashed #292929;
}
.survey-card.welcome-stage .card-subtitle{
  margin-bottom: 35px;
}

.survey-card.welcome-stage .card-title{
  margin: 0px auto;
  padding: 0px;
  width: 100%;
  margin-bottom: 5px;
}

.card-subtitle{
  margin: 0px;
}
@media (max-width: 480px) {
  .survey-section {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 4.5rem; 
  }
  .survey-card {
    padding: 1.75rem 1.25rem;
    border-radius: 18px;
  }
  .card-title {
    font-size: 1.35rem;
  }
  .questions-container {
    padding: 0; 
  }
}
@media (max-width: 480px) {
  .button-container {
    flex-direction: column-reverse; 
    gap: 0.75rem;
  }
  .submit-button,
  .back-button {
    max-width: 100%;
    padding: 14px 24px; 
  }
}
.welcome-stage {
  text-align: center;
}
.card-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  margin-top: 0px;
  width: 70%;
  margin: 0 auto;
}
.card-subtitle {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  opacity: 0.8;
}
.brand-name {
  background: linear-gradient(90deg, #7ad5e4 0%, #b29de4 50%, #f68cae 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}
.welcome-acceptance {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 1rem;
}
.policy-link {
  color: #a59ce6;
  text-decoration: underline;
}
</style>
