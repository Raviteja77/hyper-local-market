// services/web/src/lib/api/client.ts
import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptors';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
export const apiClient = setupInterceptors(axiosInstance);

// Utility functions for common HTTP methods
export const api = {
  get: <T>(url: string, config = {}) => 
    apiClient.get<T>(url, config).then((res) => res.data),
  
  post: <T>(url: string, data?: any, config = {}) => 
    apiClient.post<T>(url, data, config).then((res) => res.data),
  
  put: <T>(url: string, data?: any, config = {}) => 
    apiClient.put<T>(url, data, config).then((res) => res.data),
  
  patch: <T>(url: string, data?: any, config = {}) => 
    apiClient.patch<T>(url, data, config).then((res) => res.data),
  
  delete: <T>(url: string, config = {}) => 
    apiClient.delete<T>(url, config).then((res) => res.data),
};