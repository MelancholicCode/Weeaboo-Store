import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/createProduct.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

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

  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.productService.getOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@UploadedFile() image, @Body() dto: CreateProductDto) {
    return this.productService.create(dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':slug')
  delete(@Param('slug') slug: string) {
    return this.productService.delete(slug);
  }
}
