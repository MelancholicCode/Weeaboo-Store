import { IUser } from '@/shared/types/user.interface';
import { ILoginData, IRegistrationData } from './auth.types';
import { api } from '@/api/api.instance';
import { AuthTypesEnum } from './auth.types';
import { IRole } from '@/shared/types/role.interface';

const AuthService = {
  async main(type: AuthTypesEnum, data: ILoginData | IRegistrationData) {
    const response = await api.post<IUser>(`/auth/${type}`, data);

    return response.data;
  },

  async getNewTokens() {
    const response = await api.get<string, { data: IUser }>(
      '/auth/login/tokens'
    );

    return response.data;
  },

  async getMe() {
    const response = await api.get<IUser & { roles: IRole[] }>('/auth/me');

    return response.data;
  },
};

export default AuthService;
