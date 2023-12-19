import { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
};
