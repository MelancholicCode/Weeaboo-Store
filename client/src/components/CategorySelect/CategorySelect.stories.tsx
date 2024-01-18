import { Meta, StoryObj } from '@storybook/react';
import { CategorySelect } from './CategorySelect';

const meta: Meta<typeof CategorySelect> = {
  title: 'components/Category select',
  component: CategorySelect,
};

export default meta;

type Story = StoryObj<typeof CategorySelect>;

export const Default: Story = {
  args: {
    categories: [
      {
        id: 1,
        name: 'Food',
        slug: 'food',
      },
      {
        id: 2,
        name: 'Electronics',
        slug: 'electronics',
      },
      {
        id: 3,
        name: 'Cosmetics',
        slug: 'cosmetics',
      },
    ],
  },
};
