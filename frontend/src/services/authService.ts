import api from './api';
import { LoginDto, RegisterDto } from '../types';

export const login = async (credentials: LoginDto) => {
  const response = await api.post('/auth/login', credentials);
  // Assume response.data contains token and user info from backend
  const { accessToken, user: backendUser } = response.data;

  // Mock user data and role for frontend testing
  // In a real scenario, the backend would return the user's role
  const mockUser = {
    id: backendUser?.id || 'mock-id',
    username: backendUser?.username || credentials.email,
    role: (credentials.email.includes('admin') ? 'admin' : 'user') as 'user' | 'admin', // Explicitly cast to literal type
    completedCheckpoints: [], // Start with no checkpoints completed to test sequential unlocking
  };

  return { accessToken, user: mockUser };
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
