import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { closeAccess } from "../../components/Form/authSlice";
import { calcPages } from "../../utils/pages";

const initialState = {
  favourites: [],
  favouritesLoadingStatus: 'idle',
  favouritesPages: 0
}

const favourites = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    favouritesFetching: state => {
      state.favouritesLoadingStatus = 'loading';
    },
    favouritesFetched: (state, action) => {
      state.favouritesLoadingStatus = 'idle';
      state.favourites = action.payload;
    },
    favouritesFetchingError: state => {
      state.favouritesLoadingStatus = 'error';
    },
    clearFavourites: state => {
      state.favourites = []
    },
    setFavouritesPages: (state, action) => {
      state.favouritesPages = action.payload;
    },
    setIdleStatus: state => {
      state.favouritesLoadingStatus = 'idle';
    },
    addFavouriteInState: (state, action) => {
      console.log(action.payload)
      state.favourites.push(action.payload);
    },
    deleteFavouriteInState: (state, action) => {
      state.favourites = state.favourites.filter(item => item.id !== action.payload);
    }
  }
})

export const {actions, reducer} = favourites;
export default reducer;
export const {
  favouritesFetching,
  favouritesFetched,
  favouritesFetchingError,
  addFavouriteInState,
  deleteFavouriteInState,
  clearFavourites,
  setFavouritesIdleStatus,
  setFavouritesPages
} = actions;

export const fetchFavourites = (userId, accessToken, page, limit) => (dispatch) => {
  dispatch(favouritesFetching());
  axios.get(`http://localhost:3001/600/favourites?userId=${userId}&_page=${page}&_limit=${limit}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
    .then(res => {
      dispatch(setFavouritesPages(calcPages(res, limit)));
      dispatch(favouritesFetched(res.data))
    })
    .catch(err => {
      console.log(err)
      switch (err.request.status) {
        case 403:
          dispatch(setFavouritesIdleStatus());
          break;
        case 401:
          dispatch(closeAccess());
          break;
        default:
          dispatch(favouritesFetchingError())
      }
    });
}

export const addFavourite = (product, userId, accessToken) => (dispatch) => {
  axios.post('http://localhost:3001/600/favourites', {...product, userId}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(({data}) => dispatch(addFavouriteInState(data)))
    .catch((err) => {
      switch (err.request.status) {
        case 500:
          console.log('Товар уже добавлен')
          break
        case 401:
          dispatch(closeAccess());
          break
        default:
          console.log('Что-то пошло не так')
      }
    });
}

export const deleteFavourite = (favouriteId, accessToken) => (dispatch) => {
  axios.delete(`http://localhost:3001/600/favourites/${favouriteId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(() => dispatch(deleteFavouriteInState(favouriteId)))
    .catch((err) => {
      switch (err.request.status) {
        case 404:
          console.log('Товар не найден')
          break
        case 401:
          dispatch(closeAccess());
          break
        default:
          console.log('Что-то пошло не так')
      }
    });
}