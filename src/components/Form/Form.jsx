import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../assets/img/spinner/Spinner';
import { authUser, setAuthIdleStatus } from './authSlice';

import cl from './Form.module.css';
import { useEffect } from 'react';

const Form = () => {
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    reset
  } = useForm({mode: 'onBlur'});
  const [isSignUp, setIsSignUp] = useState(false);
  const {authLoadingStatus, errorMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    reset();
  }, [isSignUp]);

  const onSubmit = ({name, email, password}) => {
    if (isSignUp) {
      dispatch(authUser(isSignUp, email, password, name));
    } else {
      dispatch(authUser(isSignUp, email, password));
    }
    reset();
  }

  if (authLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (authLoadingStatus === 'error') {
    setTimeout(() => dispatch(setAuthIdleStatus()), 3000);
  }

  return (
    <>
      <div className={cl.authBtns}>
        <div
          onClick={() => setIsSignUp(false)}
          className={`${cl.signInBtn} ${isSignUp ? null : cl.active}`}>
          Вход
        </div>
        <div
          onClick={() => setIsSignUp(true)}
          className={`${cl.signUpBtn} ${isSignUp ? cl.active : null}`}>
          Регистрация
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cl.authForm}>
        {authLoadingStatus === 'error' &&
          <p className={cl.errorMessage}>{errorMessage}</p>}
        {isSignUp ?
        <>
          {errors?.name && <p className={cl.authError}>{errors?.name?.message}</p>}
          <input
            {...register('name', {
              required: 'Обязательное поле'
            })}
            className={cl.authInput}
            type='text'
            placeholder='Имя'/>
          {errors?.email && <p className={cl.authError}>{errors?.email?.message}</p>}
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный почтовый адрес'
              }
            })}
            className={cl.authInput}
            type='email'
            placeholder='Почта'/>
          {errors?.password && <p className={cl.authError}>{errors?.password?.message}</p>}
          <input
            {...register('password', {
              required: 'Обязательное поле',
              minLength: {
                value: 4,
                message: 'Слишком короткий пароль'
              }
            })}
            className={cl.authInput}
            type='password'
            placeholder='Пароль'/>
        </>
        :
        <>
          {errors?.email && <p className={cl.authError}>{errors?.email?.message}</p>}
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный почтовый адрес'
              }
            })}
            className={cl.authInput}
            type='email'
            placeholder='Почта'/>
          {errors?.password && <p className={cl.authError}>{errors?.password?.message}</p>}
          <input
            {...register('password', {
              required: 'Обязательное поле',
              minLength: {
                value: 4,
                message: 'Слишком короткий пароль'
              }
            })}
            className={cl.authInput}
            type='password'
            placeholder='Пароль'/>
        </>
        }
        <button
          className={cl.submitBtn}
          type='submit'>Войти</button>
      </form>
    </>
  );
};

export default Form;