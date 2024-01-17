import { ReactElement } from 'react';
import styles from './ProductListSkeleton.module.scss';
import ContentLoader from 'react-content-loader';

const ProductListSkeleton = () => {
  const loaderItemsArr: ReactElement[] = [];

  for (let i = 0; i < 20; i++) {
    loaderItemsArr.push(
      <li className={styles.item}>
        <ContentLoader width="100%" height="100%">
          <rect height="256px" width="100%" rx="5" ry="5" />
          <rect height="28px" width="100%" y="268px" rx="5" ry="5" />
          <rect height="28px" width="35%" y="311px" rx="5" ry="5" />
          <rect
            className={styles.button}
            height="40px"
            width="100%"
            y="354px"
            rx="10"
            ry="10"
          />
        </ContentLoader>
      </li>
    );
  }

  return <ul className={styles.list}>{loaderItemsArr}</ul>;
};

export default ProductListSkeleton;
