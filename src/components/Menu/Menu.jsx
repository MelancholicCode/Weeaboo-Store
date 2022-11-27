import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Close from '../../assets/img/svg/Close';
import LogOutIcon from '../../assets/img/svg/LogOutIcon';
import { clearCart } from '../../pages/Cart/cartSlice';
import { clearFavourites } from '../../pages/FavouritesPage/favouritesSlice';
import { closeAccess, setModal } from '../Form/authSlice';
import cl from './Menu.module.css';

const Menu = ({header, items, menuActive, setMenuActive}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {signedIn} = useSelector(state => state.auth);
  const goodsLength = useSelector(state => state.cart.goods.length)

  const onCloseMenu = () => {
    setMenuActive(false);
    document.body.style.overflow = '';
  }

  const onOpenModal = () => {
    onCloseMenu();
    dispatch(setModal(true));
  }

  const checkPrivateLink = (route) => {
    if (signedIn) {
      setMenuActive(false);
      document.body.style.overflow = '';
      console.log(route)
      navigate(route)
    } else {
      setMenuActive(false);
      document.body.style.overflow = '';
      dispatch(setModal(true));
    }
  }

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(closeAccess());
    dispatch(clearCart());
    dispatch(clearFavourites());
    onCloseMenu();
  }

  return (
    <div
      onClick={onCloseMenu}
      className={`${cl.Menu} ${menuActive ? cl.active : null}`}>
      <div className={cl.blur}/>
      <div
        onClick={e => e.stopPropagation()}
        className={cl.menuContent}>
        <div
          onClick={onCloseMenu}
          className={cl.closeBtn}>
          <Close/>
        </div>
        <div className={cl.menuHeader}>{header}</div>
        <ul className={cl.menuNavList}>
          {signedIn
            ? <>
              {items.map(item => (
                <li key={item.title} className={cl.menuNavItem}>
                  <div onClick={() => checkPrivateLink(item.path)} className={cl.menuNavLink} to={item.path}>
                    <div className={cl.menuIcon}>
                      {item.icon}
                      {item.path === '/cart' && goodsLength ? <p className={`${cl.count} ${cl.cartCount}`}>{goodsLength}</p> : null}
                    </div>
                    <p className={cl.menuLinkText}>{item.title}</p>
                  </div>
                </li>
              ))}
                <li className={cl.menuNavItem}>
                  <div className={cl.menuNavLink}>
                  <div className={cl.menuIcon}><LogOutIcon/></div>
                    <Link
                      onClick={signOut}
                      to="/"
                      className={cl.menuLinkText}>
                        Выйти
                    </Link>
                  </div>
                </li>
              </>
            : <li className={cl.menuNavItem}>
                <div onClick={onOpenModal} className={cl.menuNavLink}>
                  <p className={cl.menuLinkText}>Вход</p>
                </div>
              </li>}
        </ul>
      </div>
    </div>
  );
};

export default Menu;