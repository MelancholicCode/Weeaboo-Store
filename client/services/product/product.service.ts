import { api } from '@/api/api.instance';
import { getParamsString } from './product.helper';
import { IProductBody } from './product.interface';
import { IProduct } from '@/shared/types/product.interface';

const ProductService = {
  async getMany(count?: number, offset?: number, query?: string) {
    const response = await api.get<IProduct[]>(
      `/product${getParamsString({ count, offset, query })}`
    );
    return response.data;
  },

  async getOne(slug: string) {
    const response = await api.get<IProduct>(`/product/${slug}`);
    return response.data;
  },

  async create(body: IProductBody) {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key as keyof IProductBody]);
    }

    const response = await api.post<IProduct>('/product', formData);
    return response.data;
  },

  async delete(slug: string) {
    const response = await api.delete<void>(`/product/${slug}`);
    return response.data;
  },
};

export default ProductService;
