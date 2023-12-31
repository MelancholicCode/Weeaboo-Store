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

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthSliceState {
  loading: AuthStates;
  user: IUser | null;
  error: SerializedError | null;
}

const internalInitialState: AuthSliceState = {
  loading: AuthStates.IDLE,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(authLogin.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(authRegistration.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authRegistration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(authRegistration.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(authLogout.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authLogout.fulfilled, () => internalInitialState);
  },
});

export const getMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    return await AuthService.getMe();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const authRegistration = createAsyncThunk(
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

export const authLogin = createAsyncThunk(
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

export const authLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await AuthService.logout();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
