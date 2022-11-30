import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../assets/img/spinner/Spinner';
import { clearOrders, fetchOrders } from '../../pages/AccountPage/ordersSlice';
import { getAccessToken, getUser } from '../../utils/auth';
import OrdersItem from '../OrdersItem/OrdersItem';
import cl from './Orders.module.css';

const Orders = () => {
  const {orders, ordersLoadingStatus} = useSelector(state => state.orders);
  const {signedIn} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(clearOrders());
    
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (signedIn) {
      const user = getUser();
      const accessToken = getAccessToken();
      dispatch(fetchOrders(user.id, accessToken));
    }
  }, [dispatch, signedIn])

  console.log(orders)

  if (ordersLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (ordersLoadingStatus === 'error') {
    return <p>Произошла ошибка</p>
  }

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return <p className="emptyPage">Заказы отсутствуют</p>
    }

    const elements = arr.map(item => (
      <OrdersItem
        key={item.id}
        orderId={item.id}
        goodsIds={item.goodsIds}
        generalPrice={item.generalPrice}
        generalCount={item.generalCount}
        date={item.date}
      />
    ));
    return elements.reverse();
  }

  return (
    <div className={cl.Orders}>
      <ul>
        {renderItems(orders)}
      </ul>
    </div>
  );
};

export default Orders;