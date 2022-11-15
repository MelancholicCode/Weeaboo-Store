import { configureStore } from "@reduxjs/toolkit";
import catalog from "../components/Catalog/catalogSlice";
import cart from "../pages/Cart/cartSlice";
import product from "../pages/ProductPage/productSlice";

const store = configureStore({
  reducer: {
    catalog,
    cart,
    product
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;