<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Admin Access</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="admin@axonode.com" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Checking...' : 'Login' }}
        </button>
      </form>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/admin');
  } catch (error) {
    errorMsg.value = 'Giriş başarısız. Bilgileri kontrol et.';
    console.error(error.code);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
}
.login-box {
  padding: 40px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 320px;
  text-align: center;
}
input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 12px;
  background: #78dee7;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.error { color: #FF5F56; margin-top: 10px; }
</style>