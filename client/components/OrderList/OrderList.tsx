import { useAppSelector } from '@/store/hooks/hooks';

const OrderItems = () => {
  const { orders } = useAppSelector((state) => state.order);

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>{order.id}</li>
      ))}
    </ul>
  );
};

export default OrderItems;
