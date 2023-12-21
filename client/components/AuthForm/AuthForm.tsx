'use client';
import Form from '@/shared/components/Form/Form';
import { FC, FormEvent, useState } from 'react';
import clsx from 'clsx';
import styles from './AuthForm.module.scss';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';

interface AuthFormProps {
  className?: string;
}

const AuthForm: FC<AuthFormProps> = ({ className }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      // Login request
    } else {
      if (password === secondPassword) {
        // Registration request
      }
    }
  };

  const handleChangeAuth = (value: boolean) => {
    setEmail('');
    setPassword('');
    setSecondPassword('');
    setIsLogin(value);
  };

  return (
    <Form className={clsx(styles.form, [className])} onSubmit={onSubmit}>
      <div className={styles.auth_buttons}>
        <div className={styles.auth_button_wrapper}>
          <button
            className={clsx(styles.auth_button, {
              [styles.auth_button_active]: isLogin,
            })}
            onClick={() => handleChangeAuth(true)}
          >
            Login
          </button>
        </div>
        <div className={styles.auth_button_wrapper}>
          <button
            className={clsx(styles.auth_button, {
              [styles.auth_button_active]: !isLogin,
            })}
            onClick={() => handleChangeAuth(false)}
          >
            Registration
          </button>
        </div>
      </div>
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

export default AuthForm;
