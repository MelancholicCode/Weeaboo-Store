import { ProductList } from '@/components/ProductList/ProductList';
import styles from './page.module.scss';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/components/Placeholder/Placeholder';

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const products = await ProductService.getMany({
      categorySlug: params.slug,
    });

    return (
      <main className={`container ${styles.container}`}>
        <ProductList products={products} />
      </main>
    );
  } catch (error) {
    console.log(error);

    return (
      <main className={`container ${styles.container}`}>
        <Placeholder type="error">Something went wrong</Placeholder>
      </main>
    );
  }
};

export default CategoryPage;
