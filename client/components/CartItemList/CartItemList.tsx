'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import Image from 'next/image';
import styles from './CartItemList.module.scss';
import { Typography } from '@/shared/components/Typography/Typography';
import { TrashIcon } from '@/assets/icons/TrashIcon/TrashIcon';
import {
  cartReset,
  changeCartItemQuantity,
  deleteCartItem,
} from '@/store/cart/cart.slice';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { Button } from '@/shared/components/Button/Button';
import { createOrder } from '@/store/order/order.slice';

export const CartItemList = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleDeleteItem = async (id: number) => {
    try {
      await dispatch(deleteCartItem(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      try {
        dispatch(changeCartItemQuantity({ id, quantity }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreateOrder = async () => {
    try {
      await dispatch(createOrder());
      dispatch(cartReset());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.item_left}>
              <Link
                href={`${routes.publicRoutes.PRODUCT}/${item.product.slug}`}
              >
                <Image
                  src={item.product.img}
                  alt=""
                  sizes="100vw"
                  width={0}
                  height={0}
                  className={styles.image}
                />
              </Link>
              <div className={styles.description}>
                <Link
                  href={`${routes.publicRoutes.PRODUCT}/${item.product.slug}`}
                >
                  <Typography className={styles.title} variant="body-2">
                    {item.product.title}
                  </Typography>
                </Link>
                <Typography variant="body-2">
                  Price: {item.product.price}$
                </Typography>
              </div>
            </div>
            <div className={styles.item_right}>
              <div className={styles.count}>
                <span
                  className={styles.count_button}
                  onClick={() =>
                    handleChangeQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </span>
                <span className={styles.count_value}>{item.quantity}</span>
                <span
                  className={styles.count_button}
                  onClick={() =>
                    handleChangeQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </span>
              </div>
              <button
                className={styles.delete}
                onClick={() => handleDeleteItem(item.id)}
              >
                <TrashIcon className={styles.delete_icon} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Button className={styles.order_button} onClick={handleCreateOrder}>
        Create order
      </Button>
    </div>
  );
};
