import { FC, PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { CategorySelect } from '@/components/CategorySelect/CategorySelect';
import CategoryService from '@/services/category/category.service';
import { SEO_TITLE } from '@/shared/constants/seo';
import styles from './layout.module.scss';

const mainMetaData = {
  title: `Catalog | ${SEO_TITLE}`,
  description: "The list of the store's products.",
};

export const metadata: Metadata = {
  ...mainMetaData,
  openGraph: mainMetaData,
};

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const categories = await CategoryService.getAll();

  return (
    <>
      <div className={`container ${styles.select_container}`}>
        <CategorySelect categories={categories} />
      </div>
      {children}
    </>
  );
};

export default Layout;
