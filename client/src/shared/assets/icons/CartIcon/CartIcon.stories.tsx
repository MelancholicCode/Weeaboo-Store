import { Meta, StoryObj } from '@storybook/react';
import { CartIcon } from './CartIcon';

const meta: Meta<typeof CartIcon> = {
  title: 'icons/Cart icon',
  component: CartIcon,
};

export default meta;

type Story = StoryObj<typeof CartIcon>;

export const Default: Story = {};
