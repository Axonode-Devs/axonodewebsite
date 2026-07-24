<template>
  <Navbar />
  <section class="application-section">
    <div class="background-mesh"></div>

    <div class="container">
      <div class="layout-grid">
        <div class="form-wrapper">
          <div v-if="isSubmitted" class="success-state">
            <div class="success-icon">
              <font-awesome-icon :icon="['fas', 'circle-check']" />
            </div>
            <h2 class="title">
              {{ $t("application_form.success.title") }}
              <span class="gradient-text">{{
                $t("application_form.success.title_highlight")
              }}</span>
            </h2>
            <p>{{ $t("application_form.success.message") }}</p>
            <button @click="router.push('/')" class="submit-btn mt-input">
              {{ $t("application_form.nav.back_to_home") }}
            </button>
          </div>

          <template v-else>
            <div class="form-header">
              <h2 class="title">
                {{ $t("application_form.header.title") }}
                <span class="gradient-text">{{
                  $t("application_form.header.title_highlight")
                }}</span>
              </h2>
              <div class="stepper">
                <div
                  v-for="step in 3"
                  :key="step"
                  :class="['step', { active: currentStep >= step }]"
                >
                  <span class="step-number">{{ step }}</span>
                </div>
              </div>
              <Transition name="fade-slide">
                <div v-if="inviteToken" class="invited-badge">
                  {{
                    inviteNote
                      ? $t("application_form.header.invited_badge_for", {
                          name: inviteNote,
                        })
                      : $t("application_form.header.invited_badge")
                  }}
                </div>
              </Transition>
            </div>

            <form @submit.prevent="handleNextStep" class="axonode-form">
              <div v-if="currentStep === 1" class="step-content">
                <h3 class="section-title">
                  <font-awesome-icon :icon="['far', 'id-card']" />
                  {{ $t("application_form.steps.personal_info.section_title") }}
                </h3>
                <div class="form-row">
                  <div class="form-group">
                    <label for="fullname">
                      <font-awesome-icon :icon="['fas', 'user']" />
                      {{
                        $t(
                          "application_form.steps.personal_info.fullname.label",
                        )
                      }}
                      <span class="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      v-model="form.fullname"
                      :placeholder="
                        $t(
                          'application_form.steps.personal_info.fullname.placeholder',
                        )
                      "
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                      {{
                        $t("application_form.steps.personal_info.email.label")
                      }}
                      <span class="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      :placeholder="
                        $t(
                          'application_form.steps.personal_info.email.placeholder',
                        )
                      "
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="contact">
                    <font-awesome-icon :icon="['fas', 'phone']" />
                    {{
                      $t("application_form.steps.personal_info.contact.label")
                    }}
                  </label>
                  <div class="form-group-row">
                    <input
                      type="text"
                      id="contact"
                      v-model="form.contact_value"
                      :placeholder="
                        $t(
                          'application_form.steps.personal_info.contact.placeholder',
                        )
                      "
                      class="contact-input"
                    />
                    <select v-model="form.contact_type" class="contact-select">
                      <option value="" disabled>
                        {{
                          $t(
                            "application_form.steps.personal_info.contact.platform_placeholder",
                          )
                        }}
                      </option>
                      <option
                        v-for="(_, key) in contactTypes"
                        :key="key"
                        :value="key"
                      >
                        {{
                          $t(
                            `application_form.steps.personal_info.contact.types.${key}`,
                          )
                        }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="birthdate">
                    {{
                      $t("application_form.steps.personal_info.birthdate.label")
                    }}
                    <span class="req">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    v-model="form.birthdate"
                    :min="minBirthdate"
                    :max="maxBirthdate"
                    required
                  />
                </div>
              </div>

              <div v-if="currentStep === 2" class="step-content">
                <h3 class="section-title">
                  <font-awesome-icon :icon="['fas', 'laptop-code']" />
                  {{ $t("application_form.steps.profile.section_title") }}
                </h3>
                <div class="form-group">
                  <label>
                    {{
                      $t("application_form.steps.profile.main_interest.label")
                    }}
                    <span class="req">*</span>
                  </label>
                  <div class="grid-options">
                    <label
                      v-for="area in interestAreas"
                      :key="area.id"
                      class="option-card"
                      :class="{ active: form.main_interest.includes(area.id) }"
                    >
                      <input
                        type="checkbox"
                        :value="area.id"
                        v-model="form.main_interest"
                      />
                      <span>{{
                        $t(`application_form.interest_areas.${area.id}.label`)
                      }}</span>
                    </label>
                  </div>
                </div>

                <div
                  v-if="form.main_interest.includes('other')"
                  class="form-group"
                >
                  <label>
                    {{
                      $t("application_form.steps.profile.other_interest.label")
                    }}
                    <span class="req">*</span>
                  </label>
                  <textarea
                    rows="4"
                    :placeholder="
                      t(
                        'application_form.steps.profile.other_interest.placeholder',
                      )
                    "
                    v-model="form.other_interest"
                    required
                  ></textarea>
                </div>

                <Transition name="fade-slide">
                  <div
                    v-if="selectedInterests.some((interest) => interest.sub?.length)"
                    class="form-group mt-input"
                  >
                    <label>
                      {{
                        $t("application_form.steps.profile.sub_interest.label")
                      }}
                      <span class="req">*</span>
                    </label>
                    <div class="grid-options">
                      <template v-for="interest in selectedInterests" :key="interest.id">
                        <label
                          v-for="sub in interest.sub"
                          :key="`${interest.id}-${sub.id}`"
                          class="option-card"
                          :class="{ active: form.sub_interest.includes(sub.id) }"
                        >
                          <input
                            type="checkbox"
                            :value="sub.id"
                            v-model="form.sub_interest"
                          />
                          <span>{{
                            $t(
                              `application_form.interest_areas.${interest.id}.sub.${sub.id}`,
                            )
                          }}</span>
                        </label>
                      </template>
                    </div>
                  </div>
                </Transition>

                <div class="form-row mt-input">
                  <div class="form-group">
                    <label>{{
                      $t("application_form.steps.profile.english_level.label")
                    }}</label>
                    <select v-model="form.english_level" required>
                      <option value="" disabled>
                        {{
                          $t(
                            "application_form.steps.profile.english_level.placeholder",
                          )
                        }}
                      </option>
                      <option
                        v-for="(_, key) in englishLevels"
                        :key="key"
                        :value="englishLevels[key].value"
                      >
                        {{
                          $t(
                            `application_form.steps.profile.english_level.levels.${key}`,
                          )
                        }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>{{
                      $t(
                        "application_form.steps.profile.experience_level.label",
                      )
                    }}</label>
                    <select v-model="form.experience_level" required>
                      <option
                        v-for="(_, key) in experienceLevels"
                        :key="key"
                        :value="key"
                      >
                        {{
                          $t(
                            `application_form.steps.profile.experience_level.levels.${key}`,
                          )
                        }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 3" class="step-content">
                <h3 class="section-title">
                  <font-awesome-icon :icon="['fas', 'rocket']" />
                  {{ $t("application_form.steps.final.section_title") }}
                </h3>
                <div class="form-group">
                  <label for="reason">
                    {{ $t("application_form.steps.final.reason.label") }}
                    <span class="req">*</span>
                  </label>
                  <textarea
                    id="reason"
                    v-model="form.reason"
                    rows="10"
                    :placeholder="
                      $t('application_form.steps.final.reason.placeholder')
                    "
                    required
                  ></textarea>
                </div>
                <div class="form-group agreement-group mt-input">
                  <label class="checkbox-container">
                    <input
                      type="checkbox"
                      v-model="form.agreed_to_terms"
                      required
                    />
                    <span class="checkmark"></span>
                    <span class="agreement-text">
                      <i18n-t
                        keypath="application_form.steps.final.agreement.text"
                        scope="global"
                      >
                        <template #tos>
                          <router-link
                            to="/terms"
                            target="_blank"
                            class="legal-link"
                          >
                            {{
                              $t(
                                "application_form.steps.final.agreement.link_tos",
                              )
                            }}
                          </router-link>
                        </template>
                        <template #coc>
                          <router-link
                            to="/conduct"
                            target="_blank"
                            class="legal-link"
                          >
                            {{
                              $t(
                                "application_form.steps.final.agreement.link_coc",
                              )
                            }}
                          </router-link>
                        </template>
                        <template #prc>
                          <router-link
                            to="/privacy"
                            target="_blank"
                            class="legal-link"
                          >
                            {{
                              $t(
                                "application_form.steps.final.agreement.link_prc",
                              )
                            }}
                          </router-link>
                        </template>
                      </i18n-t>
                    </span>
                  </label>
                </div>

                <Transition name="fade-slide">
                  <div v-if="isMinor" class="form-row">
                    <div class="form-group agreement-group mt-input parental-consent">
                      <label class="checkbox-container">
                        <input
                          type="checkbox"
                          v-model="form.parental_consent"
                          required
                        />
                        <span class="checkmark"></span>
                        <span class="agreement-text">
                          {{
                            $t("application_form.steps.final.parental_consent.text")
                          }}
                        </span>
                      </label>
                    </div>
                    <div class="form-group mt-input">
                      <label for="parent_mail">
                        {{
                          $t("application_form.steps.final.parental_consent.mail")
                        }}
                      </label>
                      <input
                        id="parent_mail"
                        type="email"
                        v-model="form.parent_mail"
                        placeholder="mail@gmail.com"
                        required
                      />
                    </div>
                  </div>
                </Transition>
              </div>

              <div class="form-footer">
                <Transition name="fade-slide">
                  <div v-if="stepError" class="form-error">
                    <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
                    {{ stepError }}
                  </div>
                </Transition>

                <Transition name="fade-slide">
                  <div v-if="submitError" class="form-error form-error--api">
                    <font-awesome-icon :icon="['fas', 'circle-xmark']" />
                    {{ submitError }}
                  </div>
                </Transition>

                <div class="form-footer-actions">
                  <button
                    v-if="currentStep > 1"
                    type="button"
                    @click="
                      currentStep--;
                      stepError = '';
                    "
                    class="back-btn"
                  >
                    {{ $t("application_form.buttons.back") }}
                  </button>
                  <button
                    type="submit"
                    class="submit-btn"
                    :disabled="isSubmitting"
                  >
                    <span>{{
                      currentStep === 3
                        ? isSubmitting
                          ? $t("application_form.buttons.submitting")
                          : $t("application_form.buttons.submit")
                        : $t("application_form.buttons.next")
                    }}</span>
                    <font-awesome-icon 
                      v-if="!isSubmitting"
                      :icon="['fas', currentStep === 3 ? 'paper-plane' : 'arrow-right']" 
                    />
                  </button>
                </div>
              </div>
            </form>
          </template>
        </div>

        <div class="sidebar">
          <Infocard />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.agreement-group {
  margin-top: 18px;
  padding: 12px;
  background: rgba(120, 222, 231, 0.04);
  border-radius: 10px;
  border: 1px dashed rgba(120, 222, 231, 0.35);
  font-size: 0.95rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.92rem;
}

.checkbox-container input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--accent-color);
  border-radius: 4px;
}

/* Parental consent variant: smaller, more compact */
.parental-consent {
  padding: 8px 10px;
  background: rgba(120, 222, 231, 0.025);
  border-radius: 8px;
  font-size: 0.9rem;
}
.parental-consent .checkbox-container {
  gap: 8px;
  font-weight: 600;
}
.parental-consent .checkbox-container input {
  width: 16px;
  height: 16px;
}
/* make the parent email input match the compact look */
.parental-consent + .form-group input#parent_mail {
  padding: 10px 12px;
  font-size: 0.92rem;
}

