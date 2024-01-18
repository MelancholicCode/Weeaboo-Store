'use client';

import { FC } from 'react';
import clsx from 'clsx';
import styles from './FavoriteButton.module.scss';
import { HeartIcon } from '@/shared/assets/icons/HeartIcon/HeartIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  createFavorite,
  deleteFavorite,
} from '@/store/favorite/favorite.slice';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/constants/routes';
// import { LoadingStatesEnum } from '@/store/store.types';
// import ContentLoader from 'react-content-loader';

interface FavoriteButtonProps {
  className?: string;
  productId: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  className,
  productId,
}) => {
  const {
    user,
    // loading: userLoading
  } = useAppSelector((state) => state.auth);
  const {
    items,
    // loading
  } = useAppSelector((state) => state.favorite);
  const router = useRouter();
  const query = useQueryParams();
  const dispatch = useAppDispatch();

  const favorite = items.find((item) => item.product.id === productId);

  const handleToggleFavorite = async () => {
    if (user) {
      if (favorite) {
        try {
          dispatch(deleteFavorite(favorite.id));
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await dispatch(createFavorite(productId));
        } catch (error: any) {
          if (error.response.status === 403) {
            query.add('not_activated', 'true');
          }
        }
      }
    } else {
      router.push(routes.AUTH);
    }
  };

  // if (
  //   userLoading === LoadingStatesEnum.LOADING ||
  //   loading === LoadingStatesEnum.LOADING
  // ) {
  //   return (
  //     <ContentLoader
  //       style={{
  //         cursor: 'pointer',
  //       }}
  //       width="40px"
  //       height="40px"
  //       className={clsx(styles.button, [className])}
  //     >
  //       <rect width="40px" height="40px" rx="5px" ry="5px" />
  //     </ContentLoader>
  //   );
  // }

  return user ? (
    <button
      className={clsx(styles.button, [className])}
      onClick={handleToggleFavorite}
    >
      <HeartIcon
        className={clsx(styles.button_icon, {
          [styles.button_active]: favorite,
        })}
      />
    </button>
  ) : null;
};
