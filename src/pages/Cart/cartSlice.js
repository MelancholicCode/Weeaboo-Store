import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goods: [],
  goodsLoadingStatus: 'idle'
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartFetching: state => {
      state.goodsLoadingStatus = 'loading';
    },
    cartFetched: (state, action) => {
      state.goodsLoadingStatus = 'idle';
      state.goods = action.payload;
    },
    cartFetchingError: state => {
      state.goodsLoadingStatus = 'loading';
    },
    deleteGood: (state, action) => {
      state.goods = state.goods.filter(item => item.id !== action.payload);
    },
    changeCount: (state, action) => {
      state.goods.forEach(item => {
        if (item.id === action.payload.id) {
          item.count = action.payload.count;
        }
      });
    }
  }
});

export const {actions, reducer} = cartSlice;

export default reducer;
export const {
  cartFetching,
  cartFetched,
  cartFetchingError,
  deleteGood,
  changeCount
} = actions;

export const fetchGoods = (request) => (dispatch) => {
  dispatch(cartFetching());
  request('http://localhost:3001/cart')
    .then(data => dispatch(cartFetched(data)))
    .catch(() => dispatch(cartFetchingError()));
}