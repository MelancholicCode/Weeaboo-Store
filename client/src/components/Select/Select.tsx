'use client';

import { FC } from 'react';
import ReactSelect, { Props } from 'react-select';

export const Select: FC<Props> = (props) => {
  return (
    <ReactSelect
      styles={{
        control: (base, { isFocused }) => ({
          ...base,
          // border: 'none',
          boxShadow: 'none',
          outline: 'none',
          borderColor: isFocused ? 'var(--accent-color)' : 'var(--grey-color)',
          '&:hover': {
            borderColor: 'var(--accent-color)',
          },
        }),
        option: (base, { isSelected, isFocused }) => ({
          ...base,
          '&:active': {
            backgroundColor: 'var(--dark-accent-color)',
          },
          ...(isFocused && {
            backgroundColor: 'var(--light-accent-color)',
            color: 'var(--white-color)',
          }),
          ...(isSelected && {
            backgroundColor: 'var(--accent-color)',
            '&:hover': { backgroundColor: 'var(--accent-color)' },
          }),
        }),
      }}
      {...props}
    />
  );
};
