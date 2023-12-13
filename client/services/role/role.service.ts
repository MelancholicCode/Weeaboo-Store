import { api } from '@/api/api.instance';

const RoleService = {
  async getAll() {
    return await api.get('/role');
  },

  async getOne(name: string) {
    return await api.get(`/role/${name}`);
  },

  async create(name: string) {
    return await api.post('/role', { name });
  },

  async delete(name: string) {
    return await api.delete(`/role/${name}`)
  }
};

export default RoleService;
