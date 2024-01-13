import { Meta, StoryObj } from '@storybook/react';
import { Placeholder } from './Placeholder';

const meta: Meta<typeof Placeholder> = {
  title: 'shared/Placeholder',
  component: Placeholder,
  args: {
    children: 'Placeholder text',
  },
};

export default meta;

type Story = StoryObj<typeof Placeholder>;

export const Empty: Story = {
  args: {
    type: 'empty',
    children: 'List is empty',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    children: 'Something went wrong',
  },
};
