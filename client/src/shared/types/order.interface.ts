interface IOrderItem {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
}

export interface IOrder {
  id: number;
  userId: number;
}

export type OrderWithItems = IOrder & { OrderItem: IOrderItem[] };
