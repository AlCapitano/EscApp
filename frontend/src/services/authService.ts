import api from './api';
import { LoginDto, RegisterDto } from '../types';

export const login = async (credentials: LoginDto) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userInfo: RegisterDto) => {
  const response = await api.post('/auth/register', userInfo);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};
