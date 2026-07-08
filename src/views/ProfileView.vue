<template>
  <div class="profile-page">
    <Navbar />

    <div class="profile-wrapper">
      <div class="profile-container" v-if="authStore.user">
        <aside class="sidebar">
          <div class="avatar-block">
            <div class="avatar">{{ authStore.user.email?.[0]?.toUpperCase() ?? '?' }}</div>
            <p class="avatar-email">{{ authStore.user.email }}</p>
            <div class="user-meta">
              <span class="status-pill">
                {{ authStore.user.role === 'admin' ? $t('profile.account.role_admin') : $t('profile.account.role_default') }}
              </span>
            </div>
          </div>

          <div class="sidebar-footer">
            <button class="sign-out-btn" @click="handleSignOut">
              <span>↺</span>
              {{ $t('profile.actions.sign_out') }}
            </button>
          </div>
        </aside>

        <main class="content">
          <section class="section">
            <div class="section-header">
              <h2>{{ $t('profile.account.title') }}</h2>
              <p class="section-sub">{{ $t('profile.account.subtitle') }}</p>
            </div>

            <div class="detail-card">
              <div class="detail-row">
                <span class="detail-label">{{ $t('profile.account.email_label') }}</span>
                <span class="detail-value">{{ authStore.user.email }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">{{ $t('profile.account.role_label') }}</span>
                <span class="detail-value">
                  {{ authStore.user.role === 'admin' ? $t('profile.account.role_admin') : $t('profile.account.role_default') }}
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { authService } from '../api/authService' 
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.user) {
    const localUser = authService.getLocalUser() 
    if (localUser) {
      authStore.user = localUser
    } else {
      router.push('/')
    }
  }
})

const handleSignOut = () => {
  authStore.logout()
  router.push('/')
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
  border-radius: 20px;
  border: 0.5px solid var(--border-color);
  background: linear-gradient(145deg, var(--bg-color) 0%, rgba(255,255,255,0.03) 100%);
  padding: 32px;
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.06);
}

.detail-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 14px;
  background: var(--hover-bg);
  border: 0.5px solid var(--border-color);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 0.5px solid rgba(255,255,255,0.08);
}

.detail-row:last-child {
  border-bottom: 0;
}

.detail-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.7;
}

.detail-value {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
  text-align: right;
  word-break: break-word;
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

/* ── Sidebar footer ─────────────────────────────────────────────────────── */
.sidebar-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 0.5px solid var(--border-color);
}

.sign-out-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border: 0.5px solid rgba(255, 107, 107, 0.28);
  border-radius: 999px;
  background: rgba(255, 107, 107, 0.08);
  color: var(--error-color);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.17s ease, box-shadow 0.17s ease;
}

.sign-out-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(255, 107, 107, 0.12);
}

.user-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.status-pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-color2);
  background: rgba(255, 255, 255, 0.04);
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  opacity: 0.95;
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
  .detail-row        { flex-direction: column; align-items: flex-start; }
  .detail-value      { text-align: left; }
}
</style>