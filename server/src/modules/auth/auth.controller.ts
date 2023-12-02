import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('registration')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('avatar'))
  registration(@UploadedFile() image, @Body() dto: CreateUserDto) {
    return this.authService.registration(image, dto);
  }
}
