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
  cartItems: ICartItem[];
  error: SerializedError | null;
}

const internalInitialState: CartSliceState = {
  loading: LoadingStatesEnum.IDLE,
  cartItems: [],
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
      state.cartItems = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw action.payload;
    });
    builder.addCase(createCartItem.fulfilled, (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    });
    builder.addCase(createCartItem.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(changeCartItemQuantity.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
    builder.addCase(changeCartItemQuantity.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      return await CartService.getAll();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCartItem = createAsyncThunk(
  'cart/createCartItem',
  async (productId: number, thunkAPI) => {
    try {
      return await CartService.createItem(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeCartItemQuantity = createAsyncThunk(
  'cart/changeCartItemQuantity',
  async ({ id, quantity }: { id: number; quantity: number }, thunkAPI) => {
    try {
      return await CartService.changeQuantity(id, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { cartReset } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
