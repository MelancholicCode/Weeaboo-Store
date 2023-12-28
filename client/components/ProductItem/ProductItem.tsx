import { FC } from 'react';
import { Button } from '@/shared/components/Button/Button';
import { Typography } from '@/shared/components/Typography/Typography';
import Image from 'next/image';
import styles from './ProductItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { routes } from '@/constants/routes';

interface ProductItemProps {
  className?: string;
  img: string;
  title: string;
  price: number;
}

export const ProductItem: FC<ProductItemProps> = ({
  className,
  img,
  title,
  price,
}) => {
  return (
    <div className={clsx(styles.container, [className])}>
      <Link href={routes.publicRoutes.PRODUCT}>
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
        <Link href={routes.publicRoutes.PRODUCT}>
          <Typography className={styles.title} variant="body-2">
            {title}
          </Typography>
        </Link>
        <Typography variant="body-2">{price}$</Typography>
      </div>
      <Button>Buy</Button>
    </div>
  );
};
