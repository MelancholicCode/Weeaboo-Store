import { Metadata } from 'next';
import { OrderList } from '@/components/OrderList/OrderList';
import { SEO_TITLE } from '@/shared/constants/seo';

const mainMetaData = {
  title: `Orders | ${SEO_TITLE}`,
  description: "The list of user's orders.",
};

export const metadata: Metadata = {
  ...mainMetaData,
  openGraph: mainMetaData,
};

const OrdersPage = () => {
  return (
    <main className="page-container">
      <OrderList />
    </main>
  );
};

export default OrdersPage;
