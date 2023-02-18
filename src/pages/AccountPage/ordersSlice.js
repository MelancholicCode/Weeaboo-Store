import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrders } from "../../http/orderAPI";
import { clearCart } from "../Cart/cartSlice";

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

export const fetchOrders = () => (dispatch) => {
  getOrders()
    .then((orders) => {
      dispatch(ordersFetched(orders));
    })
    .catch((err) => {
      console.error(err);
    });
}

export const addOrder = (address, onModal, setShowMessage) => (dispatch) => {
  createOrder(address)
    .then((order) => {
      dispatch(addOrderInState(order));
      dispatch(clearCart());
      setShowMessage(true);
      setTimeout(() => onModal(false), 3000);
    })
    .catch((err) => {
      console.error(err);
    });
}