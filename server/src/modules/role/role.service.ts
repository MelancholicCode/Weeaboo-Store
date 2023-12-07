import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto } from './dto/createRole.dto';

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

  async create(dto: CreateRoleDto) {
    return await this.prisma.role.create({
      data: dto,
    });
  }

  async delete(name: string) {
    try {
      await this.prisma.role.delete({
        where: {
          name,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
