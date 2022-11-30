import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Cart from "./pages/Cart/Cart";
import CartIcon from "./assets/img/svg/CartIcon";
import ProductPage from "./pages/ProductPage/ProductPage";
import Modal from "./components/Modal/Modal";
import { useEffect, useState } from "react";
import { getAccess, setModal } from "./components/Form/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "./pages/Cart/cartSlice";
import { getAccessToken, getUser } from "./utils/auth";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import { fetchFavourites } from "./pages/FavouritesPage/favouritesSlice";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
import Menu from "./components/Menu/Menu";
import ProfileIcon from "./assets/img/svg/ProfileIcon";
import BookmarkIcon from "./assets/img/svg/BookmarkIcon";
import AccountPage from "./pages/AccountPage/AccountPage";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders";
import Form from "./components/Form/Form";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const {signedIn, modal} = useSelector(state => state.auth);
  const menuItems = [
    {
      title: 'Профиль',
      path: '/account/profile',
      icon: <ProfileIcon/>
    },
    {
      title: 'Корзина',
      path: '/cart',
      icon: <CartIcon/>
    },
    {
      title: 'Избранное',
      path: '/favourites',
      icon: <BookmarkIcon/>
    }
  ]

  const user = getUser();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (user && accessToken) {
      dispatch(getAccess(user.id, accessToken));
    } else {
      dispatch(setModal(true));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (signedIn) {
      dispatch(fetchFavourites(user.id, accessToken));
      dispatch(fetchGoods(user.id, accessToken));
      dispatch(setModal(false));
    }
    // eslint-disable-next-line
  }, [dispatch, signedIn])

  const onOpenModal = (value) => {
    dispatch(setModal(value));
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <Menu
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          header="Меню"
          items={menuItems}/>
        <Modal
          setModal={onOpenModal}
          modal={modal}>
          <Form/>
        </Modal>
        <Header
          menuActive={menuActive}
          setMenuActive={setMenuActive}/>
        <Routes>
          <Route path="/" element={<CatalogPage/>}/>
          <Route path="/favourites" element={<FavouritesPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/account" element={<AccountPage/>}>
            <Route path="profile" element={<Profile/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
          <Route path="/catalog/:slug" element={<ProductPage/>}/>
          <Route
            path="*"
            element={<Navigate to="/404" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
