import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { OrderController } from './order.controller';
import { CartModule } from '../cart/cart.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  exports: [OrderService],
})
export class OrderModule {}
