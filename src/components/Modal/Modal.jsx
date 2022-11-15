import Close from '../../assets/img/svg/Close';
import cl from './Modal.module.css';

const Modal = ({modal, setModal}) => {

  return (
    <div
      onClick={() => setModal(false)}
      className={`${cl.modal} ${modal ? cl.active : null}`}>
      <div
        onClick={e => e.stopPropagation()}
        className={cl.modalContent}>
        <div
          className={cl.closeBtn}>
          <Close
            setModal={setModal}/>
        </div>
        <div className={cl.authBtns}>
          <div className={cl.signInBtn}>Вход</div>
          <div className={cl.signUpBtn}>Регистрация</div>
        </div>
        <form className={cl.authForm}>
          <label className={cl.authLabel} htmlFor='email'>Почта *</label>
          <input className={cl.authInput} id='email' name='email' type='email' />
          <label className={cl.authLabel} htmlFor='password'>Пароль *</label>
          <input className={cl.authInput} id='password' name='password' type='password' />
          <button className={cl.submitBtn} type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;