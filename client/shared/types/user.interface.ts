import { IRole } from './role.interface';

export interface IUser {
  id: number;
  email: string;
  roles: IRole[];
}
