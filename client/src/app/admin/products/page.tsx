import CategoryService from '@/services/category/category.service';
import ProductService from '@/services/product/product.service';
import { ProductAdminForm } from '@/components/ProductAdminForm/ProductAdminForm';
import { AdminProductList } from '@/components/AdminProductList/AdminProductList';

const AdminProductsPage = async () => {
  try {
    const categories = await CategoryService.getAll();
    const { products, totalCount } = await ProductService.getMany();

    return (
      <main className="page-container">
        <ProductAdminForm categories={categories} />
        <AdminProductList items={products} totalCount={totalCount} />
      </main>
    );
  } catch (error) {
    console.error(error);
  }
};

export default AdminProductsPage;
