import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './error';

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
}

let baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token!));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!original) return Promise.reject(_normalizeError(error));

    const is401 = error.response?.status === 401;
    const isAuthRequest = original.url?.includes('/sessions') || original.url?.includes('/tokens');

    if (!is401 || isAuthRequest || original._retry) {
      return Promise.reject(_normalizeError(error));
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
      .then(token => {
        original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      })
      .catch(err => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${apiClient.defaults.baseURL}/auth/tokens`,
        {},
        { withCredentials: true }
      );

      const newToken = data.data.access_token;
      setAccessToken(newToken);

      processQueue(null, newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);

    } catch (refreshError: any) {
      processQueue(refreshError, null);
      clearAccessToken();

      window.dispatchEvent(new CustomEvent('axonode:session-expired'));

      return Promise.reject(_normalizeError(refreshError));
    } finally {
      isRefreshing = false;
    }
  }
);

const _normalizeError = (err: AxiosError | any): ApiError => {
  if (err instanceof ApiError) return err;

  const response = err.response;
  const data = response?.data?.error;

  return new ApiError(
    data?.code || 'UNKNOWN_ERROR',
    data?.message || err.message || 'An unexpected error occurred.',
    response?.status || 500,
    data?.details || []
  );
};
