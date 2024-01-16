import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { RoleService } from '../role/role.service';
import { FileType, FileService } from '../file/file.service';
import { CartService } from '../cart/cart.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
    private readonly cartService: CartService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  async getMany(
    count: string = '20',
    offset: string = '0',
    response: Response,
  ) {
    const totalCount = await this.prisma.user.count();

    response.setHeader('x-total-count', totalCount);

    const users: any = await this.prisma.user.findMany({
      take: +count,
      skip: +offset,
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });

    const formattedUsers = users.map((user) => {
      user.roles = user.roles.map((item) => item.role);

      return user;
    });

    return formattedUsers;
  }

  async getOneById(id: number) {
    return await this.findByIdentifier('id', id);
  }

  async getOneByEmail(email: string) {
    return await this.findByIdentifier('email', email);
  }

  async create(dto: UserRegistrationDto, image?: any) {
    const imagePath = image
      ? await this.fileService.createFile(
          FileType.USER_AVATAR,
          image,
          this.configService.getOrThrow('YA_CLOUD_BUCKET'),
        )
      : null;

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

  async delete(email: string) {
    const user = await this.prisma.user.delete({
      where: {
        email,
      },
    });

    const splittedPath = user.avatar.split('/');
    const key = splittedPath.slice(-3).join('/');

    await this.fileService.removeFile(
      key,
      this.configService.getOrThrow('YA_CLOUD_BUCKET'),
    );
  }

  private async findByIdentifier(
    identifier: 'email' | 'id',
    value: string | number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        [identifier]: value,
      } as any,
      include: {
        roles: true,
      },
    });

    if (!user) return null;

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
}
