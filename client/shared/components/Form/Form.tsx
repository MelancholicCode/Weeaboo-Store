import { FC, HTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';
import styles from './Form.module.scss';
import clsx from 'clsx';

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
}

const Form: FC<PropsWithChildren<FormProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form className={clsx(styles.form, [className])} {...props}>
      {children}
    </form>
  );
};

export default Form;
