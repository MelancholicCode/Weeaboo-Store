'use client';

import { FC } from 'react';
import ReactModal, { Props } from 'react-modal';
import styles from './Popup.module.scss';
import { Button } from '../Button/Button';
import { CrossIcon } from '@/shared/assets/icons/CrossIcon/CrossIcon';
import { Typography } from '../Typography/Typography';

interface PopupProps extends Props {
  title?: string;
}

export const Popup: FC<PopupProps> = ({
  title,
  children,
  onRequestClose,
  ...props
}) => {
  return (
    <ReactModal
      overlayClassName={styles.overlay}
      className={styles.body}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      {...props}
    >
      <Button variant="icon" onClick={onRequestClose} className={styles.close}>
        <CrossIcon />
      </Button>
      {title && (
        <Typography variant="title-2" type="h2" className={styles.title}>
          {title}
        </Typography>
      )}
      {children}
    </ReactModal>
  );
};
