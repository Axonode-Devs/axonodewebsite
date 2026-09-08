<template>
  <Navbar />
  <div class="login-container">
    <div class="login-content">
      <div class="login-box">
        <div class="login-header">
          <h1>{{ $t("set_password.header.title") }}</h1>
          <p class="subtitle">{{ $t("set_password.header.subtitle") }}</p>
        </div>

        <form
          v-if="!isTokenInvalid"
          @submit.prevent="handleSetup"
          class="login-form"
        >
          <div class="form-group">
            <label for="username">{{
              $t("set_password.form.username.label")
            }}</label>
            <input
              id="username"
              type="text"
              v-model="username"
              :placeholder="$t('set_password.form.username.placeholder')"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">{{
              $t("set_password.form.password.label")
            }}</label>
            <div class="input-wrap">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :placeholder="$t('set_password.form.password.placeholder')"
                required
                @input="errorMsg = ''"
              />
              <button
                type="button"
                class="toggle-btn"
                :aria-label="showPassword ? $t('set_password.form.password.hide') : $t('set_password.form.password.show')"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <div class="strength" :class="{ visible: password.length > 0 }">
              <div class="strength-track">
                <div
                  class="strength-fill"
                  :style="{ width: strengthPercent + '%' }"
                  :class="strengthClass"
                ></div>
              </div>
              <small v-if="password.length > 0" class="strength-label" :class="strengthClass">
                {{ $t(`set_password.form.password.strength.${strengthKey}`) }}
              </small>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">{{
              $t("set_password.form.confirm_password.label")
            }}</label>
            <div class="input-wrap">
              <input
                id="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                v-model="confirmPassword"
                :placeholder="
                  $t('set_password.form.confirm_password.placeholder')
                "
                required
                @input="errorMsg = ''"
              />
              <button
                type="button"
                class="toggle-btn"
                :aria-label="showConfirm ? $t('set_password.form.password.hide') : $t('set_password.form.password.show')"
                @click="showConfirm = !showConfirm"
              >
                <svg v-if="!showConfirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <small v-if="confirmPassword.length > 0" class="field-hint" :class="{ ok: passwordsMatch }">
              {{ passwordsMatch
                ? $t("set_password.form.confirm_password.match")
                : $t("set_password.errors.mismatch") }}
            </small>
          </div>

          <button type="submit" class="login-btn" :class="{ success: isSuccess }" :disabled="loading || isSuccess">
            <span v-if="isSuccess" class="success-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="check-icon">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ $t("set_password.buttons.done") }}
            </span>
            <span v-else-if="!loading">{{ $t("set_password.buttons.submit") }}</span>
            <span v-else class="loading-spinner">
              {{ $t("set_password.buttons.submitting") }}
            </span>
          </button>
        </form>

        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { authService } from "../api/authService";
import { ApiError } from "../api/error";
import confetti from "canvas-confetti";
import { useAuthStore } from "../stores/auth";
import Navbar from "../components/Navbar.vue";
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errorMsg = ref("");
const token = ref("");
const isTokenInvalid = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);
const isSuccess = ref(false);
const { t } = useI18n({ useScope: 'global' });

const passwordsMatch = computed(() => password.value === confirmPassword.value);

type StrengthKey = 'weak' | 'fair' | 'good' | 'strong';

const strengthScore = computed(() => {
  const value = password.value;
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  if (/^\d+$/.test(value) && value.length > 0) score = Math.min(score, 1);
  return Math.min(score, 4);
});

const strengthKey = computed<StrengthKey>(() => {
  const score = strengthScore.value;
  if (score <= 1) return 'weak';
  if (score === 2) return 'fair';
  if (score === 3) return 'good';
  return 'strong';
});

const strengthPercent = computed(() => (strengthScore.value / 4) * 100);
const strengthClass = computed(() => `s-${strengthKey.value}`);

let brandColors: string[] = [];
const readBrandColors = () => {
  const styles = getComputedStyle(document.documentElement);
  brandColors = [
    styles.getPropertyValue('--accent-color').trim(),
    styles.getPropertyValue('--accent-secondary').trim(),
    styles.getPropertyValue('--main2-color').trim(),
  ];
};

