import { api } from '@/api/api.instance';
import { getParamsString } from './product.helper';
import { IProductBody } from './product.interface';

const ProductService = {
  async getMany(count?: number, offset?: number, query?: string) {
    return await api.get(
      `/product${getParamsString({ count, offset, query })}`
    );
  },

  async getOne(slug: string) {
    return await api.get(`/product/${slug}`);
  },

  async create(body: IProductBody) {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key as keyof IProductBody]);
    }

    return await api.post('/product', formData);
  },

  async delete(slug: string) {
    return await api.delete(`/product/${slug}`);
  },
};

export default ProductService;
