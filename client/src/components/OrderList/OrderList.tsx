'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import styles from './OrderList.module.scss';
import { OrderItem } from '../OrderItem/OrderItem';
import { Placeholder } from '../Placeholder/Placeholder';
import { LoadingStatesEnum } from '@/store/store.types';

export const OrderList = () => {
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const { loading: userLoading } = useAppSelector((state) => state.auth);

  if (
    userLoading === LoadingStatesEnum.LOADING ||
    loading === LoadingStatesEnum.LOADING
  ) {
    return null; // Return Skeleton
  }

  if (error) {
    return <Placeholder type="error">Something went wrong</Placeholder>;
  }

  return (
    <ul className={styles.list}>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
};
