import { IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  rate: number;
  @IsString()
  comment: string;
}
