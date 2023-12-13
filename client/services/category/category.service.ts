import { api } from '@/api/api.instance';

const CategoryService = {
  async getAll() {
    return await api.get('/category');
  },

  async getOne(slug: string) {
    return await api.get(`/category/${slug}`);
  },

  async create(name: string, slug: string) {
    return await api.post('/category', { name, slug });
  },
};

export default CategoryService;
