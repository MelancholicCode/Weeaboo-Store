import { api } from '@/api/api.instance';

const ReviewService = {
  async getAll(productId: number) {
    return await api.get(`/review/${productId}`);
  },

  async create(productId: number, rate: number, comment: string) {
    return await api.post(`/review/${productId}`, {
      rate,
      comment,
    });
  },

  async delete(reviewId: number) {
    return await api.delete(`/category/${reviewId}`);
  },
};

export default ReviewService;
