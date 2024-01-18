'use client';

import { Form } from '@/shared/components/Form/Form';
import { Field } from '@/shared/components/Field/Field';
import { Button } from '@/shared/components/Button/Button';
import { Input } from '@/shared/components/Input/Input';
import { Typography } from '@/shared/components/Typography/Typography';
import styles from './CategoryAdminForm.module.scss';
import { FormEvent, useState } from 'react';
import CategoryService from '@/services/category/category.service';
import slugify from '@/utils/slugify';
import { useRouter } from 'next/navigation';

export const CategoryAdminForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (name) {
      try {
        await CategoryService.create(name, slugify(name));

        setName('');
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form className={styles.form}>
      <Typography className={styles.form_title} variant="title-2">
        Create category
      </Typography>

      <Field>
        <label htmlFor="category">Name</label>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          id="category"
          name="category"
          placeholder="Enter category name"
        />
      </Field>

      <Field>
        <Button type="submit" onClick={handleSubmit}>
          Create category
        </Button>
      </Field>
    </Form>
  );
};
