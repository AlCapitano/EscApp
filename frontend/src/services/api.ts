import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.1:3000', // Adjust this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here to handle tokens, errors, etc.
// For example, to add the auth token to every request:
/*
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

export default api;
