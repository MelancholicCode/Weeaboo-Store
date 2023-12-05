import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
