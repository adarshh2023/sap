import axios from 'axios';
import { Company, User } from '../types';
import { LoginCredentials, AuthResponse } from '../types/auth';
import { storage } from './storage';

const API_BASE_URL = 'http://103.120.178.99:5001/api';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/loginSuperAdmin', credentials);
    return response.data;
  },

  createCompany: async (company: Company) => {
    const response = await axiosInstance.post('/companies', company);
    return response.data;
  },

  getCompanies: async () => {
    const response = await axiosInstance.get('/companies');
    return response.data;
  },

  createUser: async (user: User) => {
    const response = await axiosInstance.post('/auth/register', user);
    return response.data;
  },

  getAllAdminUsers: async () => {
    const response = await axiosInstance.get('/users/getAllAdminUsers');
    return response.data;
  },

  updateAdminUser: async (id: string, data: any) => {
    const response = await axiosInstance.post(`/users/updateUserProfileByAdmin/${id}`, data);
    return response.data;
  },

  updateCompany: async (id: string, data: Partial<Company>) => {
    const response = await axiosInstance.put(`/companies/${id}`, data);
    return response.data;
  },

  changeCompanyStatus: async (id: string, data: Partial<Company>) => {
    const response = await axiosInstance.put(`/companies/changeCompanyStatus/${id}`, data);
    return response.data;
  }
};