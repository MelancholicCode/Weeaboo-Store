import { IProduct } from './product.interface';

export interface ICartItem {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  product: IProduct;
}
