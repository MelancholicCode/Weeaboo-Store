import { configureStore } from "@reduxjs/toolkit";
import catalog from "../components/Catalog/catalogSlice";
import cart from "../pages/Cart/cartSlice";
import product from "../pages/ProductPage/productSlice";

import auth from "../components/Form/authSlice";

const store = configureStore({
  reducer: {
    auth,
    catalog,
    cart,
    product
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;