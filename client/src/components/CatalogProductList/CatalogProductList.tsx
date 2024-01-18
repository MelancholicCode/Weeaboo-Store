'use client';

import React, { FC, useState } from 'react';
import { ProductList } from '../ProductList/ProductList';
import { Button } from '@/shared/components/Button/Button';
import { IProduct } from '@/shared/types/product.interface';
import ProductService from '@/services/product/product.service';
import styles from './CatalogProductList.module.scss';

interface CatalogProductListProps {
  items: IProduct[];
  totalCount: number;
  categorySlug?: string;
}

export const CatalogProductList: FC<CatalogProductListProps> = ({
  items,
  totalCount,
  categorySlug,
}) => {
  const [products, setProducts] = useState(items);
  const [offset, setOffset] = useState(20);

  const handleLoadMore = async () => {
    try {
      const { products } = await ProductService.getMany({
        categorySlug,
        offset,
      });

      setProducts((prev) => [...prev, ...products]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProductList products={products} />

      {totalCount > products.length && (
        <Button onClick={handleLoadMore} className={styles.button}>
          Load more
        </Button>
      )}
    </>
  );
};
