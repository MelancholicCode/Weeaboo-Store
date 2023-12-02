import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  name: string;
  surname: string;
  @IsEmail()
  email: string;
  @MinLength(8, {
    message: 'Password length must be 8 or more symbols',
  })
  password: string;
  address: string;
}
