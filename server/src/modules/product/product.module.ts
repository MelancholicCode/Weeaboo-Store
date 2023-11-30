import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, FileService, PrismaService],
})
export class ProductModule {}
