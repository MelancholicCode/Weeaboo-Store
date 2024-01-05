import Link from 'next/link';
import CategoryService from '@/services/category/category.service';
import styles from './Header.module.scss';
import { LinksWithMenu } from '../LinksWithMenu/LinksWithMenu';
import { routes } from '@/constants/routes';
import { Logo } from '../Logo/Logo';

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
          <Logo />
          <nav>
            <ul className={styles.links_list}>
              {navLinks.map(({ text, href }) => (
                <li key={href}>
                  <Link href={href}>{text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <LinksWithMenu navLinks={navLinks} />
        </div>
        <div className={styles.header_bottom}>
          <ul className={styles.category_list}>
            {categories.map((category) => (
              <li key={category.id} className={styles.category_item}>
                <Link href={`${routes.publicRoutes.CATEGORY}/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
