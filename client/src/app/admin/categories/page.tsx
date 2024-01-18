import { Metadata } from 'next';
import CategoryService from '@/services/category/category.service';
import { CategoryAdminForm } from '@/components/CategoryAdminForm/CategoryAdminForm';
import { AdminCategoryList } from '@/components/AdminCategoryList/AdminCategoryList';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `Category Management | ${SEO_TITLE}`,
  description: 'A panel for managing store categories.',
};

const AdminCategoriesPage = async () => {
  const categories = await CategoryService.getAll();

  return (
    <main className="page-container">
      <CategoryAdminForm />

      <AdminCategoryList items={categories} />
    </main>
  );
};

export default AdminCategoriesPage;
