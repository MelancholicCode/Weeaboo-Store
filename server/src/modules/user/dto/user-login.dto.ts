import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(8, {
    message: 'Password length must be 8 or more symbols',
  })
  readonly password: string;
}
