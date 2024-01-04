import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { IReview } from '@/shared/types/review.interface';
import { LoadingStatesEnum } from '../store.types';
import ReviewService from '@/services/review/review.service';

interface FavoriteSliceState {
  loading: LoadingStatesEnum;
  reviews: IReview[];
  error: SerializedError | null;
}

const internalInitialState: FavoriteSliceState = {
  loading: LoadingStatesEnum.IDLE,
  reviews: [],
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState: internalInitialState,
  reducers: {
    reviewsReset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMyReviews.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(getMyReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(getMyReviews.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(createReview.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.reviews = [...state.reviews, action.payload];
      state.loading = LoadingStatesEnum.IDLE;
    });
  },
});

export const getMyReviews = createAsyncThunk(
  'review/getMyReviews',
  async (_, thunkAPI) => {
    try {
      return await ReviewService.getMy();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createReview = createAsyncThunk(
  'favorite/createReview',
  async (
    {
      productId,
      rate,
      comment,
    }: { productId: number; rate: number; comment: string },
    thunkAPI
  ) => {
    try {
      return await ReviewService.create(productId, rate, comment);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const { reviewsReset } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;
