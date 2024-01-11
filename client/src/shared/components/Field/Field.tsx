import { FC, PropsWithChildren } from 'react';
import styles from './Field.module.scss';

export const Field: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.field}>{children}</div>;
};
