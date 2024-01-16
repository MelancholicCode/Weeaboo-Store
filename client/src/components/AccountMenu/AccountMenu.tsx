'use client';

import { Button } from '@/shared/components/Button/Button';
import { Typography } from '@/shared/components/Typography/Typography';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import Image from 'next/image';
import styles from './AccountMenu.module.scss';
import { logout } from '@/store/auth/auth.slice';
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/constants/routes';
import { cartReset } from '@/store/cart/cart.slice';
import { favoritesReset } from '@/store/favorite/favorite.slice';
import { ordersReset } from '@/store/order/order.slice';
import { reviewsReset } from '@/store/review/review.slice';
import { images } from '@/shared/constants/images';
import { Placeholder } from '../../shared/components/Placeholder/Placeholder';
import { LoadingStatesEnum } from '@/store/store.types';
import { RolesEnum } from '@/shared/types/role.interface';

export const AccountMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, error, loading } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(cartReset());
      dispatch(favoritesReset());
      dispatch(ordersReset());
      dispatch(reviewsReset());
      router.push(routes.publicRoutes.CATALOG);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading === LoadingStatesEnum.LOADING) {
    return null; // Return Skeleton
  }

  if (error) {
    return <Placeholder type="error">Something went wrong</Placeholder>;
  }

  return user ? (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        width={200}
        height={200}
        src={user.avatar || images.avatarPlaceholder}
        alt="User avatar"
      />

      <div className={styles.user_info}>
        <Typography variant="body-2" className={styles.fullname}>
          {user.name} {user.surname}
        </Typography>
        <Typography variant="body-1">Email: {user.email}</Typography>
        <Typography variant="body-1">Address: {user.address}</Typography>
      </div>

      <Button
        className={styles.button}
        onClick={() => router.push(routes.authUserRoutes.FAVORITES)}
      >
        Check favorites
      </Button>

      <Button
        className={styles.button}
        onClick={() => router.push(routes.authUserRoutes.ORDERS)}
      >
        Check orders
      </Button>

      {user.roles.some((role) => role.name === RolesEnum.ADMIN) && (
        <>
          <Button
            className={styles.button}
            onClick={() => router.push(routes.adminRoutes.ADMIN_USERS)}
          >
            Users management
          </Button>

          <Button
            className={styles.button}
            onClick={() => router.push(routes.adminRoutes.ADMIN_CATEGORIES)}
          >
            Categories management
          </Button>

          <Button
            className={styles.button}
            onClick={() => router.push(routes.adminRoutes.ADMIN_PRODUCTS)}
          >
            Products management
          </Button>
        </>
      )}

      <Button
        className={styles.button}
        variant="outlined"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  ) : null; // Return Skeleton
};
