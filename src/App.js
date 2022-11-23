import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from "./pages/Cart/Cart";
import ProductPage from "./pages/ProductPage/ProductPage";
import { useEffect } from "react";
import { getAccess, setModal } from "./components/Form/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "./pages/Cart/cartSlice";
import { getAccessToken, getUser } from "./utils/auth";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import { fetchFavourites } from "./pages/FavouritesPage/favouritesSlice";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";

function App() {
  const dispatch = useDispatch();
  const {signedIn} = useSelector(state => state.auth);

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
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={
            <CatalogPage/>
          }/>
            <Route path="/favourites" element={
            <FavouritesPage/>
          }/>
          <Route path="/cart" element={
            <Cart/>
          }/>
          <Route path="/catalog/:slug" element={<ProductPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
