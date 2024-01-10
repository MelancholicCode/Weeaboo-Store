import { useEffect } from 'react';
import { getMe } from '@/store/auth/auth.slice';
import { getCartItems } from '@/store/cart/cart.slice';
import { useAppDispatch } from '@/store/hooks/hooks';
import { getFavorites } from '@/store/favorite/favorite.slice';
import { getOrders } from '@/store/order/order.slice';
import { getMyReviews } from '@/store/review/review.slice';

export const useGetUserData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe())
      .catch(console.error)

      .then(async () => await dispatch(getCartItems()))
      .catch(console.error)

      .then(async () => await dispatch(getFavorites()))
      .catch(console.error)

      .then(async () => await dispatch(getOrders()))
      .catch(console.error)

      .then(async () => await dispatch(getMyReviews()))
      .catch(console.error);
  }, [dispatch]);
};
