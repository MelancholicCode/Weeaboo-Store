import CartItem from '../../components/CartItem/CartItem';

import cl from './Cart.module.css';
import { useSelector } from 'react-redux';
import Spinner from "../../assets/img/spinner/Spinner";

const Cart = () => {
  const {goods, goodsLoadingStatus} = useSelector(state => state.cart);
  const {signedIn} = useSelector(state => state.auth);

  if (goodsLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (goodsLoadingStatus === 'error') {
    return <p>Произошла ошибка</p>
  }

  const renderItems = (arr) => {
    if (!signedIn) {
      return <p>Чтобы просмотреть свою корзину - нужно войти в аккаунт</p>
    }

    if (arr.length === 0) {
      return <p>Товаров в корзине нет</p>
    }

    return arr.map(item => (
      <CartItem
        key={item.productId}
        good={item}
      />
    ));
  }

  return (
    <div className={`container ${cl.Cart}`}>
      <ul className={cl.cartList}>
        {renderItems(goods)}
      </ul>
    </div>
  );
};

export default Cart;