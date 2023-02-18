import { createSlice } from "@reduxjs/toolkit";
import { check, login, newPasswordChange, registration } from "../../http/userAPI";

const initialState = {
  user: {},
  authLoadingStatus: 'idle',
  errorMessage: '',
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
    getUserError: (state, action) => {
      state.authLoadingStatus = 'error';
      state.errorMessage = action.payload;
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
    .catch(({message}) => dispatch(getUserError(message)));
}

export const getAccess = () => (dispatch) => {
  dispatch(() => getUserLoading())
  check()
    .then((user) => {
      dispatch(getUserData(user))
    })
    .catch((err) => {
      console.error(err)
      
      dispatch(setModal(true))
    });
}

export const checkPassword = (email, password, setStage, setErrorMessage) => (dispatch) => {
  dispatch(() => getUserLoading())
  login(email, password)
    .then(() => {
      setStage(2);
      setErrorMessage('')
    })
    .catch(({message}) => setErrorMessage(message));
}

export const changePassword = (password, setStage, setErrorMessage) => (dispatch) => {
  dispatch(() => getUserLoading())
  newPasswordChange(password)
    .then(user => {
      dispatch(getUserData(user));
      setStage(3);
      setErrorMessage('');
    })
    .catch(({message}) => {
      setErrorMessage(message)
    });
}