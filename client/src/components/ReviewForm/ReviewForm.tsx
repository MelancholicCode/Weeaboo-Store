'use client';

import { FC, useState, FormEvent } from 'react';
import { RatingScale } from '@/components/RatingScale/RatingScale';
import { Button } from '@/shared/components/Button/Button';
import { Textarea } from '@/shared/components/Textarea/Textarea';
import styles from './ReviewForm.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { createReview } from '@/store/review/review.slice';

interface ReviewFormProps {
  productId: number;
}

export const ReviewForm: FC<ReviewFormProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const [rate, setRate] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const { orders } = useAppSelector((state) => state.order);
  const { reviews } = useAppSelector((state) => state.review);

  const isRated = reviews.find((review) => review.productId === productId);

  const isPurchased = orders.find((order) =>
    order.OrderItem.find((item) => item.productId === productId)
  );

  if (!isPurchased || isRated) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (comment.length && rate) {
      try {
        await dispatch(createReview({ productId, rate, comment }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <RatingScale maxRate={5} onClick={(num) => setRate(num)} rate={rate} />
      <Textarea
        placeholder="Add your rate for this product"
        onChange={(event) => setComment(event.currentTarget.value)}
        className={styles.textarea}
      ></Textarea>
      <Button className={styles.button} disabled={!rate || !comment.length}>
        Send a review
      </Button>
    </form>
  );
};
