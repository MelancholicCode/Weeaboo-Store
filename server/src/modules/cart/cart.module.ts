import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
