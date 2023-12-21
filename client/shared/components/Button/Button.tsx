import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button className={clsx(styles.button, [className])} {...props}>
      {children}
    </button>
  );
};
