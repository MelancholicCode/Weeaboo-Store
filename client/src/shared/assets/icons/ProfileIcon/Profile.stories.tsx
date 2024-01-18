import { Meta, StoryObj } from '@storybook/react';
import { ProfileIcon } from './ProfileIcon';

const meta: Meta<typeof ProfileIcon> = {
  title: 'icons/Profile icon',
  component: ProfileIcon,
};

export default meta;

type Story = StoryObj<typeof ProfileIcon>;

export const Default: Story = {};
