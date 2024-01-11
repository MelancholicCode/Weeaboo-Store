import { Button } from './Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    ...Contained.args,
    variant: 'outlined',
  },
};

export const Contained_Disabled: Story = {
  args: {
    ...Contained.args,
    disabled: true,
  },
};

export const Outlined_Disabled: Story = {
  args: {
    ...Contained.args,
    variant: 'outlined',
    disabled: true,
  },
};

export const Text: Story = {
  args: {
    ...Contained.args,
    variant: 'text',
  },
};
