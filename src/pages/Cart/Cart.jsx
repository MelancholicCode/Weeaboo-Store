import CartItem from '../../components/CartItem/CartItem';

import cl from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../assets/img/spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import { declOfNum } from '../../utils/string';
import { sumOfCount, sumOfPrice } from '../../utils/numbers';
import { getAccessToken, getUser } from '../../utils/auth';
import { addOrder } from '../AccountPage/ordersSlice';
import { useState } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const {goods, goodsLoadingStatus} = useSelector(state => state.cart);
  const {signedIn} = useSelector(state => state.auth);

  const onThanksModal = (value) => {
    let timeout;
    if (value) {
      setModal(true);
      setTimeout(() => setModal(false), 3000);
      return;
    }
    clearTimeout(timeout);
  }

  const onOrder = () => {
    if (signedIn) {
      const accessToken = getAccessToken();
      const userId = getUser().id;
      const goodsIds = goods.map(good => good.productId);
      const productIds = goods.map(good => good.id);
      
      const order = {
        goodsIds,
        generalPrice: sumOfPrice(goods),
        generalCount: sumOfCount(goods),
        date: new Date(),
      }

      dispatch(addOrder(order, userId, accessToken, productIds, onThanksModal));
    }
  }

  if (goodsLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (goodsLoadingStatus === 'error') {
    return <p className='emptyPage'>Что-то пошло не так</p>
  }

  if (!signedIn) {
    return (
    <div className={`container ${cl.Cart}`}>
      <p className="emptyPage">Чтобы просмотреть свою корзину - нужно войти в аккаунт</p>
    </div>
    )
  }

  const renderItems = (arr) => {
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
    <>
      <Modal
        modal={modal}
        setModal={setModal}>
        <p className="alertMessage">Спасибо за покупку!</p>
      </Modal>
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
    </>
  );
};

export default Cart;