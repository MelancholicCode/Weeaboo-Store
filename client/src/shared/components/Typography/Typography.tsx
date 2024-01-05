import { FC, PropsWithChildren } from 'react';
import styles from './Typography.module.scss';
import clsx from 'clsx';

interface TypographyProps {
  className?: string;
  type?: 'h1' | 'h2' | 'p';
  variant: 'title-1' | 'title-2' | 'body-1' | 'body-2';
}

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  className,
  type = 'p',
  variant,
  children,
}) => {
  const Tag = type;

  return (
    <Tag
      className={clsx(className, {
        [styles['title-1']]: variant === 'title-1',
        [styles['title-2']]: variant === 'title-2',
        [styles['body-1']]: variant === 'body-1',
        [styles['body-2']]: variant === 'body-2',
      })}
    >
      {children}
    </Tag>
  );
};
