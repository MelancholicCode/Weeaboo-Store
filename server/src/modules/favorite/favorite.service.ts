import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: number) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
  }

  async create(userId: number, productId: number) {
    return this.prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });
  }

  delete(userId: number, id: number) {
    this.prisma.favorite.delete({
      where: {
        userId,
        id,
      },
    });
  }
}
