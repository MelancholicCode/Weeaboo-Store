import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';
import { CartController } from './cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
