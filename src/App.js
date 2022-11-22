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

function App() {
  const dispatch = useDispatch();
  const {signedIn} = useSelector(state => state.auth);

  useEffect(() => {
    const user = getUser();
    const accessToken = getAccessToken();
    
    if (user && accessToken) {
      dispatch(getAccess(user.id, accessToken));
    } else {
      dispatch(setModal(true));
    }
  }, [dispatch]);

  useEffect(() => {
    if (signedIn) {
      const userId = getUser().id;
      const accessToken = getAccessToken();

      dispatch(fetchGoods(userId, accessToken));
      dispatch(setModal(false));
    }
  }, [dispatch, signedIn])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={
            <CatalogPage/>
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
