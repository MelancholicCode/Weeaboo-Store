'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import styles from './OrderList.module.scss';
import { OrderItem } from '../OrderItem/OrderItem';

export const OrderList = () => {
  const { orders } = useAppSelector((state) => state.order);

  return (
    <ul className={styles.list}>
      {orders.map((order) => (
        <OrderItem order={order} />
      ))}
    </ul>
  );
};
