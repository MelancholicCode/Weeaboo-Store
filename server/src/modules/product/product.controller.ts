import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/product.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';

@UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getMany(
    @Query('count') count: string,
    @Query('offset') offset: string,
    @Query('query') query: string,
    @Query('category') categorySlug: string,
    @Res() response: Response,
  ) {
    const products = await this.productService.getMany(
      count,
      offset,
      query,
      categorySlug,
      response,
    );

    response.json(products);
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.productService.getOne(slug);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@UploadedFile() image, @Body() dto: ProductDto) {
    return this.productService.create(dto, image);
  }

  @Auth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
