import { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<CustomInputProps> = ({ className, ...props }) => {
  return <input className={clsx(styles.input, [className])} {...props} />;
};
