import { ProductList } from '@/components/ProductList/ProductList';
import styles from './page.module.scss';
import ProductService from '@/services/product/product.service';

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const products = await ProductService.getMany({
    categorySlug: params.slug,
  });

  return (
    <main className={`container ${styles.container}`}>
      <ProductList products={products} />
    </main>
  );
};

export default CategoryPage;
