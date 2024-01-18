'use client';

import { FC, useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { Logo } from '../Logo/Logo';
import Link from 'next/link';
import { INavLink } from '@/shared/types/link.interface';
import { Typography } from '@/shared/components/Typography/Typography';
import { useAppSelector } from '@/store/hooks/hooks';
import { routes } from '@/shared/constants/routes';

interface BurgerMenuProps {
  navLinks: INavLink[];
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ navLinks }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpened, setIsOpened] = useState(false);

  const authLinks = user
    ? [
        { text: 'Profile', href: routes.authUserRoutes.PROFILE },
        { text: 'Cart', href: routes.authUserRoutes.CART },
      ]
    : [{ text: 'Login', href: routes.AUTH }];

  return (
    <>
      <span className={styles.button} onClick={() => setIsOpened(true)}>
        <span></span>
      </span>

      {isOpened && (
        <div className={styles.modal} onClick={() => setIsOpened(false)}>
          <div
            onClick={(event) => event.stopPropagation()}
            className={styles.modal_body}
          >
            <div className={styles.header}>
              <Logo />
              <span
                className={styles.close}
                onClick={() => setIsOpened(false)}
              ></span>
            </div>

            <ul>
              {[...authLinks, ...navLinks].map(({ text, href }) => (
                <li key={href}>
                  <Link
                    className={styles.link}
                    href={href}
                    onClick={() => setIsOpened(false)}
                  >
                    <Typography variant="title-2">{text}</Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
