import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../http/productAPI";
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
  dispatch(catalogFetching());
  getProducts(page, limit, query)
    .then(({rows, count}) => {
      dispatch(setCatalogPages(calcPages(count, limit)));
      dispatch(catalogFetched(rows));
    })
    .catch(() => {
      dispatch(catalogFetchingError())});
}