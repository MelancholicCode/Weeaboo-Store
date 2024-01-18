import { Button } from './Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Contained_Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Outlined_Disabled: Story = {
  args: {
    variant: 'outlined',
    disabled: true,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};
