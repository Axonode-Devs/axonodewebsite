import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService  } from '../api/authService';
import { type UserAccount } from '../api/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserAccount | null>(null);
  let initPromise: Promise<void> | null = null;

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  /**
   * True when a logout was attempted but the server-side refresh cookie
   * is still alive (e.g. backend failed to expire it). Surfaced so the
   * UI can warn the user their session may still be active.
   */
  const sessionStuck = ref(false);

  async function login(email: string, password: string): Promise<UserAccount> {
    const data = await authService.signIn(email, password);
    user.value = data.user;
    sessionStuck.value = false;
    return data.user;
  }

  async function logout(): Promise<void> {
    try {
      await authService.signOut();
    } finally {
      user.value = null;
      initPromise = null;
    }

    // Detect the zombie-cookie case: if the refresh endpoint still
    // succeeds, the server session survived logout.
    sessionStuck.value = await authService.isSessionAlive();
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
    initPromise = null;
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
    sessionStuck,
    login,
    logout,
    init,
  };
});
