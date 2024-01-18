import { Metadata } from 'next';
import { CartItemList } from '@/components/CartItemList/CartItemList';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `Cart | ${SEO_TITLE}`,
  description: "Products from the user's shopping cart.",
};

const CartPage = () => {
  return (
    <main className="page-container">
      <CartItemList />
    </main>
  );
};

export default CartPage;
