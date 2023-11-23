import Link from 'next/link';
import { Logo } from '@/assets/icons/Logo/Logo';

export const Header = () => {
  const navLinks = [
    {
      href: '/home',
      text: 'Home',
    },
    {
      href: '/catalog',
      text: 'Catalog',
    },
    {
      href: '/gallery',
      text: 'Gallery',
    },
  ];

  return (
    <header className="border-solid px-4 py-3 shadow-md">
      <div className="container m-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
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
          <Link href="/cart">Cart</Link>
          <Link href="/account">Personal page</Link>
        </div>
      </div>
    </header>
  );
};
