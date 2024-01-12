export enum RolesEnum {
  'USER',
  'ADMIN',
}

export interface IRole {
  id: number;
  name: RolesEnum;
}
