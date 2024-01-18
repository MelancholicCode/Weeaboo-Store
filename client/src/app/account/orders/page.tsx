import { Metadata } from 'next';
import { OrderList } from '@/components/OrderList/OrderList';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `Orders | ${SEO_TITLE}`,
  description: "The list of user's orders.",
};

const OrdersPage = () => {
  return (
    <main className="page-container">
      <OrderList />
    </main>
  );
};

export default OrdersPage;
