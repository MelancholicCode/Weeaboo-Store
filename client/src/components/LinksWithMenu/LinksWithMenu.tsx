'use client';

import Link from 'next/link';
import { routes } from '@/constants/routes';
import { ProfileIcon } from '@/assets/icons/ProfileIcon/ProfileIcon';
import { AuthIcon } from '@/assets/icons/AuthIcon/AuthIcon';
import styles from './LinksWithMenu.module.scss';
import { CartIcon } from '@/assets/icons/CartIcon/CartIcon';
import { useAppSelector } from '@/store/hooks/hooks';
import { FC } from 'react';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { INavLink } from '@/shared/types/link.interface';

interface LinksWithMenuProps {
  navLinks: INavLink[];
}

export const LinksWithMenu: FC<LinksWithMenuProps> = ({ navLinks }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className={styles.link_buttons}>
        {user ? (
          <>
            <Link className={styles.link_button} href={routes.authUserRoutes.CART}>
              <CartIcon className={styles.icon} />
            </Link>
            <Link className={styles.link_button} href={routes.authUserRoutes.PROFILE}>
              <ProfileIcon className={styles.icon} />
            </Link>
          </>
        ) : (
          <Link className={styles.link_button} href={routes.AUTH}>
            <AuthIcon className={styles.icon} />
          </Link>
        )}
      </div>
      <BurgerMenu navLinks={navLinks} />
    </>
  );
};
