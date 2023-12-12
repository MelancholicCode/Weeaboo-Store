import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number) {
    return await this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  async getCart(userId: string) {
    return await this.prisma.cart.findUnique({
      where: {
        userId: +userId,
      },
    });
  }

  async getAllItems(cartId: string) {
    return await this.prisma.cartItem.findMany({
      where: {
        cartId: +cartId,
      },
    });
  }

  async createItem(cartId: string, dto: CartItemDto) {
    return await this.prisma.cartItem.create({
      data: {
        cartId: +cartId,
        productId: +dto.productId,
      },
    });
  }

  async deleteItem(id: string) {
    return await this.prisma.cartItem.delete({
      where: {
        id: +id,
      },
    });
  }
}
