import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, checkPassword } from '../Form/authSlice';

import cl from './ChangePassword.module.css';

const ChangePassword = ({stage, setStage, errorMessage, setErrorMessage, modal}) => {
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    reset
  } = useForm({mode: 'onBlur'});
  const {signedIn, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!modal) {
      reset();
    }
  }, [modal])

  const onSubmit = ({firstPassword, newPassword, secondPassword}) => {
    if (signedIn) {
      if (stage === 1) {
        dispatch(checkPassword(user.email, firstPassword, setStage, setErrorMessage));
      } else if (stage === 2) {
        if (newPassword === secondPassword) {
          dispatch(changePassword(newPassword, setStage, setErrorMessage))
          return
        }
        setErrorMessage('Пароли не совпадают');
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cl.passwordForm}>
        {(stage === 2) &&
          <>
            {errorMessage.length ? <p className={cl.errorMessage}>{errorMessage}</p> : null}
            <label className={cl.passwordLabel}>Введите новый пароль</label>
            {errors?.newPassword && <p className={cl.authError}>{errors?.newPassword?.message}</p>}
            <input
              {...register('newPassword', {
                required: 'Обязательное поле',
                minLength: {
                  value: 4,
                  message: 'Слишком короткий пароль'
                }
              })}
              className={cl.passwordInput}
              placeholder='Новый пароль'/>
            <label className={cl.passwordLabel}>Введите пароль повторно</label>
            {errors?.secondPassword && <p className={cl.authError}>{errors?.secondPassword?.message}</p>}
            <input
              {...register('secondPassword', {
                required: 'Обязательное поле',
                minLength: {
                  value: 4,
                  message: 'Слишком короткий пароль'
                }
              })}
              className={cl.passwordInput}
              placeholder='Повторите пароль'/>
          </>}
          {(stage === 1) &&
          <>
            {errorMessage.length ? <p className={cl.errorMessage}>{errorMessage}</p> : null}
            <label className={cl.passwordLabel}>Введите пароль</label>
            {errors?.firstPassword && <p className={cl.authError}>{errors?.firstPassword?.message}</p>}
            <input
              {...register('firstPassword', {
                required: 'Обязательное поле',
                minLength: {
                  value: 4,
                  message: 'Слишком короткий пароль'
                }
              })}
              className={cl.passwordInput}
              type="password"
              placeholder='Пароль'/>
          </>}
      <button type='submit' className={cl.submitBtn}>Продолжить</button>
    </form>
  );
};

export default ChangePassword;