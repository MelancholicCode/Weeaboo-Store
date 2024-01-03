import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChangeCartItemQuantityDto } from './dto/change-cart-item-quantity.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllItems(userId: number) {
    return await this.prisma.cartItem.findMany({
      where: {
        cart: {
          userId,
        },
      },
      include: {
        product: true,
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
      include: {
        product: true,
      },
    });
  }

  async changeQuantity(
    userId: number,
    id: number,
    dto: ChangeCartItemQuantityDto,
  ) {
    return await this.prisma.cartItem.update({
      where: {
        cart: {
          userId,
        },
        id,
      },
      data: dto,
      include: {
        product: true,
      },
    });
  }

  async deleteItem(userId: number, id: number) {
    await this.prisma.cartItem.delete({
      where: {
        cart: {
          userId,
        },
        id,
      },
    });
  }

  async deleteAll(userId: number) {
    await this.prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId,
        },
      },
    });
  }
}
