import axios from 'axios';
import { AuthModule } from './auth.js';
import { AdminModule } from './admin.js';
import { KEYS } from './keys.js';
import { ApiError } from './error.js';

const client = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export const initAxonode = (config = {}) => {
  if (config.baseURL) {
    client.defaults.baseURL = config.baseURL.replace(/\/$/, '');
  }
};

// 1. REQUEST INTERCEPTOR
client.interceptors.request.use(config => {
  // Use explicit key from config (set by module) or fallback to user token
  const key = config._tokenKey ?? KEYS.userToken;
  const token = localStorage.getItem(key);
  
  if (token && !config._skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. REFRESH QUEUE STATE
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

// 3. RESPONSE INTERCEPTOR
client.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;

    // Check for 401. 
    // We check for 'TOKEN_EXPIRED' but also fallback to generic 401 if it's not a login attempt
    const errorCode = error.response?.data?.error?.code;
    const is401 = error.response?.status === 401;
    const isAuthRequest = original.url?.includes('/sessions') || original.url?.includes('/tokens');

    if (!is401 || isAuthRequest || original._retry) {
      return Promise.reject(_normalizeError(error));
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        original.headers.Authorization = `Bearer ${token}`;
        return client(original);
      }).catch(err => Promise.reject(err));
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
      // Use standard axios to avoid the interceptor loop
      const { data } = await axios.post(
        `${client.defaults.baseURL}/auth/tokens`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const newToken = data.data.access_token;
      localStorage.setItem(tokenKey, newToken);

      processQueue(null, newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return client(original);

    } catch (refreshError) {
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

const _normalizeError = (err) => {
  const body = err.response?.data?.error;
  return new ApiError(
    body?.code ?? 'UNKNOWN_ERROR',
    body?.message ?? 'A server error occurred.',
    err.response?.status ?? 500,
    body?.details ?? [],
  );
};

export const auth = new AuthModule(client, KEYS);
export const admin = new AdminModule(client, KEYS);