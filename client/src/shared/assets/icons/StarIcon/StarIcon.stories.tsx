import { Meta, StoryObj } from '@storybook/react';
import { StarIcon } from './StarIcon';

const meta: Meta<typeof StarIcon> = {
  title: 'icons/Star icon',
  component: StarIcon,
};

export default meta;

type Story = StoryObj<typeof StarIcon>;

export const Default: Story = {};
