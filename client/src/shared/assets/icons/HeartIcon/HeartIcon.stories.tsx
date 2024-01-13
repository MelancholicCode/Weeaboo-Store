import { Meta, StoryObj } from '@storybook/react';
import { HeartIcon } from './HeartIcon';

const meta: Meta<typeof HeartIcon> = {
  title: 'icons/Heart icon',
  component: HeartIcon,
};

export default meta;

type Story = StoryObj<typeof HeartIcon>;

export const Default: Story = {};
