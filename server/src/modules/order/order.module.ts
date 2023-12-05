import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { OrderController } from './order.controller';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [JwtModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  exports: [OrderService],
})
export class OrderModule {}
