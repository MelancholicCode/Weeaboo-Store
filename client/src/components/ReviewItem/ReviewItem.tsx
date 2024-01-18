import { FC } from 'react';
import Image from 'next/image';
import styles from './ReviewItem.module.scss';
import { images } from '@/shared/constants/images';
import { Typography } from '@/shared/components/Typography/Typography';
import { StarIcon } from '@/shared/assets/icons/StarIcon/StarIcon';
import { IReview } from '@/shared/types/review.interface';

interface ReviewItemProps {
  review: IReview;
}

export const ReviewItem: FC<ReviewItemProps> = ({
  review: { id, rate, comment, user },
}) => {
  return (
    <li key={id} className={styles.review_item}>
      <Image
        className={styles.avatar}
        width={100}
        height={100}
        src={user.avatar || images.avatarPlaceholder}
        alt="User avatar"
      />

      <div className={styles.review_content}>
        <div className={styles.info}>
          <Typography variant="body-1">
            {user.name} {user.surname}
          </Typography>

          <div className={styles.rate}>
            <StarIcon className={styles.rate_icon} />
            <Typography variant="body-1">{rate}</Typography>
          </div>
        </div>

        <Typography className={styles.comment} variant="body-1">
          {comment}
        </Typography>
      </div>
    </li>
  );
};