.legal-link {
  color: var(--accent-color);
  text-decoration: underline;
  font-weight: 700;
  transition: color 0.2s;
}

.legal-link:hover {
  color: var(--accent-secondary);
}

.agreement-text {
  line-height: 1.4;
  color: var(--text-color);
}
.stepper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.step {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
  opacity: 0.5;
}
.step.active {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  color: white;
  opacity: 1;
  box-shadow: 0 0 15px rgba(149, 176, 235, 0.4);
}

.success-state {
  text-align: center;
  padding: 40px 0;
}
.success-icon {
  font-size: 4rem;
  color: #78dee7;
  margin-bottom: 20px;
}

.application-section {
  position: relative;
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 30px;
  align-items: start;
}

.background-mesh {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  pointer-events: none;
  z-index: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.sidebar {
  position: sticky;
  top: 120px;
}

.form-wrapper {
  background: var(--sc-color);
  backdrop-filter: blur(24px);
  border: 2px dashed var(--border-color);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
}

.form-header {
  text-align: center;
  margin-bottom: 50px;
}

.form-footer {
  display: flex;
  flex-direction: column; 
  gap: 12px;
  margin-top: 30px;
}

.form-footer-actions {
  display: flex;
  gap: 15px;
}

.form-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  background: rgba(254, 120, 178, 0.1);
  border: 1px solid rgba(254, 120, 178, 0.3);
  color: #fe78b2;
}

