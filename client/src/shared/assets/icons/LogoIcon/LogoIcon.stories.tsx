import { Meta, StoryObj } from '@storybook/react';
import { LogoIcon } from './LogoIcon';

const meta: Meta<typeof LogoIcon> = {
  title: 'icons/Logo icon',
  component: LogoIcon,
};

export default meta;

type Story = StoryObj<typeof LogoIcon>;

export const Default: Story = {};
