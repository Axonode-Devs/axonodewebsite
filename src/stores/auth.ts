import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService  } from '../api/authService';
import { type UserAccount } from '../api/authService';

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
      initPromise = authService
        .fetchSession()
        .then(u => {
          if (u) user.value = u;
        })
        .catch(err => {
          // Transient backend/network errors: treat as logged-out for this
          // navigation but allow a fresh attempt on the next one.
          console.warn('[auth] session init failed:', err?.message || err);
          initPromise = null;
        });
    }
    return initPromise;
  }

  window.addEventListener('axonode:session-expired', async () => {
    user.value = null;
    if (window.location.pathname !== '/login') {
      // Lazy import avoids a circular dependency with the router module.
      const { default: router } = await import('../router');
      router.push('/login');
    }
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
