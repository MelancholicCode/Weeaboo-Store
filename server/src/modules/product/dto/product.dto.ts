import { IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly slug: string;
  @IsOptional()
  @IsString()
  readonly imageSource?: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly price: string;
  @IsString()
  readonly categoryId: string;
}
