import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  productLoadingStatus: 'idle'
}

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productFetching: state => {
      state.productLoadingStatus = 'loading';
    },
    productFetched: (state, action) => {
      state.productLoadingStatus = 'idle';
      state.product = action.payload;
    },
    productFetchingError: state => {
      state.productLoadingStatus = 'error';
    },
  }
})

export const {actions, reducer} = product;
export default reducer;
export const {
  productFetching,
  productFetched,
  productFetchingError
} = actions;

export const fetchProduct = (request, productSlug) => (dispatch) => {
  dispatch(productFetching())
  request(`http://localhost:3001/products?slug=${productSlug}`)
    .then(data => dispatch(productFetched(data[0])))
    .catch(() => dispatch(productFetchingError()));
}