.form-error--api {
  background: rgba(254, 120, 178, 0.15);
  border-color: rgba(254, 120, 178, 0.5);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 10px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 30px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-title i {
  color: #95b0eb;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-group-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.contact-input {
  flex: 1;
}
.contact-select {
  flex: 0 0 38%;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}
.req {
  color: #fe78b2;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(36, 36, 36, 0.6);
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--text-color);
  transition: all 0.2s;
  box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #95b0eb;
  background: var(--bg-color);
  box-shadow: 0 0 0 3px rgba(149, 176, 235, 0.15);
}

.mt-input {
  margin-top: 10px;
}

.grid-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.option-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  text-align: center;
  color: var(--text-color);
}

.option-card input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.option-card:hover {
  background: var(--hover-bg);
}

.option-card.active {
  background: rgba(120, 222, 231, 0.1);
  border-color: #78dee7;
  color: #78dee7;
  font-weight: 700;
}

.back-btn {
  padding: 16px 30px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  color: var(--trd-color);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.submit-btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.invited-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-secondary) 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 12px;
  box-shadow: 0 4px 10px rgba(187, 133, 223, 0.3);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 992px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .form-wrapper {
    padding: 30px 20px;
  }
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .grid-options {
    grid-template-columns: 1fr 1fr;
  }
  .form-group-row {
    flex-direction: column;
  }
  .contact-select {
    flex: unset;
  }
  .form-footer-actions {
    flex-direction: column;
  }
  .back-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Infocard from "../components/InfoCard.vue";
