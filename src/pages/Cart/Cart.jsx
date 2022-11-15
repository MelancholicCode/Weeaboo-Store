import CartItem from './CartItem/CartItem';

import cl from './Cart.module.css';

const Cart = () => {
  return (
    <div className={`container ${cl.Cart}`}>
      <ul className={cl.cartList}>
        <CartItem/>
        <CartItem/>
        <CartItem/>
      </ul>
    </div>
  );
};

export default Cart;