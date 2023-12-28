export enum RolesEnum {
  'USER',
  'ADMIN',
}

export interface IRole {
  id: string;
  name: RolesEnum;
}
