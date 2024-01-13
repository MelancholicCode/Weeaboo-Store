import { Meta, StoryObj } from '@storybook/react';
import { ReviewItem } from './ReviewItem';
import { mockReview } from '@/shared/constants/mockData';

const meta: Meta<typeof ReviewItem> = {
  title: 'components/Review item',
  component: ReviewItem,
};

export default meta;

type Story = StoryObj<typeof ReviewItem>;

export const Default: Story = {
  args: {
    review: mockReview,
  },
};
