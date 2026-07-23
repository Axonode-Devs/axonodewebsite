import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService, UserAccount } from '../api/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserAccount | null>(null);
  let initPromise: Promise<void> | null = null;

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  async function login(email: string, password: string): Promise<UserAccount> {
    const data = await authService.signIn(email, password);
    user.value = data.user;
    return data.user;
  }

  async function logout(): Promise<void> {
    await authService.signOut();
    user.value = null;
  }

  function init(): Promise<void> {
    if (!initPromise) {
      initPromise = authService.fetchSession().then(u => {
        if (u) user.value = u;
      });
    }
    return initPromise;
  }

  window.addEventListener('axonode:session-expired', () => {
    user.value = null;
  });

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    init,
  };
});
