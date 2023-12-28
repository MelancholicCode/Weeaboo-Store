import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import styles from './page.module.scss';

const Catalog = async () => {
  const products = await ProductService.getMany();

  return (
    <main className={`container ${styles.container}`}>
      <ProductList products={products} />
    </main>
  );
};

export default Catalog;
