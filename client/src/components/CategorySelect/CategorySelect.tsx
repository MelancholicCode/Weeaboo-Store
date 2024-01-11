'use client';

import { FC } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import { routes } from '@/shared/constants/routes';
import { ICategory } from '@/shared/types/category.interface';
import { useRouter } from 'next/navigation';
import styles from './CategorySelect.module.scss';

interface IOption {
  label: string;
  value: string;
}

interface CategorySelectProps {
  categories: ICategory[];
}

export const CategorySelect: FC<CategorySelectProps> = ({ categories }) => {
  const router = useRouter();
  const selectOptions = [
    { label: 'All', value: 'all' },
    ...categories.map(({ name, slug }) => ({
      label: name,
      value: slug,
    })),
  ];

  const handleCategoryChange = (option: SingleValue<IOption>) => {
    if (option) {
      if (option.value === 'all') {
        return router.push(routes.publicRoutes.CATALOG);
      }

      return router.push(`${routes.publicRoutes.CATEGORY}/${option.value}`);
    }
  };

  return (
    <ReactSelect
      className={styles.select}
      defaultValue={selectOptions[0]}
      options={selectOptions}
      onChange={(option) => handleCategoryChange(option)}
      styles={{
        control: (base, { isFocused }) => ({
          ...base,
          // border: 'none',
          boxShadow: 'none',
          outline: 'none',
          borderColor: isFocused ? 'var(--accent-color)' : 'var(--grey-color)',
          '&:hover': {
            borderColor: 'var(--accent-color)',
          },
        }),
        option: (base, { isSelected, isFocused }) => ({
          ...base,
          '&:active': {
            backgroundColor: 'var(--dark-accent-color)',
          },
          ...(isFocused && {
            backgroundColor: 'var(--light-accent-color)',
            color: 'var(--white-color)',
          }),
          ...(isSelected && {
            backgroundColor: 'var(--accent-color)',
            '&:hover': { backgroundColor: 'var(--accent-color)' },
          }),
        }),
      }}
    />
  );
};
