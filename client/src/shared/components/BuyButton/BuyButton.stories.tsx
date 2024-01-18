import { Meta, StoryObj } from '@storybook/react';
import { BuyButton } from './BuyButton';
import { http, HttpResponse } from 'msw';
import { mockCartItems } from '@/shared/constants/mockData';

const meta: Meta<typeof BuyButton> = {
  title: 'shared/Buy button',
  component: BuyButton,
};

export default meta;

type Story = StoryObj<typeof BuyButton>;

export const Default: Story = {
  args: {
    productId: 2,
  },
};

export const Product_in_the_cart: Story = {
  args: {
    productId: 1,
  },
  parameters: {
    msw: {
      handlers: {
        cart: http.get(`${process.env.API_URL}/cart`, () =>
          HttpResponse.json(mockCartItems)
        ),
      },
    },
  },
};
