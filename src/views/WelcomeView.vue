<template>
  <div class="welcome-page">
    <div class="welcome-wrapper">
      <div class="welcome-card">
        <div class="welcome-badge stagger" style="--delay: 0s">
          ✦ {{ $t('welcome.badge') }} ✦
        </div>

        <h1 class="welcome-title stagger" style="--delay: 0.12s">
          {{ $t('welcome.title') }}
          <span class="welcome-name">{{ displayName }}</span>
        </h1>

        <p class="welcome-sub stagger" style="--delay: 0.24s">
          {{ $t('welcome.subtitle') }}
        </p>

        <h2 class="dashboard-title stagger" style="--delay: 0.32s">
          {{ $t('welcome.dashboard.title') }}
        </h2>

        <div class="steps stagger" style="--delay: 0.4s">
          <a
            v-if="whatsappUrl"
            class="step-card whatsapp"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
          >
            <span class="step-icon">
              <font-awesome-icon :icon="['fab', 'whatsapp']" />
            </span>
            <span class="step-body">
              <span class="step-heading">{{ $t('welcome.dashboard.whatsapp.title') }}</span>
              <span class="step-desc">{{ $t('welcome.dashboard.whatsapp.desc') }}</span>
            </span>
            <span class="step-action whatsapp-action">
              {{ $t('welcome.dashboard.whatsapp.cta') }} 
            </span>
          </a>
          <div v-else class="step-card whatsapp disabled">
            <span class="step-icon">
              <font-awesome-icon :icon="['fab', 'whatsapp']" />
            </span>
            <span class="step-body">
              <span class="step-heading">{{ $t('welcome.dashboard.whatsapp.title') }}</span>
              <span class="step-desc">{{ $t('welcome.dashboard.whatsapp.soon') }}</span>
            </span>
          </div>

          <button class="step-card" @click="router.push('/profile')">
            <span class="step-icon">
              <font-awesome-icon icon="fa-user" />
            </span>
            <span class="step-body">
              <span class="step-heading">
                {{ $t('welcome.dashboard.profile.title') }}
                <span v-if="profileComplete" class="done-pill">
                  <font-awesome-icon icon="fa-check" />
                  {{ $t('welcome.dashboard.done') }}
                </span>
              </span>
              <span class="step-desc">
                {{ profileComplete
                  ? $t('welcome.dashboard.profile.desc_done')
                  : $t('welcome.dashboard.profile.desc') }}
              </span>
            </span>
            <font-awesome-icon icon="fa-arrow-right" class="step-arrow" />
          </button>

          <button class="step-card" @click="router.push('/projects')">
            <span class="step-icon">
              <font-awesome-icon icon="fa-rocket" />
            </span>
            <span class="step-body">
              <span class="step-heading">{{ $t('welcome.dashboard.projects.title') }}</span>
              <span class="step-desc">{{ $t('welcome.dashboard.projects.desc') }}</span>
            </span>
            <font-awesome-icon icon="fa-arrow-right" class="step-arrow" />
          </button>
        </div>

        <p class="progress-line stagger" style="--delay: 0.48s">
          <span class="progress-count" :class="{ all: doneSteps === totalSteps }">
            {{ doneSteps }} / {{ totalSteps }}
          </span>
          {{ doneSteps === totalSteps
            ? $t('welcome.dashboard.progress_all')
            : $t('welcome.dashboard.progress') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const displayName = computed(() => {
  const user = authStore.user
  if (!user) return ''
  return user.profile?.fullname || user.username
})

const whatsappUrl = computed(() => {
  const url = import.meta.env.VITE_WHATSAPP_URL as string | undefined
  return url && !url.includes('YOUR-INVITE-CODE') ? url : ''
})

const profileComplete = computed(() => {
  const profile = authStore.user?.profile
  if (!profile) return false
  return !!profile.fullname && !!profile.main_interest
})

const totalSteps = 3
const doneSteps = computed(() => (profileComplete.value ? 1 : 0) + (whatsappUrl.value ? 1 : 0))
</script>

<style scoped>
.welcome-page {
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
  position: relative;
  overflow: hidden;
}

.welcome-page::before,
.welcome-page::after {
  content: '';
  position: fixed;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

.welcome-page::before {
  width: 500px;
  height: 500px;
  background: var(--accent-color);
  top: -140px;
  left: -160px;
  animation: driftA 16s ease-in-out infinite alternate;
}

.welcome-page::after {
  width: 420px;
  height: 420px;
  background: var(--accent-secondary);
  bottom: -120px;
  right: -130px;
  animation: driftB 20s ease-in-out infinite alternate-reverse;
}

@keyframes driftA {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(50px, 35px) scale(1.08); }
}

@keyframes driftB {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-35px, -25px) scale(1.06); }
}

