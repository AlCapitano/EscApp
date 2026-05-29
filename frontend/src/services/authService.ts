import api from './api';
import { LoginDto, RegisterDto } from '../types';

export const login = async (credentials: LoginDto) => {
  const response = await api.post('/auth/login', credentials);
  const { access_token } = response.data;

  if (!access_token) {
    throw new Error('Access token not received from server');
  }

  // Set the token in localStorage immediately so the next API call is authenticated
  localStorage.setItem('token', access_token);

  // Fetch the user profile using the token that is now in the api interceptor
  const user = await getProfile();
  
  // Transform the user object to match the frontend's expected interface
  const transformedUser = {
    ...user,
    role: user.role.toLowerCase() as 'user' | 'admin',
  };

  return { accessToken: access_token, user: transformedUser };
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
