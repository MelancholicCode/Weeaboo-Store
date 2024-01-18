import { FC } from 'react';
import { ProductItem } from '@/components/ProductItem/ProductItem';
import { IProduct } from '@/shared/types/product.interface';
import styles from './ProductList.module.scss';
import { Placeholder } from '../../shared/components/Placeholder/Placeholder';

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return products.length ? (
    <ul className={styles.list}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          img={product.img}
          title={product.title}
          price={product.price}
          slug={product.slug}
        />
      ))}
    </ul>
  ) : (
    <Placeholder type="empty">There&apos;s nothing here yet</Placeholder>
  );
};
