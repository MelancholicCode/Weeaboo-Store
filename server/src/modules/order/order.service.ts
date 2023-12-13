import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
  ) {}

  async getAll(userId: number) {
    return await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        OrderItem: true,
      },
    });
  }

  async getOneWithItems(userId: number, id: number) {
    return await this.prisma.order.findUnique({
      where: {
        userId,
        id,
      },
      include: {
        OrderItem: true,
      },
    });
  }

  async create(userId: number) {
    const { CartItem: cartItems } = await this.cartService.getAllItems(userId);

    if (cartItems.length) {
      return await this.prisma.order.create({
        data: {
          userId,
          OrderItem: {
            createMany: {
              data: cartItems,
            },
          },
        },
      });
    }

    throw new NotFoundException('Cart items is not found');
  }

  delete(id: number) {
    this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
