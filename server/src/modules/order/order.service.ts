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
        OrderItem: {
          include: {
            product: true,
          },
        },
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
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async create(userId: number, address: string) {
    const cartItems = await this.cartService.getAllItems(userId);

    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    if (cartItems.length) {
      const order = await this.prisma.order.create({
        data: {
          address,
          userId,
          OrderItem: {
            createMany: {
              data: orderItems,
            },
          },
        },
        include: {
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      });

      await this.cartService.deleteAll(userId);

      return order;
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
