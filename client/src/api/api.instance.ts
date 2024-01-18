import axios from 'axios';
import Cookies from 'js-cookie';
import { TokensEnum } from '@/services/auth/auth.types';

const options = {
  baseURL: process.env.API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export const api = axios.create(options);

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get(TokensEnum.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        await axios.get(`${process.env.API_URL}/auth/login/tokens`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch {
        Cookies.remove(TokensEnum.ACCESS_TOKEN);
      }
    }

    throw error;
  }
);
