import { Meta, StoryObj } from '@storybook/react';
import { AuthIcon } from './AuthIcon';

const meta: Meta<typeof AuthIcon> = {
  title: 'icons/Auth icon',
  component: AuthIcon,
};

export default meta;

type Story = StoryObj<typeof AuthIcon>;

export const Default: Story = {};
