import { FC, PropsWithChildren } from 'react';
import { CategorySelect } from '@/components/CategorySelect/CategorySelect';
import CategoryService from '@/services/category/category.service';
import styles from './layout.module.scss';

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
