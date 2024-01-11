import { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';
import { Input } from '../Input/Input';

const children = (
  <>
    <label htmlFor="field">Label</label>
    <Input id="field" />
  </>
);

const meta: Meta<typeof Field> = {
  title: 'shared/Field',
  component: Field,
  tags: ['autodocs'],
  args: { children },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    children,
  },
};
