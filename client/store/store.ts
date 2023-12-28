import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from './auth/auth.slice';

const combinedReducers = combineReducers({
  auth,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
