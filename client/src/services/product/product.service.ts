import { api } from '@/api/api.instance';
import { getParamsString } from '@/utils/getParamsString';
import { IProduct } from '@/shared/types/product.interface';

const ProductService = {
  async getMany(queryParams?: {
    count?: number;
    offset?: number;
    query?: string;
    categorySlug?: string;
  }) {
    const { count, offset, query, categorySlug } = queryParams || {};
    const response = await api.get<IProduct[]>(
      `/product${getParamsString({
        count,
        offset,
        query,
        category: categorySlug,
      })}`
    );
    const { data, headers } = response;

    return {
      totalCount: +headers['x-total-count'],
      products: data,
    };
  },

  async getOne(slug: string) {
    const response = await api.get<IProduct>(`/product/${slug}`);
    return response.data;
  },

  async create(formData: FormData) {
    const response = await api.post<IProduct>('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete<void>(`/product/${id}`);
    return response.data;
  },
};

export default ProductService;
