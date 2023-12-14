import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './dto/product.dto';
import { FileDirectory, FileService } from '../file/file.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async getMany(count: string = '20', offset: string = '0', query: string) {
    return await this.prisma.product.findMany({
      take: +count,
      skip: +offset,
      ...(query && {
        where: {
          title: {
            search: query,
          },
          description: {
            search: query,
          },
        },
      }),
    });
  }

  async getOne(slug: string) {
    return await this.prisma.product.findFirst({
      where: {
        slug,
      },
    });
  }

  async create(dto: ProductDto, image: string) {
    const imagePath =
      dto.imageSource ||
      this.fileService.createFile(FileDirectory.PRODUCT_IMAGE, image);

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

  async delete(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id: +id,
        },
      });

      this.fileService.removeFile(product.img);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
