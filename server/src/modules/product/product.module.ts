import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { FileService } from '../file/file.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [ProductService, FileService, PrismaService, ConfigService],
  exports: [ProductService],
})
export class ProductModule {}
