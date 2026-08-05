import { apiClient } from "./client";

export type QuestionNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;
export type ProfessionId = "marketing" | "software" | "design";

export interface SurveyPayload {
  email: string;
  answers: Record<`q${QuestionNumber}`, number>;
}
export interface SurveyResponse {
  scores: {
    marketing: number;
    software: number;
    design: number;
  };
  topProfession: { id: ProfessionId; name: string };
}

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
    const { data } = await apiClient.post("/applications/", payload);
    return data.data;
  },

  async submitSurvey(payload: SurveyPayload): Promise<SurveyResponse> {
  const response = await fetch("/survey/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Something went wrong submitting your survey.";
    try {
      const errorBody = await response.json();
      message = errorBody?.error?.message ?? message;
    } catch {
      // response wasn't JSON — fall back to generic message
    }
    throw new Error(message);
  }

  return response.json() as Promise<SurveyResponse>;
},

  async submitContact(payload: ContactPayload): Promise<{ message: string }> {
    const { data } = await apiClient.post("/contact/", payload);
    return data.data;
  },
};
