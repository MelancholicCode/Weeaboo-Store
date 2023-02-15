import { configureStore } from "@reduxjs/toolkit";
import catalog from "../pages/CatalogPage/catalogSlice";
import cart from "../pages/Cart/cartSlice";
import product from "../pages/ProductPage/productSlice";
import favorites from "../pages/FavoritesPage/favoritesSlice";
import orders from "../pages/AccountPage/ordersSlice";

import auth from "../components/Form/authSlice";

const store = configureStore({
  reducer: {
    auth,
    catalog,
    cart,
    product,
    favorites,
    orders
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;