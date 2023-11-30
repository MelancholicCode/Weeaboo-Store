import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(
    @Query('count') count: string,
    @Query('offset') offset: string,
    @Query('query') query: string,
  ) {
    return this.productService.getAll(count, offset, query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@UploadedFile() image, @Body() dto: CreateProductDto) {
    return this.productService.create(dto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
