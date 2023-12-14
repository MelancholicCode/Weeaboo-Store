export interface IReview {
  id: number;
  rate: number;
  comment: string;
  userId: number;
  orderItemId: number;
  productId: number;
}

interface IUserInfo {
  avatar: string;
  name: string;
  surname: string;
}

export type ReviewInfo = IReview & { user: IUserInfo };
