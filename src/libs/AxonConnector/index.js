import axios from 'axios';
import { AuthModule } from './auth.js';
import { AdminModule } from './admin.js';

// The hidden internal client
let client = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Request Interceptor for JWT
client.interceptors.request.use(config => {
  const token = localStorage.getItem('axon_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Error Formatter
const _handleError = (err) => ({
  msg: err.response?.data?.msg || 'Request failed',
  errors: err.response?.data?.errors || [],
  status: err.response?.status
});

// Initialize modules with the shared client
export const auth = new AuthModule(client, _handleError);
export const admin = new AdminModule(client, _handleError);

/**
 * Public function to initilize the internal HTTP Client and settings.
 * Similiar to Firebase's initializeApp
 */
export const initializeAxon = (config) => {
  if (config.baseURL) client.defaults.baseURL = config.baseURL;
};

/**
 * Submit a new Application, Data is not checked in this function so the parameter
 */
export const submitApplication = async (data) => {
  try {
    const res = await client.post('/applications/', data);
    return res.data;
  } catch (err) {
    throw _handleError(err);
  }
};