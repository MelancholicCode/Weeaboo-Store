import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import ProductPage from "./pages/ProductPage/ProductPage";
import Modal from "./components/Modal/Modal";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import Menu from "./components/Menu/Menu";
import AccountPage from "./pages/AccountPage/AccountPage";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders";
import Form from "./components/Form/Form";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccess, setModal } from "./components/Form/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "./pages/Cart/cartSlice";
import { fetchFavorites } from "./pages/FavoritesPage/favoritesSlice";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const {signedIn, modal} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAccess());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (signedIn) {
      dispatch(fetchFavorites());
      dispatch(fetchGoods());
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
          header="Меню"/>
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
          <Route path="/favorites" element={<FavoritesPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/account" element={<AccountPage/>}>
            <Route path="profile" element={<Profile/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
          <Route path="/catalog/:slug" element={<ProductPage/>}/>
          <Route path="/404" element={<ErrorPage/>}/>
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
