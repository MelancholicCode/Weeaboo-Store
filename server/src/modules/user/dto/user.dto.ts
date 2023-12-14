import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly surname: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(8, {
    message: 'Password length must be 8 or more symbols',
  })
  readonly password: string;
  @IsString()
  readonly address: string;
}
