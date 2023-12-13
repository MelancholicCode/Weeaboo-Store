import { api } from '@/api/api.instance';

const UserService = {
  async getAll() {
    return await api.get('/user');
  },

  async getOne(email: string) {
    return await api.get(`/user/${email}`);
  },

  async delete(email: string) {
    return await api.delete(`/user/${email}`);
  },
};

export default UserService;
