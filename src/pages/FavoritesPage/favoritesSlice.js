import { createSlice } from "@reduxjs/toolkit";
import { createFavorite, getFavorites, removeFavorite } from "../../http/favoriteAPI";

const initialState = {
  favorites: [],
  favoritesLoadingStatus: 'idle',
}

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoritesFetching: state => {
      state.favoritesLoadingStatus = 'loading';
    },
    favoritesFetched: (state, action) => {
      state.favoritesLoadingStatus = 'idle';
      state.favorites = action.payload;
    },
    favoritesFetchingError: state => {
      state.favoritesLoadingStatus = 'error';
    },
    clearFavorites: state => {
      state.favorites = []
    },
    setFavoritesIdleStatus: state => {
      state.favoritesLoadingStatus = 'idle';
    },
    addFavoriteInState: (state, action) => {
      state.favorites.push(action.payload);
    },
    deleteFavoriteInState: (state, action) => {
      state.favorites = state.favorites.filter(item => item.productId !== action.payload);
    }
  }
})

export const {actions, reducer} = favorites;
export default reducer;
export const {
  favoritesFetching,
  favoritesFetched,
  favoritesFetchingError,
  addFavoriteInState,
  deleteFavoriteInState,
  clearFavorites,
  setFavoritesIdleStatus,
  setFavoritesPages
} = actions;

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesFetching());
  getFavorites()
    .then(favorites => {
      dispatch(favoritesFetched(favorites))
    })
    .catch(err => {
      console.log(err)
    });
}

export const addFavorite = (productId) => (dispatch) => {
  createFavorite(productId)
    .then((favorite) => dispatch(addFavoriteInState(favorite)))
    .catch((err) => {
      console.log(err);
    });
}

export const deleteFavorite = (productId) => (dispatch) => {
  removeFavorite(productId)
    .then(() => dispatch(deleteFavoriteInState(productId)))
    .catch((err) => {
      console.log(err)
    });
}