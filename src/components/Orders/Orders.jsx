import { useSelector } from 'react-redux';
import Spinner from '../../assets/img/spinner/Spinner';
import OrdersItem from '../OrdersItem/OrdersItem';
import cl from './Orders.module.css';

const Orders = () => {
  const {orders, ordersLoadingStatus} = useSelector(state => state.orders);

  if (ordersLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (ordersLoadingStatus === 'error') {
    return <p>Произошла ошибка</p>
  }

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return <p className="emptyPage">Заказы отсутствуют</p>
    }

    const elements = arr.map(({order, orderItems}) => (
      <OrdersItem
        key={order.id}
        order={order}
        orderItems={orderItems}
      />
    ));
    return elements.reverse();
  }

  return (
    <div className={cl.Orders}>
      <ul className={cl.ordersList}>
        {renderItems(orders)}
      </ul>
    </div>
  );
};

export default Orders;