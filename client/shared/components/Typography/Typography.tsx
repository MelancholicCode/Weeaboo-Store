import { FC, PropsWithChildren } from 'react';

interface TypographyProps {
  className?: string;
  type?: 'h1' | 'h2' | 'p';
  variant: 'title-1' | 'title-2' | 'body-1';
}

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  className,
  type = 'p',
  variant,
  children,
}) => {
  const Tag = type;

  const tailwindClassnames = {
    'title-1': 'text-xl font-bold',
    'title-2': 'text-lg font-bold',
    'body-1': 'text-base',
  };

  return (
    <Tag className={`${tailwindClassnames[variant]} ${className}`}>
      {children}
    </Tag>
  );
};
