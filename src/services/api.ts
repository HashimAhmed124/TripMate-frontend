import axios from 'axios';
import * as storage from './storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.137.95:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const post = async (endpoint: string, data: any, config: any = {}) => {
  const response = await api.post(endpoint, data, config); // ← Now config is passed
  return response.data;
};