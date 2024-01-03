'use client';

import OrderList from '@/components/OrderList/OrderList';
import styles from './page.module.scss';

const OrdersPage = () => {
  return (
    <main className={`container ${styles.container}`}>
      <OrderList />
    </main>
  );
};

export default OrdersPage;
