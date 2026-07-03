<template>
  <div class="profile-page">
    <Navbar />

    <div class="profile-wrapper">
      <div class="profile-container" v-if="authStore.user">

        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="avatar-block">
            <div class="avatar">{{ authStore.user.email[0].toUpperCase() }}</div>
            <p class="avatar-email">{{ authStore.user.email }}</p>
          </div>
          <nav class="sidebar-nav">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              :class="{ active: activeTab === tab.key }"
              @click="activeTab = tab.key"
            >
              {{ $t(tab.labelKey) }}
            </button>
          </nav>
        </aside>

        <!-- Content -->
        <main class="content">

          <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>
          <div v-if="errorMsg"   class="alert alert-danger">{{ errorMsg }}</div>

          <!-- Account tab -->
          <section v-if="activeTab === 'account'" class="section">
            <div class="section-header">
              <h2>{{ $t('profile.account.title') }}</h2>
              <p class="section-sub">{{ $t('profile.account.subtitle') }}</p>
            </div>

            <div class="form-group">
              <label>{{ $t('profile.account.email_label') }}</label>
              <input type="text" :value="authStore.user.email" disabled class="input-disabled" />
              <small>{{ $t('profile.account.email_hint') }}</small>
            </div>
          </section>

          <!-- Security tab -->
          <section v-if="activeTab === 'security'" class="section">
            <div class="section-header">
              <h2>{{ $t('profile.security.title') }}</h2>
              <p class="section-sub">{{ $t('profile.security.subtitle') }}</p>
            </div>

            <form @submit.prevent="handlePasswordUpdate" class="settings-form">
              <div class="form-group">
                <label for="current-password">{{ $t('profile.security.current_password') }}</label>
                <input
                  id="current-password"
                  type="password"
                  v-model="passwordForm.current"
                  required
                  :placeholder="$t('profile.security.password_placeholder')"
                />
              </div>

              <div class="form-group">
                <label for="new-password">{{ $t('profile.security.new_password') }}</label>
                <input
                  id="new-password"
                  type="password"
                  v-model="passwordForm.new"
                  required
                  :placeholder="$t('profile.security.new_password_placeholder')"
                />
              </div>

              <div class="form-group">
                <label for="confirm-password">{{ $t('profile.security.confirm_password') }}</label>
                <input
                  id="confirm-password"
                  type="password"
                  v-model="passwordForm.confirm"
                  required
                  :placeholder="$t('profile.security.confirm_password_placeholder')"
                />
              </div>

              <button type="submit" class="btn-save" :disabled="isSaving">
                {{ isSaving ? $t('profile.security.saving') : $t('profile.security.save') }}
              </button>
            </form>
          </section>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { apiClient } from '../api/client'
import { ApiError } from '../api/error'
import Navbar from '../components/Navbar.vue'

const { t } = useI18n()
const authStore = useAuthStore()
enum TabKey {
  ACCOUNT = 'account',
  SECURITY = 'security'
}
const activeTab = ref<TabKey>(TabKey.ACCOUNT)
const isSaving  = ref(false)
const successMsg = ref('')
const errorMsg   = ref('')

const tabs = [
  { key: TabKey.ACCOUNT,  labelKey: 'profile.tabs.account' },
  { key: TabKey.SECURITY, labelKey: 'profile.tabs.security' },
]

const passwordForm = reactive({ current: '', new: '', confirm: '' })

