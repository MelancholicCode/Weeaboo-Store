import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { closeAccess } from "../../components/Form/authSlice";

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

export const fetchGoods = (userId, accessToken) => (dispatch) => {
  dispatch(cartFetching());
  axios.get(`http://localhost:3001/600/cart?userId=${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
    .then(({data}) => {
      dispatch(cartFetched(data))
    })
    .catch((err) => {
      switch (err.request.status) {
        case 403:
          dispatch(setCartIdleStatus(true))
          break;
        default:
          console.log('Что-то пошло не так')
      }
    });
}

export const addGood = (product, userId, accessToken) => (dispatch) => {
  axios.post('http://localhost:3001/600/cart', {...product, userId}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(({data}) => dispatch(addGoodInState(data)))
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

export const deleteGood = (goodId, accessToken) => (dispatch) => {
  axios.delete(`http://localhost:3001/600/cart/${goodId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(() => dispatch(deleteGoodInState(goodId)))
    .catch((err) => {
      switch (err.request.status) {
        case 404:
          console.log('Товар не найден: корзина')
          break
        case 401:
          dispatch(closeAccess());
          break
        default:
          console.log('Что-то пошло не так: корзина')
      }
    });
}

export const changeCount = (goodId, count, accessToken) => (dispatch) => {
  axios.patch(`http://localhost:3001/600/cart/${goodId}`, {count}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(() => dispatch(changeCountInState({goodId, count})))
    .catch((err) => {
      switch (err.request.status) {
        case 401:
          dispatch(closeAccess());
          break
        default:
          console.log('Что-то пошло не так')
      }
    });
}