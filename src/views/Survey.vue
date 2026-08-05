<template>
  <Navbar />
  <section class="survey-section">
    <div class="container">
      <img class="survey-img" :src="surveyImage" />
    </div>
    <div v-if="showResumePrompt" class="resume-overlay">
      <div class="survey-card resume-card">
        <h2 class="card-title">Welcome back!</h2>
        <p class="card-subtitle">
          You have an unfinished survey. Want to pick up where you left off?
        </p>
        <div class="button-container">
          <button class="back-button" @click="handleResumeDecline">
            Start over
          </button>
          <button class="submit-button" @click="handleResumeAccept">
            Continue
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade-slide" mode="out-in">
      <!-- WELCOME STAGE -->
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

      <!-- EMAIL STAGE -->
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

      <!-- QUESTIONS STAGE -->
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
              <!-- PAGE 1 -->
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
                </p>
              </div>

              <!-- PAGE 2 -->
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
                </p>
              </div>

              <!-- PAGE 3 -->
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
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
                  Please answer this question.
                </p>
              </div>
            </div>
          </Transition>
        </div>

        <div class="button-container">
          <button
            class="back-button"
            @click="handleBack"
            v-if="currentPage > 1"
          >
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

      <!-- RESULTS STAGE -->
      <div v-else key="results" class="results-container">
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
    </Transition>
  </section>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, Ref } from "vue";
import { useI18n } from "vue-i18n";
import Navbar from "../components/Navbar.vue";
import SliderQuestion from "../components/SliderQuestion.vue";
import InputQuestion from "../components/InputQuestion.vue";

const { locale } = useI18n();

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

// 1. Define a type representing numbers from 1 to 15
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

// 2. Generate the keys dynamically (e.g., "q1" | "q2" | ... | "q15")
type TouchedState = {
  [K in `q${QuestionNumber}`]: boolean;
};

// 3. Apply it to your Vue ref
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
  scores.sort((a, b) => b.score - a.score);
  return scores[0];
});

const page1Questions: (keyof TouchedState)[] = ["q1", "q2", "q3", "q4", "q5"];
const page2Questions: (keyof TouchedState)[] = ["q6", "q7", "q8", "q9", "q10"];
const page3Questions: (keyof TouchedState)[] = [
  "q11",
  "q12",
  "q13",
  "q14",
  "q15",
];

const untouchedOnPage = (
  keys: (keyof TouchedState)[],
): (keyof TouchedState)[] => {
  return keys.filter((k) => !touched.value[k]);
};

const page1Valid = computed(() => untouchedOnPage(page1Questions).length === 0);
const page2Valid = computed(() => untouchedOnPage(page2Questions).length === 0);
const page3Valid = computed(() => untouchedOnPage(page3Questions).length === 0);

// ============================
// LOCAL STORAGE — RESUME LOGIC
// ============================

const STORAGE_KEY = "axonode-survey-progress";
const showResumePrompt = ref(false);

interface SavedProgress {
  stage: Stage;
  currentPage: number;
  email: string;
  touched: TouchedState;
  answers: Record<`q${QuestionNumber}`, number>;
}

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

const saveProgress = () => {
  // Don't persist the Welcome stage — nothing worth resuming yet
  if (stage.value === Stage.Welcome) return;
  const payload: SavedProgress = {
    stage: stage.value,
    currentPage: currentPage.value,
    email: email.value,
    touched: touched.value,
    answers: getAllAnswers(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage can throw in private-browsing/storage-full edge cases — fail silently
  }
};

const clearProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

const applyProgress = (saved: SavedProgress) => {
  stage.value = saved.stage;
  currentPage.value = saved.currentPage;
  email.value = saved.email;
  touched.value = saved.touched;

  q1.value = saved.answers.q1;
  q2.value = saved.answers.q2;
  q3.value = saved.answers.q3;
  q4.value = saved.answers.q4;
  q5.value = saved.answers.q5;
  q6.value = saved.answers.q6;
  q7.value = saved.answers.q7;
  q8.value = saved.answers.q8;
  q9.value = saved.answers.q9;
  q10.value = saved.answers.q10;
  q11.value = saved.answers.q11;
  q12.value = saved.answers.q12;
  q13.value = saved.answers.q13;
  q14.value = saved.answers.q14;
  q15.value = saved.answers.q15;
};

let pendingProgress: SavedProgress | null = null;

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      pendingProgress = JSON.parse(raw) as SavedProgress;
      // Only prompt if it's an in-progress survey, not a finished one
      if (pendingProgress.stage !== Stage.Results) {
        showResumePrompt.value = true;
      } else {
        clearProgress();
      }
    }
  } catch {
    // corrupted or missing data — just start fresh
  }
});

const handleResumeAccept = () => {
  if (pendingProgress) applyProgress(pendingProgress);
  showResumePrompt.value = false;
};

const handleResumeDecline = () => {
  clearProgress();
  showResumePrompt.value = false;
};

// Auto-save on every meaningful change once the user is past Welcome
watch(
  [
    stage,
    currentPage,
    email,
    touched,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    q12,
    q13,
    q14,
    q15,
  ],
  () => saveProgress(),
  { deep: true },
);

// ============================
// NAVIGATION HANDLERS
// ============================

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

const handleNext = () => {
  attemptedNext.value = true;

  if (currentPage.value === 1 && !page1Valid.value) return;
  if (currentPage.value === 2 && !page2Valid.value) return;
  if (currentPage.value === 3 && !page3Valid.value) return;

  attemptedNext.value = false;

  if (currentPage.value < 3) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    stage.value = Stage.Results;
    clearProgress();
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
.field-error {
  color: #e0435c;
  font-size: 0.85rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
.survey-section {
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
.survey-img {
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
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
  max-width: 600px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
}
@media (max-width: 480px) {
  .survey-section {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 4.5rem; /* also tighten top space now that banner may be hidden */
  }
  .survey-card {
    padding: 1.75rem 1.25rem;
    border-radius: 18px; /* slightly less rounded reads better at small sizes */
  }
  .card-title {
    font-size: 1.35rem;
  }
  .questions-container {
    padding: 0; /* the card's own padding already handles this now */
  }
}
@media (max-width: 480px) {
  .button-container {
    flex-direction: column-reverse; /* primary action (submit) on top, thumb-reachable */
    gap: 0.75rem;
  }
  .submit-button,
  .back-button {
    max-width: 100%; /* full-width tap targets instead of the 120px desktop cap */
    padding: 14px 24px; /* slightly taller for easier thumb tapping */
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
}
.card-subtitle {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  opacity: 0.8;
  margin-bottom: 2rem;
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
.resume-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}
.resume-card {
  width: 100%;
}
</style>
