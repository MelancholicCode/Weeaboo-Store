import cl from './OrdersItem.module.css';

const OrdersItem = ({orderId, goodsIds, generalPrice, generalCount, date}) => {
  return (
    <li className={cl.OrdersItem}>
      <p>id заказа: {orderId}</p>
      <p>id товаров: {goodsIds.join(', ')}</p>
      <p>Цена: {generalPrice} ₽</p>
      <p>Общее количество: {generalCount}</p>
      <p>Дата покупки: {new Date(date).toLocaleString()}</p>
    </li>
  );
};

export default OrdersItem;