import AuthService from '@/services/auth/auth.service';
import {
  AuthTypesEnum,
  ILoginData,
  IRegistrationData,
} from '@/services/auth/auth.types';
import { IUser } from '@/shared/types/user.interface';
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { LoadingStatesEnum } from '../store.types';

interface AuthSliceState {
  loading: LoadingStatesEnum;
  user: IUser | null;
  error: SerializedError | null;
}

const internalInitialState: AuthSliceState = {
  loading: LoadingStatesEnum.IDLE,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    userReset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(login.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(login.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(registration.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = LoadingStatesEnum.IDLE;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = LoadingStatesEnum.LOADING;
    });
    builder.addCase(logout.fulfilled, () => internalInitialState);
  },
});

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    return await AuthService.getMe();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const registration = createAsyncThunk(
  'auth/registration',
  async (
    { authData, push }: { authData: IRegistrationData; push: () => void },
    thunkAPI
  ) => {
    try {
      const user = await AuthService.main(AuthTypesEnum.REGISTRATION, authData);
      push();
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    { authData, push }: { authData: ILoginData; push: () => void },
    thunkAPI
  ) => {
    try {
      const user = await AuthService.main(AuthTypesEnum.LOGIN, authData);
      push();
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await AuthService.logout();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const { userReset } = authSlice.actions;
export const authReducer = authSlice.reducer;
