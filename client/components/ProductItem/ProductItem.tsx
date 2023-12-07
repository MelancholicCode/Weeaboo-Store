import { FC } from 'react';
import { Button } from '@/shared/components/Button/Button';
import { Typography } from '@/shared/components/Typography/Typography';
import Image from 'next/image';

interface ProductItemProps {
  img: string;
  title: string;
  price: number;
}

export const ProductItem: FC<ProductItemProps> = ({ img, title, price }) => {
  return (
    <div className="flex w-full max-w-xs flex-col justify-between gap-2 rounded-md p-3 shadow-md">
      <Image
        src={img}
        alt=""
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: '100%', height: 'auto' }}
      />
      <div>
        <Typography variant="title-2">{title}</Typography>
        <Typography variant="title-2">{price}$</Typography>
      </div>
      <Button>Buy</Button>
    </div>
  );
};
