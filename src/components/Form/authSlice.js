import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { check, login, registration } from "../../http/userAPI";

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

export const authUser = (isSignUp, email, password, name) => (dispatch) => {
  let comingUser;

  dispatch(() => getUserLoading())
  if (isSignUp) {
    comingUser = registration(name, email, password);
  } else {
    comingUser = login(email, password);
  }
  comingUser
    .then(user => {
      dispatch(getUserData(user))
    })
    .catch(() => dispatch(getUserError()));
}

export const getAccess = () => (dispatch) => {
  dispatch(() => getUserLoading())
  check()
    .then((user) => {
      dispatch(getUserData(user))
    })
    .catch((err) => {
      console.log(err)
      dispatch(setModal(true))
    });
}

export const checkPassword = (userData, setStage, setErrorMessage) => (dispatch) => {
  dispatch(() => getUserLoading())
  axios.post(`http://localhost:3001/login`, userData)
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(getUserData(res.data.user))
      setStage(2);
      setErrorMessage('')
    })
    .catch(() => setErrorMessage('Неправильный пароль'));
}

export const changePassword = (userId, newPassword, accessToken, setStage, setErrorMessage) => (dispatch) => {
  dispatch(() => getUserLoading())
  axios.patch(`http://localhost:3001/users/${userId}`, {password: newPassword}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch(getUserData(res.data));
      setStage(3);
      setErrorMessage('');
    })
    .catch((err) => {
      switch(err) {
        case 400:
          setErrorMessage('Пароль слишком мал')
          break;
        case 401:
          dispatch(closeAccess());
          break;
        default:
          break;
      }
      setErrorMessage('Пароль слишком мал')
    });
}