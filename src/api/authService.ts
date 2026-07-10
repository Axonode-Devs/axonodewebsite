import { apiClient, KEYS } from './client';

// 1. The nested metadata table layout
export interface UserProfileMetadata {
  fullname: string;
  english_level: string | null;
  experience_level: string | null;
  main_interest: string | null;
  sub_interest: string[];
}

// 2. The core User record (Matches your updated backend payload)
export interface UserAccount {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: string;
  profile: UserProfileMetadata | null; // Can be null if profile migration hasn't fired
}

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
  user: UserAccount; // Swapped to match the updated nested contract
}

// Helper to keep local storage sync'd safely
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

  async activateAccount(setupToken: string, username: string, newPassword: string): Promise<UserAccount> {
    const { data } = await apiClient.post(
      "/auth/credentials",
      { 
        username,          // Added: Pass the chosen username
        password: newPassword 
      },
      {
        headers: { Authorization: `Bearer ${setupToken}` },
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

  getLocalUser(): UserAccount | null {
    const data = localStorage.getItem("user_data");
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
};