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
    favoritesReset: () => internalInitialState,
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
      throw action.payload;
    });
    builder.addCase(createFavorite.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteFavorite.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export const getFavorites = createAsyncThunk(
  'favorite/getFavorites',
  async (_, thunkAPI) => {
    try {
      return await FavoriteService.getAll();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createFavorite = createAsyncThunk(
  'favorite/createFavorite',
  async (productId: number, thunkAPI) => {
    try {
      return await FavoriteService.createItem(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { favoritesReset } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
