import Link from 'next/link';
import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import { router } from '../../constants/routes';
import { CartIcon } from '@/assets/icons/CartIcon/CartIcon';
import { AuthIcon } from '@/assets/icons/AuthIcon/AuthIcon';

export const Header = async () => {
  const navLinks = [router.HOME_PAGE, router.CATALOG_PAGE, router.GALLERY_PAGE];

  return (
    <header className="shadow-md">
      <div className="container m-auto flex flex-col items-center px-4">
        <div className="flex w-full items-center justify-between pb-2 pt-3">
          <Link href={router.HOME_PAGE.href} className="flex items-center">
            <LogoIcon />
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
          <div className="flex items-center gap-4">
            <Link href={router.CART_PAGE.href}>
              <CartIcon className="h-6 w-6" />
            </Link>
            <button>
              <AuthIcon className="h-6 w-6" />
            </button>
            <Link
              className="block h-fit w-fit p-2"
              href={router.ACCOUNT_PAGE.href}
            >
              <AuthIcon />
            </Link>
          </div>
        </div>
        <div className="w-full border-t pb-3 pt-2">
          <ul className="flex w-full items-center divide-x divide-solid">
            {/* {categories.map((category) => (
              <li key={category.id} className="flex-1 px-2 text-center">
                <Link href={category.slug}>{category.name}</Link>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </header>
  );
};
