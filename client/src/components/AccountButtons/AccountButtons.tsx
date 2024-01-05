'use client';

import Link from 'next/link';
import { routes } from '@/constants/routes';
import { ProfileIcon } from '@/assets/icons/ProfileIcon/ProfileIcon';
import { AuthIcon } from '@/assets/icons/AuthIcon/AuthIcon';
import styles from './AccountButtons.module.scss';
import { CartIcon } from '@/assets/icons/CartIcon/CartIcon';
import { useAppSelector } from '@/store/hooks/hooks';

export const AccountButtons = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.account_buttons}>
      {user ? (
        <>
          <Link href={routes.authUserRoutes.CART}>
            <CartIcon className={styles.icon} />
          </Link>
          <Link className={styles.link} href={routes.authUserRoutes.PROFILE}>
            <ProfileIcon className={styles.icon} />
          </Link>
        </>
      ) : (
        <Link href={routes.AUTH} className={styles.link}>
          <AuthIcon className={styles.icon} />
        </Link>
      )}
    </div>
  );
};
