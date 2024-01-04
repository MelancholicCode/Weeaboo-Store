'use client';

import { FC, FormEvent, useState } from 'react';
import { Form } from '@/shared/components/Form/Form';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/routes';
import { Typography } from '@/shared/components/Typography/Typography';
import { useAppDispatch } from '@/store/hooks/hooks';
import { login, registration } from '@/store/auth/auth.slice';
import { getCartItems } from '@/store/cart/cart.slice';
import { getFavorites } from '@/store/favorite/favorite.slice';
import { getOrders } from '@/store/order/order.slice';
import { getMyReviews } from '@/store/review/review.slice';
import clsx from 'clsx';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  className?: string;
}

export const AuthForm: FC<AuthFormProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isLogin) {
        await dispatch(
          login({
            authData: { email, password },
            push: () => router.push(routes.publicRoutes.CATALOG),
          })
        );
      } else {
        await dispatch(
          registration({
            authData: { email, password, name, surname, address },
            push: () => router.push(routes.publicRoutes.CATALOG),
          })
        );
      }
      await dispatch(getCartItems());
      await dispatch(getFavorites());
      await dispatch(getOrders());
      await dispatch(getMyReviews());
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Form className={clsx(styles.form, [className])} onSubmit={handleSubmit}>
      <div className={styles.auth_buttons}>
        <div className={styles.auth_button_wrapper}>
          <button
            className={clsx(styles.auth_button, {
              [styles.auth_button_active]: isLogin,
            })}
            type="button"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>
        <div className={styles.auth_button_wrapper}>
          <button
            onClick={() => setIsLogin(false)}
            className={clsx(styles.auth_button, {
              [styles.auth_button_active]: !isLogin,
            })}
            type="button"
          >
            Registration
          </button>
        </div>
      </div>
      {error && (
        <div className={styles.field}>
          <Typography className={styles.error} variant="body-1">
            {error.message}
          </Typography>
        </div>
      )}
      {!isLogin && (
        <>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="surname">Surname</label>
            <Input
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              type="text"
              name="surname"
              id="surname"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="address">Address</label>
            <Input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              name="address"
              id="address"
            />
          </div>
        </>
      )}
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          name="password"
          id="password"
        />
      </div>
      {!isLogin && (
        <div className={styles.field}>
          <label htmlFor="second-password">Second password</label>
          <Input
            value={secondPassword}
            onChange={(event) => setSecondPassword(event.target.value)}
            type="password"
            name="second-password"
            id="second-password"
          />
        </div>
      )}
      <Button type="submit">Submit</Button>
    </Form>
  );
};
