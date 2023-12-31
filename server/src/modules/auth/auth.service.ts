import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { UserRegistrationDto } from '../user/dto/user-registration.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';

enum TokensEnum {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

@Injectable()
export class AuthService {
  ACCESS_TOKEN_EXPIRE_MINUTES = 15;
  REFRESH_TOKEN_EXPIRE_DAYS = 30;

  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: UserLoginDto) {
    const user = await this.validateUser(dto);

    return this.getUserWithTokens(user);
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.getOneById(result.id);

    return this.getUserWithTokens(user);
  }

  async registration(image, dto: UserRegistrationDto) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (candidate) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashPassword = await hash(dto.password);
    const user = await this.userService.create(
      {
        ...dto,
        password: hashPassword,
      },
      image,
    );

    return this.getUserWithTokens(user);
  }

  private getUserWithTokens = (user: User & { roles: Role[] }) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    roles: user.roles,
    address: user.address,
    avatar: user.avatar,
    ...this.generateTokens(user),
  });

  private generateTokens(user: User & { roles: Role[] }) {
    const payload = { id: user.id, email: user.email, roles: user.roles };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: `${this.ACCESS_TOKEN_EXPIRE_MINUTES}m`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.REFRESH_TOKEN_EXPIRE_DAYS}d`,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(dto: UserLoginDto) {
    const user = await this.userService.getOneByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await await verify(user.password, dto.password);

    if (!isValid)
      throw new UnauthorizedException('Incorrect email or password');

    return user;
  }

  addTokensInResponse(
    response: Response,
    refreshToken: string,
    accessToken: string,
  ) {
    const accessTokenExpires = new Date();
    accessTokenExpires.setMinutes(
      accessTokenExpires.getMinutes() + this.ACCESS_TOKEN_EXPIRE_MINUTES,
    );

    const refreshTokenExpires = new Date();
    refreshTokenExpires.setDate(
      refreshTokenExpires.getDate() + this.REFRESH_TOKEN_EXPIRE_DAYS,
    );

    const tokenCookieConfig: CookieOptions = {
      // secure: this.configService.get('NODE_ENV') === 'production',
      // domain: this.configService.get('CLIENT_DOMAIN') || localhost,
      // sameSite: 'none',
    };

    response.cookie(TokensEnum.ACCESS_TOKEN, accessToken, {
      expires: accessTokenExpires,
      ...tokenCookieConfig,
    });

    response.cookie(TokensEnum.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpires,
      ...tokenCookieConfig,
    });
  }

  logout(response: Response) {
    response.cookie(TokensEnum.ACCESS_TOKEN, '', { expires: new Date() });
    response.cookie(TokensEnum.REFRESH_TOKEN, '', { expires: new Date() });
  }
}
