import { createSlice } from "@reduxjs/toolkit";
import { changeGoodCount, createGood, getGoods, removeGood } from "../../http/cartAPI";

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
      state.goodsLoadingStatus = 'error';
    },
    addGoodInState: (state, action) => {
      state.goods.push(action.payload);
    },
    deleteGoodInState: (state, action) => {
      state.goods = state.goods.filter(item => item.id !== action.payload);
    },
    changeCountInState: (state, action) => {
      state.goods = state.goods.map(item => {
        if (item.id === action.payload.goodId) {
          item.count = action.payload.count;
          return item;
        }
        return item;
      })
    },
    clearCart: state => {
      state.goods = []
    },
    setCartIdleStatus: state => {
      state.goodsLoadingStatus = 'idle';
    }
  }
});

export const {actions, reducer} = cartSlice;

export default reducer;
export const {
  cartFetching,
  cartFetched,
  cartFetchingError,
  addGoodInState,
  deleteGoodInState,
  changeCountInState,
  clearCart,
  setCartIdleStatus,
} = actions;

export const fetchGoods = () => (dispatch) => {
  dispatch(cartFetching());
  getGoods()
    .then((goods) => {
      dispatch(cartFetched(goods))
    })
    .catch((err) => {
      console.log(err)
    });
}

export const addGood = (productId) => (dispatch) => {
  createGood(productId)
    .then(product => {
      console.log(product)
      dispatch(addGoodInState(product))})
    .catch((err) => {
      console.log(err)
    });
}

export const deleteGood = (goodId) => (dispatch) => {
  removeGood(goodId)
    .then(() => dispatch(deleteGoodInState(goodId)))
    .catch((err) => {
      console.log(err)
    });
}

export const changeCount = (goodId, count) => (dispatch) => {
  changeGoodCount(goodId, count)
    .then(() => {
      console.log(goodId)
      dispatch(changeCountInState({goodId, count}))
    })
    .catch((err) => {
      console.log(err);
    });
}