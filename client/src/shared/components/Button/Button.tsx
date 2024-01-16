import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'contained' | 'outlined' | 'text' | 'icon';
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  variant = 'contained',
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.button_contained]: variant === 'contained',
          [styles.button_outlined]: variant === 'outlined',
          [styles.button_text]: variant === 'text',
          [styles.button_icon]: variant === 'icon',
        },
        [className]
      )}
      {...props}
    >
      {children}
    </button>
  );
};
