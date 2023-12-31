import AccountMenu from '@/components/AccountMenu/AccountMenu';
import styles from './page.module.scss';

const ProfilePage = () => {
  return (
    <main className={`container ${styles.container}`}>
      <AccountMenu />
    </main>
  );
};

export default ProfilePage;
