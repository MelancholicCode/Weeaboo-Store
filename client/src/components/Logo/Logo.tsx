import Link from 'next/link';
import styles from './Logo.module.scss';
import { routes } from '@/constants/routes';
import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';

export const Logo = () => {
  return (
    <Link href={routes.publicRoutes.HOME} className={styles.logo}>
      <LogoIcon />
      <span className={styles.logo_text}>Weeaboo Store</span>
    </Link>
  );
};
