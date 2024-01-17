'use client';

import { FC } from 'react';
import { routes } from '@/shared/constants/routes';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { createCartItem } from '@/store/cart/cart.slice';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
// import { LoadingStatesEnum } from '@/store/store.types';
// import ContentLoader from 'react-content-loader';

interface BuyButtonProps {
  className?: string;
  productId: number;
}

export const BuyButton: FC<BuyButtonProps> = ({ className, productId }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = useQueryParams();
  const {
    user,
    // loading: userLoading
  } = useAppSelector((state) => state.auth);
  const {
    cartItems,
    // loading
  } = useAppSelector((state) => state.cart);

  const handleAddInCart = async () => {
    if (user) {
      if (!user.isActivated) {
        return query.add('not_activated', 'true');
      }

      try {
        await dispatch(createCartItem(productId));
      } catch (error: any) {
        console.error(error);
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
  //       height="47px"
  //       width="100%"
  //     >
  //       <rect height="47px" width="100%" rx="10" ry="10" />
  //     </ContentLoader>
  //   );
  // }

  return cartItems.some((item) => item.productId === productId) ? (
    <Button
      className={className}
      onClick={() => router.push(routes.authUserRoutes.CART)}
      variant="outlined"
    >
      In the cart
    </Button>
  ) : (
    <Button className={className} onClick={handleAddInCart}>
      Buy
    </Button>
  );
};
