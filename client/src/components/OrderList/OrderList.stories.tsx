import { Meta, StoryObj } from '@storybook/react';
import { OrderList } from './OrderList';
import { HttpResponse, http } from 'msw';
import { mockOrders } from '@/shared/constants/mockData';

const meta: Meta<typeof OrderList> = {
  title: 'components/Order list',
  component: OrderList,
  parameters: {
    msw: {
      handlers: {
        order: http.get(`${process.env.API_URL}/order`, () =>
          HttpResponse.json(mockOrders)
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrderList>;

export const Default: Story = {};
