import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeAccess, setModal } from '../Form/authSlice';
import { clearCart } from '../../pages/Cart/cartSlice';
import Search from '../Search/Search';

import CartIcon from '../../assets/img/svg/CartIcon';
import BookmarkIcon from '../../assets/img/svg/BookmarkIcon';
import Logo from '../../assets/img/svg/Logo';
import LogOutIcon from '../../assets/img/svg/LogOutIcon';
import ProfileIcon from '../../assets/img/svg/ProfileIcon';

import cl from './Header.module.css';
import { clearFavourites } from '../../pages/FavouritesPage/favouritesSlice';
import { useEffect } from 'react';

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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(closeAccess());
    dispatch(clearCart());
    dispatch(clearFavourites());
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
        <Search/>
        <div className={cl.headerLinkBtns}>
          <div
            className={cl.favourite}
            onClick={() => checkPrivateLink('/favourites')}>
            <BookmarkIcon
              color='inherit'/>
          </div>
          <div
            className={cl.cartBtn}
            onClick={() => checkPrivateLink('/cart')}>
            <CartIcon/>
            {signedIn && goodsLength
              ? <p className={`${cl.count} ${cl.cartCount}`}>{goodsLength}</p>
              : null}
          </div>
          {signedIn
            ? <>
              <div className={cl.profileBtn}>
                <ProfileIcon/>
              </div>
              <Link className={cl.logoutBtn} to='/' onClick={signOut}>
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