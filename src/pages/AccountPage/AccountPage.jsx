import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import cl from './AccountPage.module.css';

const AccountPage = () => {
  const {signedIn} = useSelector(state => state.auth);
  const links = [
    {
      title: 'Мой профиль',
      path: '/profile'
    },
    {
      title: 'История заказов',
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
        <ul className={cl.optionsList}>
          {links.map(link => (
            <li key={link.path} className={cl.optionsListItem}>
              <Link
                className={cl.optionsLink}
                to={`/account${link.path}`}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className={cl.rightBlock}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;