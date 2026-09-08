import { apiClient, setAccessToken, clearAccessToken } from './client';

export interface UserProfileMetadata {
  fullname: string;
  english_level: string | null;
  experience_level: string | null;
  main_interest: string | null;
  sub_interest: string[];
}

export interface UserAccount {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: string;
  profile: UserProfileMetadata | null;
}

export type UserProfile = UserAccount;

export interface SessionResponse {
  access_token: string;
  user: UserAccount;
}

export const authService = {
  async signIn(email: string, password: string): Promise<SessionResponse> {
    const { data } = await apiClient.post('/auth/sessions', { email, password });
    const session = data.data;
    setAccessToken(session.access_token);
    return session;
  },

  async activateAccount(setupToken: string, username: string, newPassword: string): Promise<UserAccount> {
    const { data } = await apiClient.post(
      '/auth/credentials',
      { username, password: newPassword },
      { headers: { Authorization: `Bearer ${setupToken}` } }
    );
    const session = data.data;
    setAccessToken(session.access_token);
    return session.user;
  },

  async signOut(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (err: any) {
      // Local state is cleared regardless, but the server-side refresh
      // cookie may still be alive — surface it instead of swallowing.
      console.warn('[auth] logout request failed:', err?.message || err);
      throw err;
    }
    clearAccessToken();
  },

  /**
   * Probes the refresh endpoint. Resolves `true` when the refresh cookie
   * is still alive (i.e. logout failed to kill the server session),
   * `false` when the session is really gone.
   */
  async isSessionAlive(): Promise<boolean> {
    try {
      await apiClient.post('/auth/tokens');
      return true;
    } catch {
      return false;
    }
  },

  async fetchSession(): Promise<UserAccount | null> {
    let refreshRes;
    try {
      refreshRes = await apiClient.post('/auth/tokens');
    } catch (err: any) {
      // Only treat an explicit 401 as "logged out". Network/server errors
      // should not destroy the session (user gets kicked to /login).
      if (err?.response?.status === 401) {
        clearAccessToken();
        return null;
      }
      throw err;
    }

    const accessToken = refreshRes.data.data.access_token;
    setAccessToken(accessToken);

    const userRes = await apiClient.get('/auth/me');
    return userRes.data.data.user;
  }
};
