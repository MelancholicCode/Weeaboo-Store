import { api } from '@/api/api.instance';
import { IRole } from '@/shared/types/role.interface';
import { IUser } from '@/shared/types/user.interface';

const UserService = {
  async getAll() {
    const response = await api.get<IUser[]>('/user');
    return response.data;
  },

  async getOne(email: string) {
    const response = await api.get<IUser & { roles: IRole[] }>(
      `/user/${email}`
    );
    return response.data;
  },

  async delete(email: string) {
    return await api.delete<void>(`/user/${email}`);
  },
};

export default UserService;
