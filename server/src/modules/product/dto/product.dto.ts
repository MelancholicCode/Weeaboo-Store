import { IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly slug: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly price: string;
  readonly categoryId: string;
}
