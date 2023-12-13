import { api } from '@/api/api.instance';

const FavoriteService = {
  async getAll() {
    return await api.get('/favorite');
  },

  async createItem(productId: number) {
    return await api.post(`/favorite/${productId}`);
  },

  async delete(id: number) {
    return await api.delete(`/favorite/${id}`);
  },
};

export default FavoriteService;
