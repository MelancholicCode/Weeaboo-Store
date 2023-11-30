import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: dto,
    });
  }
}
