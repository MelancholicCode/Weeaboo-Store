import CartItems from '@/components/CartItems/CartItems';
import styles from './page.module.scss';

const CartPage = () => {
  return (
    <main className={`container ${styles.container}`}>
      <CartItems />
    </main>
  );
};

export default CartPage;
