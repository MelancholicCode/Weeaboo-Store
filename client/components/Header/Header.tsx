import { FC } from 'react';
import Link from 'next/link';
import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import { router } from '../../constants/routes';
import { CartIcon } from '@/assets/icons/CartIcon/CartIcon';
import { AuthIcon } from '@/assets/icons/AuthIcon/AuthIcon';
import CategoryService from '@/services/category/category.service';
import { IUser } from '@/shared/types/user.interface';
import { ProfileIcon } from '@/assets/icons/ProfileIcon/ProfileIcon';
import styles from './Header.module.scss';

interface HeaderProps {
  user: IUser | null;
}

export const Header: FC<HeaderProps> = async ({ user }) => {
  const navLinks = [
    { text: 'Home', href: router.HOME_PAGE },
    { text: 'Catalog', href: router.CATALOG_PAGE },
    { text: 'Gallery', href: router.GALLERY_PAGE },
  ];

  const categories = await CategoryService.getAll();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header_top}>
          <Link href={router.HOME_PAGE} className={styles.logo}>
            <LogoIcon />
            <span className={styles.logo_text}>Weeaboo Store</span>
          </Link>
          <nav>
            <ul className={styles.links_list}>
              {navLinks.map(({ text, href }) => (
                <li key={href}>
                  <Link href={href}>{text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.account_buttons}>
            <Link href={router.CART_PAGE}>
              <CartIcon className={styles.icon} />
            </Link>
            {user ? (
              <Link className={styles.link} href={router.ACCOUNT_PAGE}>
                <ProfileIcon className={styles.icon} />
              </Link>
            ) : (
              <Link href={router.AUTH_PAGE} className={styles.link}>
                <AuthIcon className={styles.icon} />
              </Link>
            )}
          </div>
        </div>
        <div className={styles.header_bottom}>
          <ul className={styles.category_list}>
            {categories.map((category) => (
              <li key={category.id} className={styles.category_item}>
                <Link href={category.slug}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
