interface IUserInfo {
  avatar: string;
  name: string;
  surname: string;
}

export interface IReview {
  id: number;
  rate: number;
  comment: string;
  userId: number;
  orderItemId: number;
  productId: number;
  user: IUserInfo;
}
