// services/web/src/lib/api/interceptors.ts
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useAuthStore } from '@/store';
import { useUIStore } from '@/store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Request Interceptor - Add authentication token
export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

// Request Error Interceptor
export const requestErrorInterceptor = (error: AxiosError) => {
  console.error('Request error:', error);
  return Promise.reject(error);
};

// Response Success Interceptor
export const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

// Response Error Interceptor - Handle errors and token refresh
export const responseErrorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  // Handle 401 Unauthorized - Token expired
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = useAuthStore.getState().refreshToken;
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Call refresh token endpoint
      const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
        refresh: refreshToken,
      });

      const { access } = response.data;

      // Update tokens in store
      useAuthStore.getState().setTokens(access, refreshToken);

      // Retry original request with new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access}`;
      }
      
      return axios(originalRequest);
    } catch (refreshError) {
      // Refresh failed, logout user
      useAuthStore.getState().logout();
      
      // Show error toast
      useUIStore.getState().showToast({
        type: 'error',
        message: 'Session expired. Please login again.',
      });
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      return Promise.reject(refreshError);
    }
  }

  // Handle 403 Forbidden - Insufficient permissions
  if (error.response?.status === 403) {
    useUIStore.getState().showToast({
      type: 'error',
      message: 'You do not have permission to perform this action.',
    });
  }

  // Handle 404 Not Found
  if (error.response?.status === 404) {
    useUIStore.getState().showToast({
      type: 'error',
      message: 'Resource not found.',
    });
  }

  // Handle 500 Internal Server Error
  if (error.response?.status === 500) {
    useUIStore.getState().showToast({
      type: 'error',
      message: 'Server error. Please try again later.',
    });
  }

  // Handle network errors
  if (!error.response) {
    useUIStore.getState().showToast({
      type: 'error',
      message: 'Network error. Please check your connection.',
    });
  }

  return Promise.reject(error);
};

// Setup all interceptors for an axios instance
export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptors
  axiosInstance.interceptors.request.use(
    authRequestInterceptor,
    requestErrorInterceptor
  );

  // Response interceptors
  axiosInstance.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );

  return axiosInstance;
};