import { getContentType } from '@/api/api.helper';
import {
  IAuthResponse,
  TokensEnum,
  IEmailPassword,
} from '@/store/user/user.interface';
import { saveInStorage } from './auth.helper';
import Cookies from 'js-cookie';
import axios from 'axios';
import { api } from '@/api/api.instance';

const AuthService = {
  async main(type: 'login' | 'register', data: IEmailPassword) {
    const response = await api.post<IAuthResponse>(`/auth/${type}`, data, {
      method: 'POST',
    });

    if (response.data.accessToken) saveInStorage(response.data);

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(TokensEnum.REFRESH_TOKEN);

    const response = await axios.post<string, { data: IAuthResponse }>(
      `${process.env.API_URL}/auth/login/access-token`,
      {
        refreshToken,
      },
      {
        headers: {
          ...getContentType(),
        },
      }
    );

    if (response.data.accessToken) saveInStorage(response.data);

    return response;
  },
};

export default AuthService;