import { useI18n } from "vue-i18n";
import { publicService } from "../api/publicService"; 
import { ApiError } from "../api/error";

const { t } = useI18n();

type ContactType =
  | "phone"
  | "instagram"
  | "discord"
  | "telegram"
  | "linkedin"
  | "";
type ExperienceLevel = "newbie" | "junior" | "mid" | "senior";
type EnglishLevel = "A1-A2" | "B1-B2" | "C1" | "C2" | "";

interface AppForm {
  fullname: string;
  email: string;
  birthdate: string;
  contact_type: ContactType;
  contact_value: string;
  english_level: EnglishLevel;
  experience_level: ExperienceLevel;
  reason: string;
  main_interest: string[];
  sub_interest: string[];
  other_interest: string;
  invite_token: string | null;
  agreed_to_terms: boolean;
  parental_consent: boolean;
  parent_mail: string
}

const router = useRouter();
const route = useRoute();

const currentStep = ref(1);
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const inviteToken = ref<string | null>(null);
const inviteNote = ref<string | null>(null); 
const stepError = ref("");
const submitError = ref("");

const form = reactive<AppForm>({
  fullname: "",
  email: "",
  birthdate: "",
  contact_type: "",
  contact_value: "",
  english_level: "",
  experience_level: "junior",
  reason: "",
  main_interest: [],
  sub_interest: [],
  other_interest: "",
  invite_token: null,
  agreed_to_terms: false,
  parental_consent: false,
  parent_mail: ""
});

const contactTypes: Record<string, null> = {
  discord: null,
  phone: null,
  instagram: null,
  telegram: null,
  linkedin: null,
};

const englishLevels: Record<string, { value: EnglishLevel }> = {
  a1_a2: { value: "A1-A2" },
  b1_b2: { value: "B1-B2" },
  c1: { value: "C1" },
  c2: { value: "C2" },
};

const experienceLevels: Record<string, null> = {
  newbie: null,
  junior: null,
  mid: null,
  senior: null,
};

