import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import authService from '../services/authService';

export const createApi = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    timeout: 1000000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor: adiciona token se houver
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authService.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor: logout em 401/403
  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        authService.logout();
        // redirecionar (ajuste conforme sua rota)
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return api;
};
