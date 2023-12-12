import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: UserDto) {
    const user = await this.validateUser(dto);

    return this.getUserWithTokens(user);
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.getOneById(result.id);

    return this.getUserWithTokens(user);
  }

  async registration(image, dto: UserDto) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (candidate) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashPassword = await hash(dto.password);
    const user = await this.userService.create(image, {
      ...dto,
      password: hashPassword,
    });

    return this.getUserWithTokens(user);
  }

  private generateTokens(user: User & { roles: Role[] }) {
    const payload = { id: user.id, email: user.email, roles: user.roles };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private getUserWithTokens = (user: User & { roles: Role[] }) => ({
    id: user.id,
    email: user.email,
    roles: user.roles,
    ...this.generateTokens(user),
  });

  private async validateUser(dto: UserDto) {
    const user = await this.userService.getOneByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await await verify(user.password, dto.password);

    if (!isValid)
      throw new UnauthorizedException('Incorrect email or password');

    return user;
  }
}
