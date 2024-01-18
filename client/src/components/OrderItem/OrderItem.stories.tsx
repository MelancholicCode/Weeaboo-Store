import { Meta, StoryObj } from '@storybook/react';
import { OrderItem } from './OrderItem';
import { mockOrder } from '@/shared/constants/mockData';

const meta: Meta<typeof OrderItem> = {
  title: 'components/Order item',
  component: OrderItem,
};

export default meta;

type Story = StoryObj<typeof OrderItem>;

export const Default: Story = {
  args: {
    order: mockOrder,
  },
};
