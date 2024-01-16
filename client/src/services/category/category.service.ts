import { api } from '@/api/api.instance';
import { ICategory } from '@/shared/types/category.interface';

const CategoryService = {
  async getAll() {
    const response = await api.get<ICategory[]>('/category');
    return response.data;
  },

  async getOne(slug: string) {
    const response = await api.get<ICategory>(`/category/${slug}`);
    return response.data;
  },

  async create(name: string, slug: string) {
    const response = await api.post<ICategory>('/category', { name, slug });
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete<void>(`/category/${id}`);
    return response.data;
  },
};

export default CategoryService;
