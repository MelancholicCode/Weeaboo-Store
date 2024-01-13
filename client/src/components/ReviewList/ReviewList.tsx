import { FC } from 'react';
import ReviewService from '@/services/review/review.service';
import styles from './ReviewList.module.scss';
import { Placeholder } from '../../shared/components/Placeholder/Placeholder';
import { ReviewItem } from '../ReviewItem/ReviewItem';

interface ReviewListProps {
  productId: number;
}

export const ReviewList: FC<ReviewListProps> = async ({ productId }) => {
  try {
    const reviews = await ReviewService.getAll(productId);

    return (
      <ul className={styles.review_list}>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    );
  } catch (error) {
    console.error(error);

    return <Placeholder type="error">Something went wrong</Placeholder>;
  }
};
