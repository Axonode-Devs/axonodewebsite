<template>
  <Navbar />
  <div class="login-container">
    <div class="login-content">
      <div class="login-box">
        <div class="login-header">
          <h1>{{ $t('login.title') }}</h1>
          <p class="subtitle">{{ $t('login.subtitle') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">{{ $t('login.form.email.label') }}</label>
            <input 
              id="email"
              type="email" 
              v-model="email" 
              :placeholder="$t('login.form.email.placeholder')" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="password">{{ $t('login.form.password.label') }}</label>
            <input 
              id="password"
              type="password" 
              v-model="password" 
              :placeholder="$t('login.form.password.placeholder')" 
              required 
            />
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="!loading">{{ $t('login.form.submit.label') }}</span>
            <span v-else class="loading-spinner">
              <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
              {{ $t('login.form.submit.submitting') }}
            </span>
          </button>
          <router-link to="/join" class="join-link">
            {{ $t('login.does_not_have_account') }}
          </router-link>
        </form>

        <Transition name="fade">
          <p v-if="errorMsg" class="error-message">
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> {{ errorMsg }}
          </p>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ApiError } from '../api/error';
import Navbar from '../components/Navbar.vue';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';

  try {
   
    await authStore.login(email.value.trim(), password.value);
   
    
    router.push('/');
  } catch (error) {
    if (error instanceof ApiError) {
      errorMsg.value = error.message; 
    } else if (error instanceof Error) {
      errorMsg.value = error.message;
    } else {
      errorMsg.value = 'An unexpected connection error occurred.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  padding: 20px;
}

.login-content {
  width: 100%;
  max-width: 420px;
}

.login-box {
  background-color: var(--sc-color);
  backdrop-filter: blur(10px);
  border: 2px dashed var(--border-color);
  border-radius: 26px;
  padding: 48px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(to left, var(--accent-color), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
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
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-group input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(120, 222, 231, 0.2);
}

.login-btn {
  padding: 14px 20px;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  color: #000;
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

.join-link {
  display: block;
  text-align: center;
  margin-top: 6px;
  font-size: 12px;
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.3s ease;
}


.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(120, 222, 231, 0.4);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-spinner svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: var(--error-color);
  font-size: 13px;
  text-align: center;
  margin: 0;
  padding: 12px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  border-left: 3px solid var(--error-color);
}

.divider {
  margin: 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.admin-btn {
  width: 100%;
  padding: 12px 20px;
  background: transparent;
  color: var(--accent-color);
  border: 1.5px solid var(--accent-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.admin-btn:hover {
  background: rgba(120, 222, 231, 0.1);
  transform: translateY(-1px);
}

.admin-btn:active {
  transform: translateY(0);
}
</style>