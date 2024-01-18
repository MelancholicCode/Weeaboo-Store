import Link from 'next/link';
import styles from './Logo.module.scss';
import { routes } from '@/shared/constants/routes';
import { LogoIcon } from '@/shared/assets/icons/LogoIcon/LogoIcon';

export const Logo = () => {
  return (
    <Link href={routes.publicRoutes.HOME} className={styles.logo}>
      <LogoIcon className={styles.logo_icon} />
      <span className={styles.logo_text}>Weeaboo Store</span>
    </Link>
  );
};
