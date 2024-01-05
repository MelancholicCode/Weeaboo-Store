import { api } from '@/api/api.instance';
import { OrderWithItems } from '@/shared/types/order.interface';

const OrderService = {
  async getAll() {
    const response = await api.get<OrderWithItems[]>('/order');
    return response.data;
  },

  async getOne(id: number) {
    const response = await api.get<OrderWithItems>(`/order/${id}`);
    return response.data;
  },

  async create() {
    const response = await api.post<OrderWithItems>('/order');
    return response.data;
  },

  async delete(id: number) {
    return await api.delete<void>(`/order/${id}`);
  },
};

export default OrderService;
