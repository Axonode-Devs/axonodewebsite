import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService, UserProfile } from '../api/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(authService.getLocalUser());

  const isAuthenticated = computed<boolean>(() => !!user.value);
  const isAdmin = computed<boolean>(() => user.value?.role === 'admin');

  async function login(email: string, password: string): Promise<UserProfile> {
    try {
      const data = await authService.signIn(email, password);
      user.value = data.user;
      return data.user;
    } catch (error) {
      throw error;
    }
  }

  function logout(): void {
    authService.signOut();
    user.value = null;
  }

  window.addEventListener('axonode:session-expired', () => {
    user.value = null;
  });

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout
  };
});