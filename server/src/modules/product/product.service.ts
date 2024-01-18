import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './dto/product.dto';
import { FileType, FileService } from '../file/file.service';
import { Product } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  async getMany(
    count: string = '20',
    offset: string = '0',
    query: string,
    categorySlug: string,
    response: Response,
  ) {
    const totalCount = await this.prisma.product.count({
      where: {
        title: {
          search: query,
        },
        description: {
          search: query,
        },
        category: {
          slug: categorySlug,
        },
      },
    });

    response.setHeader('x-total-count', totalCount);

    return await this.prisma.product.findMany({
      take: +count,
      skip: +offset,
      where: {
        title: {
          search: query,
        },
        description: {
          search: query,
        },
        category: {
          slug: categorySlug,
        },
      },
    });
  }

  async getOne(slug: string) {
    return await this.prisma.product.findFirst({
      where: {
        slug,
      },
    });
  }

  async create(dto: ProductDto, image) {
    const imagePath = await this.fileService.createFile(
      FileType.PRODUCT_IMAGE,
      image,
      this.configService.getOrThrow('YA_CLOUD_BUCKET'),
    );

    console.log(imagePath);

    return await this.prisma.product.create({
      data: {
        ...dto,
        price: +dto.price,
        categoryId: +dto.categoryId,
        img: imagePath,
      },
    });
  }

  async updateOne(id: number, data: Partial<Product>) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    const product = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    const splittedPath = product.img.split('/');
    const key = splittedPath.slice(-3).join('/');

    await this.fileService.removeFile(
      key,
      this.configService.getOrThrow('YA_CLOUD_BUCKET'),
    );
  }
}
