'use client';

import { FC, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from '@/shared/components/Form/Form';
import { Field } from '@/shared/components/Field/Field';
import { Input } from '@/shared/components/Input/Input';
import { Select } from '@/components/Select/Select';
import ProductService from '@/services/product/product.service';
import { ICategory } from '@/shared/types/category.interface';
import { Button } from '@/shared/components/Button/Button';
import slugify from '@/utils/slugify';
import styles from './ProductAdminForm.module.scss';
import { Typography } from '@/shared/components/Typography/Typography';

interface ProductAdminFormProps {
  categories: ICategory[];
}

export const ProductAdminForm: FC<ProductAdminFormProps> = ({ categories }) => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get('title');

      if (title && typeof title === 'string') {
        formData.set('slug', slugify(title));
      }

      await ProductService.create(formData);

      (event.target as HTMLFormElement).reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Typography variant="title-2" className={styles.form_title}>
        Create product
      </Typography>

      <Field>
        <label htmlFor="title">Title</label>
        <Input required id="title" name="title" />
      </Field>

      <Field>
        <label htmlFor="description">Description</label>
        <Input required id="description" name="description" />
      </Field>

      <Field>
        <label htmlFor="price">Price</label>
        <Input required id="price" name="price" pattern="^\d*(\.\d{0,2})?$" />
      </Field>

      <Field>
        <label htmlFor="picture">Picture</label>
        <input required type="file" id="picture" name="picture" />
      </Field>

      <Field>
        <label htmlFor="category">Category</label>
        <Select
          required
          name="categoryId"
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </Field>

      <Field>
        <Button type="submit">Create product</Button>
      </Field>
    </Form>
  );
};
