import { Link } from 'react-router-dom';

import Logo from '../../assets/img/Logo/Logo';
import Cart from '../../assets/img/svg/Cart';
import Search from '../Search/Search';

import cl from './Header.module.css';
import Bookmark from '../../assets/img/svg/Bookmark';
import { useState } from 'react';
import Modal from '../Modal/Modal';

const Header = () => {
  const [modal, setModal] = useState(false);

  return (
    <header className={cl.Header}>
      <Modal
        modal={modal}
        setModal={setModal}/>
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
          <div
            onClick={() => setModal(true)}
            className={cl.loginBtn}>Вход</div>
        </div>
      </div>
    </header>
  );
};

export default Header;