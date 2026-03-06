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
  baseURL: 'http://127.0.0.1:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use(config => {
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
  (response) => response, // Pass through successful requests
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh this specific request
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Don't try to refresh if the login itself failed or we're already on the refresh route
      if (originalRequest.url.includes('/login') || originalRequest.url.includes('/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If a refresh is already in progress, wait in the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Determine which refresh token to use (Admin vs User)
      const isAdmin = originalRequest.url.includes('/admin');
      const refreshKey = isAdmin ? 'axon_admin_refresh' : 'axon_refresh';
      const tokenKey = isAdmin ? 'axon_admintoken' : 'axon_token';
      const refreshToken = localStorage.getItem(refreshKey);

      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Call the refresh endpoint
        const { data } = await axios.post(`${client.defaults.baseURL}/auth/refresh`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const newToken = data.access_token;
        localStorage.setItem(tokenKey, newToken);
        
        // Update the authorization header for the original request
        client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);
        
        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // If refresh fails, the user session is truly dead. Clear and redirect.
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshKey);
        window.location.href = isAdmin ? '/admin/login' : '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const _handleError = (err) => ({
  msg: err.response?.data?.msg || 'Request failed',
  errors: err.response?.data?.errors || [],
  status: err.response?.status
});

export const auth = new AuthModule(client, _handleError);
export const admin = new AdminModule(client, _handleError);

export const initializeAxon = (config = {}) => {
  if (config.baseURL) {
    client.defaults.baseURL = config.baseURL;
  }
};

export const submitApplication = async (data) => {
  try {
    
    const res = await client.post('/applications/', data);
    return res.data;
  } catch (err) {
    throw _handleError(err);
  }
};