const handlePasswordUpdate = async () => {
  errorMsg.value   = ''
  successMsg.value = ''

  if (passwordForm.new !== passwordForm.confirm) {
    errorMsg.value = t('profile.security.error_mismatch')
    return
  }
  if (passwordForm.new.length < 8) {
    errorMsg.value = t('profile.security.error_too_short')
    return
  }

  isSaving.value = true
  try {
    await apiClient.post('/auth/change-password', {
      current_password: passwordForm.current,
      new_password: passwordForm.new,
    })
    successMsg.value = t('profile.security.success')
    passwordForm.current = ''
    passwordForm.new     = ''
    passwordForm.confirm = ''
  } catch (error) {
    errorMsg.value = error instanceof ApiError
      ? error.message
      : t('profile.security.error_generic')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  overflow: hidden;
  position: relative;
}

.profile-page::before,
.profile-page::after {
  content: '';
  position: fixed;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}
.profile-page::before {
  width: 550px;
  height: 550px;
  background: var(--accent-color);
  top: -120px;
  left: -180px;
  animation: driftA 16s ease-in-out infinite alternate;
}
.profile-page::after {
  width: 450px;
  height: 450px;
  background: var(--accent-secondary);
  bottom: -100px;
  right: -140px;
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

.profile-wrapper {
  position: relative;
  z-index: 1;
  padding: 7rem 20px 4rem;
  display: flex;
  justify-content: center;
}

.profile-container {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}

.sidebar {
  border-radius: 16px;
  border: 0.5px solid var(--border-color);
  background: var(--bg-color);
  padding: 22px;
  position: sticky;
  top: 100px;
}

.avatar-block {
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 0.5px solid var(--border-color);
}

.avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-secondary) 100%);
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
}

.avatar-email {
  font-size: 12.5px;
  color: var(--text-color);
  opacity: 0.5;
  word-break: break-all;
  margin: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav button {
  background: transparent;
  border: none;
  text-align: left;
  padding: 10px 14px;
  border-radius: 8px;
  color: var(--text-color);
  opacity: 0.55;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.sidebar-nav button:hover {
  background: var(--hover-bg);
  opacity: 0.85;
}
.sidebar-nav button.active {
  background: var(--hover-bg);
  opacity: 1;
  color: var(--text-color);
}

/* ── Content panel ────────────────────────────────────────────────────────── */
.content {
  border-radius: 16px;
  border: 0.5px solid var(--border-color);
  background: var(--bg-color);
  padding: 36px 40px;
}

/* ── Section header ───────────────────────────────────────────────────────── */
.section-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 0.5px solid var(--border-color);
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--text-color);
  letter-spacing: -0.02em;
}

.section-sub {
  font-size: 13.5px;
  color: var(--text-color);
  opacity: 0.45;
  margin: 0;
  line-height: 1.6;
}

/* ── Form ─────────────────────────────────────────────────────────────────── */
.form-group {
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.8;
}

.form-group input {
  padding: 11px 15px;
  border-radius: 9px;
  border: 0.5px solid var(--border-color);
  background: var(--hover-bg);
  color: var(--text-color);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.18s;
}
.form-group input:focus:not(.input-disabled) {
  border-color: var(--accent-color);
}

.input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-group small {
  font-size: 12px;
  color: var(--text-color);
  opacity: 0.4;
  line-height: 1.5;
}

/* ── Save button ──────────────────────────────────────────────────────────── */
.btn-save {
  margin-top: 8px;
  padding: 11px 28px;
  font-size: 13.5px;
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  border: 0.5px solid var(--border-color);
  color: var(--text-color);
  background: var(--hover-bg);
  font-family: inherit;
  transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
}
.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--accent-color);
  box-shadow: 0 6px 24px rgba(254, 120, 178, 0.2);
}
.btn-save:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Alerts ───────────────────────────────────────────────────────────────── */
.alert {
  padding: 12px 16px;
  border-radius: 9px;
  font-size: 13.5px;
  margin-bottom: 24px;
  line-height: 1.5;
}
.alert-success {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 0.5px solid rgba(16, 185, 129, 0.25);
}
.alert-danger {
  background: rgba(255, 107, 107, 0.1);
  color: var(--error-color);
  border: 0.5px solid rgba(255, 107, 107, 0.25);
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .profile-container { grid-template-columns: 1fr; }
  .sidebar           { position: static; }
  .content           { padding: 24px 20px; }
}
</style>