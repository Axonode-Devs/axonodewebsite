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
    } catch {
      // clear local state regardless of server response
    }
    clearAccessToken();
  },

  async fetchSession(): Promise<UserAccount | null> {
    try {
      const refreshRes = await apiClient.post('/auth/tokens');
      const accessToken = refreshRes.data.data.access_token;
      setAccessToken(accessToken);

      const userRes = await apiClient.get('/auth/me');
      return userRes.data.data.user;
    } catch {
      clearAccessToken();
      return null;
    }
  }
};
