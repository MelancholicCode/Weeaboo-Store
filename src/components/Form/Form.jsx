import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/useHttp'
import { authUser, setAuthIdleStatus } from './authSlice';

import cl from './Form.module.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const {request} = useHttp()
  const {authLoadingStatus} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (isSignUp) {
      const user = {name, email, password};
      dispatch(authUser(request, user, 'signup'));
    } else {
      const  user = {email, password};
      dispatch(authUser(request, user, 'signin'));
    }
    setName('');
    setEmail('');
    setPassword('');
  }

  if (authLoadingStatus === 'error') {
    setTimeout(() => dispatch(setAuthIdleStatus()), 3000);
  }

  return (
    <div>
      <div className={cl.authBtns}>
        <div
          onClick={() => setIsSignUp(false)}
          className={`${cl.signInBtn} ${isSignUp ? null : cl.active}`}>Вход</div>
        <div
          onClick={() => setIsSignUp(true)}
          className={`${cl.signUpBtn} ${isSignUp ? cl.active : null}`}>Регистрация</div>
      </div>
      <form
        onSubmit={onSubmitForm}
        className={cl.authForm}>
        {authLoadingStatus === 'error' &&
          <p className={cl.errorMessage}>Ошибка авторизации</p>}
        {isSignUp &&
          <>
            <label className={cl.authLabel} htmlFor='name'>Имя</label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className={cl.authInput} id='name' name='name' type='text' />
          </>}
        <label className={cl.authLabel} htmlFor='email'>Почта</label>
        <input
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={cl.authInput} id='email' name='email' type='email' />
        <label className={cl.authLabel} htmlFor='password'>Пароль</label>
        <input
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={cl.authInput} id='password' name='password' type='password' />
        <button className={cl.submitBtn} type='submit'>Войти</button>
      </form>
    </div>
  );
};

export default Form;