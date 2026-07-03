import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './error';

export const KEYS = {
  userToken:   'axon_user_access',
  userRefresh: 'axon_user_refresh',
} as const;

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _tokenKey?: string;
  _refreshKey?: string;
  _skipAuth?: boolean;
  _retry?: boolean;
}

let baseURL = 'https://axonode.org/api/v1';

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// 1. REQUEST INTERCEPTOR
apiClient.interceptors.request.use((config: CustomRequestConfig) => {
  const key = config._tokenKey ?? KEYS.userToken;
  const token = localStorage.getItem(key);
  
  if (token && !config._skipAuth) {
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

// 3. RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as CustomRequestConfig;

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

    const refreshKey = original._refreshKey ?? KEYS.userRefresh;
    const tokenKey = original._tokenKey ?? KEYS.userToken;
    const refreshToken = localStorage.getItem(refreshKey);

    if (!refreshToken) {
      isRefreshing = false;
      return Promise.reject(_normalizeError(error));
    }

    try {
      const { data } = await axios.post(
        `${apiClient.defaults.baseURL}/auth/tokens`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const newToken = data.data.access_token;
      localStorage.setItem(tokenKey, newToken);

      processQueue(null, newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);

    } catch (refreshError: any) {
      processQueue(refreshError, null);
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(refreshKey);

      window.dispatchEvent(new CustomEvent('axonode:session-expired', {
        detail: { tokenKey },
      }));

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