import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { RoleService } from '../role/role.service';
import { FileDirectory, FileService } from '../file/file.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
    private readonly cartService: CartService,
    private readonly fileService: FileService,
  ) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: true,
      },
    });

    const roles = await this.prisma.role.findMany({
      where: {
        id: {
          in: user.roles.map((item) => item.roleId),
        },
      },
    });

    return {
      ...user,
      roles,
    };
  }

  async create(image, dto: CreateUserDto) {
    const imagePath = this.fileService.createFile(
      FileDirectory.USER_AVATAR,
      image,
    );

    const role = await this.roleService.getByName('USER');
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        avatar: imagePath,
      },
      include: {
        roles: true,
      },
    });

    await this.cartService.create(user.id);

    return {
      ...(await this.prisma.rolesOnUsers
        .create({
          data: {
            roleId: role.id,
            userId: user.id,
          },
        })
        .user()),
      roles: [role],
    };
  }

  async delete(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
