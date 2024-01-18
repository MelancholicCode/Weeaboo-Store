import { IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  readonly rate: number;
  @IsString()
  readonly comment: string;
}
