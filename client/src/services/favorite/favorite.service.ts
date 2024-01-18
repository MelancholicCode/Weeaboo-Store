import { api } from '@/api/api.instance';
import { IFavorite } from '@/shared/types/favorite.interface';

const FavoriteService = {
  async getAll() {
    const response = await api.get<IFavorite[]>('/favorite');
    return response.data;
  },

  async createItem(productId: number) {
    const response = await api.post<IFavorite>(`/favorite/${productId}`);
    return response.data;
  },

  async delete(id: number) {
    return await api.delete<void>(`/favorite/${id}`);
  },
};

export default FavoriteService;
