import { Meta, StoryObj } from '@storybook/react';
import { RatingScale } from './RatingScale';
import { useState } from 'react';

const meta: Meta<typeof RatingScale> = {
  title: 'components/Rating scale',
  component: RatingScale,
  args: {
    maxRate: 5,
    rate: 5,
  },
};

export default meta;

type Story = StoryObj<typeof RatingScale>;

export const Playground = ({
  maxRate,
  rate,
}: {
  maxRate: number;
  rate: number;
}) => {
  const [value, setValue] = useState(rate);

  return (
    <RatingScale
      rate={value}
      maxRate={maxRate}
      onClick={(value) => setValue(value)}
    />
  );
};

export const Rating_five: Story = {
  args: {
    rate: 5,
  },
};
export const Rating_one: Story = {
  args: {
    rate: 1,
  },
};
