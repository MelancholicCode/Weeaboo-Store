import CartItem from '../../components/CartItem/CartItem';

import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../assets/img/spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import { declOfNum } from '../../utils/string';
import { sumOfCount, sumOfPrice } from '../../utils/numbers';
import { addOrder } from '../AccountPage/ordersSlice';
import { useState } from 'react';

import cl from './Cart.module.css';
import { useForm } from 'react-hook-form';

const Cart = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const {goods, goodsLoadingStatus} = useSelector(state => state.cart);
  const {signedIn} = useSelector(state => state.auth);
  const [address, setAddress] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    reset
  } = useForm({mode: 'onBlur'});

  const onOrder = (e) => {
    e.preventDefault();
    if (signedIn) {
      dispatch(addOrder(address, onModal, setShowMessage));
    }
  }

  const onModal = (bool) => {
    if (bool) {
      setModal(true);
    } else {
      reset();
      setShowMessage(false);
      setModal(false);
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
        key={item.id}
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
        setModal={onModal}
      >
        {showMessage
          ? <p className="alertMessage">Спасибо за покупку!</p>
          : <form onSubmit={handleSubmit(onOrder)}>
              {errors?.address && <p className={cl.formError}>{errors?.address?.message}</p>}
              <input
                {...register('address', {
                  required: 'Заполните адрес для заказа'
                })}
                id='address'
                value={address}
                className={cl.addressInput}
                onChange={e => setAddress(e.target.value)}
                placeholder='Введите адрес'
                type="text"
              />
              <button className={cl.orderBtn}>Сделать заказ</button>
            </form>}
      </Modal>
      <div className={`container ${cl.Cart}`}>
        <ul className={cl.cartList}>
          {renderItems(goods)}
        </ul>
        {signedIn && goods.length
            ? <div className={cl.purchaseBlock}>
                <p className={cl.resultText}>
                  {generalCount} {declOfCount} на сумму {generalPrice} ₽
                </p>
                <div onClick={() => onModal(true)} className={cl.buyBtn}>
                  Оформить заказ
                </div>
              </div>
            : null}
      </div>
    </>
  );
};

export default Cart;