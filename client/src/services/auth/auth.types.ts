export enum TokensEnum {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum AuthTypesEnum {
  LOGIN = 'login',
  REGISTRATION = 'registration',
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData {
  name: string;
  surname: string;
  address: string;
  email: string;
  password: string;
}
