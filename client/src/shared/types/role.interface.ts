export enum RolesEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IRole {
  id: number;
  name: RolesEnum;
}