const fireConfetti = () => {
  const colors = brandColors.length ? brandColors : ['#78dee7', '#fe78b0', '#a59ce6'];
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    scalar: 0.9,
    ticks: 160,
    origin: { y: 0.6 },
    colors,
    disableForReducedMotion: true,
  });
};

onMounted(() => {
  readBrandColors();
  const urlToken = route.query.token;
  if (typeof urlToken !== 'string' || !urlToken) {
    isTokenInvalid.value = true;
    errorMsg.value = t('set_password.errors.invalid_link');
    setTimeout(() => {
      router.push('/');
    }, 3000);
  } else {
    token.value = urlToken;
  }
});

const handleSetup = async () => {
  if (!token.value) {
    errorMsg.value = t('set_password.errors.missing_token');
    return;
  }
  if (password.value.length < 8) {
    errorMsg.value = t('set_password.errors.min_length');
    return;
  }
  if (/^\d+$/.test(password.value)) {
    errorMsg.value = t('set_password.errors.digits_only');
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = t('set_password.errors.mismatch');
    return;
  }

  loading.value = true;
  errorMsg.value = '';

  try {
    const userProfile = await authService.activateAccount(token.value, username.value, password.value);
    authStore.user = userProfile;
    isSuccess.value = true;
    fireConfetti();
    setTimeout(() => {
      router.push('/welcome');
    }, 1800);
  } catch (error) {
    errorMsg.value = error instanceof ApiError
      ? error.message
      : t('set_password.errors.failed');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    color-mix(in srgb, var(--accent-color) 5%, transparent) 100%
  );
  padding: 20px;
}

.login-content {
  width: 100%;
  max-width: 420px;
}

.login-box {
  background: var(--sc-color);
  border: 0.5px solid var(--border-color);
  border-radius: 16px;
  padding: 48px 40px;
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(
    135deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 14px;
  color: var(--text-color2);
  opacity: 0.75;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 14px 16px;
  background: var(--hover-bg);
  border: 0.5px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 16px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: var(--text-color2);
  opacity: 0.5;
}

.form-group input:focus {
  outline: none;
  background: var(--trd-color);
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrap input {
  padding-right: 48px;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-color2);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.toggle-btn:hover {
  color: var(--accent-color);
  background: color-mix(in srgb, var(--accent-color) 10%, transparent);
}

.toggle-btn svg {
  width: 18px;
  height: 18px;
}

.strength {
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  height: 0;
  overflow: hidden;
}

.strength.visible {
  opacity: 1;
  transform: translateY(0);
  height: auto;
}

.strength-track {
  height: 5px;
  width: 100%;
  border-radius: 999px;
  background: var(--trd-color);
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.35s ease, background 0.35s ease;
}

.strength-fill.s-weak,
.strength-label.s-weak {
  background: var(--error-color);
}

.strength-fill.s-fair,
.strength-label.s-fair {
  background: var(--accent-tertiary);
}

.strength-fill.s-good,
.strength-label.s-good {
  background: var(--main2-color);
}

.strength-fill.s-strong,
.strength-label.s-strong {
  background: linear-gradient(
    90deg,
    var(--accent-color),
    var(--accent-secondary)
  );
}

.strength-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color2);
  line-height: 1;
}

.strength-label.s-strong {
  color: var(--text-color);
}

.field-hint {
  font-size: 12px;
  color: var(--error-color);
  transition: color 0.2s ease;
}

.field-hint.ok {
  color: var(--accent-color);
}

.login-btn {
  padding: 14px 20px;
  background: linear-gradient(
    135deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  color: var(--bg-color);
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color) 40%, transparent);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-btn.success {
  opacity: 1;
}

.success-state {
  display: flex;
  align-items: center;
  gap: 8px;
}

.check-icon {
  width: 18px;
  height: 18px;
  animation: checkPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.4) both;
}

@keyframes checkPop {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message {
  color: var(--error-color);
  font-size: 13px;
  text-align: center;
  margin: 16px 0 0;
  padding: 12px;
  background: color-mix(in srgb, var(--error-color) 10%, transparent);
  border-radius: 6px;
  border-left: 3px solid var(--error-color);
}

@media (max-width: 480px) {
  .login-box {
    padding: 36px 24px;
  }
}
</style>
