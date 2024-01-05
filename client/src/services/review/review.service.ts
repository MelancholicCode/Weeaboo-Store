import { api } from '@/api/api.instance';
import { IReview } from '@/shared/types/review.interface';

const ReviewService = {
  async getMy() {
    const response = await api.get<IReview[]>('/review');
    return response.data;
  },

  async getAll(productId: number) {
    const response = await api.get<IReview[]>(`/review/${productId}`);
    return response.data;
  },

  async create(productId: number, rate: number, comment: string) {
    const response = await api.post<IReview>(`/review/${productId}`, {
      rate,
      comment,
    });
    return response.data;
  },

  async delete(reviewId: number) {
    const response = await api.delete<void>(`/category/${reviewId}`);
    return response.data;
  },
};

export default ReviewService;
