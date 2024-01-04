import { FC } from 'react';
import { StarIcon } from '@/assets/icons/StarIcon/StarIcon';
import styles from './RatingScale.module.scss';
import clsx from 'clsx';

interface RatingScaleProps {
  maxRate: number;
  rate: number | null;
  onClick: (rate: number) => void;
}

export const RatingScale: FC<RatingScaleProps> = ({
  maxRate,
  rate,
  onClick,
}) => {
  const rateArr = [];

  for (let i = 1; i <= maxRate; i++) {
    rateArr.push(i);
  }

  return (
    <ul className={styles.rate_list}>
      {rateArr.map((num) => (
        <li key={num} className={styles.rate_item} onClick={() => onClick(num)}>
          <StarIcon
            className={clsx(styles.rate_icon, {
              [styles.rate_icon_active]: rate !== null && num <= rate,
            })}
          />
        </li>
      ))}
    </ul>
  );
};
