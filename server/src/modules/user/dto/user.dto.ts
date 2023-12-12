import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8, {
    message: 'Password length must be 8 or more symbols',
  })
  password: string;
  @IsString()
  address: string;
}
