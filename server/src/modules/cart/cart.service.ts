import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllItems(userId: number) {
    const { id: cartId } = await this.prisma.cart.findUnique({
      where: {
        userId: +userId,
      },
    });

    return await this.prisma.cartItem.findMany({
      where: {
        cartId,
      },
    });
  }

  async create(userId: number) {
    return await this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  async createItem(userId: number, productId: number) {
    const { id: cartId } = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    return await this.prisma.cartItem.create({
      data: {
        productId,
        cartId,
      },
    });
  }

  async deleteItem(userId: number, id: number) {
    const { id: cartId } = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    this.prisma.cartItem.delete({
      where: {
        cartId,
        id,
      },
    });
  }
}
