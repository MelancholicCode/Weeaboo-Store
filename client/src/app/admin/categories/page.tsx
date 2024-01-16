import CategoryService from '@/services/category/category.service';
import { CategoryAdminForm } from '@/components/CategoryAdminForm/CategoryAdminForm';
import { AdminCategoryList } from '@/components/AdminCategoryList/AdminCategoryList';

const AdminCategoriesPage = async () => {
  try {
    const categories = await CategoryService.getAll();

    return (
      <main className="page-container">
        <CategoryAdminForm />

        <AdminCategoryList items={categories} />
      </main>
    );
  } catch (error) {
    console.error(error);
  }
};

export default AdminCategoriesPage;
