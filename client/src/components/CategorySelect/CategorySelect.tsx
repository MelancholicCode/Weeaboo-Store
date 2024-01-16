'use client';

import { FC } from 'react';
import { SingleValue } from 'react-select';
import { routes } from '@/shared/constants/routes';
import { ICategory } from '@/shared/types/category.interface';
import { useParams, useRouter } from 'next/navigation';
import styles from './CategorySelect.module.scss';
import { Select } from '../Select/Select';

interface IOption {
  label: string;
  value: string;
}

interface CategorySelectProps {
  categories: ICategory[];
}

export const CategorySelect: FC<CategorySelectProps> = ({ categories }) => {
  const selectOptions = [
    { label: 'All', value: 'all' },
    ...categories.map(({ name, slug }) => ({
      label: name,
      value: slug,
    })),
  ];
  const { slug } = useParams();
  const router = useRouter();

  const handleCategoryChange = (option: SingleValue<IOption>) => {
    if (option) {
      if (option.value === 'all') {
        return router.push(routes.publicRoutes.CATALOG);
      }

      return router.push(`${routes.publicRoutes.CATEGORY}/${option.value}`);
    }
  };

  const value =
    selectOptions.find((option) => option.value === slug) || selectOptions[0];

  return (
    <Select
      className={styles.select}
      value={value}
      options={selectOptions}
      onChange={(option: any) => handleCategoryChange(option)}
    />
  );
};
