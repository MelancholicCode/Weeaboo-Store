import CartItem from '../../components/CartItem/CartItem';

import cl from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../assets/img/spinner/Spinner";
import { declOfNum } from '../../utils/string';
import { sumOfCount, sumOfPrice } from '../../utils/numbers';
import { getAccessToken, getUser } from '../../utils/auth';
import { addOrder } from '../ProfilePage/ordersSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const {goods, goodsLoadingStatus} = useSelector(state => state.cart);
  const {signedIn} = useSelector(state => state.auth);

  const onOrder = () => {
    if (signedIn) {
      const accessToken = getAccessToken();
      const userId = getUser().id;
      const goodsIds = goods.map(good => good.productId);
      const productIds = goods.map(good => good.id);
      
      const order = {
        goods: goodsIds,
        generalPrice: sumOfPrice(goods),
        generalCount: sumOfCount(goods),
        date: new Date(),
      }

      dispatch(addOrder(order, userId, accessToken, productIds));
    }
  }

  if (goodsLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (goodsLoadingStatus === 'error') {
    return <p>Произошла ошибка</p>
  }

  const renderItems = (arr) => {
    if (!signedIn) {
      return <p className="emptyPage">Чтобы просмотреть свою корзину - нужно войти в аккаунт</p>
    }

    if (arr.length === 0) {
      return <p className="emptyPage">Товаров в корзине нет</p>
    }

    return arr.map(item => (
      <CartItem
        key={item.productId}
        good={item}
      />
    ));
  }

  const generalCount = sumOfCount(goods);
  const generalPrice = sumOfPrice(goods);
  const declOfCount = declOfNum(generalCount, ['товар', 'товара', 'товаров'])
  
  return (
    <div className={`container ${cl.Cart}`}>
      <ul className={cl.cartList}>
        {renderItems(goods)}
        {signedIn && goods.length
          ? <li className={cl.purchaseBlock}>
              <p className={cl.resultText}>
                {generalCount} {declOfCount} на сумму {generalPrice} ₽
              </p>
              <div onClick={onOrder} className={cl.buyBtn}>
                Оформить заказ
              </div>
            </li>
          : null}
      </ul>
    </div>
  );
};

export default Cart;