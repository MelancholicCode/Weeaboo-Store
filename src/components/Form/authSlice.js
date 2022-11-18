import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const authUser = (user, route) => (dispatch) => {
  dispatch(() => getUserLoading())
  axios.post(`http://localhost:3001/${route}`, user)
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(getUserData(res.data.user))
    })
    .catch(() => dispatch(getUserError()))
}

export const getAccess = (user, accessToken) => (dispatch) => {
  const userId = JSON.parse(user).id

  dispatch(() => getUserLoading())
  axios.get(`http://localhost:3001/600/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data))
      dispatch(getUserData(res.data))
    })
    .catch((err) => {
      console.error(err)
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      dispatch(setModal(true))
    });
}