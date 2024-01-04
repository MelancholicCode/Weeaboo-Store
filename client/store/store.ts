import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from './auth/auth.slice';
import { cartReducer as cart } from './cart/cart.slice';
import { favoriteReducer as favorite } from './favorite/favorite.slice';
import { orderReducer as order } from './order/order.slice';
import { reviewReducer as review } from './review/review.slice';

const combinedReducers = combineReducers({
  auth,
  cart,
  favorite,
  order,
  review,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
  });
