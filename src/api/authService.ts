import { apiClient, KEYS } from './client';

export interface UserProfile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  [key: string]: any;
}

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
  user: UserProfile;
}

const _saveSession = ({ access_token, refresh_token, user }: SessionResponse): void => {
  localStorage.setItem(KEYS.userToken, access_token);
  localStorage.setItem(KEYS.userRefresh, refresh_token);
  localStorage.setItem("user_data", JSON.stringify(user));
};

export const authService = {
  async signIn(email: string, password: string): Promise<SessionResponse> {
    const { data } = await apiClient.post("/auth/sessions", { email, password });
    _saveSession(data.data);
    return data.data;
  },

  async activateAccount(setupToken: string, newPassword: string): Promise<UserProfile> {
    const { data } = await apiClient.post(
      "/auth/credentials",
      { password: newPassword },
      {
        headers: { Authorization: `Bearer ${setupToken}` },
        // Explicit cast workaround for internal flags passing to configuration pipeline
        ...({ _skipAuth: true } as any)
      }
    );
    _saveSession(data.data);
    return data.data.user;
  },

  signOut(): void {
    localStorage.removeItem(KEYS.userToken);
    localStorage.removeItem(KEYS.userRefresh);
    localStorage.removeItem("user_data");
  },

  getLocalUser(): UserProfile | null {
    const data = localStorage.getItem("user_data");
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
};