import { IRole } from './role.interface';

export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  roles: IRole[];
  avatar: string;
  address: string;
}
