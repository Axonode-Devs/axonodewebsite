import { apiClient } from './client';

export interface InviteValidity {
  id: string;
  note: string;
  expires_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export const publicService = {
  async checkInvite(token: string): Promise<InviteValidity> {
    const { data } = await apiClient.get(`/invites/${token}/validity`);
    return data.data;
  },

  async submitApplication(payload: Record<string, any>): Promise<any> {
    const { data } = await apiClient.post('/applications/', payload);
    return data.data;
  },

  async submitContact(payload: ContactPayload): Promise<{ message: string }> {
    const { data } = await apiClient.post('/contact/', payload);
    return data.data;
  }
};