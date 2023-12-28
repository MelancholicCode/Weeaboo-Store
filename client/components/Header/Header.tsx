import Link from 'next/link';
import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import CategoryService from '@/services/category/category.service';
import styles from './Header.module.scss';
import { AccountButtons } from '../AccountButtons/AccountButtons';
import { routes } from '@/constants/routes';

export const Header = async () => {
  const navLinks = [
    { text: 'Home', href: routes.publicRoutes.HOME },
    { text: 'Catalog', href: routes.publicRoutes.CATALOG },
    { text: 'Gallery', href: routes.publicRoutes.GALLERY },
  ];

  const categories = await CategoryService.getAll();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header_top}>
          <Link href={routes.publicRoutes.HOME} className={styles.logo}>
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
          <AccountButtons />
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
