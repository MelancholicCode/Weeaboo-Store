import { Link } from 'react-router-dom';

import Logo from '../../assets/img/Logo/Logo';
import Cart from '../../assets/img/svg/Cart';
import Search from '../Search/Search';

import cl from './Header.module.css';
import Bookmark from '../../assets/img/svg/Bookmark';
import { useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAccess, getAccess, setModal } from '../Form/authSlice';
import LogOutIcon from '../../assets/img/svg/LogOutIcon';
import ProfileIcon from '../../assets/img/svg/ProfileIcon';

const Header = () => {
  const dispatch = useDispatch();
  const {signedIn, modal} = useSelector(state => state.auth);

  console.log(modal)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getAccess());
    }
    if (signedIn) {
      dispatch(setModal(false));
    }
    // eslint-disable-next-line
  }, [signedIn]);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    dispatch(closeAccess());
  }

  const onOpenModal = (value) => {
    dispatch(setModal(value))
  }

  return (
    <header className={cl.Header}>
      <Modal
        modal={modal}
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
                <div className={cl.logoutBtn} onClick={signOut}>
                  <LogOutIcon/>
                </div>
              </>
            : <div
                onClick={() => onOpenModal(true)}
                className={cl.loginBtn}>Вход</div>
            }
        </div>
      </div>
    </header>
  );
};

export default Header;