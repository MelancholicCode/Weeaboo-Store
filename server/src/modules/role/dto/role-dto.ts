import { IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  readonly name: string;
}
