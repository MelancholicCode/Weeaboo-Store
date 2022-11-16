import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authLoadingStatus: 'idle',
  signedIn: false,
  modal: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserLoading: state => {
      state.authLoadingStatus = 'loading';
    },
    getUserData: (state, action) => {
      state.user = action.payload;
      state.authLoadingStatus = 'idle';
      state.signedIn = true;
    },
    getUserError: state => {
      state.authLoadingStatus = 'error';
    },
    getAccess: state => {
      state.signedIn = true;
    },
    closeAccess: state => {
      state.signedIn = false;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setAuthIdleStatus: state => {
      state.authLoadingStatus = 'idle';
    }
  }
});

const {actions, reducer} = authSlice;

export default reducer;
export const {
  getUserLoading,
  getUserData,
  getUserError,
  setModal,
  getAccess,
  closeAccess,
  setAuthIdleStatus
} = actions;

export const authUser = (request, user, route) => (dispatch) => {
  dispatch(() => getUserLoading())
  request(`http://localhost:3001/${route}`, 'POST', JSON.stringify(user))
    .then(data => {
      localStorage.setItem('accessToken', data.accessToken)
      dispatch(getUserData(data.user))
    })
    .catch(() => dispatch(getUserError()))
}