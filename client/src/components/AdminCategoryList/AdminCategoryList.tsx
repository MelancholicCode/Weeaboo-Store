'use client';

import { FC, useState } from 'react';
import styles from './AdminCategoryList.module.scss';
import Link from 'next/link';
import { routes } from '@/shared/constants/routes';
import { Typography } from '@/shared/components/Typography/Typography';
import { Button } from '@/shared/components/Button/Button';
import { CrossIcon } from '@/shared/assets/icons/CrossIcon/CrossIcon';
import { ICategory } from '@/shared/types/category.interface';
import CategoryService from '@/services/category/category.service';

interface AdminCategoryListProps {
  items: ICategory[];
}

export const AdminCategoryList: FC<AdminCategoryListProps> = ({ items }) => {
  const [categories, setCategories] = useState<ICategory[]>(items);

  const handleDelete = async (id: number) => {
    try {
      await CategoryService.delete(id);

      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className={styles.list}>
      {categories.map(({ id, name, slug }) => (
        <li key={id} className={styles.item}>
          <Link href={`${routes.publicRoutes.CATEGORY}/${slug}`}>
            <Typography variant="body-1">{name}</Typography>
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
  );
};
