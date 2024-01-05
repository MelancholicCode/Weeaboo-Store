import { FC } from 'react';
import Image from 'next/image';
import ReviewService from '@/services/review/review.service';
import styles from './ReviewList.module.scss';
import { Typography } from '@/shared/components/Typography/Typography';
import { StarIcon } from '@/assets/icons/StarIcon/StarIcon';

interface ReviewListProps {
  productId: number;
}

export const ReviewList: FC<ReviewListProps> = async ({ productId }) => {
  const reviews = await ReviewService.getAll(productId);

  return (
    <ul className={styles.review_list}>
      {reviews.map(({ id, rate, comment, user }) => (
        <li key={id} className={styles.review_item}>
          <Image
            className={styles.avatar}
            width={100}
            height={100}
            src={user.avatar}
            alt="User avatar"
          />
          <div>
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
      ))}
    </ul>
  );
};
