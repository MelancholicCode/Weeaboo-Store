import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAccess, getAccess, setModal } from '../Form/authSlice';
import { useHttp } from '../../hooks/useHttp';
import Logo from '../../assets/img/svg/Logo';
import Cart from '../../assets/img/svg/Cart';
import Search from '../Search/Search';
import Bookmark from '../../assets/img/svg/Bookmark';
import Modal from '../Modal/Modal';
import LogOutIcon from '../../assets/img/svg/LogOutIcon';
import ProfileIcon from '../../assets/img/svg/ProfileIcon';

import cl from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const {signedIn} = useSelector(state => state.auth);
  const {request} = useHttp();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if (user && accessToken) {
      dispatch(getAccess(request, user, accessToken));
    } else {
      dispatch(setModal(true));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (signedIn) {
      dispatch(setModal(false));
    }
    // eslint-disable-next-line
  }, [signedIn])

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(closeAccess());
  }

  const onOpenModal = (value) => {
    dispatch(setModal(value))
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
          <div>
            <Bookmark
              color='inherit'/>
            <p className={`${cl.count} ${cl.favouritesCount}`}>2</p>
          </div>
          <Link className={cl.cartBtn} to="/cart">
            <Cart/>
            <p className={`${cl.count} ${cl.cartCount}`}>3</p>
          </Link>
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