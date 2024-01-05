'use client';

import { useAppSelector } from '@/store/hooks/hooks';

export const OrderList = () => {
  const { orders } = useAppSelector((state) => state.order);

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>{order.id}</li>
      ))}
    </ul>
  );
};
