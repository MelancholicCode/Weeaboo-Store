import { Meta, StoryObj } from '@storybook/react';
import { TrashIcon } from './TrashIcon';

const meta: Meta<typeof TrashIcon> = {
  title: 'icons/Trash icon',
  component: TrashIcon,
};

export default meta;

type Story = StoryObj<typeof TrashIcon>;

export const Default: Story = {};
