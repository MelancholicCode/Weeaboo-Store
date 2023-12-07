import { FC } from 'react';
import { ProductItem } from '../ProductItem/ProductItem';

interface ProductListProps {
  products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className='flex gap-2 justify-between'>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          img={product.img}
          title={product.title}
          price={product.price}
        />
      ))}
    </ul>
  );
};
