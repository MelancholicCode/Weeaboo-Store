import Link from 'next/link';
import { Logo } from '@/assets/icons/Logo/Logo';
import {
  ACCOUNT_PAGE,
  CART_PAGE,
  CATALOG_PAGE,
  GALLERY_PAGE,
  HOME_PAGE,
} from '../../constants/routes';
import { getCategories } from '@/utils/api/category';

export const Header = async () => {
  const navLinks = [HOME_PAGE, CATALOG_PAGE, GALLERY_PAGE];
  const categories = await getCategories();

  return (
    <header className="shadow-md">
      <div className="container m-auto flex flex-col items-center px-4">
        <div className="flex w-full items-center justify-between pb-2 pt-3">
          <Link href={HOME_PAGE.href} className="flex items-center">
            <Logo />
            <span className="text-xl font-bold">Weeaboo Store</span>
          </Link>
          <nav>
            <ul className="flex gap-4">
              {navLinks.map(({ href, text }) => (
                <li key={href}>
                  <Link href={href}>{text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-4">
            <Link href={CART_PAGE.href}>{CART_PAGE.text}</Link>
            <Link href={ACCOUNT_PAGE.href}>{ACCOUNT_PAGE.text}</Link>
          </div>
        </div>
        <div className="w-full border-t pb-3 pt-2">
          <ul className="flex w-full items-center divide-x divide-solid">
            {categories.map((category) => (
              <li key={category.id} className="flex-1 px-2 text-center">
                <Link href={category.slug}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
