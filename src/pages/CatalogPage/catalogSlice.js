import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calcPages } from "../../utils/pages";

const initialState = {
  products: [],
  productsLoadingStatus: 'idle',
  catalogPages: null,
  searchQuery: ''
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
      console.log(state.products)
      state.products = [];
    },
    setCatalogPages: (state, action) => {
      state.catalogPages = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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
  setCatalogPages,
  setSearchQuery
} = actions;

export const fetchProducts = (page, limit, query) => (dispatch) => {
  let searchTerm;
  if (query) {
    searchTerm = `&q=${query}`
  }
  dispatch(catalogFetching());
  axios.get(`http://localhost:3001/444/products?_page=${page}&_limit=${limit}${searchTerm}`)
    .then(res => {
      console.log(res, calcPages(res, limit))
      dispatch(setCatalogPages(calcPages(res, limit)));
      dispatch(catalogFetched(res.data));
    })
    .catch(() => dispatch(catalogFetchingError()));
}