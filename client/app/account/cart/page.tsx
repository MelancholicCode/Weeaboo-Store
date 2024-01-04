import { CartItemList } from '@/components/CartItemList/CartItemList';
import styles from './page.module.scss';

const CartPage = () => {
  return (
    <main className={`container ${styles.container}`}>
      <CartItemList />
    </main>
  );
};

export default CartPage;
