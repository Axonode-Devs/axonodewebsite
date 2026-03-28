import axios from 'axios';
import { AuthModule } from './auth.js';
import { AdminModule } from './admin.js';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

let client = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

/**
 * RESTORED: Allows dynamic configuration of the API base URL
 */
export const initializeAxon = (config = {}) => {
  if (config.baseURL) {
    client.defaults.baseURL = config.baseURL;
  }
};

client.interceptors.request.use(config => {
  // Check for admin-specific routes or applications to use the admin token
  if (config.url.includes('/admin') || config.url.includes('/applications')) {
    const token = localStorage.getItem('axon_admintoken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } else {
    const token = localStorage.getItem('axon_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/sessions') || originalRequest.url.includes('/tokens')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return client(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const isAdmin = originalRequest.url.includes('/admin') || originalRequest.url.includes('/applications');
      const refreshKey = isAdmin ? 'axon_admin_refresh' : 'axon_refresh';
      const tokenKey = isAdmin ? 'axon_admintoken' : 'axon_token';
      const refreshToken = localStorage.getItem(refreshKey);

      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Updated to /auth/tokens or /admin/tokens logic
        const refreshUrl = isAdmin ? '/admin/tokens' : '/auth/tokens';
        const { data } = await axios.post(`${client.defaults.baseURL}${refreshUrl}`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        // Backend wraps the access_token inside a "data" object
        const newToken = data.data.access_token;
        localStorage.setItem(tokenKey, newToken);
        
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      }  catch (refreshError) {
        processQueue(refreshError, null);
        
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshKey);
      
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

const _handleError = (err) => {
  const errorBody = err.response?.data?.error;
  return {
    code: errorBody?.code || 'UNKNOWN_ERROR',
    message: errorBody?.message || 'A server error occurred.',
    details: errorBody?.details || [],
    status: err.response?.status || 500
  };
};

export const auth = new AuthModule(client, _handleError);
export const admin = new AdminModule(client, _handleError);

export const submitApplication = async (data) => {
  try {
    const res = await client.post('/applications/', data);
    return res.data;
  } catch (err) {
    throw _handleError(err);
  }
};

export const submitContact = async (data) => {
  try {
    const res = await client.post('/contact/', data);
    return res.data;
  } catch (err) {
    throw _handleError(err);
  }
};