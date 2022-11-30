import errorImg from '../../assets/img/png/Menhera.png'

import cl from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={`container ${cl.ErrorPage}`}>
      <div className={cl.errorBlock}>
        <p>404 Ничего не найдено</p>
        <div className={cl.errorImg}>
          <img src={errorImg} height="100%" width="100%" alt="Ошибка" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;