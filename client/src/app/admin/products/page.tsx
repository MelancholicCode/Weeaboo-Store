import CategoryService from '@/services/category/category.service';
import ProductService from '@/services/product/product.service';
import { ProductAdminForm } from '@/components/ProductAdminForm/ProductAdminForm';
import { AdminProductList } from '@/components/AdminProductList/AdminProductList';
import { Metadata } from 'next';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `Product Management | ${SEO_TITLE}`,
  description: 'A panel for managing store products.',
};

const AdminProductsPage = async () => {
  const categories = await CategoryService.getAll();
  const { products, totalCount } = await ProductService.getMany();

  return (
    <main className="page-container">
      <ProductAdminForm categories={categories} />
      <AdminProductList items={products} totalCount={totalCount} />
    </main>
  );
};

export default AdminProductsPage;
