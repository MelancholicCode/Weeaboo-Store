import clsx from 'clsx';
import styles from './Textarea.module.scss';
import { inter } from '@/fonts/inter';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea: FC<PropsWithChildren<TextareaProps>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={clsx(styles.textarea, [inter.className, className])}
    >
      {children}
    </textarea>
  );
};
