<template>
  <div class="survey-page-wrapper">
    <Navbar />
    <section class="survey-section">
      <div class="container">
        <img class="survey-img" :src="surveyImage" />
      </div>

      <HDivider
        class="hdivider"
        style="padding-bottom: 40px; width: 50%; margin: auto"
      />

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
            {{ $t(emailError) }}
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
                <!-- PAGE 1 — RIASEC sliders -->
                <div v-if="currentPage === 1">
                  <SliderQuestion
                    v-model="q1"
                    :touched="touched.q1"
                    @touched="markTouched('q1')"
                    :question="$t('survey.questions.q1')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q1" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q2"
                    :touched="touched.q2"
                    @touched="markTouched('q2')"
                    :question="$t('survey.questions.q2')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                    inverted
                  />
                  <p v-if="attemptedNext && !touched.q2" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q3"
                    :touched="touched.q3"
                    @touched="markTouched('q3')"
                    :question="$t('survey.questions.q3')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                    inverted
                  />
                  <p v-if="attemptedNext && !touched.q3" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q4"
                    :touched="touched.q4"
                    @touched="markTouched('q4')"
                    :question="$t('survey.questions.q4')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q4" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q5"
                    :touched="touched.q5"
                    @touched="markTouched('q5')"
                    :question="$t('survey.questions.q5')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q5" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>
                </div>

                <!-- PAGE 2 — RIASEC sliders -->
                <div v-else-if="currentPage === 2">
                  <SliderQuestion
                    v-model="q6"
                    :touched="touched.q6"
                    @touched="markTouched('q6')"
                    :question="$t('survey.questions.q6')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q6" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q7"
                    :touched="touched.q7"
                    @touched="markTouched('q7')"
                    :question="$t('survey.questions.q7')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q7" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q8"
                    :touched="touched.q8"
                    @touched="markTouched('q8')"
                    :question="$t('survey.questions.q8')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                    inverted
                  />
                  <p v-if="attemptedNext && !touched.q8" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q9"
                    :touched="touched.q9"
                    @touched="markTouched('q9')"
                    :question="$t('survey.questions.q9')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                    inverted
                  />
                  <p v-if="attemptedNext && !touched.q9" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q10"
                    :touched="touched.q10"
                    @touched="markTouched('q10')"
                    :question="$t('survey.questions.q10')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q10" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>
                </div>

                <!-- PAGE 3 — RIASEC sliders -->
                <div v-else-if="currentPage === 3">
                  <SliderQuestion
                    v-model="q11"
                    :touched="touched.q11"
                    @touched="markTouched('q11')"
                    :question="$t('survey.questions.q11')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q11" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q12"
                    :touched="touched.q12"
                    @touched="markTouched('q12')"
                    :question="$t('survey.questions.q12')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q12" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q13"
                    :touched="touched.q13"
                    @touched="markTouched('q13')"
                    :question="$t('survey.questions.q13')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q13" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q14"
                    :touched="touched.q14"
                    @touched="markTouched('q14')"
                    :question="$t('survey.questions.q14')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q14" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>

                  <SliderQuestion
                    v-model="q15"
                    :touched="touched.q15"
                    @touched="markTouched('q15')"
                    :question="$t('survey.questions.q15')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                  />
                  <p v-if="attemptedNext && !touched.q15" class="field-error">
                    {{ $t("survey.question-required-error") }}
                  </p>
                </div>

                <!-- PAGE 4 — general/unscored MCQ questions -->
                <div v-else-if="currentPage === 4">
                  <McqQuestion
                    v-model="g1"
                    :question="$t('survey.mcq1')"
                    :options="mcqOptions1"
                    name="g1"
                  />

                  <McqQuestion
                    v-model="g2"
                    :question="$t('survey.mcq2')"
                    :options="mcqOptions2"
                    name="g2"
                  />

                  <McqQuestion
                    v-model="g3"
                    :question="$t('survey.mcq3')"
                    :options="mcqOptions3"
                    name="g3"
                  />

                  <InputQuestion
                    v-model:answer="g4"
                    :question="$t('survey.mcq4')"
                    :placeholder="$t('survey.mcq4_placeholder')"
                  />

                  <InputQuestion
                    v-model:answer="g5"
                    :question="$t('survey.mcq5')"
                    :placeholder="$t('survey.mcq5_placeholder')"
                  />
                </div>
              </div>
            </Transition>
          </div>

          <p v-if="submitError" class="field-error">{{ $t(submitError) }}</p>
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
                  : currentPage === 4
                    ? $t("survey.button-send")
                    : $t("survey.button-keep")
              }}
            </button>
          </div>
        </div>
      </Transition>
    </section>
    <Footer :style="{ backgroundColor: 'transparent' }" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Navbar from "../components/Navbar.vue";
