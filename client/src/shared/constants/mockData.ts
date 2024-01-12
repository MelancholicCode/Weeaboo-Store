import { ICartItem } from '../types/cart.interface';
import { IFavorite } from '../types/favorite.interface';
import { OrderWithItems } from '../types/order.interface';
import { IProduct } from '../types/product.interface';
import { IReview } from '../types/review.interface';
import { RolesEnum } from '../types/role.interface';
import { IUser } from '../types/user.interface';

export const mockUserData: IUser = {
  id: 1,
  name: 'Alex',
  surname: 'Alexov',
  email: 'email@mail.com',
  avatar: null,
  address: 'Some user address',
  roles: [{ id: 1, name: RolesEnum.USER }],
};

const mockProduct: IProduct = {
  id: 1,
  rate: 4,
  title: 'Product title',
  slug: 'product-slug',
  description: 'Product description',
  price: 19,
  categoryId: 1,
  img: 'image.url.com',
};

export const mockCartItem: ICartItem = {
  id: 1,
  quantity: 1,
  cartId: 1,
  productId: 1,
  product: mockProduct,
};

export const mockCartData: ICartItem[] = [mockCartItem];

export const mockFavorite: IFavorite = {
  id: 1,
  userId: 1,
  productId: 1,
  product: mockProduct,
};

export const mockFavoritesData: IFavorite[] = [mockFavorite];

export const mockOrdersData: OrderWithItems[] = [
  {
    id: 1,
    userId: 1,
    address: 'Some user address',
    createdAt: 'Some data',
    OrderItem: [
      {
        id: 1,
        quantity: 1,
        productId: 1,
        orderId: 1,
        product: mockProduct,
      },
    ],
  },
];

export const mockReviewsData: IReview[] = [
  {
    id: 1,
    comment: 'Some comment',
    user: {
      avatar: 'image.url.com',
      name: 'Alex',
      surname: 'Alexov',
    },
    productId: 1,
    userId: 1,
    orderItemId: 1,
    rate: 4,
  },
];
