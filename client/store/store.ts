import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from './auth/auth.slice';
import { cartReducer as cart } from './cart/cart.slice';
import { favoriteReducer as favorite } from './favorite/favorite.slice';

const combinedReducers = combineReducers({
  auth,
  cart,
  favorite,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
  });
