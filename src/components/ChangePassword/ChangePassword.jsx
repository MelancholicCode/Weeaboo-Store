import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUser } from '../../utils/auth';
import { changePassword, checkPassword } from '../Form/authSlice';

import cl from './ChangePassword.module.css';

const ChangePassword = ({stage, setStage, errorMessage, setErrorMessage}) => {
  const {signedIn} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const onChangePassword = (e) => {
    e.preventDefault();
    if (signedIn) {
      const user = getUser();
      const accessToken = getAccessToken();
      if (stage === 1) {
        dispatch(checkPassword({email: user.email, password}, setStage, setErrorMessage));
      } else if (stage === 2) {
        if (newPassword === secondPassword) {
          dispatch(changePassword(user.id, newPassword, accessToken, setStage, setErrorMessage))
          return
        }
        setErrorMessage('Пароли не совпадают');
      }
    }
  }

  return (
    <form
      onSubmit={e => onChangePassword(e)}
      className={cl.passwordForm}>
        {(stage === 2) &&
          <>
            {errorMessage.length ? <p className={cl.errorMessage}>{errorMessage}</p> : null}
            <label className={cl.passwordLabel} htmlFor="newPassword">Введите новый пароль</label>
            <input
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className={cl.passwordInput}
              name="newPassword"
              type="password"
              placeholder='Новый пароль'
              id="newPassword"/>
            <label className={cl.passwordLabel} htmlFor="secondPassword">Введите пароль повторно</label>
            <input
              required
              value={secondPassword}
              onChange={e => setSecondPassword(e.target.value)}
              className={cl.passwordInput}
              name="secondPassword"
              type="password"
              placeholder='Повторите пароль'
              id="secondPassword"/>
          </>}
          {(stage === 1) &&
          <>
            {errorMessage.length ? <p className={cl.errorMessage}>{errorMessage}</p> : null}
            <label className={cl.passwordLabel} htmlFor="firstPassword">Введите пароль</label>
            <input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={cl.passwordInput}
              name="password"
              type="password"
              placeholder='Пароль'
              id="firstPassword"/>
          </>}
      <button type='submit' className={cl.submitBtn}>Продолжить</button>
    </form>
  );
};

export default ChangePassword;