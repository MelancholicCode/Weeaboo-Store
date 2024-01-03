import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { calcRating } from './review.helper';
import { ProductService } from '../product/product.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getAll(productId: number) {
    return await this.prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            avatar: true,
            name: true,
            surname: true,
          },
        },
      },
    });
  }

  async create(userId: number, productId: number, dto: ReviewDto) {
    const orderItem = await this.prisma.orderItem.findFirst({
      where: {
        order: {
          userId,
        },
        productId,
      },
    });

    if (!orderItem) throw new NotFoundException('Order item is not found');

    const review = await this.prisma.review.create({
      data: {
        ...dto,
        userId,
        productId,
        orderItemId: orderItem.id,
      },
    });

    const allRates = (await this.prisma.review.findMany()).map(
      (review) => review.rate,
    );

    await this.productService.updateOne(productId, {
      rate: calcRating(allRates, review.rate),
    });

    return review;
  }

  delete(id: number) {
    this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
