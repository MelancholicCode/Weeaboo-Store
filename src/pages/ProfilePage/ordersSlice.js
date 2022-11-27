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
    addOrderInState: (state, action) => {
      state.orders.push(action.payload);
    }
  }
})

const {actions, reducer} = orders;

export default reducer;
export const {
  addOrderInState
} = actions;

export const addOrder = (order, userId, accessToken, goodsIds) => (dispatch) => {
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