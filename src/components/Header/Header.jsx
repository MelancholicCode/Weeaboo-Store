import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeAccess, setModal } from '../Form/authSlice';
import { clearCart } from '../../pages/Cart/cartSlice';
import Search from '../Search/Search';

import CartIcon from '../../assets/img/svg/CartIcon';
import BookmarkIcon from '../../assets/img/svg/BookmarkIcon';
import Logo from '../../assets/img/Logo/Logo';
import LogOutIcon from '../../assets/img/svg/LogOutIcon';
import ProfileIcon from '../../assets/img/svg/ProfileIcon';

import cl from './Header.module.css';
import { clearFavorites } from '../../pages/FavoritesPage/favoritesSlice';
import { useEffect } from 'react';
import { clearOrders } from '../../pages/AccountPage/ordersSlice';

const Header = ({menuActive, setMenuActive}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goodsLength = useSelector(state => state.cart.goods.length)
  const {signedIn, modal} = useSelector(state => state.auth);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modal])

  const signOut = () => {
    localStorage.removeItem('token');
    dispatch(closeAccess());
    dispatch(clearCart());
    dispatch(clearOrders());
    dispatch(clearFavorites());
  }

  const onOpenModal = (value) => {
    dispatch(setModal(value))
  }

  const onOpenMenu = () => {
    setMenuActive(true);
    document.body.style.overflow = 'hidden';
  }

  const checkPrivateLink = (route) => {
    if (signedIn) {
      navigate(route)
    } else {
      onOpenModal(true);
    }
  }

  return (
    <header className={cl.Header}>
      <div className={`container ${cl.headerContainer}`}>
        <Link className={cl.logo} to="/">
          <Logo/>
        </Link>
        {/* <Search/> */}
        <div className={cl.headerLinkBtns}>
          {signedIn
            ? <>
              <div
                className={cl.headerBtn}
                onClick={() => checkPrivateLink('/favorites')}>
                <BookmarkIcon
                  color='inherit'/>
              </div>
              <div
                className={`${cl.headerBtn} ${cl.cartBtn}`}
                onClick={() => checkPrivateLink('/cart')}>
                <CartIcon/>
                {signedIn && goodsLength
                  ? <p className={`${cl.count} ${cl.cartCount}`}>{goodsLength}</p>
                  : null}
              </div>
              <div
                onClick={() => checkPrivateLink('/account')}
                className={cl.headerBtn}>
                <ProfileIcon/>
              </div>
              <Link className={cl.headerBtn} to='/' onClick={signOut}>
                <LogOutIcon/>
              </Link>
              </>
            : <div
                onClick={() => onOpenModal(true)}
                className={cl.loginBtn}>
                  Вход
              </div>
            }
        </div>
        <div
            onClick={onOpenMenu}
            className={cl.burgerBtn}>
            <span/>
        </div>
      </div>
    </header>
  );
};

export default Header;