import { Meta, StoryObj } from '@storybook/react';
import { ReviewForm } from './ReviewForm';
import { HttpResponse, http } from 'msw';
import { mockOrders, mockReview } from '@/shared/constants/mockData';

const meta: Meta<typeof ReviewForm> = {
  title: 'components/Review form',
  component: ReviewForm,
  parameters: {
    msw: {
      handlers: {
        order: http.get(`${process.env.API_URL}/order`, () =>
          HttpResponse.json(mockOrders)
        ),
        createReview: http.post(
          `${process.env.API_URL}/review/:productId`,
          () => HttpResponse.json(mockReview)
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReviewForm>;

export const Default: Story = {
  args: {
    productId: 1,
  },
};
