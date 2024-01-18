import { IsNumber } from 'class-validator';

export class ChangeCartItemQuantityDto {
  @IsNumber()
  quantity: number;
}
