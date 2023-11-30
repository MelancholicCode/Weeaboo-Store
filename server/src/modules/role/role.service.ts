import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    return this.prisma.role.findMany();
  }

  async getByName(name: string) {
    return this.prisma.role.findFirst({
      where: {
        name,
      },
    });
  }

  async create(dto: RoleDto) {
    return this.prisma.role.create({
      data: dto,
    });
  }
}
