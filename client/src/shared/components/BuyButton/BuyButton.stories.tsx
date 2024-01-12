import { Meta, StoryObj } from '@storybook/react';
import { BuyButton } from './BuyButton';
import { http, HttpResponse } from 'msw';
import { mockCartData, mockCartItem } from '@/shared/constants/mockData';

const meta: Meta<typeof BuyButton> = {
  title: 'shared/Buy button',
  component: BuyButton,
  parameters: {
    msw: {
      handlers: {
        addInCart: http.post(
          `${process.env.API_URL}/cart/:productId`,
          ({ request }) => {
            const productId = request.url.split('/').slice(-1)[0];

            return !Number.isNaN(+productId)
              ? HttpResponse.json({
                  ...mockCartItem,
                  productId: +productId,
                  product: {
                    ...mockCartItem.product,
                    id: +productId,
                  },
                })
              : HttpResponse.error();
          }
        ),
      },
    },
  },
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
          HttpResponse.json(mockCartData)
        ),
      },
    },
  },
};
