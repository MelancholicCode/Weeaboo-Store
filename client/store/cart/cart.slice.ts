import CartService from '@/services/cart/cart.service';
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { ICartItem } from '@/shared/types/cart.interface';
import { LoadingStatesEnum } from '../store.types';

interface CartSliceState {
  loading: LoadingStatesEnum;
  items: ICartItem[];
  error: SerializedError | null;
}

const internalInitialState: CartSliceState = {
  loading: LoadingStatesEnum.IDLE,
  items: [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: internalInitialState,
  reducers: {
    cartReset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(createCartItem.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(createCartItem.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(changeCartItemQuantity.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(changeCartItemQuantity.fulfilled, (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.loading = LoadingStatesEnum.IDLE;
    });
  },
});

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      return await CartService.getAll();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createCartItem = createAsyncThunk(
  'cart/createCartItem',
  async (productId: number, thunkAPI) => {
    try {
      return await CartService.createItem(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const changeCartItemQuantity = createAsyncThunk(
  'cart/changeCartItemQuantity',
  async ({ id, quantity }: { id: number; quantity: number }, thunkAPI) => {
    try {
      return await CartService.changeQuantity(id, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id: number, thunkAPI) => {
    try {
      await CartService.delete(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const { cartReset } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
