import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { IFavorite } from '@/shared/types/favorite.interface';
import { LoadingStatesEnum } from '../store.types';
import FavoriteService from '@/services/favorite/favorite.service';

interface FavoriteSliceState {
  loading: LoadingStatesEnum;
  items: IFavorite[];
  error: SerializedError | null;
}

const internalInitialState: FavoriteSliceState = {
  loading: LoadingStatesEnum.IDLE,
  items: [],
  error: null,
};

const favoriteSlice = createSlice({
  name: 'cart',
  initialState: internalInitialState,
  reducers: {
    favoriteReset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getFavorites.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(getFavorites.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(createFavorite.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(createFavorite.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(deleteFavorite.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.loading = LoadingStatesEnum.IDLE;
    });
  },
});

export const getFavorites = createAsyncThunk(
  'favorite/getFavorites',
  async (_, thunkAPI) => {
    try {
      return await FavoriteService.getAll();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createFavorite = createAsyncThunk(
  'favorite/createFavorite',
  async (productId: number, thunkAPI) => {
    try {
      return await FavoriteService.createItem(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async (id: number, thunkAPI) => {
    try {
      await FavoriteService.delete(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const { favoriteReset } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
