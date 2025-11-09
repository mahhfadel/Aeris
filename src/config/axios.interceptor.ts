import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import authService from '../services/authService';

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authService.getToken();
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const url = error.config?.url || '';
        
        if (!url.includes('/auth/login') && !url.includes('/auth/login-colaborador')) {
          console.error('Token inválido ou expirado, fazendo logout...');
          authService.logout();
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
  );
};