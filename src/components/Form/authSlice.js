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
      state.signedIn = true;
      state.authLoadingStatus = 'idle';
    },
    getUserError: state => {
      state.authLoadingStatus = 'error';
      state.signedIn = false;
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
  closeAccess,
  setAuthIdleStatus
} = actions;

export const authUser = (request, user, route) => (dispatch) => {
  dispatch(() => getUserLoading())
  request(`http://localhost:3001/${route}`, 'POST', JSON.stringify(user))
    .then(data => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
      dispatch(getUserData(data.user))
    })
    .catch(() => dispatch(getUserError()))
}

export const getAccess = (request, user, accessToken) => (dispatch) => {
  const userId = JSON.parse(user).id

  dispatch(() => getUserLoading())
  request(`http://localhost:3001/600/users/${userId}`, 'GET', null, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(getUserData(user))
    })
    .catch((err) => {
      console.error(err)
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      dispatch(setModal(true))
    });
}