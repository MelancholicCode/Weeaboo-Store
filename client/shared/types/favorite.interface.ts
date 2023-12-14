import { IProduct } from './product.interface';

export interface IFavorite {
  id: number;
  userId: number;
  productId: number;
}

export type FavoriteWithProduct = IFavorite & { product: IProduct };
