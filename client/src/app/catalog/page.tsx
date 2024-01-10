import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import styles from './page.module.scss';
import { Placeholder } from '@/components/Placeholder/Placeholder';

const Catalog = async () => {
  try {
    const products = await ProductService.getMany();

    return (
      <main className={`container ${styles.container}`}>
        <ProductList products={products} />
      </main>
    );
  } catch (error) {
    console.error(error);

    return (
      <main className={`container ${styles.container}`}>
        <Placeholder type="error">Something went wrong</Placeholder>
      </main>
    );
  }
};

export default Catalog;
