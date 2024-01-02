import { FC } from 'react';
import { ProductItem } from '../ProductItem/ProductItem';
import { IProduct } from '@/shared/types/product.interface';
import styles from './ProductList.module.scss';

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.list_item}>
          <ProductItem
            id={product.id}
            img={product.img}
            title={product.title}
            price={product.price}
            slug={product.slug}
          />
        </li>
      ))}
    </ul>
  );
};
