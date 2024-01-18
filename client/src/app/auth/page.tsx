import { Metadata } from 'next';
import { AuthForm } from '@/components/AuthForm/AuthForm';
import { SEO_TITLE } from '@/shared/constants/seo';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: `Authorization | ${SEO_TITLE}`,
  description: "The user's authorization page.",
};

const AuthPage = () => {
  return (
    <main className="page-container">
      <AuthForm className={styles.form} />
    </main>
  );
};

export default AuthPage;
