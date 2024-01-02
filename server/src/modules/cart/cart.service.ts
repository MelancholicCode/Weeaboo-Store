import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChangeCartItemQuantityDto } from './dto/change-cart-item-quantity.dto';

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
    const { id: cartId } = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    return await this.prisma.cartItem.update({
      where: {
        cartId,
        id,
      },
      data: dto,
      include: {
        product: true,
      },
    });
  }

  async deleteItem(userId: number, id: number) {
    const { id: cartId } = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    await this.prisma.cartItem.delete({
      where: {
        cartId,
        id,
      },
    });
  }
}
