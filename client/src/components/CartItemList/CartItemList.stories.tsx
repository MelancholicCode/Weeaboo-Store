import { Meta, StoryObj } from '@storybook/react';
import { CartItemList } from './CartItemList';
import { HttpResponse, http } from 'msw';
import {
  mockCartItem,
  mockCartItems,
  mockOrder,
} from '@/shared/constants/mockData';

const meta: Meta<typeof CartItemList> = {
  title: 'components/Cart item list',
  component: CartItemList,
  parameters: {
    msw: {
      handlers: {
        cart: http.get(`${process.env.API_URL}/cart`, () =>
          HttpResponse.json(mockCartItems)
        ),
        changeCartItemQuantity: http.patch(
          `${process.env.API_URL}/cart/:id`,
          async ({ request }) => {
            const { quantity }: any = await request.json();
            return HttpResponse.json({
              ...mockCartItem,
              quantity: quantity,
            });
          }
        ),
        deleteCartItem: http.delete(`${process.env.API_URL}/cart/:id`, () =>
          HttpResponse.json()
        ),
        createOrder: http.post(`${process.env.API_URL}/order`, () =>
          HttpResponse.json(mockOrder)
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CartItemList>;

export const Default: Story = {};
