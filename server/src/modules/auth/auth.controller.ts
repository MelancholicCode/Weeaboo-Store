import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { UserRegistrationDto } from '../user/dto/user-registration.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Auth()
  @Get('me')
  async getMe(@CurrentUser('id') userId: number) {
    const { id, name, surname, roles, avatar, email, address } =
      await this.userService.getOneById(userId);

    return { id, name, surname, roles, avatar, email, address };
  }

  @Post('login')
  async login(@Res() response: Response, @Body() dto: UserLoginDto) {
    const { refreshToken, accessToken, ...userData } =
      await this.authService.login(dto);

    this.authService.addTokensInResponse(response, refreshToken, accessToken);

    return response.json(userData);
  }

  @Get('login/tokens')
  async getNewTokens(@Req() request: Request, @Res() response: Response) {
    const { refreshToken, accessToken, ...userData } =
      await this.authService.getNewTokens(request.cookies.refreshToken);

    this.authService.addTokensInResponse(response, refreshToken, accessToken);

    return response.json(userData);
  }

  @Post('registration')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('avatar'))
  async registration(
    @Res() response: Response,
    @UploadedFile() image,
    @Body() dto: UserRegistrationDto,
  ) {
    const { refreshToken, accessToken, ...userData } =
      await this.authService.registration(image, dto);

    this.authService.addTokensInResponse(response, refreshToken, accessToken);

    return response.json(userData);
  }

  @Get('logout')
  logout(@Res() response: Response) {
    this.authService.logout(response);

    return response.send();
  }
}
