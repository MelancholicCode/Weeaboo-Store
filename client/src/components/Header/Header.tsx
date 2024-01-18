import Link from 'next/link';
import styles from './Header.module.scss';
import { LinksWithMenu } from '../LinksWithMenu/LinksWithMenu';
import { routes } from '@/shared/constants/routes';
import { Logo } from '../Logo/Logo';

export const Header = async () => {
  const navLinks = [
    { text: 'Home', href: routes.publicRoutes.HOME },
    { text: 'Catalog', href: routes.publicRoutes.CATALOG },
    // { text: 'Gallery', href: routes.publicRoutes.GALLERY },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header_content}>
          <Logo />
          <nav>
            <ul className={styles.link_list}>
              {navLinks.map(({ text, href }) => (
                <li key={href} className={styles.link_item}>
                  <Link href={href}>{text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <LinksWithMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
};
