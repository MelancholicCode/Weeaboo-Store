import { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { Field } from '@/shared/components/Field/Field';
import { Input } from '../Input/Input';

const meta: Meta<typeof Form> = {
  title: 'shared/Form',
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (props) => (
    <Form {...props}>
      <Field>
        <label htmlFor="form-field-1">Label</label>
        <Input id="form-field-1" />
      </Field>

      <Field>
        <label htmlFor="form-field-2">Label</label>
        <Input id="form-field-2" />
      </Field>
    </Form>
  ),
};
