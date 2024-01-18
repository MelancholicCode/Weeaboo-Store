import { ReactElement } from 'react';
import styles from './CartItemListSkeleton.module.scss';
import ContentLoader from 'react-content-loader';

export const CartItemListSkeleton = () => {
  const loaderItemsArr: ReactElement[] = [];

  for (let i = 0; i < 5; i++) {
    loaderItemsArr.push(
      <li className={styles.item}>
        <div className={styles.item_left}>
          <ContentLoader className={styles.image}>
            <rect width="100%" height="100%" rx="5px" ry="5px" />
          </ContentLoader>

          <div className={styles.description}>
            <ContentLoader height="66px">
              <rect width="200px" height="28px" rx="5px" ry="5px" />
              <rect width="100px" height="28px" y="38px" rx="5px" ry="5px" />
            </ContentLoader>
          </div>
        </div>

        <div className={styles.item_right}>
          <ContentLoader width="90px" height="40px">
            <rect width="90px" height="40px" rx="5px" ry="5px" />
          </ContentLoader>

          <ContentLoader className={styles.delete} width="30px" height="30px">
            <rect width="30px" height="30px" rx="5px" ry="5px" />
          </ContentLoader>
        </div>
      </li>
    );
  }

  return <ul className={styles.list}>{loaderItemsArr}</ul>;
};
