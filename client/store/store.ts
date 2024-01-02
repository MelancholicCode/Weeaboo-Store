import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from './auth/auth.slice';
import { cartReducer as cart } from './cart/cart.slice';

const combinedReducers = combineReducers({
  auth,
  cart,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
  });
