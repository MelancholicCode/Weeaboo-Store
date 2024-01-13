import { ICartItem } from '../types/cart.interface';
import { IFavorite } from '../types/favorite.interface';
import { OrderWithItems } from '../types/order.interface';
import { IProduct } from '../types/product.interface';
import { IReview } from '../types/review.interface';
import { RolesEnum } from '../types/role.interface';
import { IUser } from '../types/user.interface';
import { images } from './images';

export const mockUser: IUser = {
  id: 1,
  name: 'Alex',
  surname: 'Alexov',
  email: 'email@mail.com',
  avatar: null,
  address: 'Some user address',
  roles: [{ id: 1, name: RolesEnum.USER }],
};

export const mockProduct: IProduct = {
  id: 1,
  rate: 4,
  title: 'Product title',
  slug: 'product-slug',
  description: 'Product description',
  price: 19,
  categoryId: 1,
  img: images.mockProduct.src,
};

export const mockProducts: IProduct[] = [mockProduct];

export const mockCartItem: ICartItem = {
  id: 1,
  quantity: 1,
  cartId: 1,
  productId: 1,
  product: mockProduct,
};

export const mockCartItems: ICartItem[] = [mockCartItem];

export const mockFavorite: IFavorite = {
  id: 1,
  userId: 1,
  productId: 1,
  product: mockProduct,
};

export const mockFavorites: IFavorite[] = [mockFavorite];

export const mockOrder = {
  id: 1,
  userId: 1,
  address: 'Some user address',
  createdAt: '2022-02-26T16:37:48.244Z',
  OrderItem: [
    {
      id: 1,
      quantity: 1,
      productId: 1,
      orderId: 1,
      product: mockProduct,
    },
  ],
};

export const mockOrders: OrderWithItems[] = [mockOrder];

export const mockReview: IReview = {
  id: 1,
  comment: 'Some comment',
  user: {
    avatar: images.avatarPlaceholder.src,
    name: 'Alex',
    surname: 'Alexov',
  },
  productId: 1,
  userId: 1,
  orderItemId: 1,
  rate: 4,
};

export const mockReviews: IReview[] = [mockReview];
