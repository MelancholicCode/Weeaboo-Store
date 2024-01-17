import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@/shared/components/Typography/Typography';
import styles from './ProductItem.module.scss';
import { routes } from '@/shared/constants/routes';
import { BuyButton } from '@/shared/components/BuyButton/BuyButton';
import { FavoriteButton } from '@/shared/components/FavoriteButton/FavoriteButton';

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
    <li className={clsx(styles.item, [className])}>
      <Link href={`${routes.publicRoutes.PRODUCT}/${slug}`}>
        <Image
          src={img}
          alt={title}
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
        <Typography variant="body-2">{Number(price).toFixed(2)}$</Typography>
      </div>

      <BuyButton productId={id} />
      <FavoriteButton className={styles.favorite_button} productId={id} />
    </li>
  );
};
