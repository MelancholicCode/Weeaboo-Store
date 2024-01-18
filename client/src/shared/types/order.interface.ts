import { IProduct } from './product.interface';

interface IOrderItem {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
  product: IProduct;
}

export interface IOrder {
  id: number;
  userId: number;
  address: string;
  createdAt: string;
}

export type OrderWithItems = IOrder & { OrderItem: IOrderItem[] };
