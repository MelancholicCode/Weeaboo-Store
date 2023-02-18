import cl from './OrdersItem.module.css';

const OrdersItem = ({order, orderItems}) => {
  return (
    <li className={cl.OrdersItem}>
      <p>id заказа: {order.id}</p>
      <p>id товаров: {orderItems.map(item => item.id).join(', ')}</p>
      <p>Цена: {order.generalPrice} ₽</p>
      <p>Общее количество: {orderItems.reduce((acc, cur) => acc + cur.count, 0)}</p>
      <p>Дата покупки: {new Date(order.createdAt).toLocaleString()}</p>
    </li>
  );
};

export default OrdersItem;