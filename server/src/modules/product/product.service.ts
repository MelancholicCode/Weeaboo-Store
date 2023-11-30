import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}
  async getAll(
    count: string = '20',
    offset: string = '0',
    query: string,
  ): Promise<Product[]> {
    return await this.prisma.product.findMany({
      take: +count,
      skip: +offset,
      ...(query
        ? {
            where: {
              title: {
                search: query,
              },
              description: {
                search: query,
              },
            },
          }
        : {}),
    });
  }

  async getOne(id: string): Promise<Product> {
    return await this.prisma.product.findFirst({
      where: {
        id: +id,
      },
    });
  }

  async search(query: string) {
    return await this.prisma.product.findMany({
      where: {
        title: {
          search: query,
        },
      },
    });
  }

  async create(dto: CreateProductDto, image: string): Promise<Product> {
    const imagePath = this.fileService.createFile(image);
    return await this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: +dto.price,
        img: imagePath,
        categoryId: +dto.categoryId,
      },
    });
  }

  async delete(id: string): Promise<number> {
    const product = await this.prisma.product.delete({
      where: {
        id: +id,
      },
    });
    this.fileService.removeFile(product.img);
    return product.id;
  }
}
