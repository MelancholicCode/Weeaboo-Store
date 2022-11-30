import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { closeAccess } from "../../components/Form/authSlice";
import { clearCart, deleteGood } from "../Cart/cartSlice";

const initialState = {
  orders: [],
  ordersLoadingStatus: 'idle'
}

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersFetching: state => {
      state.ordersLoadingStatus = 'loading';
    },
    ordersFetched: (state, action) => {
      state.ordersLoadingStatus = 'idle';
      state.orders = action.payload;
    },
    ordersFetchingError: state => {
      state.ordersLoadingStatus = 'error';
    },
    setOrdersIdleStatus: state => {
      state.ordersLoadingStatus = 'idle';
    },
    addOrderInState: (state, action) => {
      state.orders.push(action.payload);
    },
    clearOrders: state => {
      state.orders = [];
    }
  }
})

const {actions, reducer} = orders;

export default reducer;
export const {
  ordersFetching,
  ordersFetched,
  ordersFetchingError,
  setOrdersIdleStatus,
  addOrderInState,
  clearOrders
} = actions;

export const fetchOrders = (userId, accessToken) => (dispatch) => {
  dispatch(ordersFetching());
  axios.get(`http://localhost:3001/600/orders?userId=${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
    .then(({data}) => {
      dispatch(ordersFetched(data))
    })
    .catch((err) => {
      switch (err.request.status) {
        case 403:
          dispatch(setOrdersIdleStatus())
          break;
        case 401:
          dispatch(closeAccess());
          break;
        default:
          console.log('Что-то пошло не так')
      }
    });
}

export const addOrder = (order, userId, accessToken, goodsIds, onThanksModal) => (dispatch) => {
  axios.post('http://localhost:3001/600/orders', {...order, userId}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(({data}) => {
      dispatch(addOrderInState(data));
      dispatch(clearCart());
      goodsIds.forEach(id => dispatch(deleteGood(id, accessToken)));
      onThanksModal(true);
    })
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