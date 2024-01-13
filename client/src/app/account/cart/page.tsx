import { Metadata } from 'next';
import { CartItemList } from '@/components/CartItemList/CartItemList';
import { SEO_TITLE } from '@/shared/constants/seo';

const mainMetaData = {
  title: `Cart | ${SEO_TITLE}`,
  description: "Products from the user's shopping cart.",
};

export const metadata: Metadata = {
  ...mainMetaData,
  openGraph: mainMetaData,
};

const CartPage = () => {
  return (
    <main className="page-container">
      <CartItemList />
    </main>
  );
};

export default CartPage;
