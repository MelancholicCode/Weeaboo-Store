import { AuthForm } from '@/components/AuthForm/AuthForm';
import styles from './page.module.scss';

const AuthPage = () => {
  return (
    <main className="page-container">
      <AuthForm className={styles.form} />
    </main>
  );
};

export default AuthPage;
