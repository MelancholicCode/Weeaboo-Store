import { api } from '@/api/api.instance';
import { IRole } from '@/shared/types/role.interface';

const RoleService = {
  async getAll() {
    const response = await api.get<IRole[]>('/role');
    return response.data;
  },

  async getOne(name: string) {
    const response = await api.get<IRole>(`/role/${name}`);
    return response.data;
  },

  async create(name: string) {
    const response = await api.post<IRole>('/role', { name });
    return response.data;
  },

  async delete(name: string) {
    const response = await api.delete<void>(`/role/${name}`);
    return response.data;
  },
};

export default RoleService;