import SliderQuestion from "../components/SliderQuestion.vue";
import InputQuestion from "../components/InputQuestion.vue";
import McqQuestion from "../components/MultipleChoiceQuestion.vue";
import HDivider from "../components/HDivider.vue";
import Footer from "../components/Footer.vue";
import type {
  SurveyPayload,
  QuestionNumber,
} from "../api/publicService";
import { publicService } from "../api/publicService";

const { locale, t } = useI18n({ useScope: "global" });
const router = useRouter();

const surveyImage = computed(() => {
  return locale.value === "tr" ? "/letsfindouttr.png" : "/letsfindout.png";
});

enum Stage {
  Welcome,
  Email,
  Questions,
}

const stage: Ref<Stage> = ref(Stage.Welcome);
const currentPage = ref(1);

const email = ref("");
const emailError = ref("");
const attemptedNext = ref(false);

const isSubmitting = ref(false);
const submitError = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = () => {
  if (!email.value.trim()) {
    emailError.value = "survey.email-required-error";
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.value = "survey.email-invalid-error";
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

type TouchedState = Record<`q${QuestionNumber}`, boolean>;

const touched = ref<TouchedState>({
  q1: false,
  q2: false,
  q3: false,
  q4: false,
  q5: false,
  q6: false,
  q7: false,
  q8: false,
  q9: false,
  q10: false,
  q11: false,
  q12: false,
  q13: false,
  q14: false,
  q15: false,
});

const markTouched = (key: keyof TouchedState) => {
  touched.value[key] = true;
};

const page1Questions: (keyof TouchedState)[] = ["q1", "q2", "q3", "q4", "q5"];
const page2Questions: (keyof TouchedState)[] = ["q6", "q7", "q8", "q9", "q10"];
const page3Questions: (keyof TouchedState)[] = [
  "q11",
  "q12",
  "q13",
  "q14",
  "q15",
];

const untouchedOnPage = (keys: (keyof TouchedState)[]) =>
  keys.filter((k) => !touched.value[k]);

// General/unscored MCQ answers — g1-g5, sent separately as `generalAnswers`,
// never mixed into the RIASEC `answers` object the backend scores against.
const g1 = ref("");
const g2 = ref("");
const g3 = ref("");
const g4 = ref("");
const g5 = ref("");

const mcqOptions1 = [
  { label: t("survey.mcq1_opt1"), value: "A" },
  { label: t("survey.mcq1_opt2"), value: "B" },
  { label: t("survey.mcq1_opt3"), value: "C" },
];
const mcqOptions2 = [
  { label: t("survey.mcq2_opt1"), value: "A" },
  { label: t("survey.mcq2_opt2"), value: "B" },
  { label: t("survey.mcq2_opt3"), value: "C" },
];
const mcqOptions3 = [
  { label: t("survey.mcq3_opt1"), value: "A" },
  { label: t("survey.mcq3_opt2"), value: "B" },
  { label: t("survey.mcq3_opt3"), value: "C" },
];

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
  submitError.value = "";

  if (currentPage.value === 4) {
  if (!g1.value || !g2.value || !g3.value || !g4.value) {
    submitError.value = "survey.mcq-no-answer-error";
    return;
  }
}

  attemptedNext.value = false;

  if (currentPage.value < 4) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  isSubmitting.value = true;

  try {
    const payload: SurveyPayload = {
      email: email.value,
      answers: {
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
      },
      generalAnswers: {
        g1: g1.value,
        g2: g2.value,
        g3: g3.value,
        g4: g4.value,
        g5: g5.value,
      },
    };

    const result = await publicService.submitSurvey(payload);

    if (result.id) {
      router.push(`/survey-result/${result.id}`);
    } else {
      submitError.value = "Server did not return a result ID. Please try again.";
    }
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
.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
.survey-card.welcome-stage .card-subtitle {
  margin-bottom: 35px;
}
.survey-card.welcome-stage .card-title {
  margin: 0px auto;
  padding: 0px;
  width: 100%;
  margin-bottom: 5px;
}
.card-subtitle {
  margin: 0px;
}
@media (max-width: 480px) {
  .survey-section {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 4.5rem;
  }
  .hdivider {
    display: none;
  }
  .container {
    display: none;
  }
  .survey-card {
    margin-top: 2rem;
    padding: 1.75rem 1.25rem;
    border-radius: 18px;
    width: 75%;
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
