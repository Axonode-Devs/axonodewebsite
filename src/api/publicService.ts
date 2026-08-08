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

export type ProfessionId = "marketing" | "designer" | "software";
export type TraitName =
  | "Enterprising"
  | "Social"
  | "Investigative"
  | "Artistic"
  | "Conventional"
  | "Realistic";

export type GeneralAnswer = string | string[];
export interface SurveyPayload {
  email: string;
  answers: Record<`q${QuestionNumber}`, number>;
  generalAnswers: Record<string, GeneralAnswer>;
}

export interface ProfessionScore {
  id: ProfessionId;
  name: string;
  sum: number;
  percent: number;
}

export interface SurveyResponse {
  id: string;
  traitTotals: Record<TraitName, number>;
  professionScores: {
    absolute: ProfessionScore[];
    relative: ProfessionScore[];
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
    const { data } = await apiClient.post<SurveyResponse>(
      "/survey/submit",
      payload,
    );
    return data;
  },

  async getSurveyResult(id: string): Promise<SurveyResponse> {
    const { data } = await apiClient.get(
      `/survey/results/${id}`,
    );
    return data.data ?? data
  },

  async submitContact(payload: ContactPayload): Promise<{ message: string }> {
    const { data } = await apiClient.post("/contact/", payload);
    return data.data;
  },
};