import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleDto } from './dto/role-dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.role.findMany();
  }

  async getByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role ${name} was not found`);
    }

    return role;
  }

  async create(dto: RoleDto) {
    return await this.prisma.role.create({
      data: dto,
    });
  }

  delete(name: string) {
    this.prisma.role.delete({
      where: {
        name,
      },
    });
  }
}
