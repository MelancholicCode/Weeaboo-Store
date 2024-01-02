import { FC } from 'react';
import { Typography } from '@/shared/components/Typography/Typography';
import Image from 'next/image';
import styles from './ProductItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import BuyButton from '../BuyButton/BuyButton';

interface ProductItemProps {
  className?: string;
  id: number;
  img: string;
  title: string;
  price: number;
  slug: string;
}

export const ProductItem: FC<ProductItemProps> = ({
  className,
  id,
  img,
  title,
  price,
  slug,
}) => {
  return (
    <div className={clsx(styles.container, [className])}>
      <Link href={`${routes.publicRoutes.PRODUCT}/${slug}`}>
        <Image
          src={img}
          alt=""
          sizes="100vw"
          width={0}
          height={0}
          className={styles.image}
        />
      </Link>
      <div className={styles.info_wrapper}>
        <Link href={`${routes.publicRoutes.PRODUCT}/${slug}`}>
          <Typography className={styles.title} variant="body-2">
            {title}
          </Typography>
        </Link>
        <Typography variant="body-2">{price}$</Typography>
      </div>
      <BuyButton productId={id} />
    </div>
  );
};
