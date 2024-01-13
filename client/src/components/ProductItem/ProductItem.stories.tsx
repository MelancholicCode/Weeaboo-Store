import { Meta, StoryObj } from '@storybook/react';
import { ProductItem } from './ProductItem';
import { mockProduct } from '@/shared/constants/mockData';

const meta: Meta<typeof ProductItem> = {
  title: 'components/Product item',
  component: ProductItem,
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: mockProduct,
};
