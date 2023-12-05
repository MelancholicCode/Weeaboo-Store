import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
  ) {}

  async getAllItems(orderId: string) {
    return await this.prisma.orderItem.findMany({
      where: {
        orderId: +orderId,
      },
    });
  }

  async create(userId: string) {
    const cart = await this.cartService.getCart(userId);

    const cartItems = await this.cartService.getAllItems(String(cart.id));

    if (cartItems.length) {
      return await this.prisma.order.create({
        data: {
          userId: +userId,
          OrderItem: {
            createMany: {
              data: cartItems,
            },
          },
        },
      });
    }

    throw new HttpException('Cart items is not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
    return await this.prisma.order.delete({
      where: {
        id: +id,
      },
    });
  }
}
