'use client';

import { FC, useState } from 'react';
import { IProduct } from '@/shared/types/product.interface';
import styles from './AdminProductList.module.scss';
import Link from 'next/link';
import { routes } from '@/shared/constants/routes';
import { Typography } from '@/shared/components/Typography/Typography';
import { Button } from '@/shared/components/Button/Button';
import ProductService from '@/services/product/product.service';
import { CrossIcon } from '@/shared/assets/icons/CrossIcon/CrossIcon';

interface AdminProductListProps {
  items: IProduct[];
  totalCount: number;
}

export const AdminProductList: FC<AdminProductListProps> = ({
  items,
  totalCount,
}) => {
  const [products, setProducts] = useState<IProduct[]>(items);
  const [offset, setOffset] = useState(0);

  const handleLoadMore = async () => {
    try {
      const { products } = await ProductService.getMany({
        offset: offset + 20,
      });

      setProducts((prev) => [...prev, ...products]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await ProductService.delete(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {products.map(({ id, title, slug }) => (
          <li key={id} className={styles.item}>
            <Link href={`${routes.publicRoutes.PRODUCT}/${slug}`}>
              <Typography variant="body-1">{title}</Typography>
            </Link>

            <Button
              variant="icon"
              className={styles.delete_button}
              onClick={() => handleDelete(id)}
            >
              <CrossIcon />
            </Button>
          </li>
        ))}
      </ul>

      {totalCount > products.length && (
        <Button className={styles.load_more_button} onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};
