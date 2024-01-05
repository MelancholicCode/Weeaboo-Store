import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { OrderWithItems } from '@/shared/types/order.interface';
import { LoadingStatesEnum } from '../store.types';
import OrderService from '@/services/order/order.service';

interface FavoriteSliceState {
  loading: LoadingStatesEnum;
  orders: OrderWithItems[];
  error: SerializedError | null;
}

const internalInitialState: FavoriteSliceState = {
  loading: LoadingStatesEnum.IDLE,
  orders: [],
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: internalInitialState,
  reducers: {
    ordersReset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(createOrder.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders = [...state.orders, action.payload];
      state.loading = LoadingStatesEnum.IDLE;
    });
  },
});

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, thunkAPI) => {
    try {
      return await OrderService.getAll();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createOrder = createAsyncThunk(
  'favorite/createOrder',
  async (_, thunkAPI) => {
    try {
      return await OrderService.create();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const { ordersReset } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
