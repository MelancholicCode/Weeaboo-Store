'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Form } from '@/shared/components/Form/Form';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { routes } from '@/shared/constants/routes';
import { Typography } from '@/shared/components/Typography/Typography';
import { useAppDispatch } from '@/store/hooks/hooks';
import { login, registration } from '@/store/auth/auth.slice';
import { getCartItems } from '@/store/cart/cart.slice';
import { getFavorites } from '@/store/favorite/favorite.slice';
import { getOrders } from '@/store/order/order.slice';
import { getMyReviews } from '@/store/review/review.slice';
import styles from './AuthForm.module.scss';
import { Field } from '../../shared/components/Field/Field';

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

      dispatch(getCartItems()).catch(console.error);
      dispatch(getFavorites()).catch(console.error);
      dispatch(getOrders()).catch(console.error);
      dispatch(getMyReviews()).catch(console.error);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  return (
    <Form className={clsx(styles.form, [className])} onSubmit={handleSubmit}>
      <div className={styles.auth_buttons}>
        <div className={styles.auth_button_wrapper}>
          <Button
            className={clsx(styles.auth_button, {
              [styles.auth_button_active]: isLogin,
            })}
            type="button"
            onClick={() => setIsLogin(true)}
            variant="text"
          >
            Login
          </Button>
        </div>

        <div className={styles.auth_button_wrapper}>
          <Button
            onClick={() => setIsLogin(false)}
            className={clsx(styles.auth_button, {
              [styles.auth_button_active]: !isLogin,
            })}
            type="button"
            variant="text"
          >
            Registration
          </Button>
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
          <Field>
            <label htmlFor="name">Name</label>
            <Input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              name="name"
              id="name"
            />
          </Field>

          <Field>
            <label htmlFor="surname">Surname</label>
            <Input
              required
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              type="text"
              name="surname"
              id="surname"
            />
          </Field>

          <Field>
            <label htmlFor="address">Address</label>
            <Input
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              name="address"
              id="address"
            />
          </Field>
        </>
      )}

      <Field>
        <label htmlFor="email">Email</label>
        <Input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          name="email"
          id="email"
        />
      </Field>

      <Field>
        <label htmlFor="password">Password</label>
        <Input
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          name="password"
          id="password"
        />
      </Field>

      {!isLogin && (
        <Field>
          <label htmlFor="second-password">Second password</label>
          <Input
            required
            value={secondPassword}
            onChange={(event) => setSecondPassword(event.target.value)}
            type="password"
            name="second-password"
            id="second-password"
          />
        </Field>
      )}

      <Field>
        <Button type="submit">Submit</Button>
      </Field>
    </Form>
  );
};