const interestAreas = [
  {
    id: "technology",
    sub: [
      { id: "frontend" },
      { id: "backend" },
      { id: "ai" },
      { id: "system_design" },
      { id: "embedded" },
      { id: "cybersecurity" },
      { id: "gamedev" },
    ],
  },
  {
    id: "design",
    sub: [{ id: "uiux" }, { id: "graphic" }, { id: "3d" }, { id: "motion" }],
  },
  {
    id: "business",
    sub: [
      { id: "startup" },
      { id: "marketing" },
      { id: "sales" },
      { id: "product" },
    ],
  },
  {
    id: "creative",
    sub: [
      { id: "music" },
      { id: "writing" },
      { id: "film" },
      { id: "content" },
    ],
  },
  { id: "other", sub: [] },
];

onMounted(async () => {
  const token = route.query.invite as string;
  if (!token) return;

  try {
    const invite = await publicService.checkInvite(token);
    inviteToken.value = token;
    inviteNote.value = invite.note ?? null;
    form.invite_token = token;
  } catch (err) {
    if (err instanceof ApiError) {
      console.warn(
        `Invite token invalid (${err.status}) — proceeding without invite`
      );
    }
  }
});

const selectedInterests = computed(() =>
  interestAreas.filter((interest) => form.main_interest.includes(interest.id))
);

const minBirthdate = computed(() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 100);
  return d.toISOString().split('T')[0];
});

const maxBirthdate = computed(() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 13);
  return d.toISOString().split('T')[0];
});

const isMinor = computed(() => {
  if (!form.birthdate) return false;
  const birth = new Date(form.birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age < 18;
});

watch(
  () => form.main_interest,
  () => {
    form.sub_interest = [];
    if (!form.main_interest.includes("other")) {
      form.other_interest = "";
    }
  }
);

function handleNextStep() {
  stepError.value = "";

  if (currentStep.value === 1) {
    if (!form.birthdate) {
      stepError.value = t("application_form.validation.birthdate_required");
      return;
    }
    const birth = new Date(form.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 13) {
      stepError.value = t("application_form.validation.age_too_young");
      return;
    }
  }

  if (currentStep.value === 2) {
    if (!form.main_interest.length) {
      stepError.value = t("application_form.validation.select_interest");
      return;
    }
    if (form.main_interest.includes("other") && !form.other_interest.trim()) {
      stepError.value = t("application_form.validation.describe_interest");
      return;
    }
  }

  if (currentStep.value < 3) {
    currentStep.value++;
  } else {
    submitForm();
  }
}

const submitForm = async () => {
  stepError.value = "";
  submitError.value = "";

  if (!form.agreed_to_terms) {
    stepError.value = t("application_form.validation.must_agree");
    return;
  }

  if (isMinor.value && !form.parental_consent) {
    stepError.value = t("application_form.validation.parental_consent_required");
    return;
  }

  if (!form.main_interest.length) {
    stepError.value = t("application_form.validation.select_main_interest");
    return;
  }

  if (
    selectedInterests.value.some((interest) => interest.sub?.length) &&
    form.sub_interest.length === 0
  ) {
    stepError.value = t("application_form.validation.select_sub_interest");
    return;
  }

  isSubmitting.value = true;

  try {
    const normalizedMainInterests = form.main_interest.includes("other")
      ? [
          ...form.main_interest.filter((interest) => interest !== "other"),
          `other: ${form.other_interest.trim()}`,
        ]
      : form.main_interest;

    const payload: Record<string, any> = {
      fullname: form.fullname,
      email: form.email,
      birthdate: form.birthdate,
      contact_type: form.contact_type || null,
      contact_value: form.contact_value || null,
      english_level: form.english_level || null,
      experience_level: form.experience_level || null,
      reason: form.reason || null,
      main_interest: normalizedMainInterests,
      sub_interest: form.sub_interest,
      agreed_to_terms: form.agreed_to_terms,
    };

    if (isMinor.value) {
      payload.parental_consent = form.parental_consent;
    }

    if (form.invite_token) {
      payload.invite_token = form.invite_token;
    }

    await publicService.submitApplication(payload);
    isSubmitted.value = true;
  } catch (err) {
    submitError.value =
      err instanceof ApiError
        ? err.message
        : t("application_form.validation.generic_error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
