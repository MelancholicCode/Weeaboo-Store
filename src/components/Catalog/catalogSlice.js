import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsLoadingStatus: 'idle',
  isCatalogOver: false
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
      state.products = action.payload;
    },
    catalogFetchingError: state => {
      state.productsLoadingStatus = 'error';
    },
    addNewProducts: (state, action) => {
      if (action.payload.length < 20) {
        state.isCatalogOver = true;
      }
      state.products = [...state.products, ...action.payload];
    },
    resetCatalog: state => {
      state.isCatalogOver = false;
    }
  }
})

export const {actions, reducer} = catalog;
export default reducer;
export const {
  catalogFetching,
  catalogFetched,
  catalogFetchingError,
  addNewProducts,
  resetCatalog
} = actions;

export const fetchProducts = (request) => (dispatch) => {
  dispatch(catalogFetching());
  request('http://localhost:3001/products?_page=1&_limit=20')
    .then(data => dispatch(catalogFetched(data)))
    .catch(() => dispatch(catalogFetchingError()));
}

export const fetchNewProducts = (request, page) => (dispatch) => {
  request(`http://localhost:3001/products?_page=${page}&_limit=20`)
    .then(data => dispatch(addNewProducts(data)))
    .catch(err => console.error(err));
}