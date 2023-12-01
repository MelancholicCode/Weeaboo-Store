import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFavoriteDto } from './dto/createFavorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateFavoriteDto) {
    return this.prisma.favorite.create({
      data: {
        userId: +userId,
        productId: +dto.productId,
      },
    });
  }
}
