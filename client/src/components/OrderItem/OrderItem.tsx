'use client';

import { FC, useState } from 'react';
import { ArrowIcon } from '@/assets/icons/ArrowIcon/ArrowIcon';
import { Typography } from '@/shared/components/Typography/Typography';
import { OrderWithItems } from '@/shared/types/order.interface';
import styles from './OrderItem.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/constants/routes';

interface OrderItemProps {
  order: OrderWithItems;
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  return (
    <li key={order.id} className={styles.item}>
      <div
        className={clsx(styles.item_content, {
          [styles.item_content_active]: isActive,
        })}
        onClick={() => setIsActive(!isActive)}
      >
        <ArrowIcon
          className={clsx(styles.arrow_icon, {
            [styles.arrow_icon_active]: isActive,
          })}
        />

        <div className={styles.order_info}>
          <Typography variant="body-1">Order ID: {order.id}</Typography>
          <Typography variant="body-1">Address: {order.address}</Typography>
          <Typography variant="body-1">
            Date: {new Date(order.createdAt).toLocaleString()}
          </Typography>
        </div>
      </div>

      {isActive && (
        <ul>
          {order.OrderItem.map(({ product }) => (
            <li
              key={product.id}
              className={styles.order_item}
              onClick={() =>
                router.push(`${routes.publicRoutes.PRODUCT}/${product.slug}`)
              }
            >
              <Image
                className={styles.order_item_image}
                width={100}
                height={100}
                src={product.img}
                alt={product.title}
              />
              <Typography className={styles.order_item_title} variant="body-1">
                {product.title}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
