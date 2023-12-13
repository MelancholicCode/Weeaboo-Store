import { api } from '@/api/api.instance';

const OrderService = {
  async getAll() {
    return await api.get('/order');
  },

  async getOne(id: number) {
    return await api.get(`/order/${id}`);
  },

  async create() {
    return await api.post('/order');
  },

  async delete(id: number) {
    return await api.delete(`/order/${id}`);
  },
};

export default OrderService;
