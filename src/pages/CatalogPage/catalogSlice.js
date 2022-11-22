import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calcPages } from "../../utils/pages";

const initialState = {
  products: [],
  productsLoadingStatus: 'idle',
  catalogPages: 0
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
    },
    setCatalogPages: (state, action) => {
      state.catalogPages = action.payload;
    }
  }
})

export const {actions, reducer} = catalog;
export default reducer;
export const {
  catalogFetching,
  catalogFetched,
  catalogFetchingError,
  clearCatalog,
  setCatalogPages
} = actions;

export const fetchProducts = (page, limit) => (dispatch) => {
  dispatch(catalogFetching());
  axios.get(`http://localhost:3001/444/products?_page=${page}&_limit=${limit}`)
    .then(res => {
      console.log(res)
      dispatch(setCatalogPages(calcPages(res, limit)));
      dispatch(catalogFetched(res.data));
    })
    .catch(() => dispatch(catalogFetchingError()));
}