import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  productsLoadingStatus: 'idle'
}

const catalog = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    catalogFetching: state => {
      state.productsLoadingStatus = 'loading';
    },
    catalogFetched: (state, action) => {
      state.productsLoadingStatus = 'idle';
      state.products = [...state.products, ...action.payload];
    },
    catalogFetchingError: state => {
      state.productsLoadingStatus = 'error';
    },
    clearCatalog: state => {
      state.products = [];
    }
  }
})

export const {actions, reducer} = catalog;
export default reducer;
export const {
  catalogFetching,
  catalogFetched,
  catalogFetchingError,
  clearCatalog
} = actions;

export const fetchProducts = (page, limit) => (dispatch) => {
  dispatch(catalogFetching());
  axios.get(`http://localhost:3001/444/products?_page=${page}&_limit=${limit}`)
    .then(res => {
      dispatch(catalogFetched(res.data))
    })
    .catch(() => dispatch(catalogFetchingError()));
}