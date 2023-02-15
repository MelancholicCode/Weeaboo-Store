import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet, useMatch } from 'react-router-dom';
import cl from './AccountPage.module.css';

const AccountPage = () => {
  const isMenuActive = useMatch('/account');
  const isMobileOrTablet = useMediaQuery({maxWidth: '768px'});
  let optionsListClasses = cl.optionsList;

  if (isMobileOrTablet) {
    if (!isMenuActive) {
      optionsListClasses = 'hide';
    }
  }

  const {signedIn} = useSelector(state => state.auth);
  const links = [
    {
      name: 'Мой профиль',
      path: '/profile'
    },
    {
      name: 'История заказов',
      path: '/orders'
    }
  ]

  if (!signedIn) {
    return (
      <div className={`container ${cl.AccountPage}`}>
        <p className="emptyPage">Войдите в аккаунт, чтобы просмотреть информацию</p>
      </div>
    )
  }

  return (
    <div className={`container ${cl.AccountPage}`}>
      <div className={cl.accountWrapper}>
        <ul className={optionsListClasses}>
          {links.map(link => (
            <li key={link.path} className={cl.optionsListItem}>
              <Link
                className={cl.optionsLink}
                to={`/account${link.path}`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={isMenuActive ? 'hide' : cl.rightBlock}>
          <Link to='/account' className={isMobileOrTablet ? cl.returnBtn : 'hide'}>В меню</Link>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;