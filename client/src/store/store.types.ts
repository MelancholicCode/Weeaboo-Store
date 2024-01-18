import { makeStore } from './store';

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export enum LoadingStatesEnum {
  IDLE = 'idle',
  LOADING = 'loading',
}
