/**
 * axonode/index.js — entry point
 *
 * Usage:
 *   import { initAxonode, auth, admin } from '@axonode/client';
 *   initAxonode({ baseURL: 'https://axonode.org/api/v1' });
 *
 *   await auth.signIn('user@axonode.org', 'password');
 *   await admin.login('admin@axonode.org', 'password');
 *   await admin.listApplications({ status: 'pending' });
 */

import axios from 'axios';
import { AuthModule } from './auth.js';
import { AdminModule } from './admin.js';
import { PublicModule } from './public.js';
import { KEYS } from './keys.js';
import { ApiError } from './error.js';

// ---------------------------------------------------------------------------
// Axios instance — one shared instance for the whole SDK
// ---------------------------------------------------------------------------
const client = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Call once at app startup to point the SDK at the right server.
 * @param {{ baseURL: string }} config
 */
export const initAxonode = (config = {}) => {
  if (config.baseURL) {
    client.defaults.baseURL = config.baseURL.replace(/\/$/, '');
  }
};

// ---------------------------------------------------------------------------
// Request interceptor — attach the right Bearer token per route
//
// Fix vs original:
//   The original sniffed the URL string for "/admin" or "/applications" to
//   decide which token to use. This was fragile — a route like
//   "/users/admin-notes" would incorrectly get the admin token.
//   The token is now stored on the request config itself by each module
//   via the `_tokenKey` field, making the decision explicit and safe.
// ---------------------------------------------------------------------------
client.interceptors.request.use(config => {
  const key   = config._tokenKey ?? KEYS.userToken;
  const token = localStorage.getItem(key);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------------------------------------------------------------------------
// Response interceptor — silent token refresh with concurrent request queuing
//
// The queue pattern is correct and kept. Fixes vs original:
//
// 1. The original checked error.response?.status === 401 but our server
//    also returns 401 for UNAUTHORIZED (missing token) and INVALID_TOKEN —
//    not just TOKEN_EXPIRED. We now check the error code from the body,
//    not just the HTTP status, so we only attempt refresh on TOKEN_EXPIRED.
//
// 2. The original constructed the refresh URL by checking if the request
//    URL string contained "/admin" — same fragile sniff as above.
//    Now we read _refreshKey and _tokenKey from the request config,
//    set explicitly by each module.
//
// 3. The original used a bare axios.post() for the refresh call, which
//    bypasses the interceptor entirely. That is actually correct behaviour
//    here (we don't want the refresh call to trigger another refresh),
//    so it's kept and clarified with a comment.
//
// 4. On refresh failure the original cleared tokens but did not redirect
//    or dispatch any event. We now emit a custom DOM event
//    ("axonode:session-expired") so the app can react (redirect to login,
//    show a toast, etc.) without the SDK hardcoding navigation logic.
// ---------------------------------------------------------------------------
let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

client.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;

    // Only attempt refresh for TOKEN_EXPIRED, not all 401s
    const errorCode = error.response?.data?.error?.code;
    if (errorCode !== 'TOKEN_EXPIRED' || original._retry) {
      return Promise.reject(_normalizeError(error));
    }

    // Don't retry refresh/login calls — they have no token to refresh
    if (original.url?.includes('/sessions') || original.url?.includes('/tokens')) {
      return Promise.reject(_normalizeError(error));
    }

    // Another refresh is already in flight — queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        original.headers.Authorization = `Bearer ${token}`;
        return client(original);
      }).catch(err => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing    = true;

    const refreshKey = original._refreshKey ?? KEYS.userRefresh;
    const tokenKey   = original._tokenKey   ?? KEYS.userToken;
    const refreshToken = localStorage.getItem(refreshKey);

    if (!refreshToken) {
      isRefreshing = false;
      return Promise.reject(_normalizeError(error));
    }

    try {
      // Intentionally bypass the interceptor — raw axios call, no Bearer
      // token from localStorage, just the refresh token in the header.
      const { data } = await axios.post(
        `${client.defaults.baseURL}/auth/tokens`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
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

      // Let the app react without the SDK hardcoding any navigation
      window.dispatchEvent(new CustomEvent('axonode:session-expired', {
        detail: { tokenKey },
      }));

      return Promise.reject(_normalizeError(refreshError));
    } finally {
      isRefreshing = false;
    }
  },
);

// ---------------------------------------------------------------------------
// _normalizeError
//
// Converts an axios error into an ApiError so every catch block across the
// entire app receives a consistent shape regardless of where the error
// originated. The original used a plain object (_handleError returned {}
// not an Error), which meant errors couldn't be caught with instanceof
// and didn't have a stack trace.
// ---------------------------------------------------------------------------
const _normalizeError = (err) => {
  const body = err.response?.data?.error;
  return new ApiError(
    body?.code    ?? 'UNKNOWN_ERROR',
    body?.message ?? 'A server error occurred.',
    err.response?.status ?? 500,
    body?.details ?? [],
  );
};

// ---------------------------------------------------------------------------
// Module instances
//
// Each module receives the shared axios client and its own storage key names.
// The keys are attached to every outgoing request config in each module's
// internal _request() helper, so the interceptors above know which token
// to attach and refresh without sniffing URLs.
// ---------------------------------------------------------------------------
export const auth   = new AuthModule(client, KEYS);
export const admin  = new AdminModule(client, KEYS);
export const public_ = new PublicModule(client);

export { ApiError };