.welcome-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
}

.welcome-card {
  text-align: center;
  background: var(--sc-color);
  border: 0.5px solid var(--border-color);
  border-radius: 20px;
  padding: 48px 40px;
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.25);
}

.stagger {
  animation: riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--accent-color);
  background: color-mix(in srgb, var(--accent-color) 8%, transparent);
  border: 0.5px solid color-mix(in srgb, var(--accent-color) 30%, transparent);
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 14px;
  color: var(--text-color);
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.welcome-name {
  display: block;
  background: linear-gradient(
    135deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-sub {
  font-size: 14px;
  color: var(--text-color2);
  line-height: 1.7;
  margin: 0 0 28px;
}

.dashboard-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-color2);
  opacity: 0.7;
  margin: 0 0 14px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.step-card {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  padding: 18px 20px;
  border-radius: 14px;
  background: var(--hover-bg);
  border: 0.5px solid var(--border-color);
  color: var(--text-color);
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.step-card:hover:not(.disabled) {
  transform: translateY(-2px);
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--accent-color) 15%, transparent);
}

.step-card.disabled {
  opacity: 0.55;
  cursor: default;
}

.step-card.whatsapp {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--whatsapp-color) 10%, var(--hover-bg)),
    var(--hover-bg)
  );
}

.step-card.whatsapp:hover:not(.disabled) {
  border-color: var(--whatsapp-color);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--whatsapp-color) 20%, transparent);
}

.step-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  color: var(--accent-color);
  background: color-mix(in srgb, var(--accent-color) 10%, transparent);
  border: 0.5px solid color-mix(in srgb, var(--accent-color) 25%, transparent);
}

.step-card.whatsapp .step-icon {
  color: var(--whatsapp-color);
  background: color-mix(in srgb, var(--whatsapp-color) 12%, transparent);
  border-color: color-mix(in srgb, var(--whatsapp-color) 30%, transparent);
}

.step-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.step-heading {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.step-desc {
  font-size: 12.5px;
  color: var(--text-color2);
  opacity: 0.8;
  line-height: 1.5;
}

.step-arrow {
  color: var(--text-color2);
  opacity: 0.5;
  flex-shrink: 0;
  transition: transform 0.18s ease, color 0.18s ease;
}

.step-card:hover:not(.disabled) .step-arrow {
  transform: translateX(3px);
  color: var(--accent-color);
}

.step-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--whatsapp-color);
  color: var(--bg-color);
}

.done-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--whatsapp-color);
  background: color-mix(in srgb, var(--whatsapp-color) 12%, transparent);
  border: 0.5px solid color-mix(in srgb, var(--whatsapp-color) 30%, transparent);
}

.progress-line {
  margin: 22px 0 0;
  font-size: 12.5px;
  color: var(--text-color2);
  opacity: 0.7;
}

.progress-count {
  font-weight: 700;
  color: var(--accent-color);
  margin-right: 4px;
}

.progress-count.all {
  color: var(--whatsapp-color);
}

@media (max-width: 480px) {
  .welcome-card {
    padding: 36px 20px;
  }

  .step-action {
    display: none;
  }
}
</style>
