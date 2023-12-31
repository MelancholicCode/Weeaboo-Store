'use client';

import { Button } from '@/shared/components/Button/Button';
import { Typography } from '@/shared/components/Typography/Typography';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import Image from 'next/image';
import styles from './AccountMenu.module.scss';
import { authLogout } from '@/store/auth/auth.slice';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/routes';

const AccountMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(authLogout());
      router.push(routes.publicRoutes.CATALOG);
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        width={200}
        height={200}
        src={user.avatar}
        alt="User avatar"
      />
      <Typography variant="body-2" className={styles.fullname}>
        {user.name} {user.surname}
      </Typography>
      <Typography variant="body-1">Email: {user.email}</Typography>
      <Typography variant="body-1">Address: {user.address}</Typography>
      <Button className={styles.button}>Admin panel</Button>
      <Button className={styles.button}>Check orders</Button>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  ) : null;
};

export default AccountMenu;
