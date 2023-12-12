import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper';
import { AxiosError } from 'axios';
import { errorCatch } from './api.helper';
import AuthService from '@/services/auth/auth.service';
import { api } from './api.instance';

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await AuthService.getNewTokens();
        return api.request(originalRequest);
      } catch (error) {
        if (
          errorCatch(error as AxiosError<{ message: string | string[] }>) ===
          'jwt expired'
        ) {
          removeFromStorage();
        }
      }
    }

    throw error;
  }
);
