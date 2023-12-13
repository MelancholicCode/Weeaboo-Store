import { api } from '@/api/api.instance';

const CartService = {
  async getAll() {
    return await api.get('/cart');
  },

  async createItem(productId: number) {
    return await api.post(`/cart/${productId}`);
  },

  async delete(id: number) {
    return await api.delete(`/cart/${id}`);
  },
};

export default CartService;
