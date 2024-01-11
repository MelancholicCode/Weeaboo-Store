import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'shared/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Body_1: Story = {
  args: {
    children: 'Typography component',
    variant: 'body-1',
  },
};

export const Body_2: Story = {
  args: { ...Body_1.args, variant: 'body-2' },
};

export const Title_1: Story = {
  args: { ...Body_1.args, variant: 'title-1' },
};

export const Title_2: Story = {
  args: { ...Body_1.args, variant: 'title-2' },
};
