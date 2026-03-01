import axios from 'axios';
import { AuthModule } from './auth.js';
import { AdminModule } from './admin.js';

let client = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Auto-inject JWT tokens
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

const _handleError = (err) => ({
  msg: err.response?.data?.msg || 'Request failed',
  errors: err.response?.data?.errors || [],
  status: err.response?.status
});

export const auth = new AuthModule(client, _handleError);
export const admin = new AdminModule(client, _handleError);

/**
 * Initialize Axon - call this once at app startup
 */
export const initializeAxon = (config = {}) => {
  if (config.baseURL) {
    client.defaults.baseURL = config.baseURL;
  }
};


/**
 * Submit an application to join
 */
export const submitApplication = async (data) => {
  try {
    const res = await client.post('/applications/', data);
    return res.data;
  } catch (err) {
    throw _handleError(err);
  }
};
