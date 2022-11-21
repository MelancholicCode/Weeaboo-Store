import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeAccess, setModal } from '../Form/authSlice';
import { clearCart } from '../../pages/Cart/cartSlice';
import Search from '../Search/Search';
import Modal from '../Modal/Modal';

import Cart from '../../assets/img/svg/Cart';
import Logo from '../../assets/img/svg/Logo';
import LogOutIcon from '../../assets/img/svg/LogOutIcon';
import ProfileIcon from '../../assets/img/svg/ProfileIcon';
import Bookmark from '../../assets/img/svg/Bookmark';

import cl from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goodsLength = useSelector(state => state.cart.goods.length)
  const {signedIn} = useSelector(state => state.auth);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(closeAccess());
    dispatch(clearCart());
  }

  const onOpenModal = (value) => {
    dispatch(setModal(value))
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
      <Modal
        onOpenModal={onOpenModal}/>
      <div className={`container ${cl.headerContainer}`}>
        <Link to="/">
          <Logo/>
        </Link>
        <Search/>
        <div className={cl.headerLinkBtns}>
          <div
            onClick={() => checkPrivateLink('/favourites')}>
            <Bookmark
              color='inherit'/>
            {signedIn && <p className={`${cl.count} ${cl.favouritesCount}`}>2</p>}
          </div>
          <div
            className={cl.cartBtn}
            onClick={() => checkPrivateLink('/cart')}>
            <Cart/>
            {signedIn && goodsLength
              ? <p className={`${cl.count} ${cl.cartCount}`}>{goodsLength}</p>
              : null}
          </div>
          {signedIn
            ? <>
                <div className={cl.profileBtn}>
                  <ProfileIcon/>
                </div>
                  <Link to='/' className={cl.logoutBtn} onClick={signOut}>
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
      </div>
    </header>
  );
};

export default Header;