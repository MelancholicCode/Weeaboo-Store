import { Meta, StoryObj } from '@storybook/react';
import { ProductList } from './ProductList';
import { mockProducts } from '@/shared/constants/mockData';

const meta: Meta<typeof ProductList> = {
  title: 'components/Product list',
  component: ProductList,
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: {
    products: mockProducts,
  },
};
