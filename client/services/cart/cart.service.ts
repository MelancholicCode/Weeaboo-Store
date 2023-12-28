import { api } from '@/api/api.instance';
import { ICartItem } from '@/shared/types/cart.interface';

const CartService = {
  async getAll() {
    const response = await api.get<ICartItem[]>('/cart');
    return response.data;
  },

  async createItem(productId: number) {
    const response = await api.post<ICartItem>(`/cart/${productId}`);
    return response.data;
  },

  async delete(itemId: number) {
    return await api.delete<void>(`/cart/${itemId}`);
  },
};

export default CartService;
