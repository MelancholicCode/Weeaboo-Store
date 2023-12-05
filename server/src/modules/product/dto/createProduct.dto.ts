export class CreateProductDto {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly price: string;
  readonly categoryId: string;
}
