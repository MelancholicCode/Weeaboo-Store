import { FC, PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { CategorySelect } from '@/components/CategorySelect/CategorySelect';
import CategoryService from '@/services/category/category.service';
import { SEO_TITLE } from '@/shared/constants/seo';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: `Catalog | ${SEO_TITLE}`,
  description: "The list of the store's products.",
};

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const categories = await CategoryService.getAll();

  return (
    <main className="page-container">
      <div className={`container ${styles.select_container}`}>
        <CategorySelect categories={categories} />
      </div>
      {children}
    </main>
  );
};

export default Layout;
