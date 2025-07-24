import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './api';
import { getTokenUtil, logger } from '../../utils';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

export const commonHeader = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

// === MODIFIED REQUEST INTERCEPTOR ===
api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    if (config.requiresAuth === false) {
      return config;
    }

    // For all other requests, proceed with trying to attach the token.
    const { accessToken } = await getTokenUtil();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    // logger.log('response ->', response)
    return response;
  },
  async (error: AxiosError) => {
    // logger.log('instance error: ', error?.response || error);
    /* ... same refresh logic as before ... */
    return Promise.reject(error);
  },
);

const ApiService = {
  api,
};

export default ApiService;
