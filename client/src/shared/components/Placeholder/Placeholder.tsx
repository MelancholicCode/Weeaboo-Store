import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import { images } from '@/shared/constants/images';
import { Typography } from '@/shared/components/Typography/Typography';
import styles from './Placeholder.module.scss';

interface PlaceholderProps {
  type: 'empty' | 'error';
}

export const Placeholder: FC<PropsWithChildren<PlaceholderProps>> = ({
  type,
  children,
}) => {
  const image =
    (type === 'empty' && images.emptyList) ||
    (type === 'error' && images.error) ||
    '';
  const alt =
    (type === 'empty' && 'List is empty') ||
    (type === 'error' && 'Error') ||
    '';

  return (
    <div className={styles.container}>
      <Image src={image} width={300} height={300} alt={alt} />
      <Typography className={styles.text} variant="title-2">
        {children}
      </Typography>
    </div>
  );
};
