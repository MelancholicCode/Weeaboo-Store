import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
