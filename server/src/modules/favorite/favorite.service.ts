import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: FavoriteDto) {
    return this.prisma.favorite.create({
      data: {
        userId: +userId,
        productId: +dto.productId,
      },
    });
  }
}